import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import Login from '../Pages/Login/Login';

function ProtectedRoute({children}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const d = useSelector(state => state.user);
    console.log({log: d.isLoggedIn})

    if (d.isLoggedIn == false) {
        return <Login />
    }
    else
        return children;
};

export default ProtectedRoute