import { fail } from "@/server/guard";

export const dynamic = "force-dynamic";

// BLOCKED. Comments and reviews are saved only on the device that wrote them, so a report would point at content the
// team cannot see, and nothing in the site sends one. Turn this on together with server-side comments and moderation:
// it then needs to check that the reported comment exists, and to be sent from a visible Report button.
export async function POST() {
  return fail(404, "Not found.");
}
