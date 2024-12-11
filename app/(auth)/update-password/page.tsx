"use client";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { siteConfig as strings } from "@/config/site";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import * as validators from "@/utils/validators";
import styles from "@/styles/App.module.css";
import { subtitle } from "@/components/primitives";
import { usePasswordReset } from "@/hooks/usePasswordReset";

interface IFormInputs {
  password: string;
  passwordConfirm: string;
}

const schema = () => yup.object({
  password: yup
    .string()
    .required("password_required")
    .matches(validators.passwordValidator, "email_format"),
  passwordConfirm: yup
    .string()
    .required("password_required")
    .oneOf([yup.ref("password")], "passwords_not_equal"),
});

export default function UpdatePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, passwordUpdate } = usePasswordReset();
  const { validators } = strings;
  const schemaInstance = schema();
  const { enqueueSnackbar } = useSnackbar();
  const token = searchParams.get("token") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schemaInstance) });

  useEffect(() => {
    if (isEmpty(token)) {
      enqueueSnackbar(strings.errors.restore_token_empty, {
        variant: "error",
      });
      router.push("/");
    }
  }, [token]);

  async function onSubmit(data: IFormInputs) {
    const result = await passwordUpdate({
      token: token,
      password: data.password,
    });
    enqueueSnackbar(result.message, {
      variant: result.success ? "success" : "error",
    });
    if (result.success) {
      router.push("/");
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-0 md:py-6">
      <div className="mb-5 text-center">
        <h1 className={subtitle()}>{strings.auth.update_password}</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-3 md:gap-6 mb-2">
          <Input
            {...register("password")}
            type="password"
            label={strings.auth.new_password}
            isInvalid={!!errors.password}
            errorMessage={
              validators[errors.password?.message as keyof typeof validators] ??
              ""
            }
            classNames={{
              inputWrapper: ["dark:hover:bg-default-100/70"],
            }}
          />
          <Input
            {...register("passwordConfirm")}
            type="password"
            label={strings.auth.new_password_repeat}
            isInvalid={!!errors.passwordConfirm}
            errorMessage={
              validators[
                errors.passwordConfirm?.message as keyof typeof validators
              ] ?? ""
            }
            classNames={{
              inputWrapper: ["dark:hover:bg-default-100/70"],
            }}
          />
          <Button
            fullWidth
            isLoading={isLoading}
            type="submit"
            color="primary"
            size="lg"
            className={styles.btn}
          >
            {strings.auth.confirm}
          </Button>
        </div>
      </form>
    </div>
  );
}
