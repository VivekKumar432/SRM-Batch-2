import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register', {name, email, password})
        .then(result => {console.log(result)
            navigate('/home')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="bg-secondary d-flex justify-content-center align-items-center vh-100">
            <div className="bg-light f p-3 rounded w-30">
                <h2>Employee Registeration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoCapitalize="off"
                            name="email"
                            className="bg-light form-control rounded-7"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoCapitalize="off"
                            name="email"
                            className="form-control rounded-7"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            autoCapitalize="off"
                            name="email"
                            className="form-control rounded-7"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-7 bg-primary">
                        Register
                    </button>
                </form>
                <p>Already Have an Account</p>
                <Link to="/login" className="mb-3 btn btn-default border w-100 rounded-7 text-decoration-none bg-light">
                    Login
                </Link>
                <div className="d-flex justify-content-around align-items-center">
                <Link to="/admin" className="mr-3 btn btn-default border rounded-7 bg-primary text-light">
                    Admin registration
                </Link>
                <Link to="/admin/login" className="btn btn-default border rounded-7 bg-primary text-light">
                    Admin login
                </Link>
                </div>
                
            </div>
        </div>
    );
}

export default Signup;

// btn btn-default border w-100 rounded-7 text-decoration-none bg-light