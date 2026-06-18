import { useQuery } from '@tanstack/react-query'
import { carService } from '../../api/car.service'

export function useGetCarById(car_id: string) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['car', car_id],
        queryFn: () => carService.getById(car_id),
    })
    return { car: data, isLoading, isError }
}

