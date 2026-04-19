import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  Flame,
  Clock,
  Sparkles,
  RefreshCw,
  PenLine,
  Send,
  Plus,
  TrendingUp,
  Gift,
  Users,
} from "lucide-react";
import ringImage from "@/assets/ring-placeholder.jpg";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/gemologist")({
  head: () => ({
    meta: [
      { title: "Gemologist View · Rare Carat Discoverability Engine" },
      {
        name: "description",
        content:
          "Staff-side console: how Rare Carat gemologists pair with the AI Copilot to support shoppers in real time.",
      },
      { property: "og:title", content: "Gemologist View · Rare Carat Discoverability" },
      {
        property: "og:description",
        content: "Staff-side AI Assist console, Copilot-augmented gemologist workflow.",
      },
    ],
  }),
  component: GemologistPage,
});

const queue = [
  {
    name: "Sarah K.",
    preview:
      "I want something vintage-looking but modern, under $3k, my girlfriend has small fingers…",
    wait: "3 min",
    priority: "hot",
    active: true,
  },
  {
    name: "Marcus R.",
    preview: "Looking at a 2ct oval lab, is the SI1 clarity going to show inclusions?",
    wait: "1 min",
    priority: "normal",
  },
  {
    name: "Priya N.",
    preview: "Can you compare these two GIA reports for me? Trying to decide tonight.",
    wait: "5 min",
    priority: "warm",
  },
  {
    name: "James W.",
    preview: "Need a 3-stone setting in platinum, budget is flexible up to $8k.",
    wait: "2 min",
    priority: "normal",
  },
  {
    name: "Emma L.",
    preview: "Following up, did the appraisal come back on the cushion I saved?",
    wait: "8 min",
    priority: "warm",
  },
];

const picks = [
  { name: "Mila Vintage-Inspired Solitaire", specs: "1.06ct · D · VVS2 · Oval Lab", price: "$2,050" },
  { name: "Beverly Timeless Hidden Halo", specs: "0.95ct · E · VS1 · Round Lab", price: "$2,240" },
  { name: "Madison Three-Stone Lab Pear", specs: "1.2ct tw · D · VS1 · Pear Lab", price: "$2,390" },
  { name: "Hayden Curved Vine Lab", specs: "1.0ct · F · VS2 · Oval Lab", price: "$2,175" },
  { name: "Carmel Vintage Inspired", specs: "1.15ct · E · VS2 · Cushion Natural", price: "$2,760" },
];

const flags = [
  {
    icon: TrendingUp,
    text: "Sarah viewed 2 competitor sites in the last 10 min. Consider a proactive price-match offer.",
  },
  {
    icon: Users,
    text: "Similar profiles frequently purchase earrings within 6 months of engagement ring.",
  },
  {
    icon: Gift,
    text: "Eligible for $100 Referral credit if she converts.",
  },
];

const defaultDraft =
  "Hi Sarah! Great brief. I've pulled 5 picks that I think balance vintage character with modern silhouettes, all under your $3k budget, and sized right for petite fingers. My top pick would be the Mila Vintage-Inspired Solitaire at $2,050, the milgrain detailing gives it classic character while the clean solitaire reads modern. Want me to walk you through the alternatives, or does this direction feel right?";

function priorityIcon(p: string) {
  if (p === "hot") return <Flame className="h-3 w-3 text-destructive" />;
  if (p === "warm") return <Clock className="h-3 w-3 text-amber-500" />;
  return <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />;
}

function GemologistPage() {
  const [draft, setDraft] = useState(defaultDraft);
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) {
      toast("Draft is empty", { description: "Write or regenerate a response first." });
      return;
    }
    setSentMessages((m) => [...m, text]);
    setDraft("");
    toast.success("Sent to Sarah K.", { description: "Reply delivered in chat." });
  };

  const handleRegenerate = () => {
    setDraft(defaultDraft);
    toast("Draft regenerated");
  };

  const handleClear = () => {
    setDraft("");
  };

  const handleInsertPick = (name: string) => {
    setDraft((d) => `${d}${d.trim().length ? "\n\n" : ""}Suggested pick: ${name}.`);
    toast(`Inserted ${name}`);
  };

  return (
    <div className="flex flex-col">
      {/* Demo banner */}
      <div className="border-b border-gold/30 bg-gold/15">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-2.5 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          Demo: Gemologist-Side Copilot, what Thea sees when a customer chats
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-6 md:px-6 lg:grid-cols-[20fr_45fr_35fr]">
        {/* LEFT: Queue */}
        <aside className="rounded-2xl border border-border bg-surface shadow-[var(--shadow-soft)]">
          <div className="border-b border-border px-4 py-3">
            <h2 className="font-serif text-sm font-semibold text-primary">
              Active Queue <span className="text-muted-foreground">(5)</span>
            </h2>
          </div>
          <ul>
            {queue.map((c) => (
              <li key={c.name}>
                <button
                  type="button"
                  className={`flex w-full flex-col gap-1 border-b border-border/60 px-4 py-3 text-left transition-colors last:border-b-0 ${
                    c.active
                      ? "bg-primary/5 border-l-2 border-l-gold"
                      : "hover:bg-background"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                      {priorityIcon(c.priority)}
                      {c.name}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {c.wait}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                    {c.preview}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* MIDDLE: Active chat */}
        <section className="flex min-h-[600px] flex-col rounded-2xl border border-border bg-surface shadow-[var(--shadow-soft)]">
          <header className="flex items-center justify-between border-b border-border px-5 py-3">
            <div>
              <h2 className="font-serif text-base font-semibold text-primary">
                Sarah K.
              </h2>
              <p className="text-[11px] text-muted-foreground">
                First visit · 3 min wait
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-700">
              Live
            </span>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-primary-foreground shadow-sm">
                I want something vintage-looking but modern, under $3k, my girlfriend has
                small fingers and an artsy style.
              </div>
            </div>

            {sentMessages.length === 0 ? (
              <>
                <div className="flex items-center gap-2 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span className="h-px flex-1 bg-border" />
                  Awaiting your reply
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="flex justify-start">
                  <div className="flex max-w-[85%] items-center gap-2 rounded-2xl rounded-tl-sm border border-dashed border-border bg-background/50 px-4 py-3 text-sm text-muted-foreground">
                    <PenLine className="h-3.5 w-3.5 text-gold" />
                    Thea's response will appear here…
                  </div>
                </div>
              </>
            ) : (
              sentMessages.map((m, i) => (
                <div key={`sent-${i}`} className="flex justify-start animate-fade-in">
                  <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm text-primary shadow-sm">
                    {m}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-border bg-background/50 px-5 py-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Use the AI Assist panel →
            </div>
          </div>
        </section>

        {/* RIGHT: AI Assist */}
        <aside className="space-y-4">
          {/* Profile summary */}
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Customer Profile Summary
              </h3>
            </div>
            <p className="font-serif text-base font-semibold text-primary">Sarah K.</p>
            <p className="text-xs text-muted-foreground">
              First visit · 4 minutes on site
            </p>
            <dl className="mt-3 space-y-1.5 text-xs">
              <ProfileLine
                label="Style inferred"
                value="Vintage-Modern-Artsy"
                tag="high confidence"
              />
              <ProfileLine label="Budget" value="Under $3,000" />
              <ProfileLine label="Proportions" value="Petite" />
              <ProfileLine label="History" value="No prior chats or purchases" />
            </dl>
          </div>

          {/* Suggested picks */}
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                AI-Suggested Picks
              </h3>
            </div>
            <ul className="space-y-2">
              {picks.map((p) => (
                <li
                  key={p.name}
                  className="shimmer-edge flex items-center gap-3 rounded-lg border border-border bg-background p-2.5"
                >
                  <img
                    src={ringImage}
                    alt={p.name}
                    width={48}
                    height={48}
                    loading="lazy"
                    className="h-12 w-12 flex-shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-xs font-semibold text-primary">
                      {p.name}
                    </p>
                    <p className="truncate text-[10px] text-muted-foreground">
                      {p.specs}
                    </p>
                    <p className="text-[11px] font-semibold text-primary">{p.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInsertPick(p.name)}
                    className="relative z-10 flex flex-shrink-0 items-center gap-1 rounded-full border border-gold/40 bg-background px-2 py-1 text-[10px] font-medium text-primary transition-colors hover:bg-gold hover:text-gold-foreground"
                  >
                    <Plus className="h-3 w-3" />
                    Insert
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Auto-Drafted Response */}
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Auto-Drafted Response
              </h3>
            </div>
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="min-h-[160px] resize-none border-border bg-background text-sm leading-relaxed text-primary"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={handleSend}
                className="rounded-full bg-gold text-gold-foreground hover:bg-gold/90"
              >
                <Send className="h-3.5 w-3.5" />
                Approve & Send
              </Button>
              <Button size="sm" variant="outline" onClick={handleRegenerate} className="rounded-full">
                <RefreshCw className="h-3.5 w-3.5" />
                Regenerate
              </Button>
              <Button size="sm" variant="ghost" onClick={handleClear} className="rounded-full">
                <PenLine className="h-3.5 w-3.5" />
                Write my own
              </Button>
            </div>
          </div>

          {/* Opportunity flags */}
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Opportunity Flags
              </h3>
            </div>
            <ul className="space-y-2">
              {flags.map((f, i) => {
                const Icon = f.icon;
                return (
                  <li
                    key={i}
                    className="flex gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2.5"
                  >
                    <Icon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-600" />
                    <p className="text-xs leading-snug text-primary">{f.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ProfileLine({
  label,
  value,
  tag,
}: {
  label: string;
  value: string;
  tag?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="flex items-center gap-1.5 text-right text-xs font-medium text-primary">
        {value}
        {tag && (
          <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700">
            {tag}
          </span>
        )}
      </dd>
    </div>
  );
}
