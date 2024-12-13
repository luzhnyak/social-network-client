"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useStore";

interface RestrictedRouteProps {
  children: ReactNode;
}

export default function RestrictedRoute({ children }: RestrictedRouteProps) {
  const router = useRouter();
  const { token } = useUserStore();

  useEffect(() => {
    if (token) {
      router.push("/chats");
    }
  }, [router, token]);

  return <>{children}</>;
}
