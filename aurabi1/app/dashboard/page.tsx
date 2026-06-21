"use client";

import Link from "next/link";
import { Activity, ChevronRight, Sparkles } from "lucide-react";

const tickers = [
  "Global AI investment +7.4%",
  "Energy transition momentum accelerating",
  "Consumer confidence improving in key corridors",
  "Enterprise software backlog expanding",
];

const actionPlan = [
  "Finalize quarterly objectives",
  "Review competitor pricing signals",
  "Prepare executive risk summary",
  "Align growth opportunities with board priorities",
];

const recentDeepDives = [
  {
    title: "Fintech expansion outlook",
    tag: "Market Analysis",
  },
  {
    title: "Climate infrastructure strategy",
    tag: "Risk Mitigation",
  },
  {
    title: "Retail growth pulse",
    tag: "Financial Forecast",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0B1D3A] text-[#F8F6F2]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(199,164,97,0.12),transparent_18%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:90px_90px] opacity-8" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-10">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#C7A461]">Aura BI</p>
            <h1 className="mt-2 text-3xl text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              Live Market Pulse
            </h1>
          </div>
          <Link href="#" className="text-sm text-[#F8F6F2]/70 hover:text-white">
            View all insights
          </Link>
        </header>

        <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0F234E]">
          <div className="flex items-center gap-3 bg-[#102857] px-5 py-3 text-sm text-[#E8D6A4]">
            <Activity className="h-4 w-4" />
            <div className="flex gap-6 overflow-hidden">
              {tickers.map((item, index) => (
                <span key={index} className="whitespace-nowrap">{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#0F234E] p-6">
            <p className="text-sm text-[#F8F6F2]/65">Health Score</p>
            <div className="mt-5 flex items-center gap-5">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[conic-gradient(#C7A461_0_78%,rgba(255,255,255,0.08)_78%_100%)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0B1D3A] text-2xl font-semibold text-white">78</div>
              </div>
              <div>
                <p className="text-sm text-[#F8F6F2]/65">Strong performance</p>
                <p className="mt-1 text-3xl font-semibold text-white">Stable</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0F234E] p-6">
            <p className="text-sm text-[#F8F6F2]/65">Deep Dives Used</p>
            <p className="mt-3 text-5xl font-semibold text-white">06</p>
            <p className="mt-2 text-sm text-[#C7A461]">/ 20 available</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0F234E] p-6">
            <p className="text-sm text-[#F8F6F2]/65">Trial Days Left</p>
            <p className="mt-3 text-5xl font-semibold text-white">14</p>
            <p className="mt-2 text-sm text-[#F8F6F2]/65">Ends 30 Jun 2026</p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-[#0F234E] p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#C7A461]">Action plan</p>
                <h2 className="mt-2 text-3xl text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                  Today&apos;s Action Plan
                </h2>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8F6F2]/80">
                Review all <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 space-y-3">
              {actionPlan.map((item, index) => (
                <div key={index} className="flex items-center justify-between rounded-2xl bg-[#0B1D3A] px-4 py-3">
                  <span className="text-sm text-[#F8F6F2]/82">{item}</span>
                  <button className="text-[#C7A461]">Open</button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0F234E] p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#C7A461]">Insights</p>
                <h2 className="mt-2 text-3xl text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                  Recent Deep Dives
                </h2>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {recentDeepDives.map((item, index) => (
                <div key={index} className="rounded-2xl bg-[#0B1D3A] p-4">
                  <p className="text-sm text-[#C7A461]">{item.tag}</p>
                  <p className="mt-2 text-base text-white">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <button className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-[#C7A461] px-6 py-3.5 text-sm font-semibold text-[#0B1D3A] shadow-2xl shadow-[#C7A461]/25">
        <Sparkles className="h-4 w-4" />
        Run a Deep Dive
      </button>
    </main>
  );
}
