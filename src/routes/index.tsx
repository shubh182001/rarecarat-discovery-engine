import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Star,
  Database,
  Headset,
  TrendingDown,
  Newspaper,
  Video,
  Sparkles,
  Package,
  Smartphone,
  BookOpen,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rare Carat Today · Discoverability Engine" },
      {
        name: "description",
        content:
          "A snapshot of where Rare Carat stands today: category strengths, competitor gaps, and where the brand can lead next.",
      },
      { property: "og:title", content: "Rare Carat Today · Discoverability Engine" },
      {
        property: "og:description",
        content:
          "Brand snapshot: strengths, competitor gaps, and the path to category leadership.",
      },
    ],
  }),
  component: HomePage,
});

type Tile = {
  icon: LucideIcon;
  stat: string;
  title: string;
  description: string;
  quote: string;
  citation: string;
};

const strengths: Tile[] = [
  {
    icon: Star,
    stat: "5.0 / 5.0",
    title: "Trustpilot's #1 Rated Jeweler (2024–2026)",
    description:
      "Rare Carat holds a perfect 5-star rating across 3,600+ verified reviews, with 98% at 5 stars. Customers consistently name specific staff (Matthew H., Cait, CEO Ajay Anand) as the reason to choose Rare Carat over Blue Nile or James Allen.",
    quote:
      "Rare Carat has been ranked as Trustpilot's #1 rated jewelry brand for two consecutive years.",
    citation: "Trustpilot 2026 verified data",
  },
  {
    icon: Database,
    stat: "1,000,000+",
    title: "Diamonds Analyzed by AI Price Engine",
    description:
      "The Rare Carat Report analyzes price fairness and quality flags across 1M+ diamonds using 50 data points per stone. Forbes called it 'Revolutionary.'",
    quote:
      "AI personalization delivers conversion rate lifts up to 23% with 40% revenue increases.",
    citation: "Envive AI Ecommerce Statistics 2026",
  },
  {
    icon: Headset,
    stat: "100+ GIA Gemologists · 24/7",
    title: "Only Diamond Retailer with Round-the-Clock Human Expertise",
    description:
      "100+ GIA-trained gemologists available 24/7 via chat, free and unbiased. Named gemologists appear repeatedly in 5-star reviews.",
    quote:
      "Shoppers who chat convert at 12.3% versus 3.1% for non-chatters — a 4x higher conversion rate.",
    citation: "Makebot.ai Ecommerce Conversion Report 2026",
  },
  {
    icon: TrendingDown,
    stat: "Up to 40% Below Retail",
    title: "Marketplace Pricing Advantage",
    description:
      "Aggregating across vetted wholesalers and operating without brick-and-mortar overhead, Rare Carat delivers prices 20–40% below traditional jewelers on comparable specs.",
    quote:
      "Natural diamond producers slashed prices 10–15% in 2024 to compete with lab-grown's massive success.",
    citation: "McKinsey & Co. Diamond Industry Report 2025",
  },
  {
    icon: Newspaper,
    stat: "NYT · Forbes · CNBC · HBS",
    title: "Earned Editorial Credibility",
    description:
      "The NYT called Rare Carat 'The Secret to Buying the Perfect Diamond.' CEO Ajay Anand serves on Forbes 30 Under 30 judging panels.",
    quote:
      "RareCarat.com powers over $100 million in annual sales by creating transparency in a historically opaque industry.",
    citation: "Rare Carat LinkedIn",
  },
];

const gaps: Tile[] = [
  {
    icon: Video,
    stat: "40x Zoom, Standardized",
    title: "James Allen's 360° HD Video Consistency",
    description:
      "James Allen pioneered 40x Super Zoom for every diamond with in-house standardized imaging. Rare Carat's video quality varies by supplier — a trust gap.",
    quote:
      "James Allen pioneered virtual loupe technology, providing comprehensive 360HD videos for detailed inspection.",
    citation: "PriceScope Industry Review 2024",
  },
  {
    icon: Sparkles,
    stat: "ASET + IdealScope + H&A",
    title: "Whiteflash's Light Performance Proof",
    description:
      "Whiteflash shows ASET, IdealScope, and Hearts & Arrows imaging for every A CUT ABOVE diamond. Rare Carat shows none. For premium shoppers, this is the reason to choose Whiteflash.",
    quote:
      "Their technology is, hands down, the best way to simulate an in-person inspection when shopping online.",
    citation: "Moissanite by Aurelia, 2026 Industry Comparison",
  },
  {
    icon: Package,
    stat: "Free Replica in 48 Hours",
    title: "With Clarity's Home Try-On",
    description:
      "With Clarity ships a free non-precious replica of any setting for home try-on before buyers commit. Rare Carat has no equivalent, despite 2–3 week build waits cited as 'nerve-racking' in reviews.",
    quote:
      "Only 34% of consumers believe retailers are good at personalization, while 71% of retailers think they excel at it.",
    citation: "Sailthru Personalization Study, Rep AI 2025",
  },
  {
    icon: Smartphone,
    stat: "Any Ring, On Your Hand",
    title: "AR Virtual Try-On (Blue Nile, Brilliant Earth)",
    description:
      "Blue Nile, Brilliant Earth, and James Allen all have mobile AR try-on. Rare Carat has none. In 2026, this is table stakes, not a differentiator.",
    quote:
      "86% of brides say the overall design of the ring matters the most. It needs to match her fashion sense and lifestyle.",
    citation: "CreditDonkey Online Diamond Retailer Analysis, 2025",
  },
  {
    icon: BookOpen,
    stat: "20+ Awards · 40+ Showrooms",
    title: "Brilliant Earth's Content + Community Flywheel",
    description:
      "Brilliant Earth publishes extensive editorial content, showcases customer photos, and operates 40+ showrooms. Rare Carat has a thin blog and no UGC loop, leaving 3,600+ reviews unharnessed.",
    quote:
      "Brilliant Earth has earned 10,000+ five-star reviews. Customers highlight personalized service and confidence from visualizing their design before purchase.",
    citation: "Honest Brand Reviews, 2026",
  },
];

function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      {/* Title */}
      <header className="mb-12 text-center md:mb-16">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">
          Phase 1 · Current State
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-primary md:text-6xl">
          Rare Carat Today
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A snapshot of where the brand stands — and where it can go next.
        </p>

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground md:text-sm">
          <StatPill bold="$102B" label="global diamond market" />
          <span className="hidden h-1 w-1 rounded-full bg-border md:inline-block" />
          <StatPill bold="55%" label="in North America" />
          <span className="hidden h-1 w-1 rounded-full bg-border md:inline-block" />
          <StatPill bold="70%+" label="of millennials buying lab-grown" />
        </div>
      </header>

      {/* Two sections */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <SectionColumn
          eyebrow="Strengths"
          title="What Rare Carat Does Well"
          accent="emerald"
          tiles={strengths}
        />
        <SectionColumn
          eyebrow="Gaps"
          title="What Competitors Do Better"
          accent="amber"
          tiles={gaps}
        />
      </div>

      {/* CTA */}
      <div className="mt-16 overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-primary to-primary/90 p-8 text-center shadow-[var(--shadow-elegant)] md:p-12">
        <h2 className="mx-auto max-w-3xl font-serif text-2xl font-semibold text-primary-foreground md:text-3xl">
          So how does Rare Carat turn these strengths into category leadership and close
          these gaps?
        </h2>
        <Link
          to="/opportunities"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-md transition-all hover:scale-105 hover:bg-gold/90 md:text-base"
        >
          Explore the Transformation Opportunities
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function StatPill({ bold, label }: { bold: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="font-serif text-base font-semibold text-primary md:text-lg">
        {bold}
      </span>
      <span>{label}</span>
    </span>
  );
}

function SectionColumn({
  eyebrow,
  title,
  accent,
  tiles,
}: {
  eyebrow: string;
  title: string;
  accent: "emerald" | "amber";
  tiles: Tile[];
}) {
  const accentClasses =
    accent === "emerald"
      ? "text-emerald-700 bg-emerald-500/10"
      : "text-amber-700 bg-amber-500/15";

  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${accentClasses}`}
        >
          {eyebrow}
        </span>
        <h2 className="font-serif text-2xl font-semibold text-primary md:text-3xl">
          {title}
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {tiles.map((tile, i) => (
          <TileCard
            key={tile.title}
            tile={tile}
            accent={accent}
            className={i === tiles.length - 1 ? "sm:col-span-2" : ""}
          />
        ))}
      </div>
    </section>
  );
}

function TileCard({
  tile,
  accent,
  className = "",
}: {
  tile: Tile;
  accent: "emerald" | "amber";
  className?: string;
}) {
  const Icon = tile.icon;
  const iconBg =
    accent === "emerald"
      ? "bg-emerald-500/10 text-emerald-700"
      : "bg-amber-500/15 text-amber-700";

  return (
    <article
      className={`group relative flex min-h-[200px] flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[var(--shadow-elegant)] ${className}`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Default state */}
      <div className="mt-4 flex flex-1 flex-col transition-opacity duration-200 group-hover:opacity-0">
        <p className="font-serif text-2xl font-bold leading-tight text-primary">
          {tile.stat}
        </p>
        <h3 className="mt-2 font-serif text-base font-semibold leading-snug text-primary">
          {tile.title}
        </h3>
        <p className="mt-auto pt-3 text-[10px] uppercase tracking-wider text-muted-foreground">
          Hover for research →
        </p>
      </div>

      {/* Hover state */}
      <div className="pointer-events-none absolute inset-0 flex flex-col rounded-2xl bg-surface p-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="mt-3 font-serif text-sm font-semibold leading-snug text-primary">
          {tile.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {tile.description}
        </p>
        <p className="mt-2 border-l-2 border-gold pl-2.5 text-xs italic leading-snug text-primary">
          "{tile.quote}"
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          {tile.citation}
        </p>
      </div>
    </article>
  );
}
