// app/api/webhooks/clerk/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { syncUser } from "~/server/mutations";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    if (eventType === "user.created") {
      if (!evt.data.email_addresses[0]?.email_address)
        throw new Error("No email provided.");
      const syncedUser = await syncUser({
        id: evt.data.id,
        email: evt.data.email_addresses[0]?.email_address,
      });
      console.log(syncedUser);
      return new NextResponse(JSON.stringify(syncedUser), { status: 200 });
    } else {
      throw new Error(`Webhook not yet implemented: ${eventType}`);
    }
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new NextResponse("Error verifying webhook", { status: 400 });
  }
}
