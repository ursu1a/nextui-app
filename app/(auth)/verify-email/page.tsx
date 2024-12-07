"use client";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { siteConfig as strings } from "@/config/site";
import { useSnackbar } from "notistack";
import { useAuth } from "@/hooks/useAuth";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const { verifyEmail } = useAuth();
  const token = searchParams.get("token") || "";

  useEffect(() => {
    if (!isEmpty(token)) {
      verifyEmail(token).then((result) => {
        enqueueSnackbar(result.message, {
          variant: result.success ? "success" : "error",
        });
      });
      router.push("/");
    } else {
      enqueueSnackbar(strings.errors.email_validation_token_empty, {
        variant: "error",
      });
    }
  }, [token]);

  return <></>;
}
