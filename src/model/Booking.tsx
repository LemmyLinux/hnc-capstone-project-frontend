import BookingStatus from "./BookingStatus";
import Lesson from "./Lesson";

type Booking = {
    id: number;
    date: Date;
    start: Date;
    end: Date;
    status: BookingStatus;
    lesson: Lesson;
}

export default Booking;