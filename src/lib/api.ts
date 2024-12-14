import axios from "axios";
import { useUserStore, useTelegramStore } from "@/store/useStore";
import { IChat, IMessage } from "@/types/telegram";

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

export const fetchChats = async (): Promise<IChat[]> => {
  const token = useUserStore.getState().token;
  if (!token) throw new Error("Token is missing");

  const response = await axios.get(`${API_URL}/telegram/chats`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const { setChats } = useTelegramStore.getState();
  setChats(response.data);
  return response.data;
};

// Функція для отримання повідомлень конкретного чату
export const fetchMessages = async (chatId: string): Promise<IMessage[]> => {
  const { token } = useUserStore.getState();
  console.log(token);
  console.log(chatId);

  // const response = await axios.get(`${API_URL}/chats/${chatId}/messages`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  const { setMessages } = useTelegramStore.getState();
  // setMessages(response.data);

  const mockData = [
    { id: "1", content: "string", sender: "string", timestamp: "string" },
    { id: "2", content: "string", sender: "string", timestamp: "string" },
    { id: "3", content: "string", sender: "string", timestamp: "string" },
  ];
  setMessages(mockData);
  return mockData;

  // return response.data;
};
