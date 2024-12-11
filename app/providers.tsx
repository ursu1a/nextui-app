"use client";
import * as React from "react";
import { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { setupAxiosInterceptors } from "@/api/apiClient";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  useEffect(() => {
    setupAxiosInterceptors(store);
  }, [store]);

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <Provider store={store}>
          <SnackbarProvider
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            {children}
          </SnackbarProvider>
        </Provider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
