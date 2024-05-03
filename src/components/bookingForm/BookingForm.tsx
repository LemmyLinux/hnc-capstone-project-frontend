import React, { FormEvent, useEffect, useState } from 'react';
import { getFormatedDate, getFormmatedTime } from '../../common/dates';
import './BookingForm.css';
import BookingStatus from '../../model/BookingStatus';
import { apiFetch } from '../../common/fetch';
import { useLocation, useNavigate } from 'react-router-dom';
import Booking from '../../model/Booking';


function BookingForm() {
    const navigate = useNavigate();
    const state = useLocation().state;
    const date = state.date;
    // const [booking, setBooking] = useState<Booking>(state.booking);
    const [id, setId] = useState<number>(0);
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [lessonId, setLessonId] = useState<number>(0);
    const [lessonSubject, setLessonSubject] = useState<string>('');
    const [lessonComment1, setLessonComment1] = useState<string>('');
    const [lessonComment2, setLessonComment2] = useState<string>('');
    const [lessonComment3, setLessonComment3] = useState<string>('');

    useEffect(function() { 
        const booking = state.booking;
        if(booking) {
            setId(booking.id);
            setStart(new Date(booking.start).toLocaleString('es', {timeZone: 'Europe/Madrid'}).substring(10, 18));
            setEnd(new Date(booking.end).toLocaleString('es', {timeZone: 'Europe/Madrid'}).substring(10, 18));
            setLessonId(booking.lesson.id);
            setLessonSubject(booking.lesson.subject);
            if(booking.lesson.comments) {
                setLessonComment1(booking.lesson.comments[0]);
                setLessonComment2(booking.lesson.comments[1]);
                setLessonComment3(booking.lesson.comments[2]);
            }
        }
    }, []);

    function validateStart() {
        return new Date() < new Date(start);
    }

    function validateEnd() {
        return new Date() < new Date(end) && new Date(start) < new Date(end);
    }

    function validateSubject() {
        return lessonSubject && lessonSubject.length > 0;
    }

    function sendBooking(event: FormEvent) {
        event.preventDefault();
        // Por defecto se crea una nueva reserva (POST)
        let method = 'POST';

        if(id){
            // Pero si estamos editando una reserva existente, entonces la actualizamos (PUT)
            method = 'PUT';
        }
        
        const booking = {
            id: id,
            date: date.getTime(),
            start: new Date(date.toDateString() + ' ' + start).getTime(),
            end: new Date(date.toDateString() + ' ' + end).getTime(),
            status: BookingStatus.BOOKED,
            lesson: {
                id: lessonId,
                subject: lessonSubject,
                comments: [lessonComment1, lessonComment2, lessonComment3]
            }
        }
        apiFetch('/booking', method, booking)
        .then(response => console.log(response))
        .catch(error => console.log('error:', error));

        navigate('/');
    }

    return (
        <section className='modal'>
            <section className='modal-main'>
                <button className='close-button' onClick={function(){navigate('/')}}>X</button>
                <h2>Nueva reserva</h2>
                <span>{getFormatedDate(date)}</span>
                <form className='modal-form' onSubmit={sendBooking}>
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
                        <span className='column'><button style={{width: '100%', height: '100%'}}>Aceptar</button></span>
                        <span className='column'><button style={{width: '100%', height: '100%'}} onClick={function(){navigate('/')}}>Cancelar</button></span>
                    </div>
                </form>
            </section>
        </section>
    );
}

export default BookingForm;