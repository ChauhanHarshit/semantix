"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSDK } from "@metamask/sdk-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { sdk, connected, account } = useSDK();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    // Load wallet address from localStorage on initial render
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      if (accounts?.length) {
        setWalletAddress(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]); // Save to localStorage
      }
    } catch (err) {
      console.warn("Failed to connect..", err);
    }
  };

  return (
    <nav className="m-2 bg-gradient-to-r from-gray-900 to-[#0A3D2E] py-4 px-6 flex items-center justify-between rounded-lg">
      {/* Logo */}
      <button
        className="text-white text-xl font-bold"
        onClick={() => router.push(`/`)}
      >
        Semantix
      </button>

      {/* Center Links */}
      <div className="text-white font-medium">
        <Link href="/marketplace" className="hover:text-gray-300 transition">
          Marketplace
        </Link>
      </div>

      {/* Wallet Connection Button */}
      <Button
        onClick={connect}
        className="bg-[#8de0c8] hover:bg-[#7bc9b3] text-black font-bold rounded-md"
      >
        {walletAddress
          ? `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}`
          : "Connect Wallet"}
      </Button>
    </nav>
  );
};

export default Navbar;
