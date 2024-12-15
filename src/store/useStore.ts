import { IChat, IMessage } from "@/types/telegram";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserState {
  token: string | null;
  setToken: (token: string | null) => void;
}

interface TelegramState {
  chats: IChat[];
  messages: IMessage[];
  setChats: (chats: IChat[]) => void;
  setMessages: (chats: IMessage[]) => void;
}

// export const useToken = create<UserState>()(
//   devtools(
//     persist(
//       (set) => ({
//         token: null,
//         setToken: async (token) => {
//           set(() => ({ token }));
//         },
//       }),
//       { name: "token" }
//     ),
//     { name: "token" }
//   )
// );

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (token) => {
          set(() => ({ token }));
        },
      }),
      {
        name: "user-storage",
      }
    ),
    {
      name: "User",
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

    { name: "telegram-storage" }
  )
);
