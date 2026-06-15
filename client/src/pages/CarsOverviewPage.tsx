
import CalendarGrid from "../components/CalendarGrid"
import DataFromFilterWrapper from "../components/DataFromFilterWrapper"


export default function CarsOverviewPage() {
    return (

        <DataFromFilterWrapper>
            <CalendarGrid></CalendarGrid>

        </DataFromFilterWrapper>
    )
}