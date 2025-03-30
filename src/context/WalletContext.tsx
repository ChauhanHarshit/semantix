"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSDK } from "@metamask/sdk-react";

interface WalletContextType {
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
  connected: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const {  connected, account } = useSDK();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (account) {
      setWalletAddress(account);
    }
  }, [account]);

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress, connected }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
