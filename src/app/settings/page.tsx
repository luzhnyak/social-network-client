"use client";

import { useState, useEffect } from "react";
import {
  getUserSettings,
  connectTelegram,
  disconnectTelegram,
  SettingsResponse,
} from "@/lib/api";
import RouteGuard from "@/components/RouteGuard";

export default function SettingsPage() {
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getUserSettings(token)
      .then((data: SettingsResponse) =>
        setTelegramConnected(data.telegramConnected)
      )
      .catch(() => setError("Не вдалося завантажити налаштування."));
  }, []);

  const handleConnect = async () => {
    const token = localStorage.getItem("token");
    try {
      await connectTelegram(token!);
      setTelegramConnected(true);
    } catch {
      setError("Помилка при підключенні Telegram.");
    }
  };

  const handleDisconnect = async () => {
    const token = localStorage.getItem("token");
    try {
      await disconnectTelegram(token!);
      setTelegramConnected(false);
    } catch {
      setError("Помилка при відключенні Telegram.");
    }
  };

  return (
    <RouteGuard>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Налаштування</h1>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <div className="mt-4">
          <p>
            Telegram статус:{" "}
            {telegramConnected ? "Підключено" : "Не підключено"}
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
    </RouteGuard>
  );
}
