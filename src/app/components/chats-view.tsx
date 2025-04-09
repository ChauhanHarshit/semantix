"use client"

import { useEffect, useState } from "react"
import { MessageSquare, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Chat } from "@/app/actions/chat"

export default function ChatsView() {
  const router = useRouter()
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch("/api/chats")
        if (response.ok) {
          const data = await response.json()
          setChats(data)
        }
      } catch (error) {
        console.error("Error fetching chats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChats()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-white">Dashboard</h1>
          <p className="text-gray-400">You'll see all of your chats over here</p>
        </div>

        <button
          className="bg-gray-200 text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
          onClick={() => router.push(`/agent`)}
        >
          New Chat
        </button>
      </div>

      {/* Chats container */}
      <div className="bg-black/40 border border-gray-700 rounded-2xl p-6 h-[600px] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        ) : chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No chats yet</p>
            <p className="text-sm mt-2">Start a new conversation to see it here</p>
            <button
              className="mt-6 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition"
              onClick={() => router.push("/agent")}
            >
              Start a new chat
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-start gap-3 p-3 hover:bg-black/20 rounded-lg cursor-pointer transition-colors"
                onClick={() => router.push(`/agent?id=${chat.id}`)}
              >
                <div className="mt-1 text-white">
                  <MessageSquare size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{chat.title}</h3>
                  <p className="text-gray-400 text-sm truncate">
                    {chat.messages[chat.messages.length - 1]?.systemResponse ||
                      chat.messages[chat.messages.length - 1]?.text ||
                      ""}
                  </p>
                </div>
                <div className="text-xs text-gray-500">{formatDate(chat.updatedAt.toString())}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

