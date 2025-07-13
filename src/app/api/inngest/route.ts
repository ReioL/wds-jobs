import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { clerkCreateUser, clerkDeleteUser, clerkUpdatedUser, Event } from "@/services/clerk/functions";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  if (!WEBHOOK_SECRET) {
    console.error("❌ Missing CLERK_WEBHOOK_SECRET env var");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const payload = await req.text();
  const headerList = await headers();

  const svixId = headerList.get("svix-id");
  const svixTimestamp = headerList.get("svix-timestamp");
  const svixSignature = headerList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    console.error("❌ Missing webhook headers");
    return NextResponse.json({ error: "Missing headers" }, { status: 400 });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: Event;

  try {
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as Event;
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { type, data } = evt;

  console.log(`🔔 Received Clerk webhook: ${type}`);

  switch (type) {
    case "user.created":
      await clerkCreateUser(data);
      break;
    case "user.deleted":
      await clerkDeleteUser(data);
      break;
    case "user.updated":
      await clerkUpdatedUser(data);
      break;
    default:
      console.log(`Unhandled event type: ${type}`);
  }

  return NextResponse.json({ ok: true });
}
