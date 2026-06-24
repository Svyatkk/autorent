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
            {carWithRegNum.translation?.title && <h3>{carWithRegNum.translation.title}</h3>}
            <p><strong>Марка:</strong> {carWithRegNum.car_brand?.translation?.name || carWithRegNum.car_brand?.slug || '—'}</p>
            <p><strong>Модель:</strong> {carWithRegNum.car_model?.translation?.name || carWithRegNum.car_model?.slug || '—'}</p>
            <p><strong>Номер:</strong> {carWithRegNum.registration_number}</p>
            <p><strong>Рік:</strong> {carWithRegNum.attribute_year}</p>
            <p><strong>Колір:</strong> {carWithRegNum.translation?.attribute_color || '—'}</p>
            <p><strong>Колір салону:</strong> {carWithRegNum.translation?.attribute_interior_color || '—'}</p>
            <p><strong>Опис:</strong> {carWithRegNum.translation?.description || '—'}</p>
            <p><strong>Статус:</strong> {carWithRegNum.status}</p>
        </div>
    );
}
