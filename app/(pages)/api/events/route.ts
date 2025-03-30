import { NextResponse } from "next/server"

const EVENTS_QUERY_URL =
  "https://aiqtrfyk.api.sanity.io/v2025-01-26/data/query/production?query=*%5B_type+%3D%3D+%22event%22%5D+%7C+order%28eventDate+desc%29+%7B%0A++_id%2C%0A++name%2C%0A++description%2C%0A++images%5B%5D+%7B+%22url%22%3A+asset-%3Eurl+%7D%2C%0A++eventDate%2C%0A++eventTime%2C%0A++location%2C%0A++organizer%2C%0A++registrationLink%0A%7D%0A%0A"

export async function GET() {
  try {
    const response = await fetch(EVENTS_QUERY_URL)

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data.result || [])
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

