import axios from 'axios'
import { BASE_URL } from './config'
import type { ICar } from '../types/car.interface'
import { fetchOptions } from './config'

export const carService = {
    async getAll(): Promise<ICar[]> {
        const response = await axios.get<ICar[]>(`${BASE_URL}/cars`)
        return response.data
    },

    async getById(id: string) {
        const response = await axios.get<ICar>(`${BASE_URL}/cars/${id}`, fetchOptions)
        return response.data
    },

    async getByRegNum(regNum: string) {
        const response = await axios.get<ICar>(`${BASE_URL}/cars/search/${regNum}`, fetchOptions)
        return response.data
    },


}
