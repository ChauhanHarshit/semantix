"use client";

// import { Geist, Geist_Mono } from "next/font/google";

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '../lib/wagmi'
// import { MetaMaskProvider } from "@metamask/sdk-react";
import { AgentProvider } from "../context/AgentContext"
import "./globals.css";

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
         <AgentProvider>
        {/* <MetaMaskProvider
          debug={true}
          sdkOptions={{
            checkInstallationImmediately: false,
            dappMetadata: {
              name: "Semantix",
              url: "http://localhost:3000", // Update for production
            },
          }}
        > */}
          {children}
        {/* </MetaMaskProvider> */}
        </AgentProvider>
        </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
