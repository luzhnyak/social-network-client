"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/lib/api";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = isRegister
        ? await registerUser(formData)
        : await loginUser(formData);

      localStorage.setItem("token", response.data.token);
      router.push("/settings");
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">
          {isRegister ? "Реєстрація" : "Авторизація"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {isRegister ? "Зареєструватися" : "Увійти"}
        </button>
        <p
          className="mt-4 text-sm text-center text-blue-500 cursor-pointer"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Вже є обліковий запис?" : "Створити обліковий запис"}
        </p>
      </form>
    </div>
  );
}
