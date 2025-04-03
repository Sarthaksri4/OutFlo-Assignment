import React, { useState } from "react";
import axios, { AxiosError } from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

interface SignupResponse {
  success: boolean;
  message: string;
  token?: string;
}

interface ErrorResponse {
  message: string;
}

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      await axios.post("/auth/send-otp", { email: formData.email });
      setOtpSent(true);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.message || "Failed to send OTP. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!formData.email || !formData.password || !otp) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post<SignupResponse>("/auth/signup", {
        email: formData.email,
        password: formData.password,
        otp
      });
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        navigate("/home");
      } else {
        setError(response.data.message || "Signup successful but no token received");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#00275a]">
      <div className="bg-[#31527c] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {!otpSent ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 disabled:opacity-50"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password (min 6 characters)"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 disabled:opacity-50"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  disabled={loading}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 disabled:opacity-50"
              />
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className={`w-full py-3 px-4 rounded text-white font-medium ${
                  loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <div className="text-center text-gray-300 mb-4">
                OTP sent to {formData.email}
              </div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 disabled:opacity-50"
              />
              <button
                onClick={handleSignup}
                disabled={loading}
                className={`w-full py-3 px-4 rounded text-white font-medium ${
                  loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Creating account..." : "Complete Signup"}
              </button>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <span className="text-gray-300">Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-300 hover:underline"
            disabled={loading}
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;