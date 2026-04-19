import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Send, ArrowRight, Network, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ringImage from "@/assets/ring-placeholder.jpg";

export const Route = createFileRoute("/copilot")({
  head: () => ({
    meta: [
      { title: "Try the Copilot · Rare Carat Discoverability Engine" },
      {
        name: "description",
        content:
          "Phase 3: An interactive demo of the Rare Carat AI Copilot for diamond discovery.",
      },
      { property: "og:title", content: "Try the Copilot · Rare Carat Discoverability" },
      {
        property: "og:description",
        content: "Live, interactive AI Copilot demo for diamond discovery.",
      },
    ],
  }),
  component: CopilotPage,
});

type Chip = { label: string; value: number; color: string };

type Ring = {
  name: string;
  specs: string;
  price: string;
  chips: Chip[];
  reasoning: string;
};

const rings: Ring[] = [
  {
    name: "Mila Vintage-Inspired Solitaire",
    specs: "1.06ct · D · VVS2 · Oval Lab",
    price: "$2,050",
    chips: [
      { label: "Style", value: 95, color: "bg-emerald-500" },
      { label: "Budget", value: 88, color: "bg-emerald-500" },
      { label: "Proportions", value: 92, color: "bg-emerald-500" },
      { label: "Uniqueness", value: 80, color: "bg-amber-500" },
    ],
    reasoning:
      "Milgrain detailing gives vintage feel on a clean modern solitaire. 1.06ct reads substantial on small fingers without overwhelming.",
  },
  {
    name: "Beverly Timeless Hidden Halo",
    specs: "0.95ct · E · VS1 · Round Lab",
    price: "$2,240",
    chips: [
      { label: "Style", value: 78, color: "bg-amber-500" },
      { label: "Budget", value: 85, color: "bg-emerald-500" },
      { label: "Proportions", value: 90, color: "bg-emerald-500" },
      { label: "Uniqueness", value: 70, color: "bg-amber-500" },
    ],
    reasoning:
      "Hidden halo adds modern sparkle under a clean band. Strongest proportions for petite fingers.",
  },
  {
    name: "Madison Three-Stone Lab Pear",
    specs: "1.2ct tw · D · VS1 · Pear Lab",
    price: "$2,390",
    chips: [
      { label: "Style", value: 82, color: "bg-emerald-500" },
      { label: "Budget", value: 82, color: "bg-emerald-500" },
      { label: "Proportions", value: 85, color: "bg-emerald-500" },
      { label: "Uniqueness", value: 95, color: "bg-emerald-500" },
    ],
    reasoning:
      "Three-stone pear is the most artsy pick. Pear center elongates smaller hands beautifully.",
  },
  {
    name: "Hayden Curved Vine Lab",
    specs: "1.0ct · F · VS2 · Oval Lab",
    price: "$2,175",
    chips: [
      { label: "Style", value: 90, color: "bg-emerald-500" },
      { label: "Budget", value: 90, color: "bg-emerald-500" },
      { label: "Proportions", value: 88, color: "bg-emerald-500" },
      { label: "Uniqueness", value: 88, color: "bg-emerald-500" },
    ],
    reasoning:
      "Curved vine detail splits organic-artsy and classic-modern. Great all-rounder.",
  },
  {
    name: "Carmel Vintage Inspired",
    specs: "1.15ct · E · VS2 · Cushion Natural",
    price: "$2,760",
    chips: [
      { label: "Style", value: 92, color: "bg-emerald-500" },
      { label: "Budget", value: 75, color: "bg-amber-500" },
      { label: "Proportions", value: 89, color: "bg-emerald-500" },
      { label: "Uniqueness", value: 85, color: "bg-emerald-500" },
    ],
    reasoning:
      "Most overtly vintage. Slightly pushes budget but delivers strongest style match.",
  },
];

const profileRows = [
  { label: "Style", value: "Vintage-Modern-Artsy", confidence: 85 },
  { label: "Budget", value: "Under $3,000", confidence: 100 },
  { label: "Proportions", value: "Petite / Small Fingers", confidence: 90 },
  { label: "Setting", value: "Open", confidence: 30 },
  { label: "Metal", value: "Open", confidence: 0 },
];

function CopilotPage() {
  const [input, setInput] = useState("");

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">Phase 3</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-primary md:text-4xl">
          Live Copilot Demo
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[65fr_35fr]">
        {/* LEFT: Chat */}
        <div className="flex flex-col rounded-2xl border border-border bg-surface shadow-[var(--shadow-soft)]">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-border px-6 py-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-gold">
              <Sparkles className="h-4 w-4" />
            </span>
            <h2 className="font-serif text-lg font-semibold text-primary">
              Your Rare Carat Copilot
            </h2>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6 md:px-6">
            {/* User message */}
            <div className="flex justify-end animate-fade-in">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-primary-foreground shadow-sm">
                I want something vintage-looking but modern, under $3k, my girlfriend has
                small fingers and an artsy style.
              </div>
            </div>

            {/* AI message */}
            <div className="flex justify-start animate-fade-in">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm text-primary shadow-sm">
                Great brief. I've pulled 5 picks that balance your style, budget, and
                proportion cues. Here's what I'm thinking:
              </div>
            </div>

            {/* Product cards */}
            <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 xl:grid-cols-3">
              {rings.map((ring, i) => (
                <article
                  key={ring.name}
                  className="group min-w-[280px] flex-shrink-0 animate-fade-in rounded-xl border border-border bg-background p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_8px_30px_-8px_color-mix(in_oklab,var(--gold)_40%,transparent)] md:min-w-0"
                  style={{ animationDelay: `${150 + i * 100}ms`, animationFillMode: "both" }}
                >
                  <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-surface">
                    <img
                      src={ringImage}
                      alt={ring.name}
                      loading="lazy"
                      width={768}
                      height={768}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-primary">
                    {ring.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{ring.specs}</p>
                  <p className="mt-2 font-serif text-xl font-semibold text-primary">
                    {ring.price}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {ring.chips.map((chip) => (
                      <span
                        key={chip.label}
                        className="inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium text-primary"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${chip.color}`} />
                        {chip.label} {chip.value}%
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs italic leading-relaxed text-muted-foreground">
                    {ring.reasoning}
                  </p>
                </article>
              ))}
            </div>

            {/* Follow-up AI message */}
            <div
              className="flex justify-start animate-fade-in"
              style={{ animationDelay: "800ms", animationFillMode: "both" }}
            >
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm text-primary shadow-sm">
                Want to refine further, or should I escalate to Thea, one of our GIA
                gemologists, for a second opinion?
              </div>
            </div>

            <div
              className="flex flex-wrap gap-2 animate-fade-in"
              style={{ animationDelay: "900ms", animationFillMode: "both" }}
            >
              <Button variant="outline" size="sm" className="rounded-full">
                Refine: smaller size
              </Button>
              <Button
                size="sm"
                className="rounded-full bg-gold text-gold-foreground hover:bg-gold/90"
                asChild
              >
                <Link to="/gemologist">Talk to Thea</Link>
              </Button>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border bg-background/50 px-4 py-3 md:px-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setInput("");
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about cut, carat, or refine your picks…"
                className="flex-1 rounded-full bg-surface"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* RIGHT: Profile panel */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)]">
            <div className="mb-1 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Updating in real-time
              </p>
            </div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              Your Diamond Profile
            </h2>

            <div className="mt-6 space-y-5">
              {profileRows.map((row, i) => (
                <div
                  key={row.label}
                  className="animate-fade-in"
                  style={{ animationDelay: `${i * 120}ms`, animationFillMode: "both" }}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {row.label}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {row.confidence}%
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-primary">{row.value}</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background">
                    <div
                      className="h-full rounded-full bg-gold transition-all duration-1000 ease-out"
                      style={{ width: `${row.confidence}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs italic text-muted-foreground">
              Extracted from your last message.
            </p>

            <Link
              to="/profile"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-gold"
            >
              View full profile
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </aside>
      </div>

      {/* Cross-links to related demo surfaces */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          to="/profile"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_8px_30px_-8px_color-mix(in_oklab,var(--gold)_40%,transparent)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Network className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Under the hood</p>
              <p className="font-serif text-base font-semibold text-primary">See the underlying preference graph</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-gold" />
        </Link>
        <Link
          to="/gemologist"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_8px_30px_-8px_color-mix(in_oklab,var(--gold)_40%,transparent)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Headset className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Behind the curtain</p>
              <p className="font-serif text-base font-semibold text-primary">See the gemologist-side copilot</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-gold" />
        </Link>
      </div>
    </section>
  );
}
