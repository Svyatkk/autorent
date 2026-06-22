
import DataFromFilterWrapper from "../components/DataFromFilterWrapper"
import CalendarGrid from "../components/CalendarGrid"
import { FilterBlock } from "../components/FilteBlock"
import BlockChangeLang from "../components/BlockChangeLang"
export default function CarsOverviewPage() {
    return (

        <DataFromFilterWrapper>
            <FilterBlock></FilterBlock>
            <CalendarGrid></CalendarGrid>
            <BlockChangeLang></BlockChangeLang>
        </DataFromFilterWrapper>
    )
}