import { getChats } from "../../../app/actions/chat"
import { NextResponse } from "next/server"

export async function GET() {
  const chats = await getChats()
  return NextResponse.json(chats)
}

