import { useParams } from 'react-router-dom';
import { useGetCarByRegNum } from '../hooks/car/useGetCarByRegNum';

export default function CarSearchPage() {
    const { regnum } = useParams<{ regnum: string }>();
    const { carWithRegNum, carWithRegNumIsLoading, carWithRegNumisError } = useGetCarByRegNum(regnum ?? '');

    if (carWithRegNumIsLoading) return <div>Завантаження...</div>;
    if (carWithRegNumisError || !carWithRegNum) return <div style={{ color: 'red' }}>Машину не знайдено</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Деталі автомобіля #{carWithRegNum.car_id}</h2>
            <p><strong>Номер:</strong> {carWithRegNum.registration_number}</p>
            <p><strong>Рік:</strong> {carWithRegNum.attribute_year}</p>
            <p><strong>Статус:</strong> {carWithRegNum.status}</p>
        </div>
    );
}
