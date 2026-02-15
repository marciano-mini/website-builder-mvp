import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Website Builder",
  description: "Create your professional website in 2 minutes",
};

export default function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children
}