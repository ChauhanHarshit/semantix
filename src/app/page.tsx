"use client"

import { Button } from "./components/ui/Button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Navbar from "./components/Navbar"
import "../app/globals.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(false)

  return (
    // <div className="min-h-screen bg-gradient-to-b from-black via-black to-[#0a1a1a] text-white">
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg1.png')" }}>
          <Navbar/>
      <main className="flex flex-col items-center justify-center text-center px-4 py-20 md:py-40">
        <h1 className="text-5xl text-white md:text-7xl font-bold mb-6 max-w-4xl">
          Train and Trade
          <br />
          Distributed IPs
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl">
          A decentralised marketplace to build deploy and monetise AI agents
        </p>
        <Button 
        className="bg-[#8de0c8] hover:bg-[#7bc9b3] text-black font-bold px-8 py-6 text-lg rounded-md"
        onClick={() => router.push(`/dashboard`)}
        >
          Try Demo
        </Button>
      </main>
    </div>
  )
}

