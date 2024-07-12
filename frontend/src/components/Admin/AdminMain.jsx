import React from "react";
// import { Link } from "react-router-dom";
import styles from "./AdminMain.module.css";

const AdminMain = () => {
	const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href="/admin/Login"

    };
	return (
		<div className={styles.admin_main_container}>
			<h1>Xebia Admin!</h1>
			<nav className={styles.admin_nav}>
				<button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
			</nav>
		</div>
	);
};

export default AdminMain;
