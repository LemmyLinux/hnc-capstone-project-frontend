import React, { useEffect, useState } from 'react';
import { MONTH_NAMES } from '../../common/dates';
import Lesson from '../../model/Lesson';
import './SidePanel.css';
import { Calendar3WeekFill } from 'react-bootstrap-icons';
import WaitModal from '../waitModal/WaitModal';
import { apiFetch } from '../../common/fetch';
import { EMPTY_FILTER } from '../../common/constants';

interface SidePanelProps {
    lessonFilter: string;
    currentDate: Date;
    setLessonFilter: Function;
    setCurrentDate: Function;
}

const SidePanel = (props: SidePanelProps) => {
    const [lessons, setLessons] = useState<string[]>();
    const [year, setYear] = useState<number>(props.currentDate.getFullYear());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const minYear = new Date().getFullYear() - 50;
    const maxYear = new Date().getFullYear() + 50;

    const setMonth = (month: number) => {
        let year = props.currentDate.getFullYear();
        props.setCurrentDate(new Date(year, month, 1));
    }

    const updateYear = (year: number) => {
        setYear(year);
        let month = props.currentDate.getMonth();
        props.setCurrentDate(new Date(year, month, 1));
    }

    const updateLessons = async () => {
        setIsLoading(true);
        const lessons = await apiFetch('/lessons');
        setLessons(lessons);
        setIsLoading(false);
    }

    useEffect(() => {
        updateLessons();
    }, []);

    return (
        <>
        {isLoading && <WaitModal />}
        {!isLoading && 
        (
            <section className='side-panel bg-info text-white'>
                <div className='container  py-5 p-4'>
                    <h2 className='text-center'>Filtros</h2>
                    <div className='container my-5'>
                    <p className='text-start'>Filtrar por asignatura:</p>
                    <select className='form-select' aria-label='Default select example' onChange={(event) => {props.setLessonFilter(event.target.value)}}>
                        <option selected value={EMPTY_FILTER}>Asignatura</option>
                        {lessons && lessons.map((lesson: string) => <option value={lesson}>{lesson}</option> )}
                    </select>
                    </div>
                </div>  
                <div className='container grid'>
                    <div className='row text-center px-5'>
                        <div className='col py-4'>
                            <label htmlFor='customRange1'>Año: {props.currentDate.getFullYear()}</label>
                            <input type='range' className='custom-range' id='customRange1' min={minYear} max={maxYear} value={year} onChange={(event) => updateYear(parseInt(event.target.value))}/>
                        </div>
                    </div>
                    <div className='row text-center'>
                        <div className='col column-width' onClick={() => setMonth(0)}>
                            <Calendar3WeekFill size={30}/>
                            <p>{MONTH_NAMES[0]}</p>
                        </div>
                        <div className='col column-width' onClick={() => setMonth(1)}>
                            <Calendar3WeekFill size={30}/>
                            <p>{MONTH_NAMES[1]}</p>
                        </div>
                        <div className='col column-width' onClick={() => setMonth(2)}>
                            <Calendar3WeekFill size={30}/>
                            <p>{MONTH_NAMES[2]}</p>
                        </div>
                    </div>
                    <div className='row text-center'>
                        <div className='col column-width' onClick={() => setMonth(3)}>
                            <Calendar3WeekFill size={30}/>
                            <p>{MONTH_NAMES[3]}</p>
                        </div>
                        <div className='col column-width' onClick={() => setMonth(4)}>
                            <Calendar3WeekFill size={30}/>
                            <p>{MONTH_NAMES[4]}</p>
                        </div>
                        <div className='col column-width' onClick={() => setMonth(5)}>
                            <Calendar3WeekFill size={30}/>
                            <p>{MONTH_NAMES[5]}</p>
                        </div>
                    </div>
                    <div className='row text-center'>
                        <div className='col column-width' onClick={() => setMonth(6)}>
                            <Calendar3WeekFill size={30}/>
                            <p>{MONTH_NAMES[6]}</p>
                        </div>
                        <div className='col column-width' onClick={() => setMonth(7)}>
                            <Calendar3WeekFill size={30}/>
                            <p>{MONTH_NAMES[7]}</p>
                        </div>
                        <div className='col column-width' onClick={() => setMonth(8)}>
                            <Calendar3WeekFill size={30}/>
                            <p>{MONTH_NAMES[8]}</p>
                        </div>
                    </div>
                    <div className='row text-center'>
                        <div className='col column-width' onClick={() => setMonth(9)}>
                            <Calendar3WeekFill size={30}/>
                            <p>{MONTH_NAMES[9]}</p>
                        </div>
                        <div className='col column-width' onClick={() => setMonth(10)}>
                            <Calendar3WeekFill size={30}/>
                            <p>{MONTH_NAMES[10]}</p>
                        </div>
                        <div className='col column-width' onClick={() => setMonth(11)}>
                            <Calendar3WeekFill size={30}/>
                            <p>{MONTH_NAMES[11]}</p>
                        </div>
                    </div>
                </div>
            </section>
        )}
        </>
    );
}

export default SidePanel;