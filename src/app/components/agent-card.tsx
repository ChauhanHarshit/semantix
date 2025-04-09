"use client"

import type { FC } from "react"
import { FilePenLine, Star, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import DeleteAgentModal from "./delete-agent"
import { useAgentContext } from "../../context/AgentContext"

interface Agent {
  title: string
  description: string
  imageUrl?: string
  price: string
  parameter: string
  rating: number
  id: string // Adding id for easier deletion
}

interface AgentCardProps {
  agent: Agent
  highlighted?: boolean
}

const AgentCard: FC<AgentCardProps> = ({ agent }) => {
  const router = useRouter()
  const { removeAgent } = useAgentContext()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDelete = () => {
    // Call the removeAgent function from context
    removeAgent(agent.id || agent.title)
    setIsDeleteModalOpen(false)
  }

  return (
    <div className="relative rounded-lg border border-gray-700 overflow-hidden bg-[#000000]">
      {/* Agent Image */}
      <div className="h-40 overflow-hidden relative">
        <Image
          src={agent.imageUrl || "/agent-frame.png"}
          alt="Agent visualization"
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          priority
        />
      </div>

      {/* Agent Content */}
      <div className="p-4">
        <h3 className="text-sm font-medium mb-2">{agent.title}</h3>
        <p className="text-xs text-gray-400 mb-4 line-clamp-4">{agent.description}</p>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <span>{agent.price}</span>
          <span className="flex">
            <Image src="/user.svg" alt="user" className="object-cover mr-1" width={15} height={15} />
            4,45k
          </span>
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < agent.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                  />
                ))}
            </div>
            <span>{agent.rating}</span>
          </div>
        </div>

        {/* Use Agent Button */}
        <div className="flex justify-between">
          <button
            onClick={() => router.push(`agent`)}
            className="w-48 bg-[#8CDBC1] text-black py-2 rounded-2xl text-sm font-bold"
          >
            USE AGENT
          </button>
          <button onClick={() => setIsDeleteModalOpen(true)} >
            <Trash2 className="text-[#3B8874] mt-1 hover:text-[#8CDBC1] transition-colors" />
          </button>
          <FilePenLine
            className="text-[#3B8874] mt-2 hover:text-[#8CDBC1] transition-colors cursor-pointer"
            onClick={() => router.push(`/edit-agent?id=${agent.id}`)}
          />
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteAgentModal
        agentTitle={agent.title}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default AgentCard
