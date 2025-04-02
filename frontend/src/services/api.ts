// src/services/api.ts
import { Campaign, LinkedInProfile, MessageResponse } from "../types";

const API_URL = "https://comp-ieud.onrender.com";

const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Request failed');
  }
  return await response.json();
};

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await fetch(`${API_URL}/campaigns`);
  return handleResponse(response);
};

export const fetchCampaign = async (id: string): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`);
  return handleResponse(response);
};

export const createCampaign = async (data: Omit<Campaign, '_id'>): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};

export const updateCampaign = async (id: string, data: Partial<Campaign>): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};

export const deleteCampaign = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`, {
    method: "DELETE"
  });
  return handleResponse(response);
};

export const generateMessage = async (data: LinkedInProfile): Promise<MessageResponse> => {
  const response = await fetch(`${API_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      jobTitle: data.jobTitle,
      company: data.company,
      location: data.location,
      summary: data.summary
    })
  });
  return handleResponse(response);
};