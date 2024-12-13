"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser, AuthData } from "@/lib/api";
import { useUserStore } from "@/store/useStore";
import RestrictedRoute from "@/components/RestrictedRoute";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState<AuthData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const { setToken } = useUserStore();

  // const { setToken } = useUserStore((state) => ({
  //   setToken: state.setToken,
  // }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = isRegister
        ? await registerUser(formData)
        : await loginUser(formData);

      setToken(response.token);
      router.push("/settings");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Не вдалося виконати запит. Спробуйте ще раз."
      );
    }
  };

  return (
    <RestrictedRoute>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded shadow-md"
        >
          <h2 className="mb-4 text-xl font-bold">
            {isRegister ? "Реєстрація" : "Авторизація"}
          </h2>
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
          >
            {isRegister ? "Вже є обліковий запис?" : "Створити обліковий запис"}
          </p>
        </form>
      </div>
    </RestrictedRoute>
  );
}
