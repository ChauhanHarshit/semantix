import type { FC } from "react"
import { FilePen, FilePenIcon, FilePenLine, Star, UserRound } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from 'next/image'
import { Trash2 } from "lucide-react"

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

const AgentCard: FC<AgentCardProps> = ({ agent }) => {
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
          <span className="flex">
            <Image
              src="/user.svg"
              alt="user"
              className="object-cover mr-1"
              // fill
              width={15} height={15}
            />
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
        <button onClick={() => router.push(`agent`)} className="w-48 bg-[#8CDBC1] text-black py-2 rounded-2xl text-sm font-bold">USE AGENT</button>
        <Trash2 className="text-[#3B8874] mt-1"/>
        <FilePenLine className="text-[#3B8874] mt-1"/>
        </div>
      </div>
    </div>
  )
}

export default AgentCard

