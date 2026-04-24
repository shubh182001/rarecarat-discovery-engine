import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/current-state")({
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
  label?: string;
  title: string;
  description: string;
  quote: string;
  citation: string;
  sourceUrl?: string;
};

const strengths: Tile[] = [
  {
    icon: Star,
    stat: "5.0 / 5.0",
    title: "Customers trust it more than any competitor",
    description:
      "5.0 on Trustpilot across 3,600+ verified reviews — highest of any jewelry brand on the platform, two years running",
    quote:
      "Reviews name specific staff by first name. That's not a support team score. That's a relationship score.",
    citation: "Trustpilot 2026 verified data",
  },
  {
    icon: Database,
    stat: "1,000,000+",
    title: "No other site shows you if you're overpaying",
    description:
      "The Rare Carat Report checks every diamond against the full market, flagging price and quality issues before you buy",
    quote:
      "Over 1 million diamonds analyzed. 50 data points per stone. Forbes called it revolutionary.",
    citation: "Envive AI Ecommerce Statistics 2026",
  },
  {
    icon: Headset,
    stat: "100+ GIA Gemologists · 24/7",
    title: "Round-the-clock human expertise, free",
    description:
      "Real GIA-certified gemologists available 24/7 via chat, at no cost, with no sales pressure",
    quote:
      "Every other online retailer either charges for expert access or doesn't offer it. Rare Carat makes it the default.",
    citation: "Makebot.ai Ecommerce Conversion Report 2026",
  },
  {
    icon: TrendingDown,
    stat: "Up to 40% Below Retail",
    title: "Wholesale pricing, consumer experience",
    description:
      "No showrooms, no middlemen. Rare Carat sources directly from vetted wholesalers, so the savings pass to the buyer",
    quote:
      "Comparable diamonds routinely run 20-40% cheaper than traditional jewelry stores on equivalent specs.",
    citation: "McKinsey & Co. Diamond Industry Report 2025",
  },
  {
    icon: Newspaper,
    stat: "NYT · Forbes · CNBC · HBS",
    title: "Editorial credibility that money can't buy",
    description:
      "The New York Times, Forbes, CNBC, NPR, and Harvard Business School have all covered Rare Carat independently",
    quote:
      "CEO Ajay Anand sits on Forbes 30 Under 30 judging panels. That's not a press hit — that's category authority.",
    citation: "Rare Carat LinkedIn",
  },
];

const gaps: Tile[] = [
  {
    icon: Video,
    stat: "40x Zoom, Standardized",
    label: "Trust gap",
    title: "Hard to know what you're actually buying",
    description:
      "Shopping for a $5,000 stone from a photo alone creates real doubt. Video quality across the site varies by supplier.",
    quote:
      "Rare Carat's video quality varies by supplier — a direct observation from professional diamond buyers. When a customer is spending $5,000 on something they can't touch, inconsistent visuals create doubt at the worst possible moment.",
    citation: "Lab Diamonds Review, 2025",
    sourceUrl: "https://labdiamondsreview.com/reviews/rare-carat-reviews/",
  },
  {
    icon: Package,
    stat: "Free Replica in 48 Hours",
    label: "Pre-purchase anxiety",
    title: "No way to see the ring before committing",
    description:
      "Customers wait 2-3 weeks for delivery with no way to try the ring before it arrives. That's a long time to second-guess a $5,000 decision.",
    quote:
      "68% of luxury shoppers abandon purchases because they can't see product details adequately. A 2-3 week build time with no preview creates real anxiety. With Clarity solved this with free home replicas. Rare Carat has no equivalent.",
    citation: "Immerss Jewelry E-Commerce Trends, 2025",
    sourceUrl: "https://www.immerss.live/content/jewelry-ecommerce-trends-2025/",
  },
  {
    icon: Sparkles,
    stat: "46% Shop Together",
    label: "Shopping behavior",
    title: "The site is built for one person, not two",
    description:
      "Nearly half of couples now shop for rings together. The site has no way to accommodate two people making one decision.",
    quote:
      "46% of couples now jointly shop for engagement rings. The site has no shared wishlist, no couples mode, no his-and-hers experience. That's nearly half the market shopping in a system designed for someone else.",
    citation: "Jewelers Mutual Engagement Ring Study, 2024",
    sourceUrl:
      "https://www.jewelersmutual.com/resources/individuals/rings/engagement-ring-study-2024",
  },
  {
    icon: BookOpen,
    stat: "Decades of Milestones",
    label: "Post-purchase relationship",
    title: "Customer loyalty ends at the transaction",
    description:
      "After purchase, there's no milestone engine, no anniversary triggers, no reason for a happy customer to come back. The relationship stops at checkout.",
    quote:
      "The average couple buys an engagement ring, then a wedding band, then anniversary pieces over decades. Research shows post-purchase follow-up and relationship continuity are key loyalty drivers in jewelry — yet Rare Carat has no milestone engine, no anniversary triggers, no structured reason for a happy customer to return.",
    citation: "Jewel360 Jewelry Retail Trends, 2026",
    sourceUrl: "https://jewel360.com/blog/trends-in-jewelry-retail",
  },
  {
    icon: Smartphone,
    stat: "78% Shop Across Sessions",
    label: "Personalization",
    title: "Every visitor starts from zero",
    description:
      "There's no persistent profile. Return visitors see the same generic experience as first-timers, even after expressing clear preferences in a previous chat.",
    quote:
      "84% of shoppers say personalization matters when deciding where to buy. Return visitors to Rare Carat see the same generic experience as first-timers — no memory of previous chats, preferences, or searches. Every restart is a conversion risk.",
    citation: "ResultFirst Jewelry E-Commerce Trends, 2025",
    sourceUrl: "https://www.resultfirst.com/blog/ecommerce-seo/jewelry-ecommerce-trends/",
  },

];

/**
 * Animates a stat string by counting up its first numeric token.
 * Non-numeric strings render as-is.
 */
function useCountUp(target: string, duration = 1400, delay = 0) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const match = target.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
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
    const hasDecimal = numStr.includes(".");
    const hasComma = numStr.includes(",");
    const decimals = hasDecimal ? numStr.split(".")[1].length : 0;

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const [intPart, decPart] = fixed.split(".");
      const withCommas = hasComma
        ? Number(intPart).toLocaleString("en-US")
        : intPart;
      return `${prefix}${decPart ? `${withCommas}.${decPart}` : withCommas}${suffix}`;
    };

    setDisplay(format(0));
    let start: number | null = null;
    const startTime = performance.now() + delay;

    const tick = (now: number) => {
      if (now < startTime) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (start === null) start = now;
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
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
  }, [target, duration, delay]);

  return display;
}

function HomePage() {
  const [modalTile, setModalTile] = useState<Tile | null>(null);

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
          A snapshot of where the brand stands, and where it can go next.
        </p>

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground md:text-sm">
          <StatPill bold="$102B" label="global diamond market" delay={0} />
          <span className="hidden h-1 w-1 rounded-full bg-border md:inline-block" />
          <StatPill bold="55%" label="in North America" delay={200} />
          <span className="hidden h-1 w-1 rounded-full bg-border md:inline-block" />
          <StatPill bold="70%+" label="of millennials buying lab-grown" delay={400} />
        </div>
      </header>

      {/* Two sections */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <SectionColumn
          eyebrow="Strengths"
          title="What Rare Carat Does Well"
          accent="gold"
          tiles={strengths}
          onOpenSource={setModalTile}
        />
        <SectionColumn
          eyebrow="Gaps"
          title="Where Competitors Have the Edge"
          accent="navy"
          tiles={gaps}
          onOpenSource={setModalTile}
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

      {/* Source modal */}
      <Dialog open={!!modalTile} onOpenChange={(o) => !o && setModalTile(null)}>
        <DialogContent className="max-w-lg">
          {modalTile && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl text-primary">
                  {modalTile.title}
                </DialogTitle>
                <DialogDescription className="text-xs uppercase tracking-wider">
                  Source ·{" "}
                  {modalTile.sourceUrl ? (
                    <a
                      href={modalTile.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-gold"
                    >
                      {modalTile.citation}
                    </a>
                  ) : (
                    modalTile.citation
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {modalTile.description}
                </p>
                <blockquote className="rounded-lg border-l-4 border-gold bg-surface p-4 font-serif text-base italic leading-relaxed text-primary">
                  "{modalTile.quote}"
                </blockquote>
                <p className="text-xs text-muted-foreground">
                  Compiled for the Rare Carat Discoverability research deck. Citations
                  reflect publicly available reports as of April 2026.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatPill({
  bold,
  label,
  delay,
}: {
  bold: string;
  label: string;
  delay: number;
}) {
  const value = useCountUp(bold, 1400, delay);
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="font-serif text-base font-semibold text-primary md:text-lg tabular-nums">
        {value}
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
  onOpenSource,
}: {
  eyebrow: string;
  title: string;
  accent: "gold" | "navy";
  tiles: Tile[];
  onOpenSource: (t: Tile) => void;
}) {
  const eyebrowClasses =
    accent === "gold"
      ? "text-gold-foreground bg-gold"
      : "text-primary-foreground bg-primary";

  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${eyebrowClasses}`}
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
            delay={300 + i * 120}
            onOpenSource={onOpenSource}
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
  delay,
  onOpenSource,
  className = "",
}: {
  tile: Tile;
  accent: "gold" | "navy";
  delay: number;
  onOpenSource: (t: Tile) => void;
  className?: string;
}) {
  const Icon = tile.icon;
  const animatedStat = useCountUp(tile.stat, 1600, delay);
  const [isOpen, setIsOpen] = useState(false);

  // Warm gold accents for strengths, cool navy/crimson for gaps.
  const tone =
    accent === "gold"
      ? {
          iconWrap: "bg-gold/15 text-gold",
          topStripe: "bg-gradient-to-r from-gold/70 via-gold to-gold/70",
          hoverBorder: "hover:border-gold/70",
          hoverShadow:
            "hover:shadow-[0_18px_40px_-18px_color-mix(in_oklab,var(--gold)_55%,transparent)]",
          quoteBorder: "border-gold",
        }
      : {
          iconWrap: "bg-primary/10 text-primary",
          topStripe:
            "bg-gradient-to-r from-primary/60 via-primary to-primary/60",
          hoverBorder: "hover:border-primary/60",
          hoverShadow:
            "hover:shadow-[0_18px_40px_-18px_color-mix(in_oklab,var(--primary)_55%,transparent)]",
          quoteBorder: "border-primary",
        };

  return (
    <article
      onClick={() => setIsOpen((v) => !v)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 cursor-pointer ${isOpen ? "is-open -translate-y-1.5" : ""} ${tone.hoverBorder} ${tone.hoverShadow} ${className}`}
      aria-expanded={isOpen}
    >
      {/* Top accent stripe */}
      <div
        className={`h-[3px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${isOpen ? "!scale-x-100" : ""} ${tone.topStripe}`}
      />

      <div className="flex flex-1 flex-col p-5">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone.iconWrap}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        {tile.label ? (
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {tile.label}
          </p>
        ) : (
          <p className="mt-4 font-serif text-2xl font-bold leading-tight text-primary tabular-nums">
            {animatedStat}
          </p>
        )}
        <h3 className="mt-2 font-serif text-base font-semibold leading-snug text-primary">
          {tile.title}
        </h3>

        {/* Slide-down expandable section */}
        <div className={`grid transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div className={`pt-4 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 ${isOpen ? "opacity-100" : "opacity-0"}`}>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {tile.description}
              </p>
              <p
                className={`mt-3 border-l-2 pl-2.5 text-xs italic leading-snug text-primary ${tone.quoteBorder}`}
              >
                "{tile.quote}"
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {tile.citation}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenSource(tile);
                  }}
                  className="inline-flex items-center gap-1 rounded-full text-[10px] font-medium uppercase tracking-wider text-primary transition-colors hover:text-gold"
                >
                  View source
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className={`mt-3 text-[10px] uppercase tracking-wider text-muted-foreground transition-opacity duration-200 group-hover:opacity-0 ${isOpen ? "opacity-0" : ""}`}>
          <span className="hidden md:inline">Hover for research →</span>
          <span className="md:hidden">Tap for research →</span>
        </p>
      </div>
    </article>
  );
}
