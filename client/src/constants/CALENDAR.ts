export const DAY_ABBR = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export const MONTH_NAMES = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
]

export const YEARS = [2023, 2024, 2025, 2026]

export const DEFAULT_CALENDAR_YEAR = 2023
export const DEFAULT_CALENDAR_MONTH = 1
export const MONTH_INDEX_OFFSET = 1
export const MONTHS = MONTH_NAMES.map((label, index) => ({
    value: index + MONTH_INDEX_OFFSET,
    label,
}))
export const LAST_DAY_OF_PREVIOUS_MONTH = 0
export const EMPTY_COUNT = 0
export const STICKY_COLUMN_COUNT = 1
export const ACTIVE_BOOKING_STATUS = 1
export const EVEN_ROW_DIVISOR = 2
export const EVEN_ROW_REMAINDER = 0
export const CALENDAR_CELL_WIDTH = 36
export const MIN_BOOKING_BAR_WIDTH = 4
export const HOUR_MS = 1000 * 60 * 60
export const DAY_MS = HOUR_MS * 24
export const DATE_TIME_PATTERN = /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2}))?)?/
export const DEFAULT_TIME_PART = '0'
export const EMPTY_FILTER_VALUE = ''
export const BOOKING_BUSY_LABEL = 'Rented'
export const SKELETON_ROWS = 5

export const CALENDAR_TEXT = {
    loading: 'Завантаження машин...',
    error: 'Помилка завантаження даних',
    unknownModel: 'Невідома модель',
    noCarByRegNumber: 'Машину за таким номером не знайдено',
    noPeriodData: 'Даних для вибраного періоду немає',
    emptyValue: '—',
}

export const FILTER_TEXT = {
    year: 'Рік',
    month: 'Місяць',
    carNumber: 'Номер авто',
    carNumberPlaceholder: 'Наприклад R63978',
    search: 'Знайти',
}
