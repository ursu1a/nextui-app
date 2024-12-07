"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { siteConfig as strings } from "@/config/site";
import { subtitle } from "@/components/primitives";
import * as validators from "@/utils/validators";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import styles from "@/styles/App.module.css";
import { useRegister } from "@/hooks/useRegister";

interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object({
  name: yup.string().required("name_required"),
  email: yup
    .string()
    .required("email_required")
    .matches(validators.emailValidator, "email_format"),
  password: yup
    .string()
    .required("password_required")
    .matches(validators.passwordValidator, "password_format"),
});

export default function RegisterPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { signup, isLoading } = useRegister();
  const { validators } = strings;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) });

  async function onSubmit(data: IFormInputs) {
    const result = await signup(data);
    enqueueSnackbar(result.message, {
      variant: result.success ? "success" : "error",
    });
    if (result.success) {
      router.push("/login");
    }
  }

  return (
    <div>
      <div className="container mx-auto max-w-2xl py-0 md:py-6">
        <div className="mb-5 text-center">
          <h1 className={subtitle()}>{strings.auth.register.signup}</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col gap-3 md:gap-6 mb-8">
            <Input
              {...register("name")}
              label={strings.auth.register.name}
              isInvalid={!!errors.name}
              errorMessage={
                validators[errors.name?.message as keyof typeof validators] ??
                ""
              }
              classNames={{
                inputWrapper: ["dark:hover:bg-default-100/70"],
              }}
            />
            <Input
              {...register("email")}
              label={strings.auth.email}
              isInvalid={!!errors.email}
              errorMessage={
                validators[errors.email?.message as keyof typeof validators] ??
                ""
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
                validators[
                  errors.password?.message as keyof typeof validators
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
              {strings.auth.register.create_account}
            </Button>
          </div>
          <p className="text-default-400 text-sm text-center mb-6">
            <span>{strings.auth.register.have_an_account}</span>{" "}
            <Link href="/login">
              <span className="text-sm">{strings.auth.login.title}</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
