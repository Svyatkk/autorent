import DataFromFilterWrapper from "../components/DataFromFilterWrapper"
import CalendarGrid from "../components/CalendarGrid"
import { FilterBlock } from "../components/FilteBlock"

export default function CarsOverviewPage() {
    return (
        <DataFromFilterWrapper>
            <FilterBlock></FilterBlock>
            <CalendarGrid></CalendarGrid>
        </DataFromFilterWrapper>
    )
}