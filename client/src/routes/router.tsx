import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import HomePage from '../pages/HomePage'
import CarsPage from '../pages/CarsPage'
import { PAGES_URL } from '../constants/PAGES_URL'
import CarPage from '../pages/CarPage'
import CarsOverviewPage from '../pages/CarsOverviewPage'
export const router = createBrowserRouter([
    {
        path: PAGES_URL.MAIN,
        element: <App />,
        children: [
            {
                index: true,
                element: <CarsOverviewPage />,
            },
            {
                path: PAGES_URL.CARS,
                element: <CarsPage />,
            },
            {
                path: PAGES_URL.CAR_INFO_ROUTE,
                element: <CarPage></CarPage>
            }
        ]
    }
])