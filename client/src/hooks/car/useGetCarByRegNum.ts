import { useQuery } from '@tanstack/react-query'
import { carService } from '../../api/car.service'
export function useGetCarByRegNum(car_regNum: string) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['car', car_regNum],
        queryFn: () => carService.getByRegNum(car_regNum),
        enabled: !!car_regNum,
    })
    return { carWithRegNum: data, carWithRegNumIsLoading: isLoading, carWithRegNumisError: isError }
}
