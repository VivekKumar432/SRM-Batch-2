import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

const AdminLogin = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:4545/api/admin/login-admin";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("adminToken", res.data);
            window.location.href = "/admin/AdminMain";
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={styles.login_container}>
            <video autoPlay loop muted playsInline className={styles.bg_video}>
                <source src="https://v1.pinimg.com/videos/mc/720p/49/a9/86/49a9868554765299bf7ba96ce9b8ce75.mp4" type="video/mp4" />
                {/* Fallback content if video is not supported */}
                Your browser does not support the video tag.
            </video>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Admin Login</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>Not an Admin?</h1>
                    <Link to="/login">
                        <button type="button" className={styles.red_btn}>
                            User Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
