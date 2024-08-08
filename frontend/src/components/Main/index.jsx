import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const Main = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Xebia</h1>
                <div className={styles.clock}>
                    {time.toLocaleTimeString()}
                </div>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Main;