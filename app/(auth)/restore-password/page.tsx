"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { siteConfig as strings } from "@/config/site";
import { subtitle, title } from "@/components/primitives";
import * as validators from "@/utils/validators";
import styles from "@/styles/App.module.css";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import { enqueueSnackbar } from "notistack";

interface IFormInputs {
  email: string;
}

const schema = yup.object({
  email: yup
    .string()
    .required("email_required")
    .matches(validators.emailValidator, "email_format"),
});

export default function RestorePasswordPage() {
  const router = useRouter();
  const { validators } = strings;
  const { passwordReset, isLoading } = usePasswordReset();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema as any) });

  async function onSubmit(data: IFormInputs) {
    const result = await passwordReset(data.email);
    enqueueSnackbar(result.message, {
      variant: result.success ? "success" : "error",
    });
    if (result.success) {
      router.push("/");
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-0 md:py-6">
      <div className="mb-8 text-center">
        <h1 className={title({ size: "sm" })}>
          {strings.auth.restore_password}
        </h1>
        <p className={subtitle()}>
          {strings.auth.restore_password_description}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-3 md:gap-6 mb-2">
          <Input
            {...register("email")}
            label={strings.auth.email}
            isInvalid={!!errors.email}
            errorMessage={
              validators[errors.email?.message as keyof typeof validators] ?? ""
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
            {strings.auth.send}
          </Button>
        </div>
      </form>
    </div>
  );
}
