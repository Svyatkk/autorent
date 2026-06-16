'use client'

import React from 'react';
import { useFilterState } from '../DataFromFilterWrapper';
import styles from './styles.module.css'; //

export const FilterBlock: React.FC = () => {
    const { filters, setFilterValue } = useFilterState();

    return (
        <div className={styles.filterBlock}>
            <div className={styles.filterField}>
                <label>Бренд:</label>
                <select
                    value={filters.brandId}
                    onChange={(e) => setFilterValue('brandId', e.target.value)}
                >
                    <option value="">Усі бренди</option>
                    <option value="1">Audi</option>
                    <option value="2">BMW</option>
                </select>
            </div>

            <div className={styles.filterField}>
                <label>Статус:</label>
                <select
                    value={filters.status}
                    onChange={(e) => setFilterValue('status', e.target.value)}
                >
                    <option value="">Усі</option>
                    <option value="1">Активні</option>
                    <option value="0">Зайняті</option>
                </select>
            </div>
        </div>
    );
};