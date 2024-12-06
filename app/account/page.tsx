"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { title } from "@/components/primitives";
import { siteConfig as strings } from "@/config/site";
import ProtectedRoute from "@/components/protected";
import styles from "@/styles/App.module.css";
import ConfirmActionModal from "@/components/feedback/ConfirmModal";

export default function AccountPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { validators } = strings;

  const [needConfirm, setNeedConfirm] = useState(false);

  const onRemoveClick = (e: any) => {
    setNeedConfirm(true);
  };

  return (
    <ProtectedRoute hideContent>
      <div className="container mx-auto max-w-2xl py-0 md:py-6">
        <ConfirmActionModal
          shown={needConfirm}
          actionText={strings.account.remove_account.toLowerCase()}
          closeHandler={() => setNeedConfirm(false)}
        />
        <div className="bg-main p-6 lg:p-8 rounded-lg">
          <div className="mb-4 lg:mb-6">
            <p className={title({ size: "sm" })}>
              {strings.account.description}
            </p>
          </div>
          <div className="w-full flex flex-col gap-3 md:gap-6 mb-8">
            <Input
              label={strings.account.username}
              placeholder={strings.account.username_placeholder}
              labelPlacement="outside"
              classNames={{
                inputWrapper: ["dark:hover:bg-default-100/70"],
              }}
              size="lg"
            />
            <Input
              label={strings.account.email}
              placeholder={strings.account.email_placeholder}
              labelPlacement="outside"
              classNames={{
                inputWrapper: ["dark:hover:bg-default-100/70"],
              }}
              size="lg"
            />
            <Input
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
              type="submit"
              color="primary"
              size="lg"
              className={styles.btn}
            >
              {strings.account.save_changes}
            </Button>
            <Link
              as="button"
              color="danger"
              underline="hover"
              onPress={onRemoveClick}
            >
              {strings.account.remove_account}
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
