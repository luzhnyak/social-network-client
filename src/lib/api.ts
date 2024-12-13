import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export interface AuthData {
  email: string;
  password: string;
}

export interface SettingsResponse {
  telegramConnected: boolean;
}

export interface Chat {
  id: string;
  name: string;
}

export const registerUser = async (data: AuthData) => {
  return axios.post(`${API_URL}/auth/register`, data);
};

export const loginUser = async (data: AuthData) => {
  return axios.post(`${API_URL}/auth/login`, data);
};

export const getUserSettings = async (
  token: string
): Promise<SettingsResponse> => {
  const response = await axios.get(`${API_URL}/settings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const connectTelegram = async (token: string) => {
  return axios.post(
    `${API_URL}/connect-telegram`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const disconnectTelegram = async (token: string) => {
  return axios.post(
    `${API_URL}/disconnect-telegram`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const fetchChats = async (token: string): Promise<Chat[]> => {
  const response = await axios.get(`${API_URL}/chats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
