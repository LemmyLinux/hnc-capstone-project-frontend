export const MONTH_NAMES = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];

export const WEEKDAY_NAMES = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
];

const DAY_IN_MILLIS = 24 * 60 * 60 * 1000;
export const WEEK_LENGTH = 7;

export function getNextDate(date: Date) {
    return new Date(date.getTime() + DAY_IN_MILLIS);
}

export function getPreviousDate(date: Date, numberOfDays: number) {
    return new Date(date.getTime() - (DAY_IN_MILLIS * numberOfDays));
}

export function getFormatedDate(date: Date) {
    return WEEKDAY_NAMES[date.getDay()] + ', ' + date.getDate() + ' de ' + MONTH_NAMES[date.getMonth()] + ' de ' + date.getFullYear();
}

export function getFormmatedTime(date: Date) {
    return date.toTimeString().substring(0, 8);
}

export function areEqual(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate();
}