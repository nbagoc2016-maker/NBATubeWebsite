import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { ensureInquiriesTable } from "@/db/ensure";
import { adminEnabled, isAdminToken } from "@/lib/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Inquiries",
  robots: { index: false, follow: false },
};

const statusStyles: Record<string, string> = {
  sent: "bg-emerald-50 text-emerald-700",
  failed: "bg-red-50 text-red-700",
  not_configured: "bg-amber-50 text-amber-700",
  pending: "bg-slate-100 text-slate-600",
};

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!adminEnabled()) {
    return (
      <Shell title="Inquiry inbox disabled">
        <p className="text-navy/70">
          Set the <code className="rounded bg-paper px-1.5 py-0.5">ADMIN_TOKEN</code> environment variable to
          enable this page, then open <code>/admin/inquiries?token=YOUR_TOKEN</code>.
        </p>
      </Shell>
    );
  }

  if (!isAdminToken(token)) {
    return (
      <Shell title="Access denied">
        <p className="text-navy/70">A valid access token is required to view inquiries.</p>
      </Shell>
    );
  }

  await ensureInquiriesTable();
  const rows = await db
    .select({
      id: inquiries.id,
      reference: inquiries.reference,
      fullName: inquiries.fullName,
      companyName: inquiries.companyName,
      phone: inquiries.phone,
      whatsapp: inquiries.whatsapp,
      email: inquiries.email,
      productType: inquiries.productType,
      quantity: inquiries.quantity,
      tubeDiameter: inquiries.tubeDiameter,
      tubeSize: inquiries.tubeSize,
      message: inquiries.message,
      artworkName: inquiries.artworkName,
      artworkSize: inquiries.artworkSize,
      emailStatus: inquiries.emailStatus,
      createdAt: inquiries.createdAt,
    })
    .from(inquiries)
    .orderBy(desc(inquiries.createdAt))
    .limit(200);

  return (
    <Shell title={`Quote inquiries (${rows.length})`}>
      {rows.length === 0 ? (
        <p className="text-navy/70">No inquiries yet.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((row) => (
            <article key={row.id} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-gold-dark">{row.reference}</p>
                  <h2 className="text-lg font-bold">
                    {row.companyName} <span className="font-medium text-navy/60">— {row.fullName}</span>
                  </h2>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className={`rounded-full px-2.5 py-1 font-semibold ${statusStyles[row.emailStatus] ?? statusStyles.pending}`}>
                    email: {row.emailStatus.replace("_", " ")}
                  </span>
                  <time className="text-navy/50">{row.createdAt.toLocaleString("en-GB", { timeZone: "Asia/Karachi" })}</time>
                </div>
              </header>
              <dl className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <Item label="Product" value={`${row.productType} tubes`} />
                <Item label="Quantity" value={row.quantity} />
                <Item label="Phone" value={row.phone} />
                <Item label="WhatsApp" value={row.whatsapp} />
                <Item label="Email" value={row.email} />
                <Item label="Diameter" value={row.tubeDiameter} />
                <Item label="Size" value={row.tubeSize} />
              </dl>
              {row.message ? (
                <p className="mt-4 whitespace-pre-wrap rounded-xl bg-paper p-3 text-sm text-navy/80">{row.message}</p>
              ) : null}
              {row.artworkName ? (
                <a
                  className="mt-4 inline-block text-sm font-semibold text-gold-dark underline underline-offset-4"
                  href={`/api/admin/artwork/${row.id}?token=${encodeURIComponent(token ?? "")}`}
                >
                  Download artwork: {row.artworkName}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </Shell>
  );
}

function Item({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-navy/45">{label}</dt>
      <dd className="font-medium break-words">{value}</dd>
    </div>
  );
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper px-5 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-extrabold">{title}</h1>
        {children}
      </div>
    </div>
  );
}
