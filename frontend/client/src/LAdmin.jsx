import React from 'react';
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import './style.css'

function LAdmin() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/admin/login', {email, password})
        .then(result => {
            console.log(result)
            if(result.data === "Success") {
                navigate('/home')
            }
        })
        .catch(err => console.log(err))
    }
    
    return (
        <div className='signup template d-flex justify-content-center align-items-center vh-100 bg-primary'>
            <div className='form_container p-5 rounded bg-white'>
            <form onSubmit={handleSubmit}>
            <h3 className='text-center'>Admin Login</h3>
                <div className='mb-2'>
                    <label htmlFor="email-input">
                        <strong>Email</strong>
                    </label>
                    <input
                        type="email"
                        id="email-input"
                        placeholder="Enter Email"
                        autoComplete='off'
                        name="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor="password-input">
                        <strong>Password</strong>
                    </label>
                    <input
                        type="password"
                        id="password-input"
                        placeholder="Enter Password"
                        name='password'
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <input type="checkbox" className="custom-control custom-checkbox" id="check"/>
                    <label htmlFor="check" className="custom-input-label ms-2">
                        Remember me
                    </label>
                </div>
                <div className='d-grid'>
                    <button type="submit" className='btn btn-primary'>Login as admin!</button>
                </div>
                </form>
                <p className='mb-2 p-2'>Don't have an admin account?</p>
                <Link to="/admin" className='btn btn-default border w-100 bg-light rounded-3'>
                    Admin Signup
                </Link>
                <p className='mb-2 p-3 text-center'>-------or-------</p>
                <Link to="/login" className='btn btn-default border w-100 bg-light rounded-3'>
                    User Login/Signup
                </Link>



        </div>
    </div>
    )
}

export default LAdmin;
