import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Building2,
  ChevronRight,
  CircleCheck,
  Globe,
  Landmark,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const navItems = [
  { label: "Insights", href: "#insights" },
  { label: "Solutions", href: "#solutions" },
  { label: "Research", href: "#research" },
  { label: "Pricing", href: "#pricing" },
];

const stats = [
  { value: "92%", label: "Executive confidence uplift" },
  { value: "$3.2B", label: "Annualized decision impact tracked" },
  { value: "34", label: "Strategic markets monitored" },
  { value: "8.7x", label: "Faster review cycles" },
];

const featureCards = [
  {
    icon: BarChart3,
    title: "Market Intelligence",
    description:
      "Track macro conditions, investment flows, and consumer momentum with precision.",
  },
  {
    icon: BrainCircuit,
    title: "AI Advisory",
    description:
      "Convert complex signals into strategic scenarios, decisions, and board-ready actions.",
  },
  {
    icon: ShieldCheck,
    title: "Risk & Compliance",
    description:
      "Detect regulatory, geopolitical, and operational threats before they affect outcomes.",
  },
  {
    icon: Sparkles,
    title: "Executive Briefing",
    description:
      "Deliver polished insights and narratives for leadership, investors, and boards.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "Monitor regional dynamics across developed and emerging economies in real time.",
  },
  {
    icon: Building2,
    title: "Strategy Execution",
    description:
      "Connect intelligence to operating plans, priorities, and accountability frameworks.",
  },
];

const sectorCards = [
  {
    title: "Energy & Infrastructure",
    text: "Resilience planning, transition strategy, and capital allocation intelligence.",
  },
  {
    title: "Financial Services",
    text: "Risk modeling, regulatory outlook, and market sentiment analysis for leaders.",
  },
  {
    title: "Technology & Innovation",
    text: "Competitive intelligence and adoption tracking for growth-focused organizations.",
  },
  {
    title: "Public & Institutional",
    text: "Evidence-based advisory for sovereign, nonprofit, and policy-driven institutions.",
  },
];

const insightPoints = [
  {
    title: "Regional outlook",
    text: "Macro signals mapped to your growth priorities with clear recommendations.",
  },
  {
    title: "Competitive edge",
    text: "Benchmarking and market positioning insights designed for leadership teams.",
  },
  {
    title: "Operational readiness",
    text: "Actionable planning that connects strategy, execution, and governance.",
  },
];

const researchCards = [
  {
    tag: "Global outlook",
    title: "2026 investment landscape: resilience, demand, and scale",
    summary:
      "A concise outlook on capital allocation, supply chains, and emerging opportunities.",
  },
  {
    tag: "Sector report",
    title: "How enterprise leaders are rebuilding confidence in volatile markets",
    summary:
      "Insights from more than 400 executives across 18 industries and 26 jurisdictions.",
  },
  {
    tag: "Executive brief",
    title: "Five actions boards should take before the next market cycle",
    summary:
      "Strategic guidance built for fast-moving leadership teams and governance committees.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B1D3A]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(199,164,97,0.12),transparent_18%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(30,68,133,0.13),transparent_18%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:90px_90px] opacity-8" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0B1D3A]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl font-semibold tracking-[0.3em] text-[#F8F6F2]">
              AURA
            </span>
            <span className="text-sm uppercase tracking-[0.45em] text-[#C7A461]">
              BI
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-[#F8F6F2]/78 transition hover:text-[#F8F6F2]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden text-sm text-[#F8F6F2]/80 transition hover:text-[#F8F6F2] md:inline-flex"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#C7A461] px-5 py-2.5 text-sm font-semibold text-[#0B1D3A] transition hover:bg-[#E6C883]"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10 lg:pb-32 lg:pt-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C7A461]/25 bg-[#C7A461]/10 px-4 py-2 text-sm text-[#E8D6A4]">
              <Sparkles className="h-4 w-4" />
              Institutional intelligence platform
            </span>
            <h1
              className="mt-6 max-w-3xl text-5xl leading-none md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Aura <span className="text-[#C7A461]">Business Intelligence</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#F8F6F2]/78 md:text-lg">
              Strategic insight, market foresight, and executive decision support for
              institutions shaping the next decade.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C7A461] px-7 py-3.5 text-base font-semibold text-[#0B1D3A] shadow-[0_0_40px_rgba(199,164,97,0.24)] transition hover:bg-[#E6C883]"
              >
                Start a consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#solutions"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-[#F8F6F2] backdrop-blur-xl transition hover:bg-white/10"
              >
                Explore platform
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#F8F6F2]/62">
              <span>Board-ready analytics</span>
              <span>•</span>
              <span>Global market coverage</span>
              <span>•</span>
              <span>AI-driven strategic guidance</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-[#C7A461]/15 blur-3xl" />
            <div className="absolute -right-4 bottom-8 h-32 w-32 rounded-full bg-[#7AA1FF]/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#102858] via-[#0E1F4A] to-[#0A1330] p-6 shadow-2xl shadow-[#000]/35 backdrop-blur-2xl">
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.38em] text-[#C7A461]">Strategic pulse</p>
                  <p className="mt-1 text-sm text-[#F8F6F2]/75">Q2 executive outlook</p>
                </div>
                <span className="rounded-full bg-[#C7A461]/10 px-3 py-1 text-xs text-[#E8D6A4]">+12.4%</span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/5 bg-[#0F234E] p-5">
                  <p className="text-sm text-[#F8F6F2]/65">Growth momentum</p>
                  <p className="mt-3 text-4xl font-semibold text-[#F8F6F2]">84%</p>
                  <div className="mt-4 h-2 rounded-full bg-white/5">
                    <div className="h-2 w-[84%] rounded-full bg-[#C7A461]" />
                  </div>
                </div>
                <div className="rounded-2xl border border-white/5 bg-[#0F234E] p-5">
                  <p className="text-sm text-[#F8F6F2]/65">Risk exposure</p>
                  <p className="mt-3 text-4xl font-semibold text-[#F8F6F2]">Low</p>
                  <p className="mt-2 text-sm text-[#C7A461]">Stable outlook</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-white/5 bg-[#0C1739] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#F8F6F2]/65">Market confidence</p>
                    <p className="mt-1 text-3xl font-semibold text-[#F8F6F2]">$3.24B</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-[#C7A461]" />
                </div>
                <div className="mt-4 flex h-24 items-end gap-2">
                  {[38, 52, 44, 68, 76, 92, 84].map((height, index) => (
                    <span
                      key={index}
                      className="flex-1 rounded-t-full bg-gradient-to-t from-[#C7A461] to-[#E5D4A4]"
                      style={{ height: `${height}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <div className="grid gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl bg-[#0B1D3A] p-5 text-center">
              <p className="text-3xl font-semibold text-[#C7A461]">{item.value}</p>
              <p className="mt-2 text-sm text-[#F8F6F2]/65">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <div className="rounded-[2rem] border border-white/5 bg-gradient-to-r from-[#102857] to-[#0F1E45] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#C7A461]">Trusted by</p>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-sm text-[#F8F6F2]/55">
              <span>European Markets</span>
              <span>•</span>
              <span>Global Finance</span>
              <span>•</span>
              <span>G20 Advisory</span>
              <span>•</span>
              <span>Enterprise Board Network</span>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#C7A461]">Solutions</p>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Built for decisions that shape the future.
            </h2>
          </div>
          <Link href="#pricing" className="hidden items-center gap-2 text-sm text-[#F8F6F2]/78 md:inline-flex">
            View pricing <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl shadow-[#000]/15 backdrop-blur-2xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C7A461]/10 text-[#C7A461]">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#F8F6F2]/76">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="insights" className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#11295A] to-[#0E1C3D] p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-[#C7A461]">Global intelligence</p>
            <h2 className="mt-3 max-w-xl text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
              A unified view of markets, risks, and performance.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#F8F6F2]/75">
              Align leadership, strategy, and operations with a single platform that turns complex signals into clear action.
            </p>
            <div className="mt-8 space-y-4">
              {insightPoints.map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-2xl bg-white/5 p-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[#C7A461]/10 text-[#C7A461]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg text-[#F8F6F2]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#F8F6F2]/70">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-[#0F234E] p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-[#C7A461]">Live coverage</p>
                <h3 className="mt-2 text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
                  Market watch
                </h3>
              </div>
              <Globe className="h-8 w-8 text-[#C7A461]" />
            </div>
            <div className="mt-8 space-y-6">
              {[
                { label: "North America", value: "+6.2%", width: "68%" },
                { label: "Europe", value: "+4.1%", width: "54%" },
                { label: "Africa", value: "+8.9%", width: "82%" },
                { label: "Asia Pacific", value: "+5.6%", width: "74%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm text-[#F8F6F2]/70">
                    <span>{item.label}</span>
                    <span className="text-[#C7A461]">{item.value}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/5">
                    <div className="h-2 rounded-full bg-[#C7A461]" style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#0D1837] p-9">
            <p className="text-sm uppercase tracking-[0.35em] text-[#C7A461]">Why Aura</p>
            <h2 className="mt-3 text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Intelligence designed for institutions.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#F8F6F2]/75">
              We combine strategic research, governance insight, and enterprise-grade analytics into one platform built for clarity.
            </p>
            <div className="mt-7 space-y-4">
              {[
                "Cross-functional visibility for leadership teams",
                "Actionable insights with measurable business outcomes",
                "Secure, enterprise-ready governance and workflows",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#F8F6F2]/80">
                  <CircleCheck className="h-5 w-5 text-[#C7A461]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {sectorCards.map((card) => (
              <article key={card.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C7A461]/10 text-[#C7A461]">
                  <Landmark className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#F8F6F2]/72">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="research" className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#C7A461]">Research</p>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Fresh insight for leaders in motion.
            </h2>
          </div>
          <Link href="#pricing" className="hidden items-center gap-2 text-sm text-[#F8F6F2]/78 md:inline-flex">
            Explore reports <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {researchCards.map((card) => (
            <article key={card.title} className="rounded-[2rem] border border-white/10 bg-[#0F234E] p-7">
              <p className="text-xs uppercase tracking-[0.3em] text-[#C7A461]">{card.tag}</p>
              <h3 className="mt-4 text-2xl leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#F8F6F2]/72">{card.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="rounded-[2rem] border border-[#C7A461]/15 bg-gradient-to-r from-[#11295A] to-[#0D1E45] p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#C7A461]">Pricing</p>
              <h2 className="mt-3 text-4xl md:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
                Premium intelligence for decisive teams.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#F8F6F2]/75">
                Choose the level of access and advisory support that fits your organization.
              </p>
            </div>
            <Link href="/auth/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C7A461] px-7 py-3.5 text-sm font-semibold text-[#0B1D3A]">
              Book a strategy session
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-[#0A132D] px-6 py-8 text-sm text-[#F8F6F2]/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Aura Business Intelligence</p>
          <div className="flex gap-5">
            <Link href="#solutions" className="hover:text-[#F8F6F2]">Solutions</Link>
            <Link href="#research" className="hover:text-[#F8F6F2]">Research</Link>
            <Link href="#pricing" className="hover:text-[#F8F6F2]">Pricing</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
