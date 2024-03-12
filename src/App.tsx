import { useEffect, useState } from 'react';
import './App.css';
import Calendar from './components/calendar/Calendar';
import SidePanel from './components/sidePanel/SidePanel';

function App() {

  return (
    <section className="app">
        <Calendar />
        <SidePanel />
    </section>
  );
}

export default App;
