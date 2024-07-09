import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/admin', {name, email, password})
        .then(result => {console.log(result)
            navigate('/home')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="bg-dark d-flex justify-content-center align-items-center vh-100">
            <div className="bg-light f p-3 rounded w-25">
                <h2>Admin Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Username</strong>
                        </label>
                        <input
                            type="text"
                            placeholder=""
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
                            placeholder=""
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
                            placeholder=""
                            autoCapitalize="off"
                            name="email"
                            className="form-control rounded-7"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-7 bg-secondary">
                        Signup
                    </button>
                </form>
                <p>Already Have an Account?</p>
                <Link to="/admin/login" className="mb-3 btn btn-default border w-100 rounded-7 text-decoration-none bg-light">
                    Admin Login
                </Link>
                <Link to="/register" className="btn btn-default border w-100 rounded-7 text-decoration-none bg-light">
                    User Signup
                </Link>
            </div>
        </div>
    );
}

export default Admin;