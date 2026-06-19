import React from 'react';
import { useFilterState } from '../DataFromFilterWrapper';
import styles from './styles.module.css';
import { EMPTY_FILTER_VALUE, FILTER_TEXT, MONTHS, YEARS } from '../../constants/CALENDAR';

export const FilterBlock: React.FC = () => {
    const { carRegNum, setcarRegNum, year, setYear, month, setMonth, setSearchButtonClick } = useFilterState();

    return (
        <div className={styles.filterBlock}>
            <div className={styles.filterField}>
                <label>{FILTER_TEXT.year}</label>
                <select value={year} onChange={(event) => setYear(Number(event.target.value))}>
                    {YEARS.map((yearItem) => (
                        <option key={yearItem} value={yearItem}>
                            {yearItem}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.filterField}>
                <label>{FILTER_TEXT.month}</label>
                <select value={month} onChange={(event) => setMonth(Number(event.target.value))}>
                    {MONTHS.map((monthItem) => (
                        <option key={monthItem.value} value={monthItem.value}>
                            {monthItem.label}
                        </option>
                    ))}
                </select>
            </div>

            <label className={styles.searchField}>
                <span>{FILTER_TEXT.carNumber}</span>
                <input
                    value={carRegNum || EMPTY_FILTER_VALUE}
                    onChange={(event) => setcarRegNum(event.target.value)}
                    type="text"
                    placeholder={FILTER_TEXT.carNumberPlaceholder}
                />
                <button onClick={() => setSearchButtonClick(true)}>{FILTER_TEXT.search}</button>
            </label>
        </div>
    );
};
