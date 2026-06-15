import { useQuery } from '@tanstack/react-query'
import { carService } from '../../api/car.service'

export function useCars() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['cars'],
        queryFn: () => carService.getAll(),
    })

    return { cars: data, isLoading, isError }
}
