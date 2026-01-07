import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Check capacity before allowing registration
    const event = await prisma.event.findUnique({
      where: { id: body.eventId },
      include: { _count: { select: { attendees: true } } }
    });

    if (event && event._count.attendees >= event.capacity) {
      return NextResponse.json({ error: "Event is at full capacity" }, { status: 400 });
    }

    const attendee = await prisma.attendee.create({
      data: {
        name: body.name,
        email: body.email,
        eventId: body.eventId,
      },
    });
    return NextResponse.json(attendee);
  } catch (error) {
    return NextResponse.json({ error: "Email already registered for this event" }, { status: 400 });
  }
}