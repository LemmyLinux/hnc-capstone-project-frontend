import React from 'react';
import Booking from '../../model/Booking';
import './BookingTag.css';
import { CANCELLED } from '../../model/BookingStatus';

interface BookingTagProps {
    booking: Booking;
    onClick: Function;
    disabled: boolean;
}


const BookingTag = ({booking, onClick, disabled}: BookingTagProps) => {
    let className = 'tag ';
    if(disabled && booking.status === CANCELLED){
        className += 'text-dark bg-light text-decoration-line-through';
    } else if (disabled) {
        className += 'text-dark bg-light';
    } else if (booking.status === CANCELLED) {
        className += 'bg-danger text-white text-decoration-line-through';
    } else {
        className += 'text-white bg-success';
    }

    return (
        <div key={booking.id} className={className} onClick={(event) => {event.stopPropagation(); onClick()}}>
            <span>{booking.lesson.subject}</span>
        </div>
    )
}

export default BookingTag;