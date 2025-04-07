"use client"

import { MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for chats
const mockChats = Array(10).fill({
  title: "GTM Strategy for Semantix",
  description: "What should be our go to market strategy and how will we acquire user? Write a detailed solution?",
})

export default function ChatsView() {
  const router = useRouter()

  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-white">Dashboard</h1>
          <p className="text-gray-400">You'll see all of your stats over here</p>
        </div>

        <button
          className="bg-gray-200 text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
          onClick={() => router.push(`/agent-build`)}
        >
          Build Agent
        </button>
      </div>

      {/* Chats container */}
      <div className="bg-black/40 border border-gray-700 rounded-2xl p-6 h-[600px] overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {mockChats.map((chat, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 hover:bg-black/20 rounded-lg cursor-pointer transition-colors"
            >
              <div className="mt-1 text-white">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-white font-medium">{chat.title}</h3>
                <p className="text-gray-400 text-sm">{chat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

