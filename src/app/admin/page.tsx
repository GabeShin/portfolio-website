import AdminDashboard from "./AdminDashboard";
import { ALLOWED_IPS, getClientIpFromHeaders } from "@/lib/utils/request";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

const allowedDuringDev = process.env.NODE_ENV !== "production";

export default function AdminPage() {
  const headerList = headers();
  const requestIp = getClientIpFromHeaders(headerList);
  if (!allowedDuringDev && !ALLOWED_IPS.includes(requestIp)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#05060d] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row">
        <aside className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 md:w-64">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#FF6B81]">
              Admin
            </p>
            <h1 className="mt-2 text-2xl font-semibold">Wedding Console</h1>
            <p className="mt-4 text-sm text-white/70">
              RSVP 데이터를 확인하고 관리할 수 있는 내부 페이지입니다.
            </p>
          </div>
          <nav className="mt-8 space-y-3 text-sm text-white/80">
            <a
              href="#wedding-party"
              className="block rounded-2xl border border-white/10 px-4 py-3 hover:border-white/40"
            >
              Wedding Party RSVPs
            </a>
          </nav>
        </aside>
        <section id="wedding-party" className="flex-1">
          <AdminDashboard />
        </section>
      </div>
    </main>
  );
}
