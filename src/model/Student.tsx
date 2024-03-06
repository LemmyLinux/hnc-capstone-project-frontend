import Booking from "./Booking";

type Student = {
    id: number;
    mail: string;
    name: string;
    lastName: string;
    phone: string;
    bookings: Booking[];
}

export default Student;