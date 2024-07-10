import styles from './styles.module.css';

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href="/login"

    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Xebia</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Main;
