import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POST, apiFetch } from '../common/fetch';
import Modal, { ModalProps, modalDefaultProps } from './Modal';
import { HOME_ROUTE } from '../router/ClientRoutes';
import { LOGIN_STORAGE_KEY as LOGIN_STORAGE_KEY, MAIL_STORAGE_KEY } from '../model/Login';

const Start = () => {
    const navigate = useNavigate();
    const [mail, setMail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [modalData, setModalData] = useState<ModalProps>(modalDefaultProps);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isRegistering, setRegistering] = useState<boolean>(false);


    const createLogin = () => {
        const login = {
            mail: mail,
            password: password
        };
        return login;
    }

    const createRegister = () => {
        const student = {
            name: name,
            lastName: lastName,
            phone: phone,
            login: createLogin()
        };
        return student;
    }

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if(isRegistering){
            register();
        } else {
            login();
        }
    }

    const login = () => {
        const login = createLogin();
        
        apiFetch('/login', POST, login)
        .then((response) => {
            sessionStorage.setItem(LOGIN_STORAGE_KEY, response.message);
            sessionStorage.setItem(MAIL_STORAGE_KEY, mail);
            navigate(HOME_ROUTE);
        })
        .catch((error) => {
            setModalData({
                title: 'Error',
                message: error.message,
                acceptLabel: 'Aceptar',
                acceptAction: () => {setShowModal(false)},
                closeAction: () => {setShowModal(false)}
            });
            setShowModal(true);
        });
    }

    const register = () => {
        const register = createRegister();
        
        apiFetch('/register', POST, register)
        .then((response) => {
                setModalData({
                    title: '¡Bienvenid@!',
                    message: 'Tu registro se ha completado con éxito, puede acceder desde la página de login',
                    acceptLabel: 'Aceptar',
                    acceptAction: () => {setShowModal(false); setRegistering(false);},
                    closeAction: () => {setShowModal(false); setRegistering(false);}
                });
                setShowModal(true);
        })
        .catch((error) => {
            setModalData({
                title: 'Error',
                message: error.message,
                acceptLabel: 'Aceptar',
                acceptAction: () => {setShowModal(false)},
                closeAction: () => {setShowModal(false)}
            });
            setShowModal(true);
        });
    }

    const cancel = (event: any) => {
        event.preventDefault();
        setRegistering(false);
    }

    return (
        <>
            <section className='container border p-2 d-flex my-5 bg-light'>
                <div className='container'>
                    <div className='row p-2' >
                        {!isRegistering && <h2 className='col'>Entrar</h2>}
                        {isRegistering && <h2 className='col'>Registro</h2>}
                    </div>
                    <form onSubmit={submit}>
                        <div className='row  p-2'>
                            <div className='form-group col p-2'>
                                <label htmlFor='email'>Email:</label>
                                <input id='email' type='string' 
                                    className='form-control' required value={mail}  
                                    onChange={(event) => {setMail(event.target.value)}}
                                />
                            </div>
                        </div>
                        <div className='row  p-2'>
                            <div className='form-group col p-2'>
                                <label htmlFor='password'>Contraseña:</label>
                                <input id='password' type='password' 
                                    className='form-control' required value={password}  
                                    onChange={(event) => {setPassword(event.target.value)}}
                                />
                            </div>
                        </div>
                        {isRegistering &&
                        <>
                            <div className='row  p-2'>
                                <div className='form-group col p-2'>
                                    <label htmlFor='name'>Nombre:</label>
                                    <input id='name' type='text' 
                                        className='form-control' required value={name}  
                                        onChange={(event) => {setName(event.target.value)}}
                                    />
                                </div>
                                <div className='form-group col p-2'>
                                    <label htmlFor='lastname'>Apellidos:</label>
                                    <input id='lastname' type='text' 
                                        className='form-control' required value={lastName}  
                                        onChange={(event) => {setLastName(event.target.value)}}
                                    />
                                </div>
                            </div>
                            <div className='row  p-2'>
                                <div className='form-group col p-2'>
                                    <label htmlFor='phone'>Teléfono:</label>
                                    <input id='phone' type='tel' 
                                        className='form-control' required value={phone}  
                                        onChange={(event) => {setPhone(event.target.value)}}
                                    />
                                </div>
                            </div>
                        </>
                        }
                            {!isRegistering && 
                                <div className='form-group row p-3'>
                                        <button className='btn btn-primary'>Enviar</button>
                                </div>
                            }
                            {isRegistering && 
                                <div className='form-group row p-3'>
                                    <div className='col'>
                                        <button className='btn btn-danger w-100' onClick={cancel}>Cancelar</button>
                                    </div>
                                    <div className='col'>
                                        <button className='btn btn-primary w-100'>Enviar</button>
                                    </div>
                                </div>
                            }
                    </form>
                    {!isRegistering && <span>¿Aún no eres usuari@? <a className='link-primary' onClick={() => setRegistering(true)}>Regístrate</a></span>}
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

export default Start;