import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminSignup from "./components/Admin/AdminSignup";
import "./App.css";
import AdminMain from "./components/Admin/AdminMain";

function App() {
     const user = localStorage.getItem("token");
	return (
		
		<Routes>
			<Route path="/main" element={(user)?<Main/>:<UNF/>} /> 
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<LoginPage />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/admin/login" element={<AdminLogin />} />
			<Route path="/admin/signup" element={<AdminSignup />} />
			<Route path="/admin/AdminMain" element={<AdminMain />} />
		</Routes>
		
	);
}

export default App;


const UNF=()=>{
	return(
		<div>
         <h1>User not found</h1>
		</div>
	)
}

