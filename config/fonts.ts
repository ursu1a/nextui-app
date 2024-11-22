import { Fira_Code as FontMono, Manrope as FontManrope } from "next/font/google";

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontManrope = FontManrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});