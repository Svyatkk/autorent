import { useQuery } from '@tanstack/react-query'
import { carService } from '../../api/car.service'
import { DEFAULT_CALENDAR_MONTH, DEFAULT_CALENDAR_YEAR } from '../../constants/CALENDAR'

export function useGetCarByRegNum(carRegNum: string, year = DEFAULT_CALENDAR_YEAR, month = DEFAULT_CALENDAR_MONTH) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['car', carRegNum, year, month],
        queryFn: () => carService.getByRegNum(carRegNum, year, month),
        enabled: !!carRegNum,
    })

    return {
        carWithRegNum: data,
        carWithRegNumIsLoading: isLoading,
        carWithRegNumIsError: isError,
        carWithRegNumisError: isError,
    }
}
