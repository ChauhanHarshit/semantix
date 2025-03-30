import { createContext, useContext, useState, useEffect, ReactNode } from "react"

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
  const [agents, setAgents] = useState<Agent[]>([]) // Start with an empty array

  // Load agents from localStorage after the component mounts
  useEffect(() => {
    const savedAgents = localStorage.getItem("agents")
    if (savedAgents) {
      setAgents(JSON.parse(savedAgents))
    }
  }, [])

  // Save agents to localStorage whenever they change
  useEffect(() => {
    if (agents.length > 0) {
      localStorage.setItem("agents", JSON.stringify(agents))
    }
  }, [agents])

  const addAgent = (agent: Agent) => {
    setAgents((prev) => [...prev, agent])
  }

  return (
    <AgentContext.Provider value={{ agents, addAgent }}>
      {children}
    </AgentContext.Provider>
  )
}
