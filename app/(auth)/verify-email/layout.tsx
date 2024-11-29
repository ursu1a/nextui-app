import { Metadata } from "next";
import { siteConfig as strings } from "@/config/site";

export const metadata: Metadata = {
  title: strings.auth.email_validation,
};

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
