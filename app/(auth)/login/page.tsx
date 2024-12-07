"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { siteConfig as strings } from "@/config/site";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";
import { subtitle } from "@/components/primitives";
import styles from "@/styles/App.module.css";
import { useSnackbar } from "notistack";
import * as validators from "@/utils/validators";
import { useLogin } from "@/hooks/useLogin";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";

interface IFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const schema = yup.object({
  email: yup
    .string()
    .required("email_required")
    .matches(validators.emailValidator, "email_format"),
  password: yup.string().required("password_required"),
  rememberMe: yup.boolean(),
});

export default function LoginPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { login, isLoading } = useLogin();
  const { validators } = strings;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema as yup.AnyObjectSchema) });

  async function onSubmit(data: IFormInputs) {    
    const result = await login(
      {
        email: data.email,
        password: data.password,
      },
      data.rememberMe
    );
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
        <h1 className={subtitle()}>{strings.auth.login.title}</h1>
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
          <Input
            {...register("password")}
            type="password"
            label={strings.auth.password}
            isInvalid={!!errors.password}
            errorMessage={
              validators[errors.password?.message as keyof typeof validators] ??
              ""
            }
            classNames={{
              inputWrapper: ["dark:hover:bg-default-100/70"],
            }}
          />
          <Checkbox
            {...register("rememberMe")}
            radius="sm"
            classNames={{
              base: "flex lg:inline-flex justify-between lg:justify-start flex-row-reverse lg:flex-row max-w-full lg:max-w-fit px-0 m-0 py-1",
              wrapper: "mr-0.5 lg:mr-2.5",
              label: "text-default-700",
            }}
          >
            {strings.auth.login.remember_me}
          </Checkbox>
          <Link href="/restore-password" className="text-default-400" size="sm">
            {strings.auth.login.forgot_password}
          </Link>
          <Button
            fullWidth
            isLoading={isLoading}
            type="submit"
            color="primary"
            size="lg"
            className={styles.btn}
          >
            {strings.auth.login.log_in}
          </Button>
        </div>
        <p className="text-default-400 text-sm text-center mb-6">
          {strings.auth.login.or_login_with}
        </p>
        <div className="grid place-items-center">
          <GoogleLoginButton />
        </div>
      </form>
    </div>
  );
}
