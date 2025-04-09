"use client"

import Link from "next/link"
import { Button } from "../components/ui/Button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { useConnect, useAccount, useDisconnect } from "wagmi"

const Navbar = () => {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)
  const [networkDropdown, setNetworkDropdown] = useState(false)

  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const toggleNetworkDropdown = () => {
    setNetworkDropdown(!networkDropdown)
  }

  const handleConnect = () => {
    if (!isConnected && connectors.length > 0) {
      connect({ connector: connectors[0] })
    }
  }

  const logout = () => {
    disconnect()
    setShowDropdown(false)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".network-dropdown-container") && networkDropdown) {
        setNetworkDropdown(false)
      }
      if (!target.closest(".wallet-dropdown-container") && showDropdown) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [networkDropdown, showDropdown])

  return (
    <nav className="m-2 bg-gradient-to-r from-gray-900 to-[#0A3D2E] py-3 px-6 flex items-center justify-between rounded-lg">
      {/* Logo */}
      <button className="text-white text-xl font-bold" onClick={() => router.push(`/`)}>
        Semantix
      </button>

      {/* Center Links */}
      {/* <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8"> */}
      {/* <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex space-x-8"> */}
      <div className="hidden xl:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:flex space-x-8">
        <Link href="/about" className="text-white font-medium hover:text-gray-300 transition">
          About
        </Link>
        <Link href="/how-it-works" className="text-white font-medium hover:text-gray-300 transition">
          How it works?
        </Link>
        <Link href="/marketplace" className="text-white font-medium hover:text-gray-300 transition">
          Marketplace
        </Link>
        <Link href="/stake" className="text-white font-medium hover:text-gray-300 transition">
          Stake
        </Link>
      </div>

      {/* Right-side Buttons */}
      <div className="flex items-center gap-3">
        {/* Token Balance - Show only if connected */}
        {isConnected && <div className="text-white font-medium">100 $SEM</div>}

        {/* Network Dropdown */}
        {isConnected && (
          <div className="relative network-dropdown-container">
            <Button
              onClick={toggleNetworkDropdown}
              className="bg-[#8de0c8] hover:bg-[#7bc9b3] text-black font-bold rounded-md flex items-center"
            >
              Network
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>

            {networkDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-md z-10">
                <ul className="py-1">
                  <li className="px-4 py-2 text-white hover:bg-gray-700 transition cursor-pointer">Sepolia</li>
                  <li className="px-4 py-2 text-white hover:bg-gray-700 transition cursor-pointer">Aptos</li>
                  <li className="px-4 py-2 text-white hover:bg-gray-700 transition cursor-pointer">Amoy</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Wallet Connect / Disconnect */}
        <div className="relative wallet-dropdown-container">
          <Button
            onClick={() => {
              if (isConnected) {
                setShowDropdown(!showDropdown)
              } else {
                handleConnect()
              }
            }}
            className="bg-[#8de0c8] hover:bg-[#7bc9b3] text-black font-bold rounded-md"
          >
            {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Connect Wallet"}
          </Button>

          {/* Logout Dropdown */}
          {showDropdown && isConnected && (
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

        {/* Profile Button */}
        {isConnected && (
          <Button className="bg-[#8de0c8] hover:bg-[#7bc9b3] text-black font-bold rounded-md">Profile</Button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
