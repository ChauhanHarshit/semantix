// This is a server component for Next.js metadata
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Semantix App",
  description: "Web3-powered Next.js app",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
