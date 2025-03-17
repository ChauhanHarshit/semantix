import type { FC } from "react"
import { Star } from "lucide-react"

interface Agent {
  title: string
  description: string
  price: string
  parameter: string
  rating: number
}

interface AgentCardProps {
  agent: Agent
  highlighted?: boolean
}

const AgentCard: FC<AgentCardProps> = ({ agent, highlighted = false }) => {
  return (
    <div className={`relative rounded-lg overflow-hidden bg-[#111111] ${highlighted ? "ring-2 ring-blue-500" : ""}`}>
      {/* Agent Image */}
      <div className="h-40 bg-gradient-to-br from-yellow-500 via-red-500 to-blue-600 overflow-hidden">
        <img
          src="/placeholder.svg?height=160&width=320"
          alt="Agent visualization"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      {/* Agent Content */}
      <div className="p-4">
        <h3 className="text-sm font-medium mb-2">{agent.title}</h3>
        <p className="text-xs text-gray-400 mb-4 line-clamp-4">{agent.description}</p>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <span>{agent.price}</span>
          <div className="flex items-center gap-2">
            <span>{agent.parameter}</span>
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
        <button className="w-full bg-[#8CDBC1] text-black py-2 rounded-md text-sm font-medium">USE AGENT</button>
      </div>
    </div>
  )
}

export default AgentCard

