"use client";

import {
  connectTelegram,
  disconnectTelegram,
  getUserSettings,
} from "@/lib/api";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getUserSettings();
        setTelegramConnected(settings.telegramConnected);
      } catch (error) {
        console.error("Failed to fetch settings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleConnect = async () => {
    try {
      await connectTelegram();
      setTelegramConnected(true);
    } catch (error) {
      console.error("Failed to connect Telegram", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectTelegram();
      setTelegramConnected(false);
    } catch (error) {
      console.error("Failed to disconnect Telegram", error);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="flex items-center justify-between border p-4">
        <span>Telegram Account</span>
        {telegramConnected ? (
          <button
            onClick={handleDisconnect}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={handleConnect}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
}
