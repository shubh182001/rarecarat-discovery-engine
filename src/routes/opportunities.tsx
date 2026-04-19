import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MessageCircle,
  Megaphone,
  BookOpenCheck,
  Scale,
  Route as RouteIcon,
  ArrowRight,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "The Discoverability Engine · Rare Carat" },
      {
        name: "description",
        content:
          "Five transformations powered by one unified preference graph. The Copilot is the entry point; every surface gets smarter in real time.",
      },
      { property: "og:title", content: "The Discoverability Engine · Rare Carat" },
      {
        property: "og:description",
        content:
          "Phase 2: Five transformations that turn every chat, click, and purchase into a smarter, more personal experience.",
      },
    ],
  }),
  component: OpportunitiesPage,
});

type AccentKey = "blue" | "amber" | "sage" | "crimson" | "plum";

type Phase = { label: string; duration: string };

type Opportunity = {
  id: string;
  number: string;
  icon: LucideIcon;
  headline: string;
  oneLine: string;
  tags: string[];
  accent: AccentKey;
  description: string[];
  quote: string;
  citation: string;
  phasing: Phase[];
  impact: string[];
  cta?: { label: string; to: "/copilot" };
};

const dimensions = [
  "Discovery",
  "Advertising",
  "Personalization",
  "Trust",
  "Retention",
];

type AccentConfig = {
  /** Solid color css value for the accent (used in gradients, borders, shadows) */
  solid: string;
  /** Soft tinted bg css value */
  soft: string;
  iconBg: string;
  iconText: string;
  bar: string;
  pill: string;
  chip: string;
};

const accents: Record<AccentKey, AccentConfig> = {
  blue: {
    solid: "oklch(0.45 0.13 250)",
    soft: "oklch(0.96 0.03 250)",
    iconBg: "bg-[oklch(0.92_0.05_250)]",
    iconText: "text-[oklch(0.4_0.13_250)]",
    bar: "bg-[oklch(0.45_0.13_250)]",
    pill: "bg-[oklch(0.92_0.05_250)] text-[oklch(0.35_0.12_250)]",
    chip: "bg-[oklch(0.45_0.13_250)] text-[oklch(0.98_0_0)]",
  },
  amber: {
    solid: "oklch(0.745 0.108 84)",
    soft: "oklch(0.97 0.04 85)",
    iconBg: "bg-gold/15",
    iconText: "text-[oklch(0.5_0.13_84)]",
    bar: "bg-gold",
    pill: "bg-gold/15 text-[oklch(0.45_0.12_84)]",
    chip: "bg-gold text-gold-foreground",
  },
  sage: {
    solid: "oklch(0.5 0.11 155)",
    soft: "oklch(0.96 0.04 155)",
    iconBg: "bg-[oklch(0.92_0.06_155)]",
    iconText: "text-[oklch(0.4_0.1_155)]",
    bar: "bg-[oklch(0.5_0.11_155)]",
    pill: "bg-[oklch(0.92_0.06_155)] text-[oklch(0.38_0.1_155)]",
    chip: "bg-[oklch(0.5_0.11_155)] text-[oklch(0.98_0_0)]",
  },
  crimson: {
    solid: "oklch(0.5 0.18 25)",
    soft: "oklch(0.96 0.04 25)",
    iconBg: "bg-[oklch(0.93_0.06_25)]",
    iconText: "text-[oklch(0.45_0.16_25)]",
    bar: "bg-[oklch(0.5_0.18_25)]",
    pill: "bg-[oklch(0.93_0.06_25)] text-[oklch(0.42_0.16_25)]",
    chip: "bg-[oklch(0.5_0.18_25)] text-[oklch(0.98_0_0)]",
  },
  plum: {
    solid: "oklch(0.45 0.15 320)",
    soft: "oklch(0.96 0.04 320)",
    iconBg: "bg-[oklch(0.93_0.06_320)]",
    iconText: "text-[oklch(0.42_0.14_320)]",
    bar: "bg-[oklch(0.45_0.15_320)]",
    pill: "bg-[oklch(0.93_0.06_320)] text-[oklch(0.4_0.14_320)]",
    chip: "bg-[oklch(0.45_0.15_320)] text-[oklch(0.98_0_0)]",
  },
};

const opportunities: Opportunity[] = [
  {
    id: "copilot",
    number: "01",
    icon: MessageCircle,
    accent: "blue",
    headline: "Replace the quiz with a conversation",
    oneLine:
      "Natural-language AI shopping assistant that interprets style, budget, and context, and learns across sessions.",
    tags: ["Discovery", "Personalization"],
    description: [
      "Most diamond shoppers don't know carat from clarity, but they know what feels like 'her.' The Conversational Discovery Copilot replaces multi-step quizzes and rigid filter trees with a single chat that translates intent, vintage, artsy, petite hands, under $3k, into ranked recommendations with reasoning.",
      "Every message refines a unified preference graph that follows the shopper across sessions, devices, and surfaces. Returning users skip the discovery work; new picks already reflect their style.",
      "Rare Carat's existing 100+ GIA gemologists become the escalation tier, not the front door, handling only the chats where human judgment moves the deal. The Copilot handles 80% of discovery on its own and routes the rest with full context attached.",
    ],
    quote:
      "AI-powered personalization can boost conversion rates by up to 23%. Retail chatbots increase sales by 67%.",
    citation: "Envive AI Implementation Statistics 2026",
    phasing: [
      { label: "MVP", duration: "6 weeks" },
      { label: "Phase 2", duration: "3 months" },
      { label: "Phase 3", duration: "9 months" },
    ],
    impact: [
      "+30% session-to-purchase conversion",
      "+15% AOV",
      "−50% gemologist cost per converted chat",
    ],
    cta: { label: "Try it now", to: "/copilot" },
  },
  {
    id: "ads",
    number: "02",
    icon: Megaphone,
    accent: "amber",
    headline: "Turn every chat into a performance ad",
    oneLine:
      "The Copilot becomes the centerpiece of a new ad stack, converting top-funnel intent into first-party data at 10x the rate of static display.",
    tags: ["Advertising"],
    description: [
      "Display ads send shoppers to a static landing page; the Copilot-Powered Advertising Engine sends them straight into a conversation. A Meta ad reading 'Vintage feel, modern silhouette, under $3k?' opens a pre-seeded chat already shaped by the ad creative.",
      "That single tap captures qualified intent, style, budget, urgency, as first-party data the moment the user arrives, not after they've completed a 40-field signup.",
      "The same Copilot interface plugs into Google's AI Overviews, Pinterest shopping, and emerging agentic browsers. Wherever buyers ask, Rare Carat answers, and every answer is an attributed acquisition event.",
      "Voice-first ad surfaces multiply the reach. TikTok, Instagram Reels, and smart speaker platforms are increasingly voice-driven. A Rare Carat ad where the user hears a warm, confident voice ask 'Tell me what you're looking for in an engagement ring' and responds verbally through their phone mic would be category-defining. ElevenLabs-grade voice synthesis lets every gemologist's expertise scale across audio channels while maintaining the personal, named brand relationship customers love.",
    ],
    quote:
      "AI-referred traffic to US retail sites grew 4,700% year over year, and visitors spent 32% longer on site.",
    citation: "Adobe Digital Trends 2025",
    phasing: [
      { label: "MVP", duration: "8 weeks" },
      { label: "Phase 2", duration: "4 months" },
      { label: "Phase 3", duration: "8 months" },
    ],
    impact: ["−40% CAC", "+60% ad CTR", "+300% first-party data capture", "Voice-shoppable across 49.6% of US voice-search-using consumers"],
  },
  {
    id: "content",
    number: "03",
    icon: BookOpenCheck,
    accent: "sage",
    headline: "Every customer question becomes a landing page",
    oneLine:
      "Anonymized chat archives become a permanent SEO moat and authority-building content library.",
    tags: ["Discovery", "Trust"],
    description: [
      "Every Copilot conversation contains a real shopper question that thousands of other shoppers also Google. The Ask Rare Carat Content Engine anonymizes those questions, clusters them, and publishes the gemologist-vetted answers as evergreen pages.",
      "The result: a long-tail SEO library that grows by hundreds of pages a month without a content team writing them from scratch. Each page links back into the relevant Copilot flow, closing the loop from search to chat to purchase.",
      "Over time, this becomes the diamond category's Stack Overflow, the place AI overviews, Reddit threads, and journalists cite when they need an answer. Authority compounds; competitors can't catch up with paid content alone.",
    ],
    quote:
      "Products with 11, 30 reviews show approximately 68% higher conversion rates. Site search users convert 2, 3x higher than non-searchers.",
    citation: "Envive Ecommerce Conversion Statistics 2026",
    phasing: [
      { label: "MVP", duration: "4 weeks" },
      { label: "Phase 2", duration: "3 months" },
      { label: "Phase 3", duration: "9 months" },
    ],
    impact: ["+150% organic search traffic", "+40% first-page Google rankings"],
  },
  {
    id: "trust",
    number: "04",
    icon: Scale,
    accent: "crimson",
    headline: "Show savvy and casual buyers the same fair deal",
    oneLine:
      "Live IGI-matched price comparison, percentile quality scoring, and vendor craftsmanship transparency.",
    tags: ["Trust", "Discovery"],
    description: [
      "Diamond pricing is opaque by tradition, and that opacity is the #1 driver of bounced sessions and 'thinking it over' chats. The Dynamic Price + Trust Transparency Layer surfaces, on every product page, the live market range for that exact spec set, where this stone sits in the percentile, and what's driving the premium or discount.",
      "Every diamond gets a plain-English Trust Card: cut performance, fluorescence note, supplier track record, and a one-line gemologist take. Savvy buyers get the data they'd otherwise hunt for on PriceScope; casual buyers get a clean recommendation they can trust.",
      "The result is fewer 'are you sure this is a fair price?' chats, higher Compare-tool conversion, and a measurable drop in the 1, 3 star reviews that mention pricing surprise or supplier quality.",
    ],
    quote:
      "76% of consumers become frustrated when experiences aren't tailored. Transparency and clarity in pricing is a baseline expectation.",
    citation: "Envive Online Shopping Conversion Statistics 2026",
    phasing: [
      { label: "MVP", duration: "6 weeks" },
      { label: "Phase 2", duration: "4 months" },
      { label: "Phase 3", duration: "9 months" },
    ],
    impact: [
      "−30% chat volume on pricing",
      "+50% Compare conversion",
      "−45% 1, 3 star review rate",
    ],
  },
  {
    id: "journey",
    number: "05",
    icon: RouteIcon,
    accent: "plum",
    headline: "Turn one-time buyers into lifetime customers",
    oneLine:
      "Persistent profile + gamified Diamond IQ + milestone lifecycle + visual UGC community, all powered by the preference graph.",
    tags: ["Retention", "Personalization"],
    description: [
      "An engagement ring is most retailers' last sale to a customer. The Rare Carat Journey treats it as the first. The same preference graph that powered discovery now powers a multi-year relationship, anniversaries, weddings, push presents, milestone gifts.",
      "Diamond IQ turns the buyer's growing knowledge into a gamified profile they want to share. Milestone lifecycle automation triggers the right nudge at the right moment, not generic 'we miss you' email blasts. The UGC community converts 3,600+ Trustpilot reviewers into a visible flywheel of real photos, real stories, and real proof.",
      "Together, these pieces unlock the long tail of jewelry spend that today flows to local jewelers and Tiffany. Retention isn't a discount code; it's the fact that Rare Carat already knows what she'll love next.",
    ],
    quote:
      "Loyalty program members generate 12, 18% incremental revenue. Emotionally connected customers demonstrate 306% higher lifetime value.",
    citation: "Envive Online Shopping Conversion Lift Statistics 2026",
    phasing: [
      { label: "MVP", duration: "8 weeks" },
      { label: "Phase 2", duration: "4 months" },
      { label: "Phase 3", duration: "10 months" },
    ],
    impact: [
      "+40% repeat visit within 30 days",
      "+25% second-purchase rate",
      "+15% net new customers via referral",
    ],
  },
];

/** Animate the first numeric token of a string from 0 to its value */
function useCountUp(target: string, duration = 1100, delay = 0, run = true) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!run) {
      setDisplay(target);
      return;
    }
    const match = target.match(/^([^\d−-]*[−-]?)(\d+(?:[.,]\d+)?)(.*)$/);
    if (!match) {
      setDisplay(target);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const finalNum = parseFloat(numStr.replace(/,/g, ""));
    if (!isFinite(finalNum)) {
      setDisplay(target);
      return;
    }
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const format = (n: number) =>
      `${prefix}${n.toFixed(decimals)}${suffix}`;

    setDisplay(format(0));
    let startTime: number | null = null;
    const begin = performance.now() + delay;

    const tick = (now: number) => {
      if (now < begin) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(format(finalNum * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay, run]);

  return display;
}

function OpportunitiesPage() {
  const [open, setOpen] = useState<Opportunity | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      activeFilter
        ? opportunities.filter((o) => o.tags.includes(activeFilter))
        : opportunities,
    [activeFilter],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      {/* Title */}
      <header className="mb-10 text-center md:mb-14">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">
          Phase 2 · Transformation
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-primary md:text-6xl">
          The Discoverability Engine
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Five transformations. One underlying thesis: every chat, click, and
          purchase feeds a unified understanding of each customer, and every
          surface gets smarter in real time.
        </p>

        {/* Dimensions filter */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Filter by dimension:
          </span>
          {dimensions.map((d) => {
            const active = activeFilter === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setActiveFilter(active ? null : d)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-surface text-primary hover:border-primary/40"
                }`}
              >
                {d}
              </button>
            );
          })}
          {activeFilter && (
            <button
              type="button"
              onClick={() => setActiveFilter(null)}
              className="ml-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>
      </header>

      {/* Tile grid */}
      <div
        className="grid gap-5 lg:grid-cols-6"
        style={{ perspective: "1200px" }}
      >
        {filtered.map((o, i) => {
          const span =
            !activeFilter && i === 0
              ? "lg:col-span-3 lg:row-span-2"
              : "lg:col-span-3";
          return (
            <OpportunityTile
              key={o.id}
              opportunity={o}
              spanClass={span}
              feature={!activeFilter && i === 0}
              onOpen={() => setOpen(o)}
            />
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted-foreground">
            No transformations match that dimension. Try clearing the filter.
          </div>
        )}
      </div>

      {/* Summary */}
      <section className="mt-16 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-primary via-primary to-[oklch(0.2_0.06_264)] p-8 text-center shadow-[var(--shadow-elegant)] md:p-14">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
          <Sparkles className="h-5 w-5" />
        </div>
        <h2 className="font-serif text-3xl font-semibold text-primary-foreground md:text-4xl">
          Five transformations. One underlying engine.
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-primary-foreground/85 md:text-base">
          All five plug into the same Unified Preference Graph, a single profile
          per user that every surface reads from and writes to. The Copilot is the
          entry point, because it builds the profile from the first interaction.
          Every other system gets smarter as the profile grows. This is the
          Discoverability Engine.
        </p>
        <Link
          to="/copilot"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-md transition-all hover:scale-105 hover:bg-gold/90 md:text-base"
        >
          See the Copilot in action
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <OpportunityModal open={open} onClose={() => setOpen(null)} />
    </div>
  );
}

function OpportunityTile({
  opportunity,
  spanClass,
  feature,
  onOpen,
}: {
  opportunity: Opportunity;
  spanClass: string;
  feature: boolean;
  onOpen: () => void;
}) {
  const a = accents[opportunity.accent];
  const Icon = opportunity.icon;
  const tiltRef = useRef<HTMLButtonElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Max ~5deg tilt
    el.style.transform = `translateY(-6px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
  };
  const handleLeave = () => {
    const el = tiltRef.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      className={`group relative ${spanClass}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Gradient border wrapper */}
      <div
        className="absolute inset-0 rounded-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${a.solid}, color-mix(in oklab, ${a.solid} 25%, transparent) 55%, ${a.solid})`,
          padding: "1.5px",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        aria-hidden
      />

      <button
        ref={tiltRef}
        type="button"
        onClick={onOpen}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-6 text-left shadow-sm transition-[transform,box-shadow] duration-200 ease-out will-change-transform hover:shadow-[0_22px_55px_-18px_color-mix(in_oklab,var(--primary)_30%,transparent)] md:p-7"
        style={{
          background: `linear-gradient(140deg, ${a.soft}, color-mix(in oklab, ${a.soft} 60%, white) 100%)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Subtle accent glow on hover */}
        <span
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at 50% -20%, color-mix(in oklab, ${a.solid} 20%, transparent), transparent 60%)`,
          }}
          aria-hidden
        />

        <div className="relative flex items-start justify-between gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${a.iconBg} ${a.iconText}`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <span
            className={`rounded-full px-2.5 py-1 font-serif text-xs font-semibold ${a.chip}`}
          >
            {opportunity.number}
          </span>
        </div>

        <h3
          className={`relative mt-5 font-serif font-semibold leading-tight text-primary ${
            feature ? "mt-8 text-3xl md:text-4xl" : "text-xl md:text-2xl"
          }`}
        >
          {opportunity.headline}
        </h3>
        <p
          className={`relative mt-3 leading-relaxed text-muted-foreground ${
            feature ? "text-base" : "text-sm"
          }`}
        >
          {opportunity.oneLine}
        </p>

        <div className="relative mt-auto pt-5">
          <div className="flex flex-wrap gap-1.5">
            {opportunity.tags.map((t) => (
              <span
                key={t}
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${a.pill}`}
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.16em] text-primary/70 transition-colors group-hover:text-primary">
            Click to explore <ArrowRight className="h-3 w-3" />
          </p>
        </div>
      </button>
    </div>
  );
}

function PhasingBar({ phasing, accent }: { phasing: Phase[]; accent: AccentKey }) {
  const a = accents[accent];
  return (
    <div className="relative">
      {/* Continuous bar with gradient segments */}
      <div className="flex h-3 overflow-hidden rounded-full">
        <div
          className={`flex-1 ${a.bar}`}
          style={{ opacity: 1 }}
        />
        <div className={`flex-1 ${a.bar}`} style={{ opacity: 0.65 }} />
        <div className={`flex-1 ${a.bar}`} style={{ opacity: 0.35 }} />
      </div>

      {/* Markers + labels */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {phasing.map((p, i) => (
          <div key={p.label} className="text-left">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${a.chip}`}
                style={{ opacity: 1 - i * 0.18 }}
              >
                {i + 1}
              </span>
              <p className="font-serif text-sm font-semibold text-primary">
                {p.label}
              </p>
            </div>
            <p className="mt-1 pl-7 text-xs text-muted-foreground">{p.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImpactMetric({
  text,
  accent,
  delay,
  run,
}: {
  text: string;
  accent: AccentKey;
  delay: number;
  run: boolean;
}) {
  const a = accents[accent];
  // Split "+30% session-to-purchase conversion" into stat + label
  const match = text.match(/^([+−-]?\d+(?:[.,]\d+)?[%x]?)\s*(.*)$/);
  const stat = match?.[1] ?? text;
  const label = match?.[2] ?? "";
  const animated = useCountUp(stat, 1200, delay, run);
  return (
    <li className="flex items-baseline gap-3 rounded-lg bg-surface px-3 py-2.5">
      <span
        className={`font-serif text-lg font-bold tabular-nums ${a.iconText}`}
      >
        {animated}
      </span>
      {label && (
        <span className="text-sm leading-snug text-primary">{label}</span>
      )}
    </li>
  );
}

function OpportunityModal({
  open,
  onClose,
}: {
  open: Opportunity | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        {open && (
          <div className="space-y-5">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${accents[open.accent].iconBg} ${accents[open.accent].iconText}`}
                >
                  <open.icon className="h-5 w-5" />
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 font-serif text-xs font-semibold ${accents[open.accent].chip}`}
                >
                  Transformation {open.number}
                </span>
              </div>
              <DialogTitle className="mt-3 font-serif text-2xl text-primary md:text-3xl">
                {open.headline}
              </DialogTitle>
              <DialogDescription className="text-sm">
                {open.oneLine}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              {open.description.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>

            <blockquote
              className={`rounded-xl border-l-4 bg-surface p-4 ${accents[open.accent].iconText}`}
              style={{ borderLeftColor: "currentColor" }}
            >
              <p className="font-serif text-base italic leading-relaxed text-primary">
                "{open.quote}"
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                {open.citation}
              </p>
            </blockquote>

            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Implementation phasing
              </h4>
              <PhasingBar phasing={open.phasing} accent={open.accent} />
            </div>

            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Expected impact
              </h4>
              <ul className="space-y-2">
                {open.impact.map((m, i) => (
                  <ImpactMetric
                    key={m}
                    text={m}
                    accent={open.accent}
                    delay={150 + i * 150}
                    run={!!open}
                  />
                ))}
              </ul>
            </div>

            {open.cta && (
              <div className="flex justify-end pt-2">
                <Link
                  to={open.cta.to}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {open.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
