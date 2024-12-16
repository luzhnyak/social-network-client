"use client";

import PrivateRoute from "@/components/PrivateRoute";
import {
  disconnectTelegram,
  sendPassword2FA,
  sendPhoneNumber,
  sendVerifyCode,
} from "@/lib/api";
import { useUserStore } from "@/store/useStore";
import { useState } from "react";

export default function SettingsPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone_number, setPhone_number] = useState("");
  const [phone_code, setPhoneCode] = useState("");
  const [password, setPassword] = useState("");
  const [phone_code_hash, setPhone_code_hash] = useState("");
  const [session_string, setSession_string] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const { setTelegramAuth } = useUserStore();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await sendPhoneNumber({ phone_number });
    if (response.status === "code_sent") {
      setPhone_code_hash(response.phone_code_hash);
      setSession_string(response.session_string);
      setMessage(`Phone number ${phone_number} submitted!`);
      setStep(2);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await sendVerifyCode({
      phone_number,
      phone_code,
      phone_code_hash,
      session_string,
    });

    setMessage(`Verification code ${phone_code} submitted!`);
    if (response.status === "2fa_required") {
      setSession_string(response.session_string);
      setStep(3);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`2FA password submitted successfully!`);
    setStep(1);
    sendPassword2FA({ password, session_string });
    setTelegramAuth(true);
    setPhone_number("");
    setPhoneCode("");
    setPassword("");
  };

  const { isTelegramAuth } = useUserStore();

  return (
    <PrivateRoute>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        {message && <p className="mb-4 text-green-600">{message}</p>}

        {isTelegramAuth && (
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={disconnectTelegram}
          >
            Відключити телеграм акаунт
          </button>
        )}

        {!isTelegramAuth && step === 1 && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <label htmlFor="phone" className="block font-medium">
              Enter your phone number:
            </label>
            <input
              id="phone"
              type="tel"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="+1234567890"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit Phone Number
            </button>
          </form>
        )}

        {!isTelegramAuth && step === 2 && (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <label htmlFor="code" className="block font-medium">
              Enter the verification code sent to your phone:
            </label>
            <input
              id="code"
              type="text"
              value={phone_code}
              onChange={(e) => setPhoneCode(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="123456"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit Code
            </button>
          </form>
        )}

        {!isTelegramAuth && step === 3 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <label htmlFor="password" className="block font-medium">
              Enter your 2FA password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="••••••••"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit Password
            </button>
          </form>
        )}
      </div>
    </PrivateRoute>
  );
}
