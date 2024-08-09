import React, { useState, useEffect } from "react";
import styles from "./AdminMain.module.css";

const AdminMain = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/admin/Login";
    };

    return (
        <div className={styles.admin_main_container}>
            <nav className={styles.admin_nav}>
                <h1>Xebia Admin!</h1>
                <div className={styles.nav_right}>
                    <div className={styles.clock}>
                        {time.toLocaleTimeString()}
                    </div>
                    <button className={styles.grey_btn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
            <div className={styles.info_container}>
                <div className={styles.info}>
                    <h3>About Us</h3>
                    <p>In an organization like Xebia, admins play crucial roles across various domains. System and network administrators manage and secure IT infrastructure, ensuring smooth operations and addressing technical issues. Database administrators oversee the integrity and performance of data systems, while cloud administrators handle cloud environments for scalability and cost efficiency. DevOps admins streamline software delivery through CI/CD pipelines and automation.</p>
                </div>
            </div>
            <footer className={styles.footer}>
                <p>
                    Contact us: <a href="mailto:dev@xebia.com" className={styles.contact_link}>dev@xebia.com</a> | Phone: (123) 456-7890
                </p>
            </footer>
        </div>
    );
};

export default AdminMain;