import { useParams } from "react-router-dom";
import { useGetCarById } from "../hooks/car/useGetCarById";

export default function CarPage() {
    const { car_id } = useParams<{ car_id: string }>();
    const { car, isLoading, isError } = useGetCarById(String(car_id));

    if (isLoading) return <div>Завантаження машини...</div>;
    if (isError || !car) return <div style={{ color: 'red' }}>Помилка завантаження або машину не знайдено</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Деталі автомобіля #{car.car_id}</h2>

            <div>
                {car.translation?.title && <h3>{car.translation.title}</h3>}
                <p><strong>Марка:</strong> {car.car_brand?.translation?.name || car.car_brand?.slug || '—'}</p>
                <p><strong>Модель:</strong> {car.car_model?.translation?.name || car.car_model?.slug || '—'}</p>
                <p><strong>Номер (Plate):</strong> {car.registration_number}</p>
                <p><strong>Рік:</strong> {car.attribute_year}</p>
                <p><strong>Колір:</strong> {car.translation?.attribute_color || '—'}</p>
                <p><strong>Колір салону:</strong> {car.translation?.attribute_interior_color || '—'}</p>
                <p><strong>Опис:</strong> {car.translation?.description || '—'}</p>
                <p><strong>Статус:</strong> {car.status}</p>

                <hr style={{ margin: '20px 0' }} />

                <h3>Бронювання цієї машини:</h3>

                {car.bookings && car.bookings.length > 0 ? (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {car.bookings.map(booking => (
                            <li
                                key={booking.booking_id}
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '5px'
                                }}
                            >
                                <div style={{ marginBottom: '5px' }}>
                                    <strong>Бронь #{booking.booking_id}</strong> (Статус: {booking.status})
                                </div>
                                <div>
                                    <strong>Початок:</strong> {booking.start_date ? new Date(booking.start_date).toLocaleDateString('uk-UA') : 'Не вказано'}
                                </div>
                                <div>
                                    <strong>Кінець:</strong> {booking.end_date ? new Date(booking.end_date).toLocaleDateString('uk-UA') : 'Не вказано'}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Для цієї машини ще немає бронювань.</p>
                )}
            </div>
        </div>
    );
}