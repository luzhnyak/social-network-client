"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTelegramStore } from "@/store/useStore";
import { fetchMessages } from "@/lib/api";
import PrivateRoute from "@/components/PrivateRoute";

export default function ChatMessagesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatName, setChatName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { chats, messages, setMessages } = useTelegramStore();
  const router = useRouter();

  useEffect(() => {
    params.then((resolvedParams) => setChatId(resolvedParams.id));
  }, [params]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const fetchedMessages = await fetchMessages(chatId!);
        setMessages(fetchedMessages);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    const chat = chats.find((item) => item.id.toString() === chatId);

    if (chat) {
      setChatName(chat?.name);
      loadMessages();
    } else {
      setChatName("");
      // router.push("/chats"); // Перенаправлення, якщо чату немає
    }
  }, [chatId, chats, router, setMessages]);

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <PrivateRoute>
      <div>
        <h1 className="text-2xl font-bold mb-4">{chatName}</h1>
        <ul>
          {messages.map((message) => (
            <li key={message.id} className="border p-2 mb-2">
              <p>
                <strong>{message.sender_id}</strong>: {message.text}
              </p>
              <span className="text-gray-500 text-sm">
                {new Date(message.date).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </PrivateRoute>
  );
}
