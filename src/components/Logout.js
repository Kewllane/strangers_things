import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const Logout = ( {token, setToken}) => {
    const history = useNavigate();
    const handleLogout= async () => {
        setToken('');
        sessionStorage.removeItem('token')
        history('/HomePage')
    };

    return (
        <div>
            <h1>ARE YOU SURE YOU WANT TO LOGOUT?</h1>
            <button type="button" className="btn btn-outline-primary" onClick={handleLogout}>Yes</button>
            <button type="button" className="btn btn-outline-primary" onClick={() => history(-1)}>Go Back</button>
        </div>
       
    )
}

export default Logout