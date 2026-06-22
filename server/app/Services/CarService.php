<?php

namespace App\Services;

use App\Models\Car;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class CarService
{
    private const TIMEZONE = 'Europe/Kiev';
    private const WORK_START_HOUR = 9;
    private const WORK_END_HOUR = 21;
    private const MIN_FREE_MINUTES = 540;

    public function getAll(int $year = 2023, int $month = 1): array
    {
        [$from, $to] = $this->getMonthBounds($year, $month);
    
            
        return $this->baseCarsQuery()
            ->with($this->relationsForPeriod($from, $to))
            ->orderBy('car_id', 'asc')
            ->get()
            ->map(fn (Car $car) => $this->appendAvailability($car, $from, $to))
            ->toArray();
    }

    public function getById(string $id, int $year = 2023, int $month = 1): Car
    {
        [$from, $to] = $this->getMonthBounds($year, $month);

        $car = $this->baseCarsQuery()
            ->with($this->relationsForPeriod($from, $to))
            ->where('car_id', $id)
            ->firstOrFail();

        return $this->appendAvailability($car, $from, $to);
    }

    public function getByRegNum(string $regNum, int $year = 2023, int $month = 1): Car
    {
        [$from, $to] = $this->getMonthBounds($year, $month);

        $car = $this->baseCarsQuery()
            ->with($this->relationsForPeriod($from, $to))
            ->where('registration_number', $regNum)
            ->firstOrFail();

        return $this->appendAvailability($car, $from, $to);
    }

    private function baseCarsQuery(): Builder
    {
        return Car::where('company_id', 1)
            ->where('status', 1)
            ->where('is_deleted', '!=', 1);
    }

    private function relationsForPeriod(Carbon $from, Carbon $to): array
    {
        return [
            'bookings' => function ($query) use ($from, $to) {
                $query
                    ->select('booking_id', 'car_id', 'start_date', 'end_date', 'status')
                    ->where('status', 1)
                    ->where('end_date', '>', $from->toDateTimeString())
                    ->where('start_date', '<', $to->toDateTimeString())
                    ->orderBy('start_date');
            },
            'carModel.carBrand',
        ];
    }

    private function getMonthBounds(int $year, int $month): array
    {
        $from = Carbon::create($year, $month, 1, 0, 0, 0, self::TIMEZONE)->startOfDay();
        $to = $from->copy()->addMonth();

        return [$from, $to];
    }

    private function appendAvailability(Car $car, Carbon $from, Carbon $to): Car
    {
        $car->setAttribute('free_days', $this->countFreeDays($car->bookings, $from, $to));
        $car->setAttribute('all_days', $from->daysInMonth);

        return $car;
    }

    private function countFreeDays(Collection $bookings, Carbon $from, Carbon $to): int
    {
        $freeDays = 0;
        $day = $from->copy();

        while ($day->lt($to)) {
            if ($this->isCarFreeForDay($bookings, $day)) {
                $freeDays++;
            }

            $day->addDay();
        }

        return $freeDays;
    }

    private function isCarFreeForDay(Collection $bookings, Carbon $day): bool
    {
        $dayStart = $day->copy()->setTime(self::WORK_START_HOUR, 0, 0);
        $dayEnd = $day->copy()->setTime(self::WORK_END_HOUR, 0, 0);

        $busyIntervals = $this->getBusyIntervalsForDay($bookings, $dayStart, $dayEnd);
        $busyIntervals = $this->mergeBusyIntervals($busyIntervals);

        $freeFrom = $dayStart;

        foreach ($busyIntervals as $interval) {
            if ($freeFrom->diffInMinutes($interval['start']) >= self::MIN_FREE_MINUTES) {
                return true;
            }

            if ($interval['end']->greaterThan($freeFrom)) {
                $freeFrom = $interval['end'];
            }
        }

        return $freeFrom->diffInMinutes($dayEnd) >= self::MIN_FREE_MINUTES;
    }

    private function getBusyIntervalsForDay(Collection $bookings, Carbon $dayStart, Carbon $dayEnd): array
    {
        $intervals = [];

        foreach ($bookings as $booking) {
            $bookingStart = $this->parseBookingDate($booking, 'start_date');
            $bookingEnd = $this->parseBookingDate($booking, 'end_date');

            if ($bookingEnd <= $dayStart || $bookingStart >= $dayEnd) {
                continue;
            }

            $intervals[] = [
                'start' => $bookingStart->greaterThan($dayStart) ? $bookingStart : $dayStart,
                'end' => $bookingEnd->lessThan($dayEnd) ? $bookingEnd : $dayEnd,
            ];
        }

        return $intervals;
    }

    private function parseBookingDate($booking, string $field): Carbon
    {
        return Carbon::parse($booking->getRawOriginal($field) ?? $booking->{$field}, self::TIMEZONE);
    }

    
    private function mergeBusyIntervals(array $intervals): array
    {
        usort($intervals, fn ($a, $b) => $a['start']->timestamp <=> $b['start']->timestamp);

        $merged = [];

        foreach ($intervals as $interval) {
            $lastIndex = count($merged) - 1;

            if ($lastIndex < 0 || $interval['start']->greaterThan($merged[$lastIndex]['end'])) {
                $merged[] = $interval;
                continue;
            }

            if ($interval['end']->greaterThan($merged[$lastIndex]['end'])) {
                $merged[$lastIndex]['end'] = $interval['end'];
            }
        }

        return $merged;
    }
}
