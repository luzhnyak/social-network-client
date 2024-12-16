"use client";

import "./globals.css";
import Link from "next/link";
import { useUserStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { refreshUser } from "@/lib/api";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, setToken, isTelegramAuth } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      refreshUser();
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    router.push("/auth");
  };

  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        {token && (
          <nav className="bg-white shadow mb-4">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
              <div className="flex gap-4">
                {isTelegramAuth && (
                  <Link href="/chats" className="text-blue-600 hover:underline">
                    Chats
                  </Link>
                )}
                <Link
                  href="/settings"
                  className="text-blue-600 hover:underline"
                >
                  Settings
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </nav>
        )}
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
