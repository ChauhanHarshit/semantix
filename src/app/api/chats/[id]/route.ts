import { getChatById } from "../../../../app/actions/chat"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const chat = await getChatById(id)

  if (!chat) {
    return NextResponse.json({ error: "Chat not found" }, { status: 404 })
  }

  return NextResponse.json(chat)
}

