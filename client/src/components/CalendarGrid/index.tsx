import styles from './styles.module.css'
import { useCars } from '../../hooks/car/useCars'

export default function CalendarGrid() {
    const { cars, isError, isLoading } = useCars()

    if (isLoading) return <div className={styles.loading}>Завантаження машин...</div>
    if (isError) return <div className={styles.error}>Помилка завантаження даних</div>

    return (
        <div className={styles.calendar}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.headerColumn}>ID</th>
                        <th className={styles.headerColumn}>Бренд</th>
                        <th className={styles.headerColumn}>Модель</th>
                        <th className={styles.headerColumn}>Номер</th>
                    </tr>
                </thead>
                <tbody>
                    {cars?.map(car => {
                        const brandName = car?.car_brand?.slug || 'Невідомий бренд'
                        const modelName = car?.car_model?.slug || 'Невідома модель'

                        return (
                            <tr className={styles.row} key={car.car_id}>
                                <td className={styles.column}>{car.car_id}</td>

                                <td className={styles.column} style={{ textTransform: 'capitalize' }}>
                                    {brandName}
                                </td>

                                <td className={styles.column}>
                                    {modelName}
                                </td>

                                <td className={styles.column}>
                                    {car.registration_number || '—'}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}