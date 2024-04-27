import React, { FormEvent, useState } from 'react';
import { getFormatedDate } from '../../common/dates';
import './BookingForm.css';
import Booking from '../../model/Booking';
import BookingStatus from '../../model/BookingStatus';
import { apiFetch } from '../../common/fetch';

interface BookingFormProps {
    date: Date;
    toggleShow: Function;
    bookingProp?: Booking;
}

function BookingForm({ date, toggleShow, bookingProp }: BookingFormProps) {
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [lessonSubject, setLessonSubject] = useState<string>('');
    const [lessonComment1, setLessonComment1] = useState<string>('');
    const [lessonComment2, setLessonComment2] = useState<string>('');
    const [lessonComment3, setLessonComment3] = useState<string>('');

    if(bookingProp) {
        console.log(bookingProp);
        const bookingStart = new Date(bookingProp.start);
        const bookingEnd = new Date(bookingProp.end);
        setStart(bookingStart.getHours() + ':' + bookingStart.getMinutes());
        setEnd(bookingEnd.getHours() + ':' + bookingEnd.getMinutes());
        setLessonSubject(bookingProp.lesson.subject);
        if(bookingProp.lesson.comments) {
            setLessonComment1(bookingProp.lesson.comments[0]);
            setLessonComment2(bookingProp.lesson.comments[1]);
            setLessonComment3(bookingProp.lesson.comments[2]);
        }
        console.log(start);
        console.log(end);
        console.log(lessonSubject);
    }
    

    function validateStart() {
        return new Date() < new Date(start);
    }

    function validateEnd() {
        return new Date() < new Date(end) && new Date(start) < new Date(end);
    }

    function validateSubject() {
        return lessonSubject && lessonSubject.length > 0;
    }

    function createBooking(event: FormEvent) {
        event.preventDefault();
        // console.log('fddfgdfgdfgdfg');
        const booking = {
            id: 0,
            date: new Date(),
            start: new Date(date.toDateString() + ' ' + start),
            end: new Date(date.toDateString() + ' ' + end),
            status: BookingStatus.BOOKED,
            lesson: {
                id: 0,
                subject: lessonSubject,
                comments: [lessonComment1, lessonComment2, lessonComment3]
            }
        }
        console.log(booking);
        // console.log('start', start);
        apiFetch('/booking', 'POST', booking)
        .then(response => console.log(response))
        .catch(error => console.log('error:', error));

        toggleShow();
    }

    

    return (
        <section className='modal'>
            <section className='modal-main'>
                <button className='close-button' onClick={function(){toggleShow()}}>X</button>
                <h2>Nueva reserva</h2>
                <span>{getFormatedDate(date)}</span>
                <form className='modal-form' onSubmit={createBooking}>
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
                        {/* <span className='column'><button style={{width: '100%', height: '100%'}} onClick={function(){toggleShow()}}>Aceptar</button></span> */}
                        <span className='column'><button style={{width: '100%', height: '100%'}}>Aceptar</button></span>
                        <span className='column'><button style={{width: '100%', height: '100%'}} onClick={function(){toggleShow()}}>Cancelar</button></span>
                    </div>
                </form>
            </section>
        </section>
    );
}

export default BookingForm;