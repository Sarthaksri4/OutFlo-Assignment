import axios from "axios";

const api = axios.create({
  baseURL: "https://comp-ieud.onrender.com", 
});

export const getCampaigns = async () => {
  const response = await api.get("/campaigns");
  return response.data;
};

export const createCampaign = async (data: any) => {
  const response = await api.post("/campaigns", data);
  return response.data;
};

export const generateMessage = async (data: any) => {
  const response = await api.post("/personalized-message", data);
  return response.data;
};
