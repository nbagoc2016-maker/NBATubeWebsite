import { eq } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { ensureInquiriesTable } from "@/db/ensure";
import { isAdminToken } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const token = new URL(request.url).searchParams.get("token");
  if (!isAdminToken(token)) return new Response("Unauthorized", { status: 401 });

  const { id } = await params;
  const numericId = Number.parseInt(id, 10);
  if (!Number.isFinite(numericId)) return new Response("Not found", { status: 404 });

  await ensureInquiriesTable();
  const [row] = await db
    .select({
      name: inquiries.artworkName,
      type: inquiries.artworkType,
      data: inquiries.artworkData,
    })
    .from(inquiries)
    .where(eq(inquiries.id, numericId))
    .limit(1);

  if (!row?.data) return new Response("Not found", { status: 404 });

  const filename = (row.name ?? "artwork").replace(/[^\w.\- ]+/g, "_");
  return new Response(new Uint8Array(row.data), {
    headers: {
      "Content-Type": row.type ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
