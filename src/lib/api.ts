import axios from "axios";
import { useUserStore, useTelegramStore } from "@/store/useStore";
import {
  IChat,
  IMessage,
  PhoneAuthRequest,
  PhoneAuthResponse,
  PhoneCodeVerifyRequest,
  PhoneCodeVerifyResponse,
  TwoFactorAuthRequest,
  TwoFactorAuthResponse,
} from "@/types/telegram";
import { AuthData } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export interface SettingsResponse {
//   telegramConnected: boolean;
// }

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
  const { setToken } = useUserStore.getState();
  setToken(token);
  return { token };
};

export const refreshUser = async (): Promise<{ token: string | null }> => {
  let token = useUserStore.getState().token;
  if (!token) throw new Error("Token is missing");
  const response = await axios.get(`${API_URL}/auth/refresh-user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  token = response.data.token;

  const { setToken, setTelegramAuth } = useUserStore.getState();
  setToken(token);
  setTelegramAuth(response.data.isTelegramAuth);
  return { token };
};

export const sendPhoneNumber = async (
  data: PhoneAuthRequest
): Promise<PhoneAuthResponse> => {
  const token = useUserStore.getState().token;
  if (!token) throw new Error("Token is missing");
  const response = await axios.post(`${API_URL}/telegram/auth/start`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const sendVerifyCode = async (
  data: PhoneCodeVerifyRequest
): Promise<PhoneCodeVerifyResponse> => {
  const token = useUserStore.getState().token;
  if (!token) throw new Error("Token is missing");
  const response = await axios.post(
    `${API_URL}/telegram/auth/verify-code`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const sendPassword2FA = async (
  data: TwoFactorAuthRequest
): Promise<TwoFactorAuthResponse> => {
  const token = useUserStore.getState().token;
  if (!token) throw new Error("Token is missing");
  const response = await axios.post(
    `${API_URL}/telegram/auth/verify-2fa`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const disconnectTelegram = async (): Promise<void> => {
  const token = useUserStore.getState().token;
  if (!token) throw new Error("Token is missing");
  await axios.get(`${API_URL}/telegram/disconnect`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const { setTelegramAuth } = useUserStore.getState();
  setTelegramAuth(false);
};

export const fetchChats = async (): Promise<IChat[]> => {
  const token = useUserStore.getState().token;
  if (!token) throw new Error("Token is missing");

  try {
    const response = await axios.get(`${API_URL}/telegram/chats`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.status === "telegram_not_autorize") {
      const { setTelegramAuth } = useUserStore.getState();
      setTelegramAuth(false);
      throw new Error(response.data.message);
    }

    const { setChats } = useTelegramStore.getState();
    setChats(response.data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.error("Unauthorized. Token is invalid or expired.");
      const { setToken } = useUserStore.getState();
      setToken(null);
      throw new Error("Unauthorized. Please log in again.");
    } else {
      console.error("An error occurred while fetching chats:", error.message);
      throw error;
    }
  }
};

export const fetchMessages = async (chatId: string): Promise<IMessage[]> => {
  const { token } = useUserStore.getState();
  if (!token) throw new Error("Token is missing");

  try {
    const response = await axios.get(
      `${API_URL}/telegram/chats/${chatId}/messages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { setMessages } = useTelegramStore.getState();
    setMessages(response.data);

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.error("Unauthorized. Token is invalid or expired.");
      const { setToken } = useUserStore.getState();
      setToken(null);
      throw new Error("Unauthorized. Please log in again.");
    } else {
      console.error("An error occurred while fetching chats:", error.message);
      throw error;
    }
  }
};
