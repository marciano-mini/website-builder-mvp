import type { Metadata } from "next";
import "../../styles/mobile.css";
import MobileRedirect from "@/components/MobileRedirect";

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