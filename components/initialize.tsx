"use client";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMe } from "@/hooks/useMe";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { initAuth } from "@/store/slices/authSlice";
import apiClient from "@/api/apiClient";

export default function CustomElements() {
  const dispatch = useAppDispatch();
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

  return <></>;
}
