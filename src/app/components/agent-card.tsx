import type { FC } from "react"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from 'next/image'

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

const AgentCard: FC<AgentCardProps> = ({ agent}) => {
  const router = useRouter();
  return (
    <div className={`relative rounded-lg border border-gray-700 overflow-hidden bg-[#000000] `}>
      {/* Agent Image */}
      <div className="h-40 overflow-hidden relative">
        <Image
          src="/agent-frame.png"
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
        <button onClick={() => router.push(`agent`)} className="w-full bg-[#8CDBC1] text-black py-2 rounded-2xl text-sm font-medium">USE AGENT</button>
      </div>
    </div>
  )
}

export default AgentCard

