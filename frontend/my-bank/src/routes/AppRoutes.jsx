import {  Routes, Route } from "react-router-dom";
//Users

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import Transfer from "../pages/Transfer";
import ReviewTransfer from "../pages/ReviewTransfer";
import TransactionPin from "../pages/TransactionPin";
import TransferSuccess from "../pages/TransferSuccess";
import TransactionsHistory from "../pages/TransactionsHistory";
import Cards from "../pages/Cards";
import Analytics from "../pages/Analytics";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import ChangePassword from "../pages/ChangePassword";
import TwoFactorAuth from "../pages/TwoFactorAuth";
import LoginActivity from "../pages/LoginActivity";
import ThemeSettings from "../pages/ThemeSettings";
import LanguageSettings from "../pages/LanguageSettings";
import Deposit from "../pages/Deposit";
import Accounts from "../pages/Accounts";
import PayBills from "../pages/PayBills";
import QRPay from "../pages/QRPay";
import Withdraw from "../pages/Withdraw";
import ForgotPin from "../pages/ForgotPin";
import VerifyPinOTP from "../pages/VerifyPinOTP";
import CreateNewPin from "../pages/CreateNewPin";
import PinUpdated from "../pages/PinUpdated";
import PaymentProcessing from "../pages/PaymentProcessing";
import PinSecurity from "../pages/PinSecurity";
import SetPin from "../pages/SetPin";
import ChangePin from "../pages/ChangePin";



//Admin
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminLayout from "../layouts/AdminLayout";
import Users from "../pages/Admin/Users";
import Transactions from "../pages/Admin/Transactions";
import Deposits from "../pages/Admin/Deposits";
import Withdrawals from "../pages/Admin/Withdrawals";
import Cardses from "../pages/Admin/Cards";
import Reports from "../pages/Admin/Reports";
import Notificationss from "../pages/Admin/Notifications";
import Settingss from "../pages/Admin/Settings";
import AdminProtectedRoute from "../components/Admin/AdminProtectedRoute";




 function AppRoutes() {
    return (
        
        <Routes>

            // Users
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Transfer" element={<Transfer/>} />
            <Route path="/Review-Transfer" element={<ReviewTransfer />} />
            <Route path="/transaction-pin" element={<TransactionPin />} />
            <Route path="/Transfer-Success" element={<TransferSuccess />} />
            <Route path="/Transactions-History" element={<TransactionsHistory />} />
            <Route path="/Cards" element={<Cards />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/two-factor" element={<TwoFactorAuth />} />
            <Route path="/login-activity" element={<LoginActivity />} />
            <Route path="/theme" element={<ThemeSettings />} />
            <Route path="/language" element={<LanguageSettings />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/Accounts" element={<Accounts />} />
            <Route path="/pay-bills" element={<PayBills />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/qr-pay" element={<QRPay />} />
            <Route path="/forgot-pin" element={<ForgotPin />} />
            <Route path="/verify-pin-otp" element={<VerifyPinOTP />} />
            <Route path="/create-new-pin" element={<CreateNewPin />} />
            <Route path="/pin-updated" element={<PinUpdated />} />
            <Route path="/payment-processing" element={<PaymentProcessing />} />
            <Route path="/pin-security" element={<PinSecurity />} />
            <Route path="/set-pin" element={<SetPin />} />
            <Route path="/change-pin" element={<ChangePin />} />


            
            //Admin
           <Route path="/admin/login" element={<AdminLogin />} />
           <Route path="/admin" element={<AdminLayout />}>
           <Route path="dashboard" element={<AdminDashboard />} />
           <Route path="users" element={<Users />} />
           <Route path="transactions" element={<Transactions />} />
           <Route path="deposits" element={<Deposits />} />
           <Route path="withdrawals" element={<Withdrawals />} />
           <Route path="cards" element={<Cardses />} />
           <Route path="reports" element={<Reports />} />
           <Route path="notifications" element={<Notificationss />} />
           <Route path="settings" element={<Settingss />} />
           <Route path="dashboard" element={<AdminDashboard />}/>




           
           </Route>
          

            
        </Routes>
        
    );
}
export default AppRoutes;