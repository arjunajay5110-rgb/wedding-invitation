import { NextRequest, NextResponse } from "next/server";
import { weddingConfig } from "@/config/weddingConfig";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ guestId: string }> }
) {
  try {
    const { guestId } = await context.params;

    if (!guestId) {
      return NextResponse.json(
        { error: "Missing guest ID parameter" },
        { status: 400 }
      );
    }

    const guest = weddingConfig.guestList[guestId];

    if (!guest) {
      return NextResponse.json(
        { error: `Guest with ID ${guestId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(guest);
  } catch (error: any) {
    console.error("Error in GET /api/guest/[guestId]:", error);
    return NextResponse.json(
      { error: "Failed to fetch guest details" },
      { status: 500 }
    );
  }
}
