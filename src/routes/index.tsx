import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Send, Sparkles, X, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import milaImg from "@/assets/rings/mila.jpeg";
import beverlyImg from "@/assets/rings/beverly.webp";
import madisonImg from "@/assets/rings/madison.webp";
import haydenImg from "@/assets/rings/hayden.webp";
import carmelImg from "@/assets/rings/carmel.webp";
import couplesImg from "@/assets/rings/couples.jpg";

const ringImages: Record<string, string> = {
  mila: milaImg,
  beverly: beverlyImg,
  madison: madisonImg,
  hayden: haydenImg,
  carmel: carmelImg,
  couples: couplesImg,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rare Carat · Find the diamond that finds you back" },
      {
        name: "description",
        content:
          "Browse engagement rings and diamonds with an AI Copilot that learns your taste, budget, and story in real time.",
      },
      { property: "og:title", content: "Rare Carat · Find the diamond that finds you back" },
      {
        property: "og:description",
        content:
          "An AI-native diamond browsing experience. Tell the Copilot what you want; watch the collection respond.",
      },
    ],
  }),
  component: HomePage,
});

type Product = {
  id: string;
  name: string;
  specs: string;
  total: number;
  diamond: number;
  setting: number;
  setting_label: string;
  labor: number;
  margin: number;
  market: number;
  match: number;
  tags: string[];
  isCouples?: boolean;
};

const products: Product[] = [
  {
    id: "mila",
    name: "Mila Vintage-Inspired Solitaire",
    specs: "1.06ct · D · VVS2 · Oval Lab",
    diamond: 1420, setting: 380, setting_label: "14k white gold", labor: 150, margin: 100,
    total: 2050, market: 2890, match: 94,
    tags: ["vintage", "lab", "under-3k", "oval", "petite", "small"],
  },
  {
    id: "beverly",
    name: "Beverly Timeless Hidden Halo",
    specs: "0.95ct · E · VS1 · Round Lab",
    diamond: 1560, setting: 410, setting_label: "platinum", labor: 170, margin: 100,
    total: 2240, market: 3120, match: 89,
    tags: ["modern", "lab", "under-3k", "round", "halo"],
  },
  {
    id: "madison",
    name: "Madison Three-Stone Lab Pear",
    specs: "1.2ct tw · D · VS1 · Pear Lab",
    diamond: 1690, setting: 425, setting_label: "14k yellow gold", labor: 165, margin: 110,
    total: 2390, market: 3340, match: 86,
    tags: ["artsy", "lab", "under-3k", "pear", "three-stone"],
  },
  {
    id: "hayden",
    name: "Hayden Curved Vine Lab",
    specs: "1.0ct · F · VS2 · Oval Lab",
    diamond: 1495, setting: 420, setting_label: "rose gold", labor: 160, margin: 100,
    total: 2175, market: 2980, match: 91,
    tags: ["vintage", "modern", "lab", "under-3k", "oval"],
  },
  {
    id: "carmel",
    name: "Carmel Vintage Cushion Natural",
    specs: "1.15ct · E · VS2 · Cushion Natural",
    diamond: 1980, setting: 480, setting_label: "platinum", labor: 180, margin: 120,
    total: 2760, market: 3850, match: 82,
    tags: ["vintage", "natural", "cushion"],
  },
  {
    id: "couples",
    name: "The Couples Set · Eloise & Theo",
    specs: "Engagement + matching wedding bands · pair",
    diamond: 1680, setting: 540, setting_label: "platinum, two bands", labor: 210, margin: 130,
    total: 2560, market: 3590, match: 88,
    tags: ["couples", "matching", "wedding", "band", "bands"],
    isCouples: true,
  },
];

const PROMPT_CHIPS = [
  { label: "Vintage under $3k", tags: ["vintage", "under-3k"] },
  { label: "Lab-grown, oval, small fingers", tags: ["lab", "oval", "petite"] },
  { label: "Matching wedding bands", tags: ["couples", "matching"] },
];

function filterProducts(query: string): Product[] {
  const q = query.toLowerCase();
  if (!q.trim()) return products;
  const matched = products.filter((p) => {
    return p.tags.some((t) => q.includes(t)) || q.includes(p.id);
  });
  return matched.length > 0 ? matched : products;
}

type Msg = { id: string; role: "user" | "ai"; text: string };

const initialMsgs: Msg[] = [
  {
    id: "i1",
    role: "ai",
    text: "Hi, I'm Clara. Tell me what you're looking for — a vibe, a budget, a partner's style — and I'll narrow the collection in real time.",
  },
];

function HomePage() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Product[]>(products);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [hoverId, setHoverId] = useState<string | null>(null);

  // Copilot sidebar
  const [chatOpen, setChatOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>(initialMsgs);
  const [thinking, setThinking] = useState<string | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const thinkingTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => thinkingTimers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const runQuery = (q: string) => {
    setQuery(q);
    setFiltered(filterProducts(q));
  };

  const handleChip = (label: string) => {
    runQuery(label);
    setChatOpen(true);
    sendChat(label);
  };

  const toggleFav = (id: string) => {
    setFavorites((f) => {
      const next = new Set(f);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const sendChat = async (text: string) => {
    if (!text.trim() || isReplying) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", text };
    const next = [...messages, userMsg];
    setMessages(next);
    setChatInput("");
    setIsReplying(true);
    runQuery(text);

    const steps = [
      { t: "Reading your brief...", d: 500 },
      { t: "Checking inventory...", d: 800 },
      { t: "Matching to your profile...", d: 600 },
    ];
    setThinking(steps[0].t);
    let cum = 0;
    thinkingTimers.current.forEach(clearTimeout);
    thinkingTimers.current = [];
    steps.forEach((s, i) => {
      cum += s.d;
      if (i < steps.length - 1) {
        thinkingTimers.current.push(
          setTimeout(() => setThinking(steps[i + 1].t), cum),
        );
      }
    });

    const history = next.map((m) => ({
      role: m.role === "ai" ? "assistant" : "user",
      content: m.text,
    }));

    try {
      const { data, error } = await supabase.functions.invoke("clara-chat", {
        body: { messages: history },
      });
      thinkingTimers.current.forEach(clearTimeout);
      thinkingTimers.current = [];
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const reply: string = data?.text ?? "Let me think on that.";
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: "ai", text: reply }]);
    } catch (err: any) {
      thinkingTimers.current.forEach(clearTimeout);
      thinkingTimers.current = [];
      console.error(err);
      toast.error("Couldn't reach Clara", { description: err?.message });
    } finally {
      setThinking(null);
      setIsReplying(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendChat(chatInput);
  };

  return (
    <div className="relative">
      {/* HERO */}
      <section className="border-b border-border/60 bg-gradient-to-b from-surface/60 to-background">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center md:py-24">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[oklch(0.5_0.13_84)]">
            <Sparkles className="h-3 w-3" /> AI-native browsing
          </span>
          <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.05] text-primary md:text-6xl">
            Find the diamond that finds you back
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Tell the Copilot what you're looking for. Watch the collection respond.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {PROMPT_CHIPS.map((c) => (
              <button
                key={c.label}
                onClick={() => handleChip(c.label)}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-primary transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[var(--shadow-soft)]"
              >
                {c.label}
              </button>
            ))}
          </div>

          {query && (
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Showing {filtered.length} result{filtered.length === 1 ? "" : "s"} for "{query}"
              <button
                onClick={() => { setQuery(""); setFiltered(products); }}
                className="ml-2 inline-flex items-center gap-1 text-gold hover:underline"
              >
                <X className="h-3 w-3" /> clear
              </button>
            </p>
          )}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-primary md:text-3xl">
              The Collection
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Hover any ring to see the full price breakdown.
            </p>
          </div>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1200px" }}>
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isFav={favorites.has(p.id)}
              onFav={() => toggleFav(p.id)}
              hovered={hoverId === p.id}
              onHover={(h) => setHoverId(h ? p.id : null)}
            />
          ))}
        </div>
      </section>

      {/* COPILOT FLOATING BUTTON */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="h-4 w-4" /> Open Copilot
        </button>
      )}

      {/* COPILOT SIDEBAR */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ${
          chatOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-gold">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="font-serif text-base font-semibold text-primary">Clara</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Rare Carat Copilot
              </p>
            </div>
          </div>
          <button
            onClick={() => setChatOpen(false)}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-surface hover:text-primary"
            aria-label="Close Copilot"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface text-foreground"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl bg-surface px-4 py-2.5 text-sm text-muted-foreground">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-gold" />
                {thinking}
              </div>
            </div>
          )}
        </div>

        {/* Profile collapsible */}
        <div className="border-t border-border">
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="flex w-full items-center justify-between px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"
          >
            <span>Your Living Profile</span>
            {profileOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
          </button>
          {profileOpen && (
            <div className="space-y-1.5 px-5 pb-3 text-xs">
              {[
                ["Style", query.includes("vintage") ? "Vintage-leaning" : "Open"],
                ["Budget", query.includes("3k") ? "Under $3,000" : "Open"],
                ["Setting", query.includes("halo") ? "Halo" : "Open"],
                ["Metal", "Open"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium text-primary">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border p-4">
          <Input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Tell Clara what you're looking for…"
            disabled={isReplying}
          />
          <Button type="submit" size="icon" disabled={isReplying || !chatInput.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </aside>
    </div>
  );
}

function ProductCard({
  product: p,
  isFav,
  onFav,
  hovered,
  onHover,
}: {
  product: Product;
  isFav: boolean;
  onFav: () => void;
  hovered: boolean;
  onHover: (h: boolean) => void;
}) {
  const fmt = (n: number) => `$${n.toLocaleString()}`;
  const savings = p.market - p.total;
  const pct = Math.round((savings / p.market) * 100);

  return (
    <div
      className="group relative"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 ${
          hovered ? "-translate-y-1.5 shadow-[var(--shadow-elegant)]" : ""
        }`}
      >
        <div className="relative aspect-square overflow-hidden bg-surface">
          <img
            src={ringImages[p.id] ?? milaImg}
            alt={p.name}
            loading="lazy"
            className={`h-full w-full object-contain transition-transform duration-300 ease-in-out ${
              hovered ? "scale-110 animate-float-bob" : "scale-100"
            }`}
          />
          {/* Match chip */}
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-primary backdrop-blur">
            {p.match}% match
          </span>
          {p.isCouples && (
            <span className="absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-foreground">
              Couples Set
            </span>
          )}
          {/* Heart */}
          <button
            onClick={onFav}
            aria-label={isFav ? "Remove from profile" : "Add to profile"}
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-primary backdrop-blur transition-colors hover:bg-background"
          >
            <Heart
              className={`h-4 w-4 ${isFav ? "fill-[oklch(0.5_0.13_84)] text-[oklch(0.5_0.13_84)]" : ""}`}
            />
          </button>
        </div>

        <div className="p-5">
          <h3 className="font-serif text-lg font-semibold text-primary">{p.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{p.specs}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-xl font-semibold text-primary">{fmt(p.total)}</span>
            <span className="text-xs text-muted-foreground line-through">{fmt(p.market)}</span>
          </div>
        </div>
      </div>

      {/* Price breakdown tooltip */}
      <div
        className={`pointer-events-none absolute left-full top-4 z-20 ml-3 hidden w-72 rounded-xl border border-gold/40 bg-primary p-4 text-primary-foreground shadow-xl transition-all duration-200 lg:block ${
          hovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
        }`}
      >
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
          Price Breakdown
        </p>
        <dl className="space-y-1.5 text-xs">
          <Row label="Diamond" value={fmt(p.diamond)} />
          <Row label={`Setting (${p.setting_label})`} value={fmt(p.setting)} />
          <Row label="Labor & craftsmanship" value={fmt(p.labor)} />
          <Row label="Rare Carat margin" value={fmt(p.margin)} />
        </dl>
        <div className="my-2 border-t border-white/15" />
        <Row label="Total" value={fmt(p.total)} bold />
        <div className="mt-3 rounded-lg bg-white/5 p-2.5 text-[11px]">
          <Row label="Market average" value={fmt(p.market)} muted />
          <Row label="You save" value={`${fmt(savings)} (${pct}%)`} accent />
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  muted,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <dt className={muted ? "text-white/60" : "text-white/80"}>{label}</dt>
      <dd
        className={`tabular-nums ${
          accent ? "font-semibold text-gold" : muted ? "text-white/60" : bold ? "font-semibold text-white" : "text-white"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
