import React from 'react';
import Booking from '../../model/Booking';
import './BookingTag.css';
import { AVAILABLE, CANCELLED } from '../../model/BookingStatus';
import { getFormmatedTime } from '../../common/dates';
import { MAIL_STORAGE_KEY } from '../../model/Login';

interface BookingTagProps {
    booking: Booking;
    onClick: Function;
    disabled: boolean;
    adminMode: boolean;
}


const BookingTag = ({booking, onClick, disabled, adminMode}: BookingTagProps) => {
    // Se recupera el email del usuario actual
    const currentUserMail = sessionStorage.getItem(MAIL_STORAGE_KEY);
    // Estilos comunes
    let className = 'tag';
    // Texto por defecto
    let text = booking.lesson.subject;
    // Acción del click por defecto
    let action = onClick;

    // Si la reserva no pertenece al usuario actual y el usuario actual no es admin
    if(!adminMode && booking.userMail !== currentUserMail){
        // Color gris
        className += ' bg-secondary';
        // Texto no disponible
        text = 'No disponible'
        // No se realiza acción
        action = () => {};
    } else {
        // La reserva pertenece al usuario actual
        // Si la reserva está cancelada
        if(booking.status === CANCELLED){
            // Texto tachado
            className += ' text-decoration-line-through';
        }
    
        // Si la celda está deshabilitada (día anterior a hoy)
        if(disabled) {
            // Texto negro y fondo blanco
            className += ' text-dark bg-light';
            // Si la reserva estaba libre (era un hueco)
            if(booking.status === AVAILABLE){
                // No se permite ninguna acción
                action = () => {};
            }
        } else {
            // Si no estaba deshabilitada
            // Texto blanco
            className += ' text-white';
            // Si está libre
            if(booking.status === AVAILABLE){
                // Fondo verde
                className += ' bg-success';
            // Si está cancelada
            } else if(booking.status === CANCELLED) {
                // Fondo rojo
                className += ' bg-danger';
            // Sino significa que está reservada y aún no se ha impartido la clase
            } else {
                // Fondo azul
                className += ' bg-primary';
            }
        }
    }

    return (
        <>
        {booking.status !== AVAILABLE && 
            <div key={booking.id} className={className} onClick={(event) => {event.stopPropagation(); action()}}>
                <span>{text}</span>
            </div>
        }
        {booking.status === AVAILABLE && 
            <div className={className} onClick={(event) => {event.stopPropagation(); action()}}>
                {!disabled && <span>{getFormmatedTime(new Date(booking.start)) + ' - ' + getFormmatedTime(new Date(booking.end))}</span>}
            </div>
        }
        </>
    )
}

export default BookingTag;