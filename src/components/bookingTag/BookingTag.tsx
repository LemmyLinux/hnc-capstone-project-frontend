import React from "react";
import Booking from "../../model/Booking";
import "./BookingTag.css";
import { getFormmatedTime } from "../../common/dates";

interface BookingTagProps {
    booking: Booking;
    onClick: Function;
}

function getBookingInfo(booking: Booking){
    return getFormmatedTime(new Date(booking.start)) + " - " + getFormmatedTime(new Date(booking.end));
}

function BookingTag({booking, onClick}: BookingTagProps) {

    return (
        <div key={booking.id} className="tag" onClick={function(event) {event.stopPropagation(); onClick()}}>
            <span>{getBookingInfo(booking)}</span>
        </div>
    )
}

export default BookingTag;