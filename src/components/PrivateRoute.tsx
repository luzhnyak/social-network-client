"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useStore";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();
  const { token } = useUserStore();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [router, token]);

  return <>{children}</>;
}
