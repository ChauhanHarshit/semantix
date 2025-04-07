"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import AgentCard from "../components/agent-card"
import Navbar from "../components/Navbar"

// Sample data for the agents
const agents = [
  {
    title: "Social Media Creator AI",
    description:
      "This is the description of the AI agent. This is the description of the AI agent. This is the description of the AI agent This is the description of the AI agent This is the description of the AI agent This is the description of the AI agent",
    price: "4,459 $$EM",
    parameter: "4.45K",
    rating: 4,
  },
  {
    title: "Social Media Creator AI",
    description:
      "This is the description of the AI agent. This is the description of the AI agent. This is the description of the AI agent This is the description of the AI agent This is the description of the AI agent This is the description of the AI agent",
    price: "4,459 $$EM",
    parameter: "4.45K",
    rating: 4,
  },
  {
    title: "Social Media Creator AI",
    description:
      "This is the description of the AI agent. This is the description of the AI agent. This is the description of the AI agent This is the description of the AI agent This is the description of the AI agent This is the description of the AI agent",
    price: "4,459 $$EM",
    parameter: "4.45K",
    rating: 4,
  },
  {
    title: "Social Media Creator AI",
    description:
      "This is the description of the AI agent. This is the description of the AI agent. This is the description of the AI agent This is the description of the AI agent This is the description of the AI agent This is the description of the AI agent",
    price: "4,459 $$EM",
    parameter: "4.45K",
    rating: 4,
  },
  {
    title: "Social Media Creator AI",
    description:
      "This is the description of the AI agent. This is the description of the AI agent. This is the description of the AI agent This is the description of the AI agent This is the description of the AI agent This is the description of the AI agent",
    price: "4,459 $$EM",
    parameter: "4.45K",
    rating: 4,
  },
  {
    title: "Social Media Creator AI",
    description:
      "This is the description of the AI agent. This is the description of the AI agent. This is the description of the AI agent This is the description of the AI agent This is the description of the AI agent This is the description of the AI agent",
    price: "4,459 $$EM",
    parameter: "4.45K",
    rating: 4,
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("AI Agent")

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: "url('/bg1.png')" }}>
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-8 py-8">
        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {["AI Agent", "Prompts", "AI Models"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-full text-sm ${
                  activeTab === tab ? "bg-gray-800 text-white" : "bg-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <AgentCard key={index} agent={agent} />
          ))}
        </div>
      </main>
    </div>
  )
}

