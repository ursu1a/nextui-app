"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useMe } from "@/hooks/useMe";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { initAuth } from "@/store/slices/authSlice";
import { useApp } from "@/hooks/useApp";
import LoadingProgress from "./feedback/LoadingProgress";
import { setData } from "@/store/slices/userSlice";

export default function () {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isLoading } = useApp();
  const { isAuthenticated } = useAuth();
  const getMe = useMe();

  const checkPathname = (pathname: string) => {
    const authPaths = [
      "/login",
      "/register",
      "/restore-password",
      "/update-password",
      "/verify-email",
    ];
    return !authPaths.some((authPath) => authPath === pathname);
  };

  useEffect(() => {
    if (checkPathname(pathname)) {
      // prevent initialize auth until some authorization processes
      dispatch(initAuth());
    }
  }, [pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      getMe().then((userData) =>
        dispatch(
          setData({
            name: userData?.Name,
            email: userData?.Email,
          })
        )
      );
    }
  }, [isAuthenticated]);

  return <>{isLoading && <LoadingProgress />}</>;
}
