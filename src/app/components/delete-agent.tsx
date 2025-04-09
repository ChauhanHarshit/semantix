"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface DeleteAgentModalProps {
  agentTitle: string
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}

const DeleteAgentModal = ({ isOpen, onClose, onDelete }: DeleteAgentModalProps) => {
  const [confirmText, setConfirmText] = useState("")
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  useEffect(() => {
    // Disable scrolling on the body when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  useEffect(() => {
    setIsButtonDisabled(confirmText !== "delete agent")
  }, [confirmText])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-md rounded-lg border border-gray-700 bg-black p-8">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        <h2 className="mb-6 text-xl font-bold text-white">Are you sure you want to delete the agent?</h2>

        <p className="mb-4 text-gray-300">
          Type the <span className="text-[#8CDBC1]">delete agent</span> in the box to confirm:
        </p>

        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="mb-6 w-full rounded border border-gray-700 bg-black p-3 text-white focus:border-[#8CDBC1] focus:outline-none"
          placeholder="delete agent"
        />

        <div className="flex justify-end">
          <button
            onClick={onDelete}
            disabled={isButtonDisabled}
            className={`rounded px-6 py-2 font-bold ${
              isButtonDisabled
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-[#8CDBC1] text-black hover:bg-[#7ac9af] transition-colors"
            }`}
          >
            Delete Agent
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAgentModal
