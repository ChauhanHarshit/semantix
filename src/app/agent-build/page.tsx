"use client"

import Navbar from "../components/Navbar"
import { useRouter } from "next/navigation"
import { useAgentContext } from "../../context/AgentContext"
import { useState } from "react"

export default function AgentBuild() {
  const { addAgent } = useAgentContext()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [parameter, setParameter] = useState("")
  // const [rating, setRating] = useState(4)

  const handleSubmit = () => {
    if (!title || !description || !price) return

    const rating : number = 4; 

    addAgent({
      title,
      description,
      price: `${price} $SEM`,
      parameter,
      rating
    })

    router.push("/dashboard")
  }


  return (
    // <main className="min-h-screen bg-gradient-to-br from-black via-black to-emerald-950">
    <main className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg1.png')" }}>
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 p-8 bg-black/50 rounded-lg border border-gray-800">
        <h1 className="text-white text-2xl font-semibold text-center mb-8">Build Your AI Agent</h1>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-white block">Agent Name</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black border border-gray-800 rounded-md p-3 text-white" />
          </div>

          <div className="space-y-2">
            <label className="text-white block">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-black border border-gray-800 rounded-md p-3 text-white h-24" />
          </div>

          <div className="space-y-2">
            <label className="text-white block">Parameters</label>
            <textarea value ={parameter} onChange={(e) => setParameter(e.target.value)} className="w-full bg-black border border-gray-800 rounded-md p-3 text-white h-24" />
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

          <div className="flex justify-center mt-8">
          <button onClick={handleSubmit} className="bg-[#1D4500] text-white px-8 py-2 rounded-md">Build Now</button>
          </div>
        </div>
      </div>
      <br></br>
    </main>
  )
}

