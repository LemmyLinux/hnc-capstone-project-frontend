import { useEffect, useState } from 'react';
import './Calendar.css';
import { MONTH_NAMES, WEEKDAY_NAMES, WEEK_LENGTH, areEqual, getNextDate, getPreviousDate } from '../../common/dates';
import { apiFetch } from '../../common/fetch';
import Booking from '../../model/Booking';
import BookingTag from '../bookingTag/BookingTag';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftSquareFill, ArrowRightSquareFill } from 'react-bootstrap-icons';
import WaitModal from '../waitModal/WaitModal';

interface CalendarProps {
    currentDate: Date;
    lessonFilter: string;
    setCurrentDate: Function;
}

interface Day {
    date: Date;
    disabled: boolean;
}

const generateMonthDates = (year: number, month: number) => {
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

const Calendar = (props: CalendarProps) => {
    const navigate = useNavigate();
    const [dates, setDates] = useState<Day[][]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [bookings, setBookings] = useState<Booking[]>([]);

    const getPreviousMonth = () => {
        let month = props.currentDate.getMonth() - 1;
        if (month < 0) month = 11;

        let year = props.currentDate.getFullYear();
        if (month === 11) year = year - 1;

        props.setCurrentDate(new Date(year, month, 1));
    }

    const getNextMonth = () => {
        let month = props.currentDate.getMonth() + 1;
        if (month === 12) month = 0;
        
        let year = props.currentDate.getFullYear();
        if (month === 0) year = year + 1;

        props.setCurrentDate(new Date(year, month, 1));
    }

    const placeBookings = (date: Date, disabled: boolean) => {
        return bookings
        .filter((booking) => {return areEqual(new Date(booking.start), date)})
        .filter((booking) => {return !props.lessonFilter || props.lessonFilter === booking.lesson.subject})
        .map((booking) => { 
            return <BookingTag booking={booking as Booking} disabled={disabled} onClick={() => {
            navigate('/booking', {state: {'booking': booking, 'date': date, disabled: disabled}});
        }}/>})
    }

    const updateCalendar = async() => {
        setIsLoading(true);
        const dates = generateMonthDates(props.currentDate.getFullYear(), props.currentDate.getMonth());
        const bookings = await apiFetch('/bookings');
        setDates(dates);
        setBookings(bookings);
        setIsLoading(false);
    }

    useEffect(() =>  {
        updateCalendar();
    }, []);

    useEffect(() => {
        updateCalendar();
    }, [props.currentDate]);

    return (
        <>
            {isLoading && <WaitModal />}
            {!isLoading &&
                (
                    <section className='calendar bg-light'>
                        <div className='header'>
                            <span onClick={getPreviousMonth}><ArrowLeftSquareFill className='text-info' /></span>
                            <h2 style={{ minWidth: '43.5%' }}>{MONTH_NAMES[props.currentDate.getMonth()] + ' ' + props.currentDate.getFullYear()}</h2>
                            <span onClick={getNextMonth}><ArrowRightSquareFill className='text-info' /></span>
                        </div>
                        <div className='week'>
                            {WEEKDAY_NAMES.map((dayName: string) => {
                                return (<div className='header'>{dayName}</div>);
                            })}
                        </div>
                        {
                            dates && dates.map(
                                (row, rowIndex) => {
                                    return <div key={rowIndex} className='week'>
                                        {
                                            row && row.map((cell, columnIndex) => {
                                                let classes = 'day';
                                                if (cell.disabled) classes += ' bg-secondary';
                                                return (
                                                    <div key={rowIndex + '-' + columnIndex} className={classes} onClick={
                                                        () => { 
                                                            if(!cell.disabled){
                                                                navigate('/booking', {state: {'date': cell.date, 'booking': false}});
                                                            }
                                                        }
                                                    }>
                                                        <span className='day-label bg-info'>{cell.date.getDate()}</span>
                                                        {bookings && placeBookings(cell.date, cell.disabled)}
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
                )
            }
        </>
    );
}

export default Calendar;
