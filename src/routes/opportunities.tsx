import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageCircle,
  Megaphone,
  BookOpenCheck,
  Scale,
  Route as RouteIcon,
  ArrowRight,
  Sparkles,
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

const accents: Record<
  AccentKey,
  {
    bg: string;
    border: string;
    iconBg: string;
    iconText: string;
    bar: string;
    pill: string;
    chip: string;
    glow: string;
  }
> = {
  blue: {
    bg: "bg-[oklch(0.96_0.03_250)]",
    border: "border-[oklch(0.7_0.12_250)]/30",
    iconBg: "bg-[oklch(0.92_0.05_250)]",
    iconText: "text-[oklch(0.4_0.13_250)]",
    bar: "bg-[oklch(0.45_0.13_250)]",
    pill: "bg-[oklch(0.92_0.05_250)] text-[oklch(0.35_0.12_250)]",
    chip: "bg-[oklch(0.45_0.13_250)] text-[oklch(0.98_0_0)]",
    glow: "hover:shadow-[0_18px_45px_-15px_oklch(0.45_0.13_250/0.45)]",
  },
  amber: {
    bg: "bg-[oklch(0.97_0.04_85)]",
    border: "border-gold/40",
    iconBg: "bg-gold/15",
    iconText: "text-[oklch(0.5_0.13_84)]",
    bar: "bg-gold",
    pill: "bg-gold/15 text-[oklch(0.45_0.12_84)]",
    chip: "bg-gold text-gold-foreground",
    glow: "hover:shadow-[0_18px_45px_-15px_oklch(0.745_0.108_84/0.5)]",
  },
  sage: {
    bg: "bg-[oklch(0.96_0.04_155)]",
    border: "border-[oklch(0.65_0.1_155)]/35",
    iconBg: "bg-[oklch(0.92_0.06_155)]",
    iconText: "text-[oklch(0.4_0.1_155)]",
    bar: "bg-[oklch(0.5_0.11_155)]",
    pill: "bg-[oklch(0.92_0.06_155)] text-[oklch(0.38_0.1_155)]",
    chip: "bg-[oklch(0.5_0.11_155)] text-[oklch(0.98_0_0)]",
    glow: "hover:shadow-[0_18px_45px_-15px_oklch(0.5_0.11_155/0.45)]",
  },
  crimson: {
    bg: "bg-[oklch(0.96_0.04_25)]",
    border: "border-[oklch(0.6_0.18_25)]/35",
    iconBg: "bg-[oklch(0.93_0.06_25)]",
    iconText: "text-[oklch(0.45_0.16_25)]",
    bar: "bg-[oklch(0.5_0.18_25)]",
    pill: "bg-[oklch(0.93_0.06_25)] text-[oklch(0.42_0.16_25)]",
    chip: "bg-[oklch(0.5_0.18_25)] text-[oklch(0.98_0_0)]",
    glow: "hover:shadow-[0_18px_45px_-15px_oklch(0.5_0.18_25/0.45)]",
  },
  plum: {
    bg: "bg-[oklch(0.96_0.04_320)]",
    border: "border-[oklch(0.55_0.15_320)]/35",
    iconBg: "bg-[oklch(0.93_0.06_320)]",
    iconText: "text-[oklch(0.42_0.14_320)]",
    bar: "bg-[oklch(0.45_0.15_320)]",
    pill: "bg-[oklch(0.93_0.06_320)] text-[oklch(0.4_0.14_320)]",
    chip: "bg-[oklch(0.45_0.15_320)] text-[oklch(0.98_0_0)]",
    glow: "hover:shadow-[0_18px_45px_-15px_oklch(0.45_0.15_320/0.45)]",
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
      "Most diamond shoppers don't know carat from clarity, but they know what feels like 'her.' The Conversational Discovery Copilot replaces multi-step quizzes and rigid filter trees with a single chat that translates intent — vintage, artsy, petite hands, under $3k — into ranked recommendations with reasoning.",
      "Every message refines a unified preference graph that follows the shopper across sessions, devices, and surfaces. Returning users skip the discovery work; new picks already reflect their style.",
      "Rare Carat's existing 100+ GIA gemologists become the escalation tier, not the front door — handling only the chats where human judgment moves the deal. The Copilot handles 80% of discovery on its own and routes the rest with full context attached.",
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
    tags: ["Advertising", "Acquisition"],
    description: [
      "Display ads send shoppers to a static landing page; the Copilot-Powered Advertising Engine sends them straight into a conversation. A Meta ad reading 'Vintage feel, modern silhouette, under $3k?' opens a pre-seeded chat already shaped by the ad creative.",
      "That single tap captures qualified intent — style, budget, urgency — as first-party data the moment the user arrives, not after they've completed a 40-field signup.",
      "The same Copilot interface plugs into Google's AI Overviews, Pinterest shopping, and emerging agentic browsers. Wherever buyers ask, Rare Carat answers, and every answer is an attributed acquisition event.",
    ],
    quote:
      "AI-referred traffic to US retail sites grew 4,700% year over year, and visitors spent 32% longer on site.",
    citation: "Adobe Digital Trends 2025",
    phasing: [
      { label: "MVP", duration: "8 weeks" },
      { label: "Phase 2", duration: "4 months" },
      { label: "Phase 3", duration: "8 months" },
    ],
    impact: ["−40% CAC", "+60% ad CTR", "+3x first-party data capture"],
  },
  {
    id: "content",
    number: "03",
    icon: BookOpenCheck,
    accent: "sage",
    headline: "Every customer question becomes a landing page",
    oneLine:
      "Anonymized chat archives become a permanent SEO moat and authority-building content library.",
    tags: ["Marketing", "Trust"],
    description: [
      "Every Copilot conversation contains a real shopper question that thousands of other shoppers also Google. The Ask Rare Carat Content Engine anonymizes those questions, clusters them, and publishes the gemologist-vetted answers as evergreen pages.",
      "The result: a long-tail SEO library that grows by hundreds of pages a month without a content team writing them from scratch. Each page links back into the relevant Copilot flow, closing the loop from search to chat to purchase.",
      "Over time, this becomes the diamond category's Stack Overflow — the place AI overviews, Reddit threads, and journalists cite when they need an answer. Authority compounds; competitors can't catch up with paid content alone.",
    ],
    quote:
      "Products with 11–30 reviews show approximately 68% higher conversion rates. Site search users convert 2–3x higher than non-searchers.",
    citation: "Envive Ecommerce Conversion Statistics 2026",
    phasing: [
      { label: "MVP", duration: "4 weeks" },
      { label: "Phase 2", duration: "3 months" },
      { label: "Phase 3", duration: "9 months" },
    ],
    impact: [
      "+150% organic search traffic",
      "+40% first-page Google rankings",
    ],
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
      "The result is fewer 'are you sure this is a fair price?' chats, higher Compare-tool conversion, and a measurable drop in the 1–3 star reviews that mention pricing surprise or supplier quality.",
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
      "Major reduction in 1–3 star review rate",
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
    tags: ["Retention", "Community"],
    description: [
      "An engagement ring is most retailers' last sale to a customer. The Rare Carat Journey treats it as the first. The same preference graph that powered discovery now powers a multi-year relationship — anniversaries, weddings, push presents, milestone gifts.",
      "Diamond IQ turns the buyer's growing knowledge into a gamified profile they want to share. Milestone lifecycle automation triggers the right nudge at the right moment, not generic 'we miss you' email blasts. The UGC community converts 3,600+ Trustpilot reviewers into a visible flywheel of real photos, real stories, and real proof.",
      "Together, these pieces unlock the long tail of jewelry spend that today flows to local jewelers and Tiffany. Retention isn't a discount code; it's the fact that Rare Carat already knows what she'll love next.",
    ],
    quote:
      "Loyalty program members generate 12–18% incremental revenue. Emotionally connected customers demonstrate 306% higher lifetime value.",
    citation: "Envive Online Shopping Conversion Lift Statistics 2026",
    phasing: [
      { label: "MVP", duration: "8 weeks" },
      { label: "Phase 2", duration: "4 months" },
      { label: "Phase 3", duration: "10 months" },
    ],
    impact: [
      "+40% repeat visit rate within 30 days",
      "+25% second-purchase rate within 24 months",
      "+10–15% net new customer acquisition via referral",
    ],
  },
];

function OpportunitiesPage() {
  const [open, setOpen] = useState<Opportunity | null>(null);

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

        {/* Dimensions legend */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Dimensions:
          </span>
          {dimensions.map((d) => (
            <span
              key={d}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary"
            >
              {d}
            </span>
          ))}
        </div>
      </header>

      {/* Tile grid: feature tile (#1) takes 2 rows, others fill */}
      <div className="grid gap-5 lg:grid-cols-6">
        {opportunities.map((o, i) => {
          const span =
            i === 0 ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-3";
          return (
            <OpportunityTile
              key={o.id}
              opportunity={o}
              spanClass={span}
              feature={i === 0}
              onOpen={() => setOpen(o)}
            />
          );
        })}
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
          All five plug into the same Unified Preference Graph — a single profile
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
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border ${a.border} ${a.bg} p-6 text-left shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 ${a.glow} md:p-7 ${spanClass}`}
    >
      {/* Top stripe */}
      <span
        className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${a.bar}`}
      />

      <div className="flex items-start justify-between gap-3">
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
        className={`mt-5 font-serif font-semibold leading-tight text-primary ${
          feature ? "text-3xl md:text-4xl mt-8" : "text-xl md:text-2xl"
        }`}
      >
        {opportunity.headline}
      </h3>
      <p
        className={`mt-3 leading-relaxed text-muted-foreground ${
          feature ? "text-base" : "text-sm"
        }`}
      >
        {opportunity.oneLine}
      </p>

      <div className="mt-auto pt-5">
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

            {/* Description */}
            <div className="space-y-3">
              {open.description.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>

            {/* Quote */}
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

            {/* Phasing */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Implementation phasing
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {open.phasing.map((p, i) => (
                  <div
                    key={p.label}
                    className="rounded-lg border border-border bg-surface p-3"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${accents[open.accent].chip}`}
                      >
                        {i + 1}
                      </span>
                      <p className="font-serif text-sm font-semibold text-primary">
                        {p.label}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.duration}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-border">
                <span className={`h-full w-1/3 ${accents[open.accent].bar}`} />
                <span
                  className={`h-full w-1/3 ${accents[open.accent].bar} opacity-60`}
                />
                <span
                  className={`h-full w-1/3 ${accents[open.accent].bar} opacity-30`}
                />
              </div>
            </div>

            {/* Impact */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Expected impact
              </h4>
              <ul className="space-y-2">
                {open.impact.map((m) => (
                  <li
                    key={m}
                    className="flex items-start gap-2 rounded-lg bg-surface px-3 py-2 text-sm text-primary"
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${accents[open.accent].bar}`}
                    />
                    {m}
                  </li>
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
