import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CampaignPage from "./pages/CampaignPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./utils/PrivateRoute";
import MessageGenerator from "./pages/MessageGenerator";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#17263B] text-white">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Navigate to="/signup" replace />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/campaigns" element={<CampaignPage />} />
            <Route path="/message-generator" element={<MessageGenerator />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}