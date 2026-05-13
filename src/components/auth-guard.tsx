"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { DotmCircular14 } from "./ui/dotm-circular-14";

function LoadingFallback() {
  return (
    <div className="w-full h-screen grid place-items-center">
      <DotmCircular14
        size={32}
        dotSize={4}
        speed={1.4}
        opacityBase={0.1}
        opacityMid={0.4}
        opacityPeak={0.95}
      />
    </div>
  );
}

function AuthCheck({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useQuery(api.auth.isAuthenticated);
  const router = useRouter();

  const handleAuthCheck = useCallback(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    handleAuthCheck();
  }, [handleAuthCheck]);

  if (isAuthenticated === true) {
    return <>{children}</>;
  }

  return <LoadingFallback />;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingFallback />;
  }

  return <AuthCheck>{children}</AuthCheck>;
}
