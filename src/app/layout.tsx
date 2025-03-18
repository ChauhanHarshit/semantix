"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { AgentProvider } from "../context/AgentContext"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <AgentProvider>
        <MetaMaskProvider
          debug={true}
          sdkOptions={{
            checkInstallationImmediately: false,
            dappMetadata: {
              name: "Semantix",
              url: "http://localhost:3000", // Update for production
            },
          }}
        >
          {children}
        </MetaMaskProvider>
        </AgentProvider>
      </body>
    </html>
  );
}
