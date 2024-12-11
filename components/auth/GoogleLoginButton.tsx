import clsx from "clsx";
import { Button } from "@nextui-org/button";
import styles from "@/styles/App.module.css";
import { siteConfig as strings } from "@/config/site";
import { useOAuthWindow } from "@/hooks/useOAuthWindow";

export const GoogleLoginButton = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const googleOAuthUrl = `${API_BASE_URL}${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_PATH}`;
  
  const { openOAuthWindow, isOpened } = useOAuthWindow(
    googleOAuthUrl,
    "GoogleLogin",
    500,
    600
  );

  return (
    <Button
      isLoading={isOpened}
      className={clsx(
        "text-default-700 bg-default-100 min-w-full lg:min-w-64",
        styles.btn
      )}
      size="md"
      variant="flat"
      onClick={openOAuthWindow}
    >
      {strings.auth.google}
    </Button>
  );
};
