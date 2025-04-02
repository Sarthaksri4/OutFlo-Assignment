// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CampaignPage from "./pages/CampaignPage";
import MessageGenerator from "./pages/MessageGenerator";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#17263B] text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<CampaignPage />} />
          <Route path="/message-generator" element={<MessageGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}