"use client";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { siteConfig as strings } from "@/config/site";
import { useRegister } from "@/hooks/useRegister";
import { useSnackbar } from "notistack";
import { Spinner } from "@nextui-org/spinner";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, verifyEmail } = useRegister();
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

  return (
    <div className="container mx-auto max-w-2xl py-0 md:py-6">
      <div className="grid gap-4 items-center">{isLoading && <Spinner />}</div>
    </div>
  );
}

