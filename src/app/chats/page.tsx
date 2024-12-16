"use client";

import { useEffect, useState } from "react";
import { fetchChats } from "@/lib/api";
import { useTelegramStore } from "@/store/useStore";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";

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

  return (
    <PrivateRoute>
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div>Loading chats...</div>}
      {!loading && chats && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Chats</h1>
          <ul>
            {chats.map((chat) => (
              <li key={chat.id} className="border p-2 mb-2 hover:bg-gray-200">
                <Link href={`/chats/${chat.id}`} className="">
                  <div className="flex justify-between items-center">
                    <strong className="text-blue-600 hover:text-blue-800">
                      {chat.name}
                    </strong>
                    <span className="text-gray-500 text-sm">
                      {""} {new Date(chat.last_message.date).toLocaleString()}
                    </span>
                  </div>
                  <p>
                    <strong className="text-gray-600 text-sm">
                      {chat.last_message.sender}
                    </strong>
                    :{" "}
                    <span className="text-gray-500 text-sm">
                      {chat.last_message.text}
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </PrivateRoute>
  );
}
