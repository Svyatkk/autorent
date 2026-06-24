import type { ICar } from '../types/car.interface'
import { apiClient } from './config'

export const carService = {
    async getAll(year = 2023, month = 1): Promise<ICar[]> {
        const response = await apiClient.get<ICar[]>('/cars', {
            params: { year, month },
        })
        return response.data
    },

    async getById(id: string, year = 2023, month = 1) {
        const response = await apiClient.get<ICar>(`/cars/${id}`, {
            params: { year, month },
        })
        return response.data
    },

    async getByRegNum(regNum: string, year = 2023, month = 1) {
        const response = await apiClient.get<ICar>(`/cars/search/${regNum}`, {
            params: { year, month },
        })
        return response.data
    },


}
