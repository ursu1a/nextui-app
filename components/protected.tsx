"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/hooks/useApp";

export interface ProtectedRouteProps {
  children: ReactNode;
  hideContent?: boolean;
}

const ProtectedRoute = ({
  children,
  hideContent = false,
}: ProtectedRouteProps) => {
  const { isLoading } = useApp();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading === false && !isAuthenticated) {
      // Redirect to login page
      router.push("/login");
    }
  }, [isLoading, isAuthenticated]);

  if (hideContent && (isLoading || !isAuthenticated)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
