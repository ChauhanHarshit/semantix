"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-[#0a1a1a] text-white">
      <header className="flex items-center justify-between p-4 bg-[#111111]/80 rounded-lg m-3">
        <div className="text-2xl font-bold">Semantix</div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">Marketplace</div>
          <div className="hidden md:block">100 $SEM</div>
          <Button
            variant="outline"
            className="bg-[#8de0c8]/20 text-white border-none hover:bg-[#8de0c8]/30"
            onClick={() => setIsOpen(!isOpen)}
          >
            Network <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="bg-[#8de0c8]/20 text-white border-none hover:bg-[#8de0c8]/30">
            0x999...
          </Button>
          <Button
            variant="outline"
            className="bg-[#8de0c8]/20 text-white border-none hover:bg-[#8de0c8]/30 flex items-center gap-2"
          >
            Profile
            {/* <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar> */}
          </Button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center text-center px-4 py-20 md:py-40">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl">
          Train and Trade
          <br />
          Distributed IPs
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl">
          A decentralised marketplace to build deploy and monetise AI agents
        </p>
        <Button className="bg-[#8de0c8] hover:bg-[#7bc9b3] text-black font-medium px-8 py-6 text-lg rounded-md">
          Try Demo
        </Button>
      </main>
    </div>
  )
}

