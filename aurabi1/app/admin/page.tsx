import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Activity, CalendarRange, Sparkles, Users } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminUsersTable from "./AdminUsersTable";

interface UserRecord {
  id: string;
  name: string | null;
  email: string;
  subscription: string;
  trialEnd: string | null;
  deepDiveCount: number;
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session || role !== "ADMIN") {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      subscription: true,
      trialEnd: true,
      deepDiveCount: true,
      createdAt: true,
    },
  });

  const totalUsers = users.length;
  const activeSubscribers = users.filter(
    (user) => user.subscription === "ACTIVE"
  ).length;
  const today = new Date();
  const trialExpiringToday = users.filter((user) => {
    if (user.subscription !== "FREE_TRIAL" || !user.trialEnd) return false;
    const trialEnd = new Date(user.trialEnd);
    return (
      trialEnd.getFullYear() === today.getFullYear() &&
      trialEnd.getMonth() === today.getMonth() &&
      trialEnd.getDate() === today.getDate()
    );
  }).length;

  return (
    <main className="min-h-screen bg-[#0B1D3A] text-[#F8F6F2]">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-10">
        <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#C7A461]">Admin Panel</p>
            <h1 className="mt-2 text-3xl text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              Aura Business Intelligence
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C7A461]/30 bg-[#C7A461]/10 px-4 py-2 text-sm text-[#E5C98A]">
            <Sparkles className="h-4 w-4" />
            Operations Console
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#121212]/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#F8F6F2]/70">Total Users</p>
              <Users className="h-5 w-5 text-[#C7A461]" />
            </div>
            <p className="mt-4 text-4xl font-semibold text-white">{totalUsers}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#121212]/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#F8F6F2]/70">Active Subscribers</p>
              <Activity className="h-5 w-5 text-[#C7A461]" />
            </div>
            <p className="mt-4 text-4xl font-semibold text-white">{activeSubscribers}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#121212]/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#F8F6F2]/70">Trial Expiring Today</p>
              <CalendarRange className="h-5 w-5 text-[#C7A461]" />
            </div>
            <p className="mt-4 text-4xl font-semibold text-white">{trialExpiringToday}</p>
          </div>
        </section>

        <AdminUsersTable
          users={users as UserRecord[]}
          totalUsers={totalUsers}
          activeSubscribers={activeSubscribers}
          trialExpiringToday={trialExpiringToday}
        />
      </div>
    </main>
  );
}
