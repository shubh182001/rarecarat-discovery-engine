import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Sparkles, Package, Truck, Gem, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ringPlaceholder from "@/assets/ring-placeholder.jpg";
import milaImg from "@/assets/rings/mila.jpeg";
import carmelImg from "@/assets/rings/carmel.webp";
import madisonImg from "@/assets/rings/madison.webp";
import beverlyImg from "@/assets/rings/beverly.webp";
import haydenImg from "@/assets/rings/hayden.webp";
import couplesModernImg from "@/assets/rings/couples-modern.webp";
import couplesVintageImg from "@/assets/rings/couples-vintage.avif";
import couplesStatementImg from "@/assets/rings/couples-statement.webp";

export const Route = createFileRoute("/couples")({
  head: () => ({
    meta: [
      { title: "Couples · Rare Carat · Shop rings as a set" },
      {
        name: "description",
        content:
          "Tell the Copilot about both of you. Get matched ring sets with combined pricing, always cheaper than buying separately.",
      },
      { property: "og:title", content: "Couples · Rare Carat" },
      {
        property: "og:description",
        content:
          "Matched ring sets for couples with combined pricing. Average couple saves $340.",
      },
    ],
  }),
  component: CouplesPage,
});

type CoupleSet = {
  id: string;
  title: string;
  image: string;
  her: { name: string; price: number; image: string };
  his: { name: string; price: number; image: string };
  combined: number;
  saves: number;
  tags: string[];
};

const sets: CoupleSet[] = [
  {
    id: "modern-minimal",
    title: "The Modern Minimal",
    image: couplesModernImg,
    her: { name: "Mila Vintage-Inspired Solitaire", price: 2050, image: milaImg },
    his: { name: "Low Dome Polished Band 6mm Yellow Gold", price: 760, image: ringPlaceholder },
    combined: 2650,
    saves: 160,
    tags: ["Clean", "Modern", "Everyday"],
  },
  {
    id: "vintage-romance",
    title: "The Vintage Romance",
    image: couplesVintageImg,
    her: { name: "Carmel Vintage Inspired Cushion", price: 2760, image: carmelImg },
    his: { name: "Classic Milgrain Edge Band", price: 680, image: ringPlaceholder },
    combined: 3290,
    saves: 150,
    tags: ["Vintage", "Romantic", "Statement"],
  },
  {
    id: "statement-pair",
    title: "The Statement Pair",
    image: couplesStatementImg,
    her: { name: "Madison Three-Stone Pear", price: 2390, image: madisonImg },
    his: { name: "Diamond Channel Set Band", price: 890, image: ringPlaceholder },
    combined: 3130,
    saves: 150,
    tags: ["Bold", "Unique", "Artsy"],
  },
];

const fmt = (n: number) => `$${n.toLocaleString()}`;

function SetCard({ set }: { set: CoupleSet }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-surface/60 p-6">
        <img
          src={set.image}
          alt={set.title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[11px] font-semibold text-primary shadow">
          Saves {fmt(set.saves)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-serif text-xl font-semibold text-primary">{set.title}</h3>
          <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span className="truncate pr-2">Her · {set.her.name}</span>
              <span className="shrink-0 font-medium text-foreground/80">{fmt(set.her.price)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="truncate pr-2">His · {set.his.name}</span>
              <span className="shrink-0 font-medium text-foreground/80">{fmt(set.his.price)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-baseline justify-between border-t border-border/60 pt-3">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Together</span>
          <span className="font-serif text-2xl font-semibold text-primary">{fmt(set.combined)}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {set.tags.map((t) => (
            <span key={t} className="rounded-full border border-border/60 bg-surface/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        <Button className="mt-auto w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Shop This Set
        </Button>
      </div>
    </article>
  );
}

function CouplesCopilot() {
  const [her, setHer] = useState("");
  const [his, setHis] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!her.trim() || !his.trim()) return;
    setSubmitted(true);
  };

  const result = {
    her: { name: "Hayden Petite Pavé Solitaire", price: 2180, image: haydenImg, note: "Vintage-leaning, low profile, artsy proportions." },
    his: { name: "Smooth Yellow Gold Comfort Band 5mm", price: 720, image: ringPlaceholder, note: "Minimal, warm yellow gold to match her setting." },
  };
  const combined = result.her.price + result.his.price;

  return (
    <section className="bg-surface/40 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-[oklch(0.5_0.13_84)]">
            <Sparkles className="h-3.5 w-3.5" /> Copilot · Couples Mode
          </span>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-primary md:text-4xl">
            Not seeing your style? Describe both of you.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Two inputs. One matched set. The Copilot finds rings that look intentional together, and prices them as a bundle.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Her style</label>
              <Input
                value={her}
                onChange={(e) => setHer(e.target.value)}
                placeholder="vintage, small hands, artsy"
                className="h-11"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">His style</label>
              <Input
                value={his}
                onChange={(e) => setHis(e.target.value)}
                placeholder="minimal, simple band, yellow gold"
                className="h-11"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="bg-gold text-primary hover:bg-gold/90"
            >
              <Send className="h-4 w-4" /> Find our set
            </Button>
          </div>
        </form>

        {submitted && (
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-[oklch(0.5_0.13_84)]">
              <Heart className="h-4 w-4 fill-current" /> This is your set
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {[{ label: "Her pick", ring: result.her }, { label: "His pick", ring: result.his }].map((c) => (
                <div key={c.label} className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
                  <div className="flex aspect-[4/3] items-center justify-center bg-surface/60 p-6">
                    <img src={c.ring.image} alt={c.ring.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</span>
                    <h3 className="mt-1 font-serif text-lg font-semibold text-primary">{c.ring.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{c.ring.note}</p>
                    <div className="mt-3 text-sm font-medium text-foreground/80">{fmt(c.ring.price)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col items-center gap-1 rounded-2xl border border-gold/40 bg-gold/10 px-6 py-4 text-center">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Combined price</span>
              <span className="font-serif text-3xl font-semibold text-primary">{fmt(combined)}</span>
              <span className="text-xs text-[oklch(0.5_0.13_84)]">Bundled, saves ~$180 vs. buying separately</span>
            </div>

            {/* Dual profile panel */}
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                { label: "Her profile", traits: her || "vintage, small hands, artsy", budget: "Under $2.5k", metal: "White gold / platinum" },
                { label: "His profile", traits: his || "minimal, simple band, yellow gold", budget: "Under $1k", metal: "Yellow gold" },
              ].map((p) => (
                <div key={p.label} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-[oklch(0.5_0.13_84)]">
                      <Heart className="h-4 w-4" />
                    </div>
                    <h4 className="font-serif text-base font-semibold text-primary">{p.label}</h4>
                  </div>
                  <dl className="mt-3 space-y-2 text-xs">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Style</dt>
                      <dd className="text-right font-medium text-foreground/80">{p.traits}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Budget</dt>
                      <dd className="font-medium text-foreground/80">{p.budget}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Metal</dt>
                      <dd className="font-medium text-foreground/80">{p.metal}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CouplesPage() {
  return (
    <div>
      {/* HEADER */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center md:py-24">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-[oklch(0.5_0.13_84)]">
            <Heart className="h-6 w-6" />
          </div>
          <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-primary md:text-5xl lg:text-6xl">
            Two people. One decision.
            <br />
            Make it easy.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Tell the Copilot about both of you. Get matched sets with a combined price, always cheaper than buying separately.
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-[oklch(0.5_0.13_84)]">
            Average couple saves $340 buying as a set on Rare Carat
          </p>
        </div>
      </section>

      {/* FEATURED SETS */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-primary md:text-4xl">Featured couples sets</h2>
              <p className="mt-2 text-sm text-muted-foreground">Curated pairs designed to look intentional together.</p>
            </div>
            <Link to="/copilot" className="hidden text-sm font-medium text-primary underline-offset-4 hover:underline md:inline">
              Browse all rings →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sets.map((s) => (
              <SetCard key={s.id} set={s} />
            ))}
          </div>
        </div>
      </section>

      {/* COPILOT COUPLES MODE */}
      <CouplesCopilot />

      {/* WHY BUY AS A SET */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-semibold text-primary md:text-4xl">Why buy as a set?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Three small reasons that add up to a noticeably better experience.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Package,
                title: "Always cheaper together",
                body: "Bundle pricing saves $150 to $400 vs. buying the same two rings individually.",
              },
              {
                icon: Truck,
                title: "Ships together",
                body: "One order, one delivery, one unboxing moment, with no waiting on a second package.",
              },
              {
                icon: Gem,
                title: "Designed to complement",
                body: "Every set is chosen so the rings look intentional together, not coincidental.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-[oklch(0.5_0.13_84)]">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-primary">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
