"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { title } from "@/components/primitives";
import { siteConfig as strings } from "@/config/site";
import ProtectedRoute from "@/components/protected";
import styles from "@/styles/App.module.css";
import * as validators from "@/utils/validators";
import ConfirmActionModal from "@/components/feedback/ConfirmModal";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useAccount } from "@/hooks/useAccount";

interface IFormData {
  name: string;
  email: string;
}

const schema = yup.object({
  name: yup.string().required("name_required"),
  email: yup
    .string()
    .required("email_required")
    .matches(validators.emailValidator, "email_format"),
});

export default function AccountPage() {
  const router = useRouter();
  const { data } = useAppSelector((state) => state.user);
  const { isLoading, updateProfile, deleteAccount } = useAccount();
  const { enqueueSnackbar } = useSnackbar();
  const { validators } = strings;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  // Update form' fields
  useEffect(() => {
    reset({
      name: data?.name || "",
      email: data?.email || "",
    });
  }, [data]);

  // Save updates
  async function onSubmit(data: IFormData) {
    updateProfile(data).then((result) => {
      enqueueSnackbar(result.message, {
        variant: result.success ? "success" : "error",
      });      
    });
  }

  const [needConfirm, setNeedConfirm] = useState(false);
  const onRemoveClick = (e: any) => {
    setNeedConfirm(true);
  };

  const onRemoveConfirm = () => {
    deleteAccount().then((result) => {
      setNeedConfirm(false);
      enqueueSnackbar(result.message, {
        variant: result.success ? "success" : "error",
      });
      if (result.success) {
        router.push("/");
      }
    });
  }

  return (
    <ProtectedRoute hideContent>
      <div className="container mx-auto max-w-2xl py-0 md:py-6">
        <ConfirmActionModal
          shown={needConfirm}
          actionText={strings.account.remove_account.toLowerCase()}
          closeHandler={() => setNeedConfirm(false)}
          confirmHandler={onRemoveConfirm}
        />
        <div className="bg-main p-6 lg:p-8 rounded-lg">
          <div className="mb-5 lg:mb-8">
            <p className={title({ size: "sm" })}>
              {strings.account.description}
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col gap-3 md:gap-6 mb-8">
              <Input
                {...register("name")}
                label={strings.account.username}
                placeholder={strings.account.username_placeholder}
                isInvalid={!!errors.name}
                errorMessage={
                  validators[errors.name?.message as keyof typeof validators] ??
                  ""
                }
                labelPlacement="outside"
                classNames={{
                  inputWrapper: ["dark:hover:bg-default-100/70"],
                }}
                size="lg"
              />
              <Input
                {...register("email")}
                label={strings.account.email}
                placeholder={strings.account.email_placeholder}
                isInvalid={!!errors.email}
                errorMessage={
                  validators[
                    errors.email?.message as keyof typeof validators
                  ] ?? ""
                }
                labelPlacement="outside"
                classNames={{
                  inputWrapper: ["dark:hover:bg-default-100/70"],
                }}
                size="lg"
              />
              <Input
                isDisabled
                label={strings.account.password}
                placeholder={strings.account.password_placeholder}
                labelPlacement="outside"
                classNames={{
                  inputWrapper: ["dark:hover:bg-default-100/70"],
                }}
                size="lg"
              />
            </div>
            <div className="flex flex-col gap-y-4 items-center">
              <Button
                fullWidth
                isLoading={isLoading}
                isDisabled={!isDirty}
                type="submit"
                color="primary"
                size="lg"
                className={styles.btn}
              >
                {strings.account.save_changes}
              </Button>
              <Link
                as="button"
                type="button"
                color="danger"
                underline="hover"
                onPress={onRemoveClick}
              >
                {strings.account.remove_account}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
