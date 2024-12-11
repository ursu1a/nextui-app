import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { setAuth } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

export const useOAuthWindow = (
  url: string,
  name: string,
  width: number,
  height: number
) => {
  const router = useRouter();
  const windowRef = useRef<Window | null>(null);
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const openOAuthWindow = () => {
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    windowRef.current = window.open(
      url,
      name,
      `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars,status`
    );

    if (windowRef.current) {
      setIsOpened(true);

      const messageListener = (event: MessageEvent) => {
        if (event.origin === API_BASE_URL) {
          const { access_token: token } = event.data;

          if (token) {
            dispatch(setAuth({ token }));
            localStorage.setItem("authToken", token);
            setIsOpened(false);
            window.removeEventListener("message", messageListener);
            router.push("/");
          }
        }

        if (event.data === "oauth_window_closed") {
          setIsOpened(false);
          windowRef.current = null;
          window.removeEventListener("message", messageListener);
        }
      };

      // Check when Popup will be closed in setInterval
      const interval = setInterval(() => {
        if (windowRef.current?.closed) {
          setIsOpened(false);
          windowRef.current = null;
          clearInterval(interval);
          window.removeEventListener("message", messageListener);
        }
      }, 500);

      window.addEventListener("message", messageListener);
    }
  };

  useEffect(() => {
    return () => {
      if (windowRef.current) {
        windowRef.current.close();
      }
    };
  }, []);

  return { openOAuthWindow, isOpened };
};
