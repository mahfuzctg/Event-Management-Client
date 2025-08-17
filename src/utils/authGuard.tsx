"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/features/auth/utils";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setMounted(true); // ensures no SSR mismatch
    const loggedIn = isLoggedIn();
    setAuthenticated(loggedIn);

    if (!loggedIn) {
      router.push("/auth/login");
    }
  }, [router]);

  if (!mounted) {
    return null; 
  }

  if (!authenticated) {
    return null; 
  }

  return <>{children}</>;
}
