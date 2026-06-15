import { useNavigate } from 'react-router-dom'
import { useCars } from '../hooks/car/useCars'
import { PAGES_URL } from '../constants/PAGES_URL'

export default function CarsPage() {
    const { cars, isLoading, isError } = useCars()
    const navigate = useNavigate()
    if (isLoading) return <div>Завантаження...</div>
    if (isError) return <div style={{ color: 'red' }}>Помилка завантаження</div>

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Список автомобілів</h1>
            <table border={1} cellPadding={8}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Назва</th>
                        <th>Номер</th>
                    </tr>
                </thead>
                <tbody>
                    {cars?.map(car => (
                        <tr onClick={() => navigate(PAGES_URL.CAR_INFO(car.car_id))} key={car.car_id}>
                            <td>{car.car_id}</td>
                            <td>{car.car_model_id}</td>
                            <td>{car.registration_number}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
