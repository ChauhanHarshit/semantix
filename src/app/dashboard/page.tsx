"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import { useRouter } from "next/navigation"
import { useAgentContext } from "../../context/AgentContext"
import AgentCard from "../components/agent-card"
import ChatsView from "../components/chats-view"

export default function Dashboard() {
  const router = useRouter()
  const { agents } = useAgentContext()
  const [activeTab, setActiveTab] = useState("agents") // Default active tab is "agents"

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg1.png')" }}>
      {/* Main container with padding */}
      <div className="p-4">
        <Navbar />
        <br />

        {/* Main content area with sidebar and dashboard */}
        <div className="flex gap-4">
          {/* Sidebar with fixed height */}
          <div className="w-72 bg-black/40 border border-gray-700 rounded-2xl p-4 h-[600px]">
            <nav className="flex flex-col gap-6">
              <div
                className={`p-4 font-bold text-white cursor-pointer rounded-lg transition duration-300 ${
                  activeTab === "agents" ? "bg-gradient-to-r from-black to-[#0A3D2E]" : "hover:bg-black/30"
                }`}
                onClick={() => setActiveTab("agents")}
              >
                Agents
              </div>
              <div
                className={`p-4 font-bold text-white cursor-pointer rounded-lg transition duration-300 ${
                  activeTab === "chats" ? "bg-gradient-to-r from-black to-[#0A3D2E]" : "hover:bg-black/30"
                }`}
                onClick={() => setActiveTab("chats")}
              >
                Chats
              </div>
              <div
                className={`p-4 font-bold text-white cursor-pointer rounded-lg transition duration-300 ${
                  activeTab === "settings" ? "bg-gradient-to-r from-black to-[#0A3D2E]" : "hover:bg-black/30"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </div>
            </nav>
          </div>

          {/* Dashboard content */}
          <div className="flex-1">
            {/* Render "Agents" Tab */}
            {activeTab === "agents" && (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-1 text-white">Dashboard</h1>
                    <p className="text-gray-400">You will see all of your stats over here</p>
                  </div>

                  <button
                    className="bg-gray-200 text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
                    onClick={() => router.push(`/agent-build`)}
                  >
                    Build Agent
                  </button>
                </div>

                {/* Bordered container for cards */}
                <div className="bg-black/40 border border-gray-700 rounded-2xl p-6 h-[600px] overflow-y-auto">
                  {agents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="mb-4 text-lg text-white">No agents created yet</p>
                      <button
                        className="bg-gray-200 text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
                        onClick={() => router.push(`/agent-build`)}
                      >
                        Build Agent
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {agents.map((agent, index) => (
                        <AgentCard key={index} agent={agent} highlighted={index === agents.length - 1} />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Render "Chats" Tab */}
            {activeTab === "chats" && <ChatsView />}

            {/* Render "Settings" Tab */}
            {activeTab === "settings" && (
              <div className="bg-black/40 border border-gray-700 rounded-2xl p-6 h-[600px]">
                <h1 className="text-3xl font-bold mb-4 text-white">Settings</h1>
                <p className="text-gray-400">Settings content will go here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
