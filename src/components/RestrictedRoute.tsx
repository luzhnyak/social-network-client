"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useStore";

interface RestrictedRouteProps {
  children: ReactNode;
}

export default function RestrictedRoute({ children }: RestrictedRouteProps) {
  const router = useRouter();
  const { token, isTelegramAuth } = useUserStore();

  useEffect(() => {
    if (token && isTelegramAuth) {
      router.push("/chats");
    } else if (token && !isTelegramAuth) {
      router.push("/settings");
    }
  }, [router, token, isTelegramAuth]);

  return <>{children}</>;
}
