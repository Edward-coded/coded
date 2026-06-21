"use client";

import { useState } from "react";

interface UserRecord {
  id: string;
  name: string | null;
  email: string;
  subscription: string;
  trialEnd: string | null;
  deepDiveCount: number;
}

interface AdminUsersTableProps {
  users: UserRecord[];
  totalUsers: number;
  activeSubscribers: number;
  trialExpiringToday: number;
}

export default function AdminUsersTable({
  users,
  totalUsers,
  activeSubscribers,
  trialExpiringToday,
}: AdminUsersTableProps) {
  const [localUsers, setLocalUsers] = useState(users);

  const formatDate = (value: string | null) => {
    if (!value) return "—";
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(value));
  };

  const handleAction = async (
    userId: string,
    action: "upgrade" | "extend" | "reset"
  ) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });

      if (!res.ok) {
        throw new Error("Admin action failed");
      }

      setLocalUsers((prev) =>
        prev.map((user) => {
          if (user.id !== userId) return user;
          if (action === "upgrade") {
            return { ...user, subscription: "ACTIVE" };
          }
          if (action === "extend") {
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 7);
            return { ...user, subscription: "FREE_TRIAL", trialEnd: endDate.toISOString() };
          }
          return { ...user, deepDiveCount: 0 };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#121212]/80 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.3em] text-[#C7A461]">Name</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.3em] text-[#C7A461]">Email</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.3em] text-[#C7A461]">Subscription</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.3em] text-[#C7A461]">Trial End</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.3em] text-[#C7A461]">Deep Dives Used</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.3em] text-[#C7A461]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {localUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-4 text-sm text-white">{user.name || "—"}</td>
                <td className="px-4 py-4 text-sm text-[#F8F6F2]/80">{user.email}</td>
                <td className="px-4 py-4 text-sm text-[#E5C98A]">{user.subscription}</td>
                <td className="px-4 py-4 text-sm text-[#F8F6F2]/80">{formatDate(user.trialEnd)}</td>
                <td className="px-4 py-4 text-sm text-[#F8F6F2]/80">{user.deepDiveCount}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleAction(user.id, "upgrade")}
                      className="rounded-full bg-[#C7A461] px-3 py-1.5 text-xs font-semibold text-[#0B1D3A]"
                    >
                      Upgrade to Active
                    </button>
                    <button
                      onClick={() => handleAction(user.id, "extend")}
                      className="rounded-full border border-[#C7A461]/30 px-3 py-1.5 text-xs text-[#F8F6F2]"
                    >
                      Extend Trial +7 Days
                    </button>
                    <button
                      onClick={() => handleAction(user.id, "reset")}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-[#F8F6F2]"
                    >
                      Reset Deep Dive Count
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
