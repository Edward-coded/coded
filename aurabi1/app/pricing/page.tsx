import Link from "next/link";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$9.99",
    description: "For lean teams scaling fast.",
    features: ["2 Deep Dives", "AI Mentor", "Weekly Briefing"],
  },
  {
    name: "Pro",
    price: "$29.99",
    description: "For teams needing strategic depth.",
    features: ["Unlimited Deep Dives", "Advanced AI Mentor", "Action Plans"],
  },
  {
    name: "Enterprise",
    price: "$99.99",
    description: "For global organizations.",
    features: ["Dedicated support", "Custom workflows", "Priority onboarding"],
  },
];

const comparison = [
  { label: "Deep Dives", values: ["2", "Unlimited", "Unlimited"] },
  { label: "AI Mentor", values: ["Yes", "Yes", "Yes"] },
  { label: "Action Plans", values: ["Basic", "Advanced", "Custom"] },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0B1D3A] text-[#F8F6F2]">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-16">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C7A461]">Pricing</p>
          <h1 className="mt-3 text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
            Choose your growth plan
          </h1>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className="rounded-3xl border border-white/10 bg-[#121212]/80 p-6 backdrop-blur-xl">
              <p className="text-sm text-[#C7A461]">{tier.name}</p>
              <p className="mt-2 text-4xl font-semibold text-white">{tier.price}</p>
              <p className="mt-2 text-sm text-[#F8F6F2]/70">{tier.description}</p>
              <ul className="mt-5 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[#F8F6F2]/80">
                    <Check className="h-4 w-4 text-[#C7A461]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#C7A461] px-5 py-3 text-sm font-semibold text-[#0B1D3A]">
                Upgrade Now
              </Link>
            </div>
          ))}
        </section>

        <section className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#121212]/80 backdrop-blur-xl">
          <table className="min-w-full text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.3em] text-[#C7A461]">Feature</th>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.3em] text-[#C7A461]">Starter</th>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.3em] text-[#C7A461]">Pro</th>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.3em] text-[#C7A461]">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-t border-white/5">
                  <td className="px-4 py-3 text-sm text-[#F8F6F2]/85">{row.label}</td>
                  {row.values.map((value) => (
                    <td key={value} className="px-4 py-3 text-sm text-[#F8F6F2]/75">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}