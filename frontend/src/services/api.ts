import { Campaign, LinkedInProfile, MessageResponse } from "../types";

const API_URL = "https://comp-ieud.onrender.com";

interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorData: { error?: string };
    try {
      errorData = await response.json();
    } catch {
      errorData = { error: response.statusText };
    }
    const error: ApiError = {
      message: errorData.error || 'Request failed',
      status: response.status
    };
    throw error;
  }
  return response.json() as Promise<T>;
};

export const sendOtp = async (email: string): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${API_URL}/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ email })
  });
  return handleResponse<{ success: boolean; message: string }>(response);
};

export const signup = async (email: string, password: string, otp: string): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ email, password, otp })
  });
  return handleResponse<{ success: boolean; message: string }>(response);
};

export const login = async (email: string, password: string): Promise<{ success: boolean; token: string; message: string }> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  return handleResponse<{ success: boolean; token: string; message: string }>(response);
};

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await fetch(`${API_URL}/campaigns`, {
    credentials: 'include'
  });
  return handleResponse<Campaign[]>(response);
};

export const fetchCampaign = async (id: string): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`, {
    credentials: 'include'
  });
  return handleResponse<Campaign>(response);
};

export const createCampaign = async (data: Omit<Campaign, '_id'>): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  return handleResponse<Campaign>(response);
};

export const updateCampaign = async (id: string, data: Partial<Campaign>): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  return handleResponse<Campaign>(response);
};

export const deleteCampaign = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`, {
    method: "DELETE",
    credentials: 'include'
  });
  return handleResponse<{ message: string }>(response);
};

export const generateMessage = async (data: LinkedInProfile): Promise<MessageResponse> => {
  const response = await fetch(`${API_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({
      name: data.name,
      jobTitle: data.jobTitle,
      company: data.company,
      location: data.location,
      summary: data.summary
    })
  });
  return handleResponse<MessageResponse>(response);
};