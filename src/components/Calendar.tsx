import { useEffect, useState } from 'react';
import './Calendar.css';

const DAY_IN_MILLIS = 24 * 60 * 60 * 1000;
const WEEK_LENGTH = 7;

interface Day {
    date: Date;
    disabled?: boolean;
}

const monthNames = [
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
]

function getNextDate(date: Date) {
    return new Date(date.getTime() + DAY_IN_MILLIS);
}

function getPreviousDate(date: Date, numberOfDays: number) {
    return new Date(date.getTime() - (DAY_IN_MILLIS * numberOfDays));
}

function generateMonthDates(year: number, month: number) {
    const monthDates: Day[][] = [];
    let currentDay = new Date(year, month, 1);
    let previousDay;
    let week = 0;
    let dayCount = 1;

    // generate previous month days 
    monthDates.push([]);
    for(let i = currentDay.getDay() - 1; i >= 1; i--) {
        previousDay = getPreviousDate(currentDay, i);
        monthDates[week].push({ date: previousDay });
        dayCount++;
    }

    // generate month days
    while(currentDay.getMonth() === month){
        monthDates[week].push({ date: currentDay });
        currentDay = getNextDate(currentDay);
        dayCount++;
        if(dayCount % WEEK_LENGTH === 1){
            week++;
            monthDates.push([]);
        } 
    }

    // generate next month days
    if(monthDates[week].length) {
        for(let i = monthDates[week][monthDates[week].length - 1].date.getDay(); i <= WEEK_LENGTH - 1; i++) {
            monthDates[week].push({ date: currentDay, disabled: true });
            currentDay = getNextDate(currentDay);
        }
    } else {
        monthDates.splice(week, 1);
    }

    console.log(monthDates);

    return monthDates;
}


function Calendar() {
    const [dates, setDates] = useState<Day[][]>([]);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    function getPreviousMonth() { 
        let month = currentDate.getMonth() - 1;
        if(month < 0) month = 11;

        let year = currentDate.getFullYear();
        if(month === 11) year = year - 1;

        setCurrentDate(new Date(year, month, 1));
    }

    function getNextMonth() { 
        let month = currentDate.getMonth() + 1;
        if(month === 12) month = 0;

        let year = currentDate.getFullYear();
        if(month === 0) year = year + 1;

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
        <h2>{monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear()}</h2> 
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
                    function(row, index) { 
                        return <div key={index} className='week'>
                            { 
                                row && row.map(function(cell, columnIndex) {
                                    if(index === 0) return (
                                        <div key={index + '-' + columnIndex} className='first-week'>
                                            {cell.date.getDate()}
                                        </div>
                                    )
                                    return (
                                        <div key={index + '-' + columnIndex} className='day'>
                                            {cell.date.getDate()}
                                        </div>
                                    )
                                }
                                )
                            }
                        </div> 
                    }
                )
            }
    </section>
  );
}

export default Calendar;
