'use client'

import React, { useState, useEffect } from 'react'
import { useCars } from '../../hooks/car/useCars'
import { icons } from '../../constants/ICONS'
import { useGetCarByRegNum } from '../../hooks/car/useGetCarByRegNum'
import { useFilterState } from '../DataFromFilterWrapper'
import SkeletonPending from '../SkeletonPending'
import styles from './styles.module.css'

const DAY_ABBR = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate()
}

export default function CalendarGrid() {
    const { cars, isError, isLoading } = useCars()
    const [openedCar, setOpenedCar] = useState<number | null>(null)

    const { carRegNum, searchButtonClick, setSearchButtonClick } = useFilterState()

    const [activeRegNum, setActiveRegNum] = useState<string>('')

    useEffect(() => {
        if (searchButtonClick) {
            setActiveRegNum(carRegNum || '')
            setSearchButtonClick(false)
        }
    }, [searchButtonClick, carRegNum, setSearchButtonClick])

    const { carWithRegNum, carWithRegNumIsLoading, carWithRegNumisError } = useGetCarByRegNum(activeRegNum)

    const year = 2023
    const month = 0
    const daysInMonth = getDaysInMonth(year, month)

    const displayCars = activeRegNum ? (carWithRegNum ? [carWithRegNum] : []) : cars

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(year, month, i + 1)
        return { day: i + 1, dayOfWeek: date.getDay() }
    })

    const handleShowCarInfo = (carId: number) => {
        setOpenedCar(prev => (prev === carId ? null : carId))
    }

    if (isLoading) {
        return <div className={styles.loading}>Завантаження машин...</div>
    }

    if (isError) {
        return <div className={styles.error}>Помилка завантаження даних</div>
    }


    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={`${styles.th} ${styles.stickyTh}`} />

                        {days.map(({ day, dayOfWeek }) => (
                            <th key={day} className={styles.th}>
                                <span className={styles.dayAbbr}>{DAY_ABBR[dayOfWeek]}</span>
                                <span className={styles.dayNum}>{day}</span>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {carWithRegNumIsLoading ? (
                        <SkeletonPending rows={5} columns={daysInMonth} />
                    ) : displayCars && displayCars.length > 0 ? (
                        displayCars.map((car, index) => {
                            const modelName = car?.car_model?.slug || 'Невідома модель'
                            const isOpen = openedCar === car.car_id

                            return (
                                <React.Fragment key={car.car_id}>
                                    <tr
                                        className={`${styles.row} ${index % 2 === 0 ? styles.gray : ''}`}
                                        onClick={() => handleShowCarInfo(car.car_id)}
                                    >
                                        <td className={`${styles.td} ${styles.stickyTd} ${index % 2 === 0 ? styles.stickyGray : ''}`}>
                                            <div className={styles.carInfo}>
                                                <icons.chevronDown
                                                    className={`${styles.chevron} ${isOpen ? styles.active : ''}`}
                                                />
                                                <span className={styles.dot} />
                                                <span className={styles.columnModel}>{modelName}</span>
                                                <span className={styles.regNum}>
                                                    {car.registration_number || '—'}
                                                </span>
                                            </div>
                                        </td>
                                        {days.map(({ day }) => (
                                            <td key={day} className={styles.td} />
                                        ))}
                                    </tr>
                                </React.Fragment>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={daysInMonth + 1} className={styles.noData}>
                                Машин за таким номером не знайдено
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}