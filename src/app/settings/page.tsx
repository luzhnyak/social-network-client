"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1); // Крок форми
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Phone number ${phone} submitted!`);
    setStep(2); // Перехід до наступного кроку
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Verification code ${code} submitted!`);
    setStep(3); // Перехід до кроку з паролем
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`2FA password submitted successfully!`);
    setStep(1); // Повернення до початкового кроку
    setPhone("");
    setCode("");
    setPassword("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      {step === 1 && (
        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <label htmlFor="phone" className="block font-medium">
            Enter your phone number:
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

      {step === 2 && (
        <form onSubmit={handleCodeSubmit} className="space-y-4">
          <label htmlFor="code" className="block font-medium">
            Enter the verification code sent to your phone:
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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

      {step === 3 && (
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
  );
}
