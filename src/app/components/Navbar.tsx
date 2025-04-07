"use client"
import Link from "next/link"
import { Button } from "../components/ui/Button"
import { useSDK } from "@metamask/sdk-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown} from "lucide-react"

const Navbar = () => {
  const router = useRouter()
  const { sdk } = useSDK()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [networkDropdown, setNetworkDropdown] = useState(false)

  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress")
    if (savedAddress) {
      setWalletAddress(savedAddress)
    }
  }, [])

  const connect = async () => {
    try {
      const accounts = await sdk?.connect()
      if (accounts?.length) {
        setWalletAddress(accounts[0])
        localStorage.setItem("walletAddress", accounts[0])
      }
    } catch (err) {
      console.warn("Failed to connect..", err)
    }
  }

  const logout = () => {
    setWalletAddress(null)
    localStorage.removeItem("walletAddress")
    setShowDropdown(false)
  }

  const toggleNetworkDropdown = () => {
    setNetworkDropdown(!networkDropdown)
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

{/* <nav className="relative m-2 bg-gradient-to-r from-gray-900 to-[#0A3D2E] py-4 px-6 flex items-center rounded-lg"> */}

      {/* Logo */}
      <button className="text-white text-xl font-bold" onClick={() => router.push(`/`)}>
        Semantix
      </button>

      {/* Navigation Links - Always centered regardless of login state */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8">
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
        {/* Token Balance - Only visible when logged in */}
        {walletAddress && <div className="text-white font-medium">100 $SEM</div>}

        {/* Network Dropdown - Only visible when logged in */}
        {walletAddress && (
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
                  <li className="px-4 py-2 text-white hover:bg-gray-700 transition cursor-pointer">Sepolis</li>
                  <li className="px-4 py-2 text-white hover:bg-gray-700 transition cursor-pointer">Aptos</li>
                  <li className="px-4 py-2 text-white hover:bg-gray-700 transition cursor-pointer">Amoy</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Wallet Connection Button */}
        <div className="relative wallet-dropdown-container">
          <Button
            onClick={() => {
              if (walletAddress) {
                setShowDropdown(!showDropdown)
              } else {
                connect()
              }
            }}
            className="bg-[#8de0c8] hover:bg-[#7bc9b3] text-black font-bold rounded-md"
          >
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
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

        {/* Profile Button - Only visible when logged in */}
        {walletAddress && (
          <Button className="bg-[#8de0c8] hover:bg-[#7bc9b3] text-black font-bold rounded-md">Profile</Button>
        )}
      </div>
    </nav>
  )
}

export default Navbar

