"use client";

import { useState, useEffect } from "react";
import { fetchChats, Chat } from "@/lib/api";
import RouteGuard from "@/components/RouteGuard";

export default function ChatsPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchChats(token)
      .then((data: Chat[]) => setChats(data))
      .catch(() => setError("Не вдалося завантажити чати."));
  }, []);

  return (
    <RouteGuard>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Ваші чати</h1>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <ul className="mt-4">
          {chats.map((chat) => (
            <li key={chat.id} className="p-2 mb-2 border rounded">
              {chat.name}
            </li>
          ))}
        </ul>
      </div>
    </RouteGuard>
  );
}
