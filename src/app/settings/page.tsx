"use client";

import { useState, useEffect } from "react";
import {
  getUserSettings,
  connectTelegram,
  disconnectTelegram,
} from "@/lib/api";

export default function SettingsPage() {
  const [telegramConnected, setTelegramConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getUserSettings(token)
      .then((res) => setTelegramConnected(res.data.telegramConnected))
      .catch((err) => console.error(err));
  }, []);

  const handleConnect = async () => {
    const token = localStorage.getItem("token");
    await connectTelegram(token);
    setTelegramConnected(true);
  };

  const handleDisconnect = async () => {
    const token = localStorage.getItem("token");
    await disconnectTelegram(token);
    setTelegramConnected(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Налаштування</h1>
      <div className="mt-4">
        <p>
          Telegram статус: {telegramConnected ? "Підключено" : "Не підключено"}
        </p>
        {telegramConnected ? (
          <button
            onClick={handleDisconnect}
            className="p-2 mt-4 text-white bg-red-500 rounded"
          >
            Відключити Telegram
          </button>
        ) : (
          <button
            onClick={handleConnect}
            className="p-2 mt-4 text-white bg-green-500 rounded"
          >
            Підключити Telegram
          </button>
        )}
      </div>
    </div>
  );
}
