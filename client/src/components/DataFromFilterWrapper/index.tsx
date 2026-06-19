'use client'

import React, { createContext, useContext, useState } from "react"
import styles from './styles.module.css'
import { DEFAULT_CALENDAR_MONTH, DEFAULT_CALENDAR_YEAR } from "../../constants/CALENDAR"

export type CarFiltersType = {

    carRegNum: string | undefined,
    setcarRegNum: (name: string) => void,

    year: number,
    setYear: (year: number) => void,

    month: number,
    setMonth: (month: number) => void,

    searchButtonClick: boolean | false,
    setSearchButtonClick: (clicked: boolean) => void,

}

const FilterContext = createContext<CarFiltersType | undefined>(undefined);

type Props = {
    children: React.ReactNode
}

export default function DataFromFilterWrapper({ children }: Props) {

    const [carRegNum, setcarRegNum] = useState<string | undefined>(undefined)
    const [year, setYear] = useState<number>(DEFAULT_CALENDAR_YEAR)
    const [month, setMonth] = useState<number>(DEFAULT_CALENDAR_MONTH)
    const [searchButtonClick, setSearchButtonClick] = useState<boolean | false>(false)

    return (
        <FilterContext.Provider value={{ carRegNum, setcarRegNum, year, setYear, month, setMonth, searchButtonClick, setSearchButtonClick }}>
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
