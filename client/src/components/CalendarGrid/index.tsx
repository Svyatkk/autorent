'use client'

import React, { useEffect, useState } from 'react'
import { useCars } from '../../hooks/car/useCars'
import { icons } from '../../constants/ICONS'
import { useGetCarByRegNum } from '../../hooks/car/useGetCarByRegNum'
import { useFilterState } from '../DataFromFilterWrapper'
import SkeletonPending from '../SkeletonPending'
import styles from './styles.module.css'
import type { IBooking } from '../../types/booking.interface'

const DAY_ABBR = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTH_NAMES = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
]
const CELL_WIDTH = 36
const HOUR_MS = 1000 * 60 * 60
const DAY_MS = HOUR_MS * 24

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate()
}

function parseBookingDate(value: string | null): Date | null {
    if (!value) {
        return null
    }

    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2}))?)?/)

    if (!match) {
        return null
    }

    const [, year, month, day, hour = '0', minute = '0', second = '0'] = match

    return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
        Number(second),
    )
}

function getBookingStyle(booking: IBooking, year: number, month: number): React.CSSProperties | null {
    const start = parseBookingDate(booking.start_date)
    const end = parseBookingDate(booking.end_date)

    if (!start || !end) {
        return null
    }

    const monthStart = new Date(year, month - 1, 1, 0, 0, 0)
    const monthEnd = new Date(year, month, 1, 0, 0, 0)

    if (end <= monthStart || start >= monthEnd) {
        return null
    }

    const visibleStart = start < monthStart ? monthStart : start
    const visibleEnd = end > monthEnd ? monthEnd : end
    const leftDays = (visibleStart.getTime() - monthStart.getTime()) / DAY_MS
    const widthDays = (visibleEnd.getTime() - visibleStart.getTime()) / DAY_MS

    return {
        left: `${leftDays * CELL_WIDTH}px`,
        width: `${Math.max(widthDays * CELL_WIDTH, 4)}px`,
    }
}

function getBookingTitle(booking: IBooking): string {
    return `${booking.start_date || '—'} - ${booking.end_date || '—'}`
}

export default function CalendarGrid() {
    const { carRegNum, searchButtonClick, setSearchButtonClick, year, month } = useFilterState()
    const { cars, isError, isLoading } = useCars(year, month)
    const [openedCar, setOpenedCar] = useState<number | null>(null)
    const [activeRegNum, setActiveRegNum] = useState<string>('')

    useEffect(() => {
        if (searchButtonClick) {
            setActiveRegNum(carRegNum?.trim() || '')
            setSearchButtonClick(false)
        }
    }, [searchButtonClick, carRegNum, setSearchButtonClick])

    const { carWithRegNum, carWithRegNumIsLoading, carWithRegNumIsError } = useGetCarByRegNum(activeRegNum, year, month)


    const daysInMonth = getDaysInMonth(year, month)
    const days = Array.from({ length: daysInMonth }, (_, index) => {
        const date = new Date(year, month - 1, index + 1)
        return { day: index + 1, dayOfWeek: date.getDay() }
    })
    const displayCars = activeRegNum ? (carWithRegNum ? [carWithRegNum] : []) : cars || []

    const handleShowCarInfo = (carId: number) => {
        setOpenedCar(prev => (prev === carId ? null : carId))
    }

    if (isLoading) {
        return <div className={styles.loading}>Завантаження машин...</div>
    }

    if (isError) {
        return <div className={styles.error}>Помилка завантаження даних</div>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.calendarTitle}>
                {MONTH_NAMES[month - 1]} {year}
            </div>

            <table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={`${styles.th} ${styles.stickyTh}`} />

                        {days.map(({ day, dayOfWeek }) => (
                            <th key={day} className={styles.th}>
                                <span className={styles.dayAbbr}>{DAY_ABBR[dayOfWeek]}</span>
                                <span className={styles.dayNum}>{day}</span>
                            </th>
                        ))}
                    </tr>
                </thead>


                <tbody>
                    {carWithRegNumIsLoading ? (
                        <SkeletonPending rows={5} columns={daysInMonth} />
                    ) : displayCars.length > 0 ? (
                        displayCars.map((car, index) => {
                            const modelName = car?.car_model?.slug || 'Невідома модель'
                            const isOpen = openedCar === car.car_id

                            return (
                                <tr
                                    key={car.car_id}
                                    className={`${styles.row} ${index % 2 === 0 ? styles.gray : ''}`}
                                    onClick={() => handleShowCarInfo(car.car_id)}
                                >
                                    <td className={`${styles.td} ${styles.stickyTd} ${index % 2 === 0 ? styles.stickyGray : ''}`}>
                                        <div className={styles.carInfo}>
                                            <icons.chevronDown
                                                className={`${styles.chevron} ${isOpen ? styles.active : ''}`}
                                            />
                                            <span className={styles.dot} />
                                            <span className={styles.columnModel}>{modelName}</span>
                                            <span className={styles.regNum}>
                                                {car.registration_number || '—'}
                                            </span>
                                            <span className={styles.availabilityBadge}>
                                                {car.free_days ?? 0}/{car.all_days ?? daysInMonth}
                                            </span>
                                        </div>
                                    </td>


                                    <td className={styles.timelineCell} colSpan={daysInMonth}>
                                        <div
                                            className={styles.timeline}
                                            style={{
                                                width: daysInMonth * CELL_WIDTH,
                                                '--cell-width': `${CELL_WIDTH}px`,
                                            } as React.CSSProperties}
                                        >
                                            {car.bookings
                                                ?.filter((booking) => booking.status === 1)
                                                .map((booking) => {
                                                    const bookingStyle = getBookingStyle(booking, year, month)

                                                    if (!bookingStyle) {
                                                        return null
                                                    }

                                                    return (
                                                        <div
                                                            key={booking.booking_id}
                                                            className={styles.bookingBar}
                                                            style={bookingStyle}
                                                            title={getBookingTitle(booking)}
                                                        >
                                                            Rented
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={daysInMonth + 1} className={styles.noData}>
                                {activeRegNum && carWithRegNumIsError
                                    ? 'Машину за таким номером не знайдено'
                                    : 'Даних для вибраного періоду немає'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
