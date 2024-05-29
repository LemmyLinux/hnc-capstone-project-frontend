import React, { useEffect, useState } from 'react';
import { LOGIN_STORAGE_KEY } from '../model/Login';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../router/ClientRoutes';

const Header = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem(LOGIN_STORAGE_KEY);
        if(!user){
            navigate(LOGIN_ROUTE);
        }
    });

    return (
        <span className='d-none' />
    )
}

export default Header;