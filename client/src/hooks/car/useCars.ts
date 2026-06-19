import { useQuery } from '@tanstack/react-query'
import { carService } from '../../api/car.service'
import { DEFAULT_CALENDAR_MONTH, DEFAULT_CALENDAR_YEAR } from '../../constants/CALENDAR'

export function useCars(year = DEFAULT_CALENDAR_YEAR, month = DEFAULT_CALENDAR_MONTH) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['cars', year, month],
        queryFn: () => carService.getAll(year, month),
    })


    return { cars: data, isLoading, isError }
}
