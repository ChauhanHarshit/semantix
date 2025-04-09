"use server"

import { revalidatePath } from "next/cache"

// Define types for our chat data
export interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  confidence?: number
  agentId?: string
  systemResponse?: string
}

export interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

// In-memory storage for chats (in a real app, you'd use a database)
const chats: Chat[] = []

// Update the generateResponse function to properly format the API request
export async function generateResponse(message: string, chatId?: string) {
  try {
    console.log("Sending request with message:", message, "chatId:", chatId)

    // Call the external API with the API key
    const response = await fetch("https://trtirhzavg.execute-api.us-east-1.amazonaws.com/prod/generate-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY || "", // Use x-api-key header instead of Authorization
      },
      body: JSON.stringify({
        prompt: message, // Make sure we're using the correct field name (prompt instead of message)
      }),
    })

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`)
      const errorText = await response.text()
      console.error("Error response:", errorText)
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("API response:", data)

    // Create AI message from the response
    const aiMessage: Message = {
      id: Date.now().toString(),
      text: "",
      isUser: false,
      timestamp: new Date(),
      confidence: data.confidence || 9.0,
      agentId: data.agentId || Math.random().toString(36).substring(2, 6),
      systemResponse: data.response || data.message || "Sorry, I couldn't process that request.",
    }

    let currentChatId = chatId

    // If no chatId, create a new chat
    if (!currentChatId) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: message.length > 30 ? `${message.substring(0, 30)}...` : message,
        messages: [
          {
            id: (Date.now() - 1).toString(),
            text: message,
            isUser: true,
            timestamp: new Date(),
          },
          aiMessage,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // Add the new chat to the chats array
      chats.unshift(newChat)

      // Set the current chatId to the new chat's ID
      currentChatId = newChat.id
    } else {
      // If a chatId exists, update the existing chat
      const chatIndex = chats.findIndex((chat) => chat.id === currentChatId)
      if (chatIndex >= 0) {
        chats[chatIndex].messages.push(
          {
            id: (Date.now() - 1).toString(),
            text: message,
            isUser: true,
            timestamp: new Date(),
          },
          aiMessage,
        )
        chats[chatIndex].updatedAt = new Date()

        // Set the title based on the message if it's the first message in the chat
        if (chats[chatIndex].messages.length === 2) {
          chats[chatIndex].title = message.length > 30 ? `${message.substring(0, 30)}...` : message
        }
      } else {
        // If the chatId is not found, create a new chat
        const newChat: Chat = {
          id: Date.now().toString(),
          title: message.length > 30 ? `${message.substring(0, 30)}...` : message,
          messages: [
            {
              id: (Date.now() - 1).toString(),
              text: message,
              isUser: true,
              timestamp: new Date(),
            },
            aiMessage,
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        // Add the new chat to the chats array
        chats.unshift(newChat)

        // Set the current chatId to the new chat's ID
        currentChatId = newChat.id
      }
    }

    // Revalidate the paths to update the UI
    revalidatePath("/")
    revalidatePath("/agent")

    return { aiMessage, chatId: currentChatId }  // Ensure the currentChatId is returned
  } catch (error) {
    console.error("Error generating response:", error)
    return {
      aiMessage: {
        id: Date.now().toString(),
        text: "",
        isUser: false,
        timestamp: new Date(),
        systemResponse: "Sorry, there was an error processing your request.",
      },
      chatId: chatId || null, // Return null if error occurs, or existing chatId if available
    }
  }
}

export async function getChats() {
  return chats
}

export async function getChatById(chatId: string) {
  return chats.find((chat) => chat.id === chatId) || null
}
