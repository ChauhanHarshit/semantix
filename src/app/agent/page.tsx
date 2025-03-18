"use client"

import { useState } from "react"
import { Button } from "../components/ui/Button"
import Navbar from "../components/Navbar"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  confidence?: number
  agentId?: string
  systemResponse?: string
}

export default function Agent() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hi", isUser: true, timestamp: new Date("2025-03-07T21:24:00") },
    { id: "2", text: "", isUser: false, timestamp: new Date("2025-03-07T21:24:00"), confidence: 9.5, agentId: "79r6", systemResponse: "This is the system generated response" },
    { id: "3", text: "what is 1+2? ", isUser: true, timestamp: new Date("2025-03-07T21:25:00") },
    { id: "4", text: "", isUser: false, timestamp: new Date("2025-03-07T21:25:00"), confidence: 9.21, agentId: "a9f6", systemResponse: "The answer to your problem 1+2 is 3." },
  ])

  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages([...messages, newUserMessage])
    setInputValue("")

    setTimeout(() => {
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "",
        isUser: false,
        timestamp: new Date(),
        confidence: 9.35,
        agentId: Math.random().toString(36).substring(2, 6),
        systemResponse: `The answer to your problem ${inputValue}, is ${eval(inputValue.replace(/[^0-9+\-*/().]/g, ""))}.`,
      }

      setMessages((prev) => [...prev, newAIMessage])
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return `${date.getDate()} Mar, ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")} PM`
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4">
        <h2 className="text-2xl font-bold text-center my-6">Calculator AI</h2>

        <div className="flex-1 space-y-6 overflow-y-auto mb-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-3xl px-4 py-2 rounded-lg ${message.isUser ? "bg-zinc-800 text-white" : "bg-transparent text-gray-300"} w-full`}>
                {message.isUser ? (
                  <p className="text-right">{message.text}</p>
                ) : (
                  <>
                    <div className="text-xs text-gray-500">Confidence: {message.confidence} | Agent ID: {message.agentId}</div>
                    <p>{message.systemResponse}</p>
                  </>
                )}
                <div className="text-xs text-gray-500 text-right mt-1">{formatTime(message.timestamp)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="bg-zinc-900 rounded-lg p-2 flex items-center">
          <input
            type="text"
            placeholder="Ask your question"
            className="flex-1 bg-transparent outline-none p-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} className="bg-zinc-700 hover:bg-zinc-600">
            Send
          </Button>
        </div>
      </main>
    </div>
  )
}
