import React from 'react';
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import './style.css'

function Admin() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/admin', {name, email, password})
        .then(result => {console.log(result)
            navigate('/admin/login')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='signup template d-flex justify-content-center align-items-center vh-100 bg-primary'>
        <div className='form_container p-5 rounded bg-white'>
        <form onSubmit={handleSubmit}>
            <h3 className='text-center'>Admin Sign-up</h3>
                <div className='mb-2'>
                    <label htmlFor="name-input">
                        <strong>Name</strong>
                    </label>
                    <input 
                        type="text"
                        id="name-input" 
                        placeholder="Enter Name" 
                        autoComplete='off'
                        name="name"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                    />    
                </div>
                <div className='mb-2'>
                    <label htmlFor="email-input">
                        <strong>Email</strong>
                    </label>
                    <input 
                        type="email" 
                        id="email-input" 
                        placeholder="Enter Email" 
                        autoComplete="off" 
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
                    <button type="submit" className='btn btn-primary'>Create admin account</button>
                </div>
                </form>
                <p className='mb-2'>Have account?</p>
                <Link to="/admin/login" className='btn btn-default border w-100 bg-light rounded-3'>
                    Admin Login
                </Link>

        </div>
    </div>
    )
}

export default Admin;
