import React, { useState } from "react";
import axios, { AxiosError } from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  token: string;
  message?: string;
}

interface ErrorResponse {
  message: string;
}

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      console.log("Attempting login with:", formData); // Debug log
      const response = await axios.post<LoginResponse>("/auth/login", formData);
      
      if (!response.data.token) {
        throw new Error("No token received");
      }

      console.log("Login successful, token received"); // Debug log
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error); // Debug log
      
      const axiosError = error as AxiosError<ErrorResponse>;
      let errorMessage = "Login failed. Please try again.";
      
      if (axiosError.response) {
        // Handle HTTP errors
        console.log("Response data:", axiosError.response.data); // Debug log
        console.log("Response status:", axiosError.response.status); // Debug log
        
        if (axiosError.response.status === 404) {
          errorMessage = "Login endpoint not found. Please check the server.";
        } else if (axiosError.response.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.log("No response received:", axiosError.request); // Debug log
        errorMessage = "No response from server. Please try again later.";
      } else {
        // Something happened in setting up the request
        console.log("Request setup error:", axiosError.message); // Debug log
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#00275a]">
      <div className="bg-[#31527c] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={loading}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 disabled:opacity-50"
            autoComplete="username"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 disabled:opacity-50"
            autoComplete="current-password"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 px-4 rounded text-white font-medium ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        <div className="mt-4 text-center">
          <span className="text-gray-300">Don't have an account? </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-300 hover:underline"
            disabled={loading}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;