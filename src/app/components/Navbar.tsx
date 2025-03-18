"use client";
import Link from "next/link";
import { Button } from "../components/ui/Button";
import { useSDK } from "@metamask/sdk-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { sdk } = useSDK();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
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
        localStorage.setItem("walletAddress", accounts[0]);
      }
    } catch (err) {
      console.warn("Failed to connect..", err);
    }
  };

  const logout = () => {
    setWalletAddress(null);
    localStorage.removeItem("walletAddress");
    setShowDropdown(false);
  };

  return (
    <nav className="relative m-2 bg-gradient-to-r from-gray-900 to-[#0A3D2E] py-4 px-6 flex items-center rounded-lg">
      {/* Logo */}
      <button
        className="text-white text-xl font-bold"
        onClick={() => router.push(`/`)}
      >
        Semantix
      </button>

      {/* Centered Marketplace Link */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/marketplace" className="text-white font-medium hover:text-gray-300 transition">
          Marketplace
        </Link>
      </div>

      {/* Right-side Buttons */}
      <div className="ml-auto flex items-center gap-2">
        {/* Extra Buttons (Visible only when logged in) */}
        {walletAddress && (
          <>
            <p className="text-white font-medium">100 $SEM</p>
            <Button className="bg-[#8de0c8] hover:bg-[#7bc9b3] text-black font-bold rounded-md">
              Network
            </Button>
          </>
        )}

        {/* Wallet Connection Button */}
        <div className="relative">
          <Button
            onClick={() => {
              if (walletAddress) {
                setShowDropdown(!showDropdown);
              } else {
                connect();
              }
            }}
            className="bg-[#8de0c8] hover:bg-[#7bc9b3] text-black font-bold rounded-md"
          >
            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : "Connect Wallet"}
          </Button>

          {/* Dropdown (Logout option) */}
          {showDropdown && walletAddress && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-md z-10">
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
