'use client'

import React, { createContext, useContext, useState, useMemo } from "react"
import { useCars } from "../../hooks/car/useCars"
import styles from './styles.module.css'
import type { ICar } from "../../types/car.interface"
export type CarFiltersType = {
    brandId: string;
    modelId: string;
    status: string;
}

type FilterContextType = {
    filters: CarFiltersType;
    setFilterValue: (key: keyof CarFiltersType, value: string) => void;
    filteredCars: ICar[];
    isLoading: boolean;
    error: any;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

type Props = {
    children: React.ReactNode
}

export default function DataFromFilterWrapper({ children }: Props) {

    const [filters, setFilters] = useState<CarFiltersType>({
        brandId: '',
        modelId: '',
        status: '',
    });

    const { data: cars, isLoading, error } = useCars();

    const setFilterValue = (key: keyof CarFiltersType, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const filteredCars = useMemo(() => {
        if (!cars) return [];

        return cars.filter((car) => {
            const matchBrand = filters.brandId ? car.car_brand_id === Number(filters.brandId) : true;
            const matchModel = filters.modelId ? car.car_model_id === Number(filters.modelId) : true;
            const matchStatus = filters.status ? car.status === Number(filters.status) : true;

            return matchBrand && matchModel && matchStatus;
        });
    }, [cars, filters]);

    return (
        <FilterContext.Provider value={{ filters, setFilterValue, filteredCars, isLoading, error }}>
            <div className={styles.wrapper}>
                {children}
            </div>
        </FilterContext.Provider>
    )
}



export const useFilterState = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilterState must be used within DataFromFilterWrapper");
    }
    return context;
}