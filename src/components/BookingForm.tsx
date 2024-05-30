import React, { FormEvent, useEffect, useState } from 'react';
import { getFormatedDate, getFormmatedTime } from '../common/dates';
import { BOOKED, CANCELLED } from '../model/BookingStatus';
import { DELETE, POST, PUT, apiFetch } from '../common/fetch';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal, { ModalProps, modalDefaultProps } from './Modal';
import { XSquareFill } from 'react-bootstrap-icons';
import { HOME_ROUTE } from '../router/ClientRoutes';
import Booking from '../model/Booking';
import { LOGIN_STORAGE_KEY, MAIL_STORAGE_KEY } from '../model/Login';
import Header from './Header';

const BookingForm = () => {
    const navigate = useNavigate();
    const state = useLocation().state;
    const date = state.date;
    const adminMode = state.adminMode;
    const [disabled, setDisabled] = useState<boolean>(state.disabled);
    const [id, setId] = useState<number>(0);
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [lessonId, setLessonId] = useState<number>(0);
    const [lessonSubject, setLessonSubject] = useState<string>('');
    const [lessonComment1, setLessonComment1] = useState<string>('');
    const [lessonComment2, setLessonComment2] = useState<string>('');
    const [lessonComment3, setLessonComment3] = useState<string>('');
    const [userMail, setUserMail] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalData, setModalData] = useState<ModalProps>(modalDefaultProps);

    useEffect(() => { 
        const booking = state.booking;
        if(booking) {
            setId(booking.id);
            setStart(getFormmatedTime(new Date(booking.start)));
            setEnd(getFormmatedTime(new Date(booking.end)));
            setLessonId(booking.lesson.id);
            setLessonSubject(booking.lesson.subject);
            if(booking.lesson.comments) {
                setLessonComment1(booking.lesson.comments[0]);
                setLessonComment2(booking.lesson.comments[1]);
                setLessonComment3(booking.lesson.comments[2]);
            }
            setUserMail(booking.userMail);

            if(booking.status === CANCELLED){
                setDisabled(true);
            }
            if(adminMode){
                setDisabled(false);
            }
        }
    }, []);

    const createBooking = () => {
        let mail = sessionStorage.getItem(MAIL_STORAGE_KEY);
        if(userMail !== ''){
            mail = userMail;
        }

        const booking = {
            id: id,
            date: date.getTime(),
            start: new Date(date.toDateString() + ' ' + start).getTime(),
            end: new Date(date.toDateString() + ' ' + end).getTime(),
            status: BOOKED,
            lesson: {
                id: lessonId,
                subject: lessonSubject,
                comments: [lessonComment1, lessonComment2, lessonComment3]
            },
            studentId: sessionStorage.getItem(LOGIN_STORAGE_KEY),
            userMail: mail
        };
        return booking;
    }

    const sendBooking = (event: FormEvent) => {
        event.preventDefault();
        // Por defecto se crea una nueva reserva (POST)
        let method = POST;

        if(id){
            // Pero si estamos editando una reserva existente, entonces la actualizamos (PUT)
            method = PUT;
        }
        
        const booking = createBooking();
        
        apiFetch('/booking', method, booking)
        .then((response) => {
            setModalData({
                title: 'Datos de la reserva guardados con éxito',
                message: 'Los cambios se reflejarán en el calendario próximamente',
                acceptLabel: 'Aceptar',
                acceptAction: () => {navigate(HOME_ROUTE)},
                closeAction: () => {setShowModal(false)}
            });
            setShowModal(true);
        })
        .catch((error) => {
            setModalData({
                title: 'Error',
                message: 'Ocurrió un error al guardar los datos de la reserva: ' + error.message,
                acceptLabel: 'Aceptar',
                acceptAction: () => {setShowModal(false)},
                closeAction: () => {setShowModal(false)}
            });
            setShowModal(true);
        });
    }

    const cancelBooking = (event: any) => {
        event.preventDefault();
        const booking = createBooking();
        booking.status = CANCELLED;
        apiFetch('/booking', PUT, booking)
        .then((response) => {
            setModalData({
                title: 'Reserva cancelada',
                message: 'Los cambios se reflejarán en el calendario próximamente',
                acceptLabel: 'Aceptar',
                acceptAction: () => {navigate(HOME_ROUTE)},
                closeAction: () => {setShowModal(false)}
            });
            setShowModal(true);
        })
        .catch((error) => {
            setModalData({
                title: 'Error',
                message: 'Ocurrió un error al cancelar la reserva: ' + error.message,
                acceptLabel: 'Aceptar',
                acceptAction: () => {setShowModal(false)},
                closeAction: () => {setShowModal(false)}
            });
            setShowModal(true);
        });
    } 

    const cancel = (event: any) => {
        event.preventDefault();
        navigate(HOME_ROUTE);
    }

    return (
        <>
        <Header />
        <section className='container border p-2 d-flex my-5 bg-light'>
            <div className='container'>
                <div className='row p-2' >
                    <h2 className='col'>Nueva reserva</h2>
                    <span className='col text-end' onClick={() => {navigate(HOME_ROUTE)}}><XSquareFill className='text-danger' size={25}/></span>
                </div>
                <div className='row p-2'>
                    <span className='col'>{getFormatedDate(date)}</span>
                </div>
                <form onSubmit={sendBooking}>
                    <div className='row  p-2'>
                        <div className='form-group col p-2'>
                            <label htmlFor='start'>Hora inicio</label>
                            <input id='start' type='time' className='form-control' 
                                required value={start}  
                                onChange={(event) => {setStart(event.target.value)}} disabled
                            />
                        </div>
                        <div className='form-group col p-2'>
                            <label htmlFor='end'>Hora fin</label>
                            <input id='end' type='time'  className='form-control' 
                                required value={end}  
                                onChange={(event) => {setEnd(event.target.value)}} disabled
                            />
                        </div>
                    </div>
                    
                    <div className='row  p-2'>
                        <div className='form-group col p-2'>
                            <label htmlFor='subject'>Asignatura</label>
                            <input id='subject' type='string' 
                                className='form-control' required value={lessonSubject}  
                                onChange={(event) => {setLessonSubject(event.target.value)}} disabled={disabled}
                            />
                        </div>
                        {userMail && 
                            <div className='form-group col p-2'>
                                <label htmlFor='mail'>Alumno</label>
                                <input id='mail' type='mail' 
                                    className='form-control' required value={userMail}  
                                    disabled
                                />
                            </div>
                        }
                    </div>
                    <div className='row  p-2'>
                        <div className='form-group col p-2'>
                            <label htmlFor={'comment1'}>Comentario 1</label>
                            <textarea id={'comment1'}  className='form-control' 
                                value={lessonComment1} onChange={(event) => {setLessonComment1(event.target.value)}} 
                                disabled={disabled}>
                            </textarea>
                            <label htmlFor={'comment2'}>Comentario 2</label>
                            <textarea id={'comment2'}  className='form-control' 
                                value={lessonComment2} onChange={(event) => {setLessonComment2(event.target.value)}} 
                                disabled={disabled}>
                            </textarea>
                            <label htmlFor={'comment3'}>Comentario 3</label>
                            <textarea id={'comment3'}  className='form-control' 
                                value={lessonComment3} onChange={(event) => {setLessonComment3(event.target.value)}} 
                                disabled={disabled}>
                            </textarea>
                        </div>
                    </div>
                        <div className='form-group row p-3'>
                            <button className='btn btn-success' disabled={disabled}>Guardar</button>
                        </div>
                        <div className='form-group row p-3'>
                            <button className='btn btn-primary' onClick={(event) => {cancel(event)}}>Volver</button>
                        </div>
                            {!!id && 
                                <div className='form-group row p-3'>
                                    <button className='btn btn-danger' onClick={(event) => {cancelBooking(event)}} 
                                        disabled={disabled}>Anular reserva</button>
                                </div>
                            }
                </form>
            </div>
        </section>
        {showModal && <Modal 
            title={modalData.title} 
            message={modalData.message} 
            acceptLabel={modalData.acceptLabel} 
            acceptAction={modalData.acceptAction} 
            closeAction={modalData.closeAction}/>}
        </>
    );
}

export default BookingForm;