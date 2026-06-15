export const PAGES_URL = {
    MAIN: '/',
    CARS: '/cars',
    CAR_INFO_ROUTE: '/cars/:car_id',
    CAR_INFO: (car_id: string | number) => `${PAGES_URL.CARS}/${car_id}`,

};

