import React from 'react';
import ClientRoutes from './router/ClientRoutes';
import { BrowserRouter, Router, Routes } from 'react-router-dom';

const App = () => {

  return (
    <section>
      <BrowserRouter>
          <ClientRoutes />
       </BrowserRouter>
    </section>
  );
}

export default App;
