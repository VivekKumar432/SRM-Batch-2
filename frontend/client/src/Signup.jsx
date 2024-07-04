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
            navigate('/login')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="bg-secondary d-flex justify-content-center align-items-center vh-100">
            <div className="bg-light f p-3 rounded w-25">
                <h2>Register</h2>
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
                            placeholder="Enter Name"
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
                            placeholder="Enter Name"
                            autoCapitalize="off"
                            name="email"
                            className="form-control rounded-7"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-danger btn btn-success w-100 rounded-7">
                        Register
                    </button>
                </form>
                <h5>Already Have an Account?</h5>
                <Link to="/login" className="btn btn-default border w-100 rounded-7 text-decoration-none bg-danger text-light">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;