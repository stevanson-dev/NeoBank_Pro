import {  Routes, Route } from "react-router-dom";
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
import ForgotPin from "../pages/ForgotPin";
import VerifyPinOTP from "../pages/VerifyPinOTP";
import CreateNewPin from "../pages/CreateNewPin";
import PinUpdated from "../pages/PinUpdated";
import PaymentProcessing from "../pages/PaymentProcessing";

 function AppRoutes() {
    return (
        
        <Routes>
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
            <Route path="/qr-pay" element={<QRPay />} />
            <Route path="/forgot-pin" element={<ForgotPin />} />
            <Route path="/verify-pin-otp" element={<VerifyPinOTP />} />
            <Route path="/create-new-pin" element={<CreateNewPin />} />
            <Route path="/pin-updated" element={<PinUpdated />} />
            <Route path="/payment-processing" element={<PaymentProcessing />} />
            
        </Routes>
        
    );
}
export default AppRoutes;