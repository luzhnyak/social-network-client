import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserState {
  token: string | null;
  setToken: (token: string | null) => void;
}

interface ChatState {
  chats: { id: string; name: string }[];
  setChats: (chats: { id: string; name: string }[]) => void;
  clearChats: () => void;
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

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  setChats: (chats) => set({ chats }),
  clearChats: () => set({ chats: [] }),
}));
