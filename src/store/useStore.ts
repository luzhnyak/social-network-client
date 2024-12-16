import { IChat, IMessage } from "@/types/telegram";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserState {
  token: string | null;
  isTelegramAuth: boolean;
  setToken: (token: string | null) => void;
  setTelegramAuth: (isAuth: boolean) => void;
}

interface TelegramState {
  chats: IChat[];
  messages: IMessage[];
  setChats: (chats: IChat[]) => void;
  setMessages: (chats: IMessage[]) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        isTelegramAuth: false,
        setToken: (token) => {
          set(() => ({ token }));
        },
        setTelegramAuth: (isAuth) => {
          set(() => ({ isTelegramAuth: isAuth }));
        },
      }),
      {
        name: "user-storage",
      }
    ),
    {
      name: "User-storage",
    }
  )
);

export const useTelegramStore = create<TelegramState>()(
  devtools(
    (set) => ({
      chats: [],
      messages: [],
      setChats: (chats) => set({ chats }),
      setMessages: (messages) => set({ messages }),
    }),

    { name: "Telegram-storage" }
  )
);
