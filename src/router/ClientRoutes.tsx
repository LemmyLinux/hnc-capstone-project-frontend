import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../components/home/Home";
import BookingForm from "../components/BookingForm";
import Start from "../components/Start";


export const LOGIN_ROUTE = '/';
export const HOME_ROUTE = '/home';
export const BOOKING_ROUTE = '/booking';

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path={LOGIN_ROUTE} element={<Start />} />
      <Route path={HOME_ROUTE} element={<Home />} />
      <Route path={BOOKING_ROUTE} element={<BookingForm />} />
    </Routes>
  )
}

export default ClientRoutes;