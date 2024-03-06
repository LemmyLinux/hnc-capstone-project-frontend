import { useEffect, useState } from 'react';
import './Calendar.css';
import { MONTH_NAMES, WEEK_LENGTH, getNextDate, getPreviousDate } from '../../common/dates';
import BookingForm from '../bookingForm/BookingForm';

interface Day {
    date: Date;
    disabled?: boolean;
}

function generateMonthDates(year: number, month: number) {
    const monthDates: Day[][] = [];
    const lastDisabledDay = getPreviousDate(new Date(), 1);
    let currentDay = new Date(year, month, 1);
    let previousDay;
    let week = 0;
    let dayCount = 1;

    // generate previous month days 
    monthDates.push([]);
    for (let i = currentDay.getDay() - 1; i >= 1; i--) {
        previousDay = getPreviousDate(currentDay, i);
        monthDates[week].push({ date: previousDay, disabled: true });
        dayCount++;
    }

    // generate month days
    while (currentDay.getMonth() === month) {
        monthDates[week].push({ date: currentDay, disabled: currentDay < lastDisabledDay });
        currentDay = getNextDate(currentDay);
        dayCount++;
        if (dayCount % WEEK_LENGTH === 1) {
            week++;
            monthDates.push([]);
        }
    }

    // generate next month days
    if (!monthDates[week].length) monthDates.splice(week, 1);
    else {
        for (let i = currentDay.getDay(); monthDates[week].length < WEEK_LENGTH; i++) {
            monthDates[week].push({ date: currentDay, disabled: true });
            currentDay = getNextDate(currentDay);
        }
    }

    return monthDates;
}


function Calendar() {
    const [dates, setDates] = useState<Day[][]>([]);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [show, setShow] = useState(false);
    const toggleShow = function(){setShow(!show)};
    function getPreviousMonth() {
        let month = currentDate.getMonth() - 1;
        if (month < 0) month = 11;

        let year = currentDate.getFullYear();
        if (month === 11) year = year - 1;

        setCurrentDate(new Date(year, month, 1));
    }

    function getNextMonth() {
        let month = currentDate.getMonth() + 1;
        if (month === 12) month = 0;

        let year = currentDate.getFullYear();
        if (month === 0) year = year + 1;

        setCurrentDate(new Date(year, month, 1));
    }

    useEffect(() => {
        const dates = generateMonthDates(currentDate.getFullYear(), currentDate.getMonth());
        setDates(dates);
    }, [currentDate]);

    return (
        <section className="calendar">
            <div className='header'>
                <button onClick={getPreviousMonth}>PREV</button>
                <h2 style={{ minWidth: '43.5%' }}>{MONTH_NAMES[currentDate.getMonth()] + ' ' + currentDate.getFullYear()}</h2>
                <button onClick={getNextMonth}>NEXT</button>
            </div>
            <div className='week'>
                <div className='header'>Lunes</div>
                <div className='header'>Martes</div>
                <div className='header'>Mi&eacute;rcoles</div>
                <div className='header'>Jueves</div>
                <div className='header'>Viernes</div>
                <div className='header'>S&aacute;bado</div>
                <div className='header'>Domingo</div>
            </div>
            <div className='week'>
            </div>
            {
                dates && dates.map(
                    function (row, rowIndex) {
                        return <div key={rowIndex} className='week'>
                            {
                                row && row.map(function (cell, columnIndex) {
                                    let classes = 'day';
                                    if (rowIndex === 0) classes += ' first-week';
                                    if (cell.disabled) classes += ' disabled';
                                    return (
                                        <div key={rowIndex + '-' + columnIndex} className={classes} onClick={
                                            function () { 
                                                if(!cell.disabled){
                                                    setSelectedDate(cell.date);
                                                    setShow(true);
                                                }
                                            }
                                        }>
                                            <span className='day-label'>{cell.date.getDate()}</span>
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
                    }
                )
            }
            <BookingForm date={selectedDate} show={show} toggleShow={toggleShow} />
        </section>
    );
}

export default Calendar;