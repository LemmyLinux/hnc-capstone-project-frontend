import React, { useState } from 'react';
import Calendar from '../calendar/Calendar';
import SidePanel from '../sidePanel/SidePanel';
import './Home.css';
import { EMPTY_FILTER } from '../../common/constants';

const Home = () => {
    const [lessonFilter, setLessonFilter] = useState<string>(EMPTY_FILTER);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    return (
        <div className='home'>
            <Calendar currentDate={currentDate} lessonFilter={lessonFilter} setCurrentDate={setCurrentDate} />
            <SidePanel lessonFilter={lessonFilter} setLessonFilter={setLessonFilter} currentDate={currentDate} setCurrentDate={setCurrentDate}/>
        </div>
    );
}

export default Home;