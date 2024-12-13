"use client";

import { useState, useEffect } from "react";
import { fetchChats } from "@/lib/api";

export default function ChatsPage() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchChats(token)
      .then((res) => setChats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Ваші чати</h1>
      <ul className="mt-4">
        {chats.map((chat) => (
          <li key={chat.id} className="p-2 mb-2 border rounded">
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
