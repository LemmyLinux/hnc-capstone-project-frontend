import React, { useState } from "react";
import Booking from "../../model/Booking";
import "./BookingTag.css";
import { getFormmatedTime } from "../../common/dates";

interface BookingTagProps {
    booking: Booking;
    showForm?: Function;
}

function getBookingInfo(booking: Booking){
    return getFormmatedTime(new Date(booking.start)) + " - " + getFormmatedTime(new Date(booking.end));
}

function BookingTag({booking, showForm}: BookingTagProps) {

    return (
        // <div key={booking.id} className="tag" onClick={function(){showForm()}}>
            <div key={booking.id} className="tag">
            <span>{getBookingInfo(booking)}</span>
        </div>
    )
}

export default BookingTag;