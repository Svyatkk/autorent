'use client'

import React, { createContext, useContext, useState, useMemo } from "react"
import { useCars } from "../../hooks/car/useCars"
import styles from './styles.module.css'
import type { ICar } from "../../types/car.interface"

export type CarFiltersType = {

    carRegNum: string | undefined,
    setcarRegNum: (name: string) => void,


    searchButtonClick: boolean | false,
    setSearchButtonClick: (clicked: boolean) => void,

}

const FilterContext = createContext<CarFiltersType | undefined>(undefined);

type Props = {
    children: React.ReactNode
}

export default function DataFromFilterWrapper({ children }: Props) {

    const [carRegNum, setcarRegNum] = useState<string | undefined>(undefined)
    const [searchButtonClick, setSearchButtonClick] = useState<boolean | false>(false)

    return (
        <FilterContext.Provider value={{ carRegNum, setcarRegNum, searchButtonClick, setSearchButtonClick }}>
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