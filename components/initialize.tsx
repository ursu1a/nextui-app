"use client";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMe } from "@/hooks/useMe";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { initAuth } from "@/store/slices/authSlice";
import { useApp } from "@/hooks/useApp";
import LoadingProgress from "./feedback/LoadingProgress";

export default function () {
  const dispatch = useAppDispatch();
  const { isLoading } = useApp();
  const { isAuthenticated } = useAuth();
  const getMe = useMe();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      getMe();
    }
  }, [isAuthenticated]);

  return <>{isLoading && <LoadingProgress />}</>;
}
