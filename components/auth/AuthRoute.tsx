"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const AuthRoute = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const isAuthRoute = (pathname: string = "") => {
    return pathname.includes("login") || pathname.includes("register");
  };

  useEffect(() => {
    if (isAuthenticated && isAuthRoute(pathname)) {
      router.push("/");
    }
  }, [isAuthenticated, pathname]);
  return <></>;
};

export default AuthRoute;
