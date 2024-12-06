import { Metadata } from "next";
import { siteConfig as strings } from "@/config/site";

export const metadata: Metadata = {
  title: strings.account.title,
};

export default function RestorePasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
