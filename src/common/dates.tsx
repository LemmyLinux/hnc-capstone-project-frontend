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

/**
 * Calcula el día siguiente a la fecha proporcionada por parámetro.
 * @param date fecha de la que se quiere averiguar la fecha siguiente.
 * @returns fecha siguiente a la proporcionada.
 */
export const getNextDate = (date: Date) => {
    return new Date(date.getTime() + DAY_IN_MILLIS);
}

/**
 * Calcula el día anterior a la fecha proporcionada por parámetro.
 * @param date fecha de la que se quiere averiguar la fecha anterior.
 * @returns fecha anterior a la proporcionada.
 */
export const getPreviousDate = (date: Date, numberOfDays: number) => {
    return new Date(date.getTime() - (DAY_IN_MILLIS * numberOfDays));
}

/**
 * Crea un string de la fecha con formato [NOMBRE_DIA], [DIA_MES] de [MES] de [AÑO]
 * @param date fecha a formatear
 * @returns string formateado
 */
export const getFormatedDate = (date: Date) => {
    return WEEKDAY_NAMES[date.getDay()] + ', ' + date.getDate() + ' de ' + MONTH_NAMES[date.getMonth()] + ' de ' + date.getFullYear();
}

/**
 * Crea un string de la fecha con formato hh:mm:ss
 * @param date fecha a formatear
 * @returns string formateado
 */
export const getFormmatedTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

/**
 * Comprueba si dos fechas coinciden.
 * @param date1 fecha a comparar.
 * @param date2 fecha a comparar.
 * @returns true en el caso de que ambas fechas sean el mismo día, mes y año y false en caso contrario.
 */
export const areEqual = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate();
}