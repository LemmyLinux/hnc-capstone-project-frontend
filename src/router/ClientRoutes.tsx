import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../components/home/Home";

function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default ClientRoutes;