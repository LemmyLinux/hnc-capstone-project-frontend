import React, { useState } from 'react';
import Calendar from '../calendar/Calendar';
import SidePanel from '../sidePanel/SidePanel';
import './Home.css';

function Home() {

    return (
        <div className='home'>
            <Calendar />
            <SidePanel />
        </div>
    );
}

export default Home;