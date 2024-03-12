import React, { useState } from 'react';
import { getFormatedDate } from '../../common/dates';
import './BookingForm.css';
import Booking from '../../model/Booking';

interface BookingFormProps {
    date: Date;
    show: boolean;
    toggleShow: Function;
    bookingProp?: Booking;
}

function BookingForm({ date, show, toggleShow, bookingProp }: BookingFormProps) {
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [lessonSubject, setLessonSubject] = useState<string>('');
    const [lessonComment1, setLessonComment1] = useState<string>('');
    const [lessonComment2, setLessonComment2] = useState<string>('');
    const [lessonComment3, setLessonComment3] = useState<string>('');

    return (
        <section className='modal' hidden={!show}>
            <section className='modal-main'>
                <button className='close-button' onClick={function(){toggleShow()}}>X</button>
                <h2>Nueva reserva</h2>
                <span>{getFormatedDate(date)}</span>
                <form className='modal-form'>
                    <label htmlFor='start' className='label'>Hora inicio</label>
                    <input id='start' type='time' value={start} onChange={function(event){setStart(event.target.value)}}/>
                    <label htmlFor='end'>Hora fin</label>
                    <input id='end' type='time' value={end} onChange={function(event){setEnd(event.target.value)}}/>
                    <label htmlFor='subject'>Asignatura</label>
                    <input id='subject' type='string' value={lessonSubject} onChange={function(event){setLessonSubject(event.target.value)}}/>
                    
                    <label htmlFor={'comment1'}>Comentario 1</label>
                    <input id={'comment1'} type='string' value={lessonComment1} onChange={function(event){setLessonComment1(event.target.value)}}/>
                    <label htmlFor={'comment2'}>Comentario 2</label>
                    <input id={'comment2'} type='string' value={lessonComment2} onChange={function(event){setLessonComment2(event.target.value)}}/>
                    <label htmlFor={'comment3'}>Comentario 3</label>
                    <input id={'comment3'} type='string' value={lessonComment3} onChange={function(event){setLessonComment3(event.target.value)}}/>

                    <div className='field-container'>
                        <span className='column'><button style={{width: '100%', height: '100%'}} onClick={function(){toggleShow()}}>Aceptar</button></span>
                        <span className='column'><button style={{width: '100%', height: '100%'}} onClick={function(){toggleShow()}}>Cancelar</button></span>
                    </div>
                </form>
            </section>
        </section>
    );
}

export default BookingForm;