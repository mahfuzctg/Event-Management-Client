"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/features/auth/utils";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/auth/login");
    }
  }, [router]);

  return <>{isLoggedIn() ? children : null}</>;
}
