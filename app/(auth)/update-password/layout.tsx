import { Metadata } from "next";
import { siteConfig as strings } from "@/config/site";

export const metadata: Metadata = {
  title: strings.auth.update_password,
};

export default function RestorePasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
