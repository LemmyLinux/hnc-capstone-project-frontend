import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../components/home/Home";
import BookingForm from "../components/bookingForm/BookingForm";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<BookingForm />} />
    </Routes>
  )
}

export default ClientRoutes;