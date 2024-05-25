import React from 'react';
import { XSquareFill } from 'react-bootstrap-icons';

export interface ModalProps {
    title: string;
    message: string;
    acceptLabel: string;
    acceptAction: Function;
    closeAction: Function;
    cancelLabel?: string;
    cancelAction?: Function;
}

export const modalDefaultProps: ModalProps = {
    title: '',
    message: '',
    acceptLabel: '',
    closeAction: Function,
    acceptAction: Function
}

const Modal = (props: ModalProps) => {
    return (
        
        <div className='container bg-secondary z-1 w-100 h-100 position-fixed top-50 start-50 translate-middle'>
            <div className='container bg-light z-2 my-4 p-4 position-absolute top-50 start-50 translate-middle'>
                <div className='row'>
                    <span className='col'><h5 className='modal-title'>{props.title}</h5></span>
                    <span className='col text-end' onClick={() => {props.closeAction()}}><XSquareFill className='text-danger' size={25}/></span>
                </div>
                <div className='row'>
                    <p>{props.message}</p>
                </div>
                <div className='row'>
                    {props.cancelLabel && <span className='col'><button type='button' className='btn btn-secondary' data-dismiss='modal'>{props.cancelLabel}</button></span>}
                    <span className='col text-end'><button type='button' className='btn btn-primary' onClick={() => {props.acceptAction()}}>{props.acceptLabel}</button></span>
                </div>
            </div>
        </div>
    );
}

export default Modal;