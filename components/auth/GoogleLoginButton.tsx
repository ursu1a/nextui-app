"use client";
import clsx from "clsx";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import styles from "@/styles/App.module.css";
import { siteConfig as strings } from "@/config/site";
import { openOAuthWindow } from "@/lib/authService";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setAuth } from "@/store/slices/authSlice";

export const GoogleLoginButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const googleOAuthUrl = `${API_BASE_URL}${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_PATH}`;

  const handleLogin = () => {
    setIsLoading(true);
    const authWindow = openOAuthWindow(googleOAuthUrl, "GoogleLogin", 500, 600);

    if (authWindow) {
      const messageListener = (event: MessageEvent) => {
        if (event.origin === API_BASE_URL) {
          const { access_token: token, refresh_token } = event.data;

          if (token) {
            dispatch(setAuth({ token }));
            localStorage.setItem("authToken", token);
            localStorage.setItem("refreshToken", refresh_token);

            window.removeEventListener("message", messageListener);
            authWindow.close();
            setIsLoading(false);
            router.push("/");
          }
        }
      };

      window.addEventListener("message", messageListener);
    }
  };

  return (
    <Button
      isLoading={isLoading}
      className={clsx(
        "text-default-700 bg-default-100 min-w-full lg:min-w-64",
        styles.btn
      )}
      size="md"
      variant="flat"
      onClick={handleLogin}
    >
      {strings.auth.google}
    </Button>
  );
};
