"use client";

import { useEffect, useState } from "react";
import { fetchChats } from "@/lib/api";
import { useTelegramStore } from "@/store/useStore";
import Link from "next/link";

export default function ChatsPage() {
  const { chats, setChats } = useTelegramStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const chatsData = await fetchChats();
        setChats(chatsData);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load chats");
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [setChats]);

  if (loading) return <div>Loading chats...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Chats</h1>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} className="border p-2 mb-2">
            <Link
              href={`/chats/${chat.id}`}
              className="text-blue-600 hover:underline"
            >
              {chat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
