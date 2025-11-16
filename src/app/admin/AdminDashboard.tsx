"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type AdminRsvp = {
  id: string;
  name: string;
  attendance: string;
  guestsCount?: number;
  soloTable?: string;
  message?: string;
  submittedAt?: string;
};

type RsvpStats = {
  total: number;
  attending: number;
  maybe: number;
  declined: number;
  soloYes: number;
  guests: number;
};

type FilterType = "all" | "attending" | "maybe" | "declined" | "solo";

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState<AdminRsvp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [stats, setStats] = useState<RsvpStats | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const loadRsvps = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/rsvps", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("불러오기에 실패했습니다.");
      }
      const data = await res.json();
      setRsvps(data.rsvps ?? []);
      setStats(data.stats ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRsvps();
  }, [loadRsvps]);

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      const deleted = rsvps.find((item) => item.id === id);
      const res = await fetch(`/api/admin/rsvps?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("삭제에 실패했습니다.");
      }
      setActionMessage("삭제되었습니다.");
      setRsvps((prev) => prev.filter((rsvp) => rsvp.id !== id));
      setStats((prev) =>
        prev
          ? {
              ...prev,
              total: Math.max(prev.total - 1, 0),
              attending:
                deleted?.attendance === "attending" ? Math.max(prev.attending - 1, 0) : prev.attending,
              maybe: deleted?.attendance === "maybe" ? Math.max(prev.maybe - 1, 0) : prev.maybe,
              declined:
                deleted?.attendance === "not_attending"
                  ? Math.max(prev.declined - 1, 0)
                  : prev.declined,
              soloYes: deleted?.soloTable === "yes" ? Math.max(prev.soloYes - 1, 0) : prev.soloYes,
              guests:
                prev.guests - (deleted?.guestsCount ?? 0) >= 0
                  ? prev.guests - (deleted?.guestsCount ?? 0)
                  : 0,
            }
          : prev,
      );
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "삭제 중 오류가 발생했습니다.");
    }
  };

  const filteredRsvps = useMemo(() => {
    switch (activeFilter) {
      case "attending":
        return rsvps.filter((rsvp) => rsvp.attendance === "attending");
      case "maybe":
        return rsvps.filter((rsvp) => rsvp.attendance === "maybe");
      case "declined":
        return rsvps.filter((rsvp) => rsvp.attendance === "not_attending");
      case "solo":
        return rsvps.filter((rsvp) => rsvp.soloTable === "yes");
      default:
        return rsvps;
    }
  }, [activeFilter, rsvps]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Wedding Party RSVPs</h2>
          <p className="text-sm text-white/70">최대 100개의 최신 RSVP 메시지를 확인하고 관리할 수 있습니다.</p>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <button
              onClick={loadRsvps}
              className="rounded-full border border-white/20 px-4 py-1 text-white transition hover:border-white/60"
            >
              새로고침
            </button>
            {actionMessage && <span className="text-[#6EE7B7]">{actionMessage}</span>}
          </div>
        </div>
      </div>
      {loading && <p className="text-sm text-white/60">불러오는 중...</p>}
      {error && <p className="text-sm text-[#FF8CB0]">{error}</p>}
      <div className="space-y-4">
        {stats && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="총 응답"
              value={`${stats.total}명`}
              onClick={() => setActiveFilter("all")}
              active={activeFilter === "all"}
            />
            <StatCard
              label="참석 예정"
              value={`${stats.attending}명`}
              onClick={() => setActiveFilter("attending")}
              active={activeFilter === "attending"}
            />
            <StatCard
              label="고민 중"
              value={`${stats.maybe}명`}
              onClick={() => setActiveFilter("maybe")}
              active={activeFilter === "maybe"}
            />
            <StatCard
              label="어렵습니다"
              value={`${stats.declined}명`}
              onClick={() => setActiveFilter("declined")}
              active={activeFilter === "declined"}
            />
            <StatCard
              label="솔로 테이블 신청"
              value={`${stats.soloYes}명`}
              onClick={() => setActiveFilter("solo")}
              active={activeFilter === "solo"}
            />
            <div className="rounded-3xl border border-white/10 bg-[#0e121f] p-5 text-white">
              <p className="text-sm text-white/60">총 동행 인원</p>
              <p className="mt-2 text-2xl font-semibold">{stats.guests}명</p>
            </div>
          </div>
        )}
        {filteredRsvps.map((rsvp) => (
          <article
            key={rsvp.id}
            className="rounded-3xl border border-white/10 bg-[#0b0f1c] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{rsvp.name}</h3>
                <p className="text-sm text-white/60">
                  {rsvp.attendance === "attending"
                    ? "참석 예정"
                    : rsvp.attendance === "maybe"
                      ? "고민 중"
                      : "어렵습니다"}
                  {typeof rsvp.guestsCount === "number" && ` · 동행 ${rsvp.guestsCount}명`}
                  {rsvp.soloTable && ` · 솔로 테이블: ${rsvp.soloTable === "yes" ? "참여" : "미참여"}`}
                </p>
              </div>
              <button
                onClick={() => handleDelete(rsvp.id)}
                className="rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white transition hover:border-[#FF6B81] hover:text-[#FF6B81]"
              >
                Delete
              </button>
            </div>
            {rsvp.message && <p className="mt-4 text-sm text-[#F4DDE4]">{rsvp.message}</p>}
            {rsvp.submittedAt && (
              <p className="mt-2 text-xs text-white/40">
                {new Date(rsvp.submittedAt).toLocaleString("ko-KR")}
              </p>
            )}
          </article>
        ))}
        {!loading && filteredRsvps.length === 0 && (
          <p className="text-sm text-white/60">해당 조건에 맞는 RSVP가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  onClick,
  active,
}: {
  label: string;
  value: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-3xl border bg-[#0e121f] p-5 text-left transition ${
        active ? "border-[#FF6B81] shadow-[0_10px_25px_rgba(255,107,129,0.2)]" : "border-white/10"
      }`}
    >
      <p className="text-sm text-white/60">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </button>
  );
}
