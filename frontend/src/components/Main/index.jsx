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
                <div className={styles.nav_right}>
                    <div className={styles.clock}>
                        {time.toLocaleTimeString()}
                    </div>
                    <button className={styles.white_btn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
            <div className={styles.info_container}>
                <div className={styles.info}>
                    <h2>About Us</h2>
                    <p>Founded in 2001, Xebia was the first Dutch organization to embrace the Agile way of working, linking up with gurus like Jeff Sutherland. Since then, we have grown to an organization with over 5,500 professionals working at 24 offices on four continents. Xebia is a pioneering Software Engineering and IT consultancy company, transforming and executing at the intersection of Domain and Technology to create digital leaders for our people, clients, partners, and communities.</p>
                </div>
            </div>
            <footer className={styles.footer}>
                <p>
                    Contact us: <a href="mailto:admin@xebia.com" className={styles.contact_link}>admin@xebia.com</a> | Phone: (1) 456-564
                </p>
            </footer>
        </div>
    );
};

export default Main;