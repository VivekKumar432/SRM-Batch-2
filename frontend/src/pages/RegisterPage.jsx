import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../assets/CSS/registerPage.css";

const RegisterPage = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4545/api/users/create-user";
      const { data: res } = await axios.post(url, data);
      console.log(res.message); // Debugging: Log response message
      navigate("/login"); // Correct this line
    } catch (error) {
      console.log(error); // Debugging: Log the error
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
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>New Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            />
            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="rouge_btn">
              Sign Up
            </button>
          </form>
          <div className="admin_section">
            <Link to="/admin/signup">
              <button className="adminButton">Admin Signup</button>
            </Link>
          </div>
        </div>
        <div className="right">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="rose_btn">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
