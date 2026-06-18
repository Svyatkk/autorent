import React from 'react';
import { useFilterState } from '../DataFromFilterWrapper';
import styles from './styles.module.css';

export const FilterBlock: React.FC = () => {
    const { carRegNum, setcarRegNum, setSearchButtonClick } = useFilterState();

    return (
        <div className={styles.filterBlock}>
            <div className={styles.filterField}>
                <label>Статус:</label>
                <select>
                    <option value="">Усі</option>
                    <option value="1">Активні</option>
                    <option value="0">Зайняті</option>
                </select>
            </div>

            <label htmlFor="">
                <input onChange={(e) => setcarRegNum(e.target.value)} type="text" name="" id="" />
                <button onClick={() => setSearchButtonClick(true)}>Знайти</button>
            </label>
        </div>
    );
};