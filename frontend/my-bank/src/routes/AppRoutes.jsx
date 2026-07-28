import {  Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
 function AppRoutes() {
    return (
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        
    );
}
export default AppRoutes;