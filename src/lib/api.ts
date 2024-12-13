import axios from "axios";
import { useUserStore } from "@/store/useStore";

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

export const registerUser = async (
  data: AuthData
): Promise<{ token: string }> => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  const token = response.data.token;
  const { setToken } = useUserStore.getState();
  setToken(token);
  return { token };
};

export const loginUser = async (data: AuthData): Promise<{ token: string }> => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  const token = response.data.token;

  //   const { setToken } = useUserStore((state) => ({
  //     login: state.setToken,
  //   }));

  //   const { setToken } = useUserStore.getState();
  //   setToken(token);
  return { token };
};

export const getUserSettings = async (): Promise<{
  telegramConnected: boolean;
}> => {
  const token = useUserStore.getState().token;
  if (!token) throw new Error("Token is missing");
  const response = await axios.get(`${API_URL}/settings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchChats = async (): Promise<{ id: string; name: string }[]> => {
  const token = useUserStore.getState().token;
  if (!token) throw new Error("Token is missing");
  const response = await axios.get(`${API_URL}/chats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const connectTelegram = async (): Promise<void> => {
  const token = useUserStore.getState().token;
  if (!token) throw new Error("Token is missing");
  await axios.post(`${API_URL}/telegram/connect`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const disconnectTelegram = async (): Promise<void> => {
  const token = useUserStore.getState().token;
  if (!token) throw new Error("Token is missing");
  await axios.post(`${API_URL}/telegram/disconnect`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
