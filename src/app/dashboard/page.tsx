"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    // <div className="min-h-screen bg-gradient-to-b from-black to-emerald-950 text-white" style={{ backgroundImage: "url('/bg1.png')" }}>
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg1.png')" }}>
      {/* Main container with padding */}
      <div className="p-4">
        <Navbar />
        <br></br>
        {/* Main content area with sidebar and dashboard */}
        <div className="flex gap-4">
          {/* Sidebar */}
          {/* <div className="w-72 bg-black/40 border-white-500 rounded-lg p-4"> */}
          <div className="w-72 bg-black/40 border border-gray-700 rounded-2xl p-4">

            <nav className="flex flex-col gap-6">
              <div className=" bg-gradient-to-r from-black-900 to-[#0A3D2E]  p-4 rounded-lg font-bold">Agents</div>
              <div className="p-4 font-bold">Chats</div>
              <div className="p-4 font-bold">Settings</div>
            </nav>
          </div>

          {/* Dashboard content */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
                <p className="text-gray-300">You'll see all of your stats over here</p>
              </div>

              <button 
              className="bg-gray-200 text-black font-bold px-6 py-3 rounded-lg"
              onClick={() => router.push(`/agent-build`)}
              >Build Agent</button>
            </div>

            {/* Dashboard main content */}
            <div className="bg-black/40 border border-gray-700 rounded-2xl p-6 h-[600px] flex flex-col items-center justify-center">
              <p className="mb-4 text-lg">No agents created yet</p>

              <button
               className="bg-gray-200 text-black font-bold px-6 py-3 rounded-lg"
               onClick={() => router.push(`/agent-build`)}
               >Build Agent</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

