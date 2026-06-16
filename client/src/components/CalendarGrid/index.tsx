import styles from './styles.module.css'
import { useCars } from '../../hooks/car/useCars'
import { icons } from '../../constants/ICONS'
import { useState } from 'react'

const DAY_ABBR = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate()
}



export default function CalendarGrid() {
    const { cars, isError, isLoading } = useCars()
    const [openedCar, setOpenedCar] = useState<number | null>(null)

    const year = 2023
    const month = 0
    const daysInMonth = getDaysInMonth(year, month)

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(year, month, i + 1)
        return { day: i + 1, dayOfWeek: date.getDay() }
    })

    const handleShowCarInfo = (carId: number) => {
        setOpenedCar(prev => (prev === carId ? null : carId))

    }

    if (isLoading) return <div className={styles.loading}>Завантаження машин...</div>
    if (isError) return <div className={styles.error}>Помилка завантаження даних</div>

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
                    {cars?.map((car, index) => {
                        const modelName = car?.car_model?.slug || 'Невідома модель'
                        const isOpen = openedCar === car.car_id

                        return (
                            <>
                                <tr
                                    key={car.car_id}
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

                                <tr
                                    key={`${car.car_id}-expanded`}
                                    className={`${styles.expandedRow} ${isOpen ? styles.expandedRowOpen : ''}`}
                                >
                                    <td
                                        colSpan={days.length + 1}
                                        className={styles.expandedTd}
                                    >
                                        <div className={`${styles.expandedContent} ${isOpen ? styles.expandedContentOpen : ''}`}>
                                            <p><strong>id</strong> {car.car_id}</p>
                                            <p><strong>Модель</strong> {modelName}</p>
                                            <p><strong>Номер</strong> {car.registration_number}</p>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}