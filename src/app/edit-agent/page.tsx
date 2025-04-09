"use client"

import Navbar from "../components/Navbar"
import { useRouter, useSearchParams } from "next/navigation"
import { useAgentContext } from "../../context/AgentContext"
import { useEffect, useState } from "react"
import { ImageIcon } from "lucide-react"

export default function EditAgentPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const agentId = searchParams.get("id") // Get the agent ID from the query string
    const { agents, editAgent, removeAgent } = useAgentContext()

    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [parameter, setParameter] = useState("")
    const [rating, setRating] = useState(4)
    const [imageUrl, setImageUrl] = useState("")

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
          const url = URL.createObjectURL(file)
          setImageUrl(url)
        }
      }

    // Load agent data
    useEffect(() => {
        const agent = agents.find(a => a.id === agentId)
        if (agent) {
            setId(agent.id)
            setTitle(agent.title)
            setDescription(agent.description)
            setPrice(agent.price.replace(" $SEM", ""))
            setParameter(agent.parameter)
            setRating(agent.rating)
        }
    }, [agentId, agents])

    const handleEdit = () => {
        if (!title || !description || !price || !id) return

        editAgent({
            id,
            title,
            imageUrl,
            description,
            price: `${price} $SEM`,
            parameter,
            rating,
        })

        router.push("/dashboard")
    }

    const handleDelete = () => {
        removeAgent(id || title)
        router.push("/dashboard")
    }

    return (
        <main className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg1.png')" }}>
            <Navbar />

            <div className="max-w-2xl mx-auto mt-10 p-8 bg-black/50 rounded-lg border border-gray-800">
                <h1 className="text-white text-2xl font-semibold text-center mb-8">Edit Your AI Agent</h1>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-white block">Agent Name</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black border border-gray-800 rounded-md p-3 text-white" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-white block">Upload Cover Image</label>
                        <div className="w-44 h-24 bg-white/10 border border-gray-500 rounded-lg flex items-center justify-center overflow-hidden relative">
              {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-gray-500" size={32} />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
            </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-white block">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-black border border-gray-800 rounded-md p-3 text-white h-24" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-white block">Parameters</label>
                        <textarea value={parameter} onChange={(e) => setParameter(e.target.value)} className="w-full bg-black border border-gray-800 rounded-md p-3 text-white h-24" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-white block">Upload Data</label>
                        <div className="flex w-full bg-black border border-gray-800 rounded-md overflow-hidden">
                            <button className="bg-[#1D4500] text-white px-10 py-2">Choose file</button>
                            <div className="p-2 text-gray-400">No file selected</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-white block">Set Price</label>
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-black border border-gray-800 rounded-md p-3 text-white" />
                    </div>

                    <div className="flex space-x-3 justify-center mt-8">
                        <button onClick={handleEdit} className="bg-[#1D4500] text-white px-8 py-2 rounded-md">Save Changes</button>
                        <button onClick={handleDelete} className="bg-[#610101] text-white px-8 py-2 rounded-md">Delete Agent</button>
                    </div>
                </div>
            </div>
        </main>
    )
}
