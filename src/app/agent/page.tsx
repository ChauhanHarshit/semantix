"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "../components/ui/Button"
import Navbar from "../components/Navbar"
import { generateResponse, type Message } from "../actions/chat"

export default function Agent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const chatId = searchParams.get("id")

  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Fetch messages if chatId is provided
  useEffect(() => {
    const fetchChat = async () => {
      if (chatId) {
        try {
          const response = await fetch(`/api/chats/${chatId}`)
          if (response.ok) {
            const chat = await response.json()
            setMessages(chat.messages)
          }
        } catch (error) {
          console.error("Error fetching chat:", error)
        }
      }
    }

    fetchChat()
  }, [chatId])

  // Update the handleSendMessage function to properly handle the chatId
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    // Add user message to the UI immediately
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Call the server action to generate a response
      const { aiMessage, chatId: newChatId } = await generateResponse(inputValue, chatId || undefined)

      // Add AI message to the UI
      setMessages((prev) => [...prev, aiMessage])

      // If this is a new chat, update the URL to include the chat ID
      if (!chatId && newChatId) {
        router.push(`/agent?id=${newChatId}`)
      }
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "",
          isUser: false,
          timestamp: new Date(),
          systemResponse: "Sorry, there was an error processing your request.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const ampm = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    return `${date.getDate()} Mar, ${formattedHours}:${minutes} ${ampm}`
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4">
        <h2 className="text-2xl font-bold text-center my-6">AI Assistant</h2>

        <div className="flex-1 space-y-6 overflow-y-auto mb-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Start a conversation by sending a message</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-3xl px-4 py-2 rounded-lg ${message.isUser ? "bg-zinc-800 text-white" : "bg-transparent text-gray-300"} w-full`}
                >
                  {message.isUser ? (
                    <p className="text-right">{message.text}</p>
                  ) : (
                    <>
                      {message.confidence && message.agentId && (
                        <div className="text-xs text-gray-500">
                          Confidence: {message.confidence} | Agent ID: {message.agentId}
                        </div>
                      )}
                      <p>{message.systemResponse}</p>
                    </>
                  )}
                  <div className="text-xs text-gray-500 text-right mt-1">{formatTime(new Date(message.timestamp))}</div>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-3xl px-4 py-2 rounded-lg bg-transparent text-gray-300 w-full">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="bg-zinc-900 rounded-lg p-2 flex items-center">
          <input
            type="text"
            placeholder="Ask your question"
            className="flex-1 bg-transparent outline-none p-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} className="bg-zinc-700 hover:bg-zinc-600" disabled={isLoading}>
            Send
          </Button>
        </div>
      </main>
    </div>
  )
}

