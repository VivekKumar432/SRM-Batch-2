import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../assets/CSS/loginPage.css";
 
const LoginPage = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginForm = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Email and password fields cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4040/api/users/login-user",
        {
          email,
          password,
        },
        { withCredentials: true, credentials: "include" }
      );

      if (response.status === 200) {
        nav("/main"); // Redirect to main page or dashboard
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message || "Login failed. Please try again."
        );
      } else if (error.request) {
        setError(
          "No response from server. Please check your network connection."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.log("Error during login", error);
    }
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <form className="form_container" onSubmit={handleLoginForm}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(inputEmailVal) => setEmail(inputEmailVal.target.value)}
              value={email}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(inputPassVal) =>
                setPassword(inputPassVal.target.value)
              }
              value={password}
              required
              className="input"
            />
            {error && <div className="error_msg">{error}</div>}
            {/* <Link to="/Main"> */}
            <button type="submit" className="green_btn">
              Sign In
            </button>
            {/* </Link> */}
          </form>
        </div>
        <div className="right">
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className="blue_btn">
              Sign Up
            </button>
          </Link>
          <Link to="/admin/Login">
            <button type="button" className="admin_btn">
              Admin Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
