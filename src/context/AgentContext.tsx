import { createContext, useContext, useState, ReactNode } from "react"

interface Agent {
  title: string
  description: string
  price: string
  parameter: string
  rating: number
}

interface AgentContextType {
  agents: Agent[]
  addAgent: (agent: Agent) => void
}

const AgentContext = createContext<AgentContextType | undefined>(undefined)

export function useAgentContext() {
  const context = useContext(AgentContext)
  if (!context) {
    throw new Error("useAgentContext must be used within an AgentProvider")
  }
  return context
}

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([])

  const addAgent = (agent: Agent) => {
    setAgents((prev) => [...prev, agent])
  }

  return (
    <AgentContext.Provider value={{ agents, addAgent }}>
      {children}
    </AgentContext.Provider>
  )
}
