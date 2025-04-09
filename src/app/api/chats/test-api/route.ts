import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://trtirhzavg.execute-api.us-east-1.amazonaws.com/prod/generate-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY || "",
      },
      body: JSON.stringify({
        prompt: "Hello, this is a test message",
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        {
          error: `API responded with status: ${response.status}`,
          details: errorText,
        },
        { status: 500 },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error testing API:", error)
    return NextResponse.json(
      {
        error: "Error testing API",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

