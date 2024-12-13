import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const registerUser = async (data) => {
  return axios.post(`${API_URL}/auth/register`, data);
};

export const loginUser = async (data) => {
  return axios.post(`${API_URL}/auth/login`, data);
};

export const getUserSettings = async (token) => {
  return axios.get(`${API_URL}/settings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const connectTelegram = async (token) => {
  return axios.post(
    `${API_URL}/connect-telegram`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const disconnectTelegram = async (token) => {
  return axios.post(
    `${API_URL}/disconnect-telegram`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const fetchChats = async (token) => {
  return axios.get(`${API_URL}/chats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
