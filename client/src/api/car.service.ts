import axios from 'axios'
import { BASE_URL } from './config'
import type { ICar } from '../types/car.interface'
import { fetchOptions } from './config'

export const carService = {
    async getAll(year = 2023, month = 1): Promise<ICar[]> {
        const response = await axios.get<ICar[]>(`${BASE_URL}/cars`, {
            ...fetchOptions,
            params: { year, month },
        })
        return response.data
    },

    async getById(id: string, year = 2023, month = 1) {
        const response = await axios.get<ICar>(`${BASE_URL}/cars/${id}`, {
            ...fetchOptions,
            params: { year, month },
        })
        return response.data
    },

    async getByRegNum(regNum: string, year = 2023, month = 1) {
        const response = await axios.get<ICar>(`${BASE_URL}/cars/search/${regNum}`, {
            ...fetchOptions,
            params: { year, month },
        })
        return response.data
    },


}
