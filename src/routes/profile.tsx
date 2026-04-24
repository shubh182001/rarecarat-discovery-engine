import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Pencil,
  Check,
  X,
  Home as HomeIcon,
  GitCompare,
  Mail,
  MessageSquare,
  Heart,
  Search,
  Sparkles,
  Mic,
} from "lucide-react";
import { useProfileStore } from "@/hooks/useProfileStore";
import { setPreference, formatRelativeTime } from "@/lib/profileStore";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Diamond Profile · Rare Carat Discoverability Engine" },
      {
        name: "description",
        content:
          "What the Rare Carat Copilot has learned about you, across every interaction.",
      },
      {
        property: "og:title",
        content: "Your Diamond Profile · Rare Carat Discoverability",
      },
      {
        property: "og:description",
        content: "Copilot-powered preference profile, evolving with every interaction.",
      },
    ],
  }),
  component: ProfilePage,
});

const personalizations = [
  {
    title: "Homepage",
    icon: HomeIcon,
    text: "Your top picks now reflect your vintage-modern taste.",
  },
  {
    title: "Compare View",
    icon: GitCompare,
    text: "Diamonds show match scores against your profile.",
  },
  {
    title: "Email",
    icon: Mail,
    text: "Only vintage-modern arrivals under $3k trigger alerts.",
  },
  {
    title: "Voice",
    icon: Mic,
    text: "Conversations via voice (on-site, in-ad, or smart speaker) extract preferences just like text. Your profile grows across every channel.",
  },
];

const RADAR_AXES = [
  "Style",
  "Budget Fit",
  "Proportions",
  "Quality Tier",
  "Setting Style",
] as const;

// Static historical snapshots for the radar (current is live from store).
const radarHistory: Record<(typeof RADAR_AXES)[number], { prev1: number; prev2: number; prev3: number }> = {
  Style: { prev1: 60, prev2: 40, prev3: 20 },
  "Budget Fit": { prev1: 90, prev2: 50, prev3: 25 },
  Proportions: { prev1: 70, prev2: 35, prev3: 15 },
  "Quality Tier": { prev1: 55, prev2: 40, prev3: 20 },
  "Setting Style": { prev1: 25, prev2: 15, prev3: 10 },
};

function activityIcon(text: string) {
  const t = text.toLowerCase();
  if (t.includes("liked") || t.includes("wishlist")) return Heart;
  if (t.includes("paste") || t.includes("gia") || t.includes("search")) return Search;
  return MessageSquare;
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${className}`} />
      {label}
    </span>
  );
}

function ProfilePage() {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingIndex !== null) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editingIndex]);

  const startEdit = (i: number) => {
    setDraft(preferences[i].value);
    setEditingIndex(i);
  };
  const cancelEdit = () => setEditingIndex(null);
  const saveEdit = () => {
    if (editingIndex === null) return;
    const trimmed = draft.trim();
    if (trimmed.length > 0) {
      setPreferences((prev) =>
        prev.map((p, idx) => (idx === editingIndex ? { ...p, value: trimmed } : p)),
      );
    }
    setEditingIndex(null);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">
          Copilot Profile
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-primary md:text-5xl">
          Your Diamond Profile
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          What the Copilot has learned about you, across every interaction.
        </p>
      </div>

      {/* Radar chart */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)] md:p-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              Preference signal over time
            </h2>
            <p className="text-xs text-muted-foreground">
              Current profile vs. three prior snapshots
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <LegendDot className="bg-gold" label="Now" />
            <LegendDot className="bg-primary/60" label="1 wk ago" />
            <LegendDot className="bg-primary/35" label="1 mo ago" />
            <LegendDot className="bg-primary/15" label="First visit" />
          </div>
        </div>
        <div className="h-[360px] w-full md:h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius="78%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: "var(--primary)", fontSize: 12, fontWeight: 500 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="First visit"
                dataKey="prev3"
                stroke="var(--primary)"
                fill="var(--primary)"
                fillOpacity={0.05}
                strokeOpacity={0.25}
                strokeWidth={1}
              />
              <Radar
                name="1 mo ago"
                dataKey="prev2"
                stroke="var(--primary)"
                fill="var(--primary)"
                fillOpacity={0.07}
                strokeOpacity={0.4}
                strokeWidth={1}
              />
              <Radar
                name="1 wk ago"
                dataKey="prev1"
                stroke="var(--primary)"
                fill="var(--primary)"
                fillOpacity={0.1}
                strokeOpacity={0.6}
                strokeWidth={1.25}
              />
              <Radar
                name="Now"
                dataKey="current"
                stroke="var(--gold)"
                fill="var(--gold)"
                fillOpacity={0.28}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two columns */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Preferences */}
        <div>
          <h2 className="mb-4 font-serif text-xl font-semibold text-primary">
            Your Preferences
          </h2>
          <div className="space-y-3">
            {preferences.map((p, i) => {
              const isEditing = editingIndex === i;
              return (
                <div
                  key={p.label}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm transition-colors hover:border-gold/60 animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      {p.label}
                    </p>
                    {isEditing ? (
                      <input
                        ref={inputRef}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit();
                          if (e.key === "Escape") cancelEdit();
                        }}
                        className="mt-0.5 w-full rounded-md border border-gold/60 bg-background px-2 py-1 text-sm font-medium text-primary outline-none focus:ring-2 focus:ring-gold/40"
                      />
                    ) : (
                      <p className="mt-0.5 truncate text-sm font-medium text-primary">
                        {p.value}
                      </p>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="flex flex-shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={saveEdit}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-gold"
                        aria-label="Save"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-destructive"
                        aria-label="Cancel"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(i)}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-gold"
                      aria-label={`Edit ${p.label}`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity */}
        <div>
          <h2 className="mb-4 font-serif text-xl font-semibold text-primary">
            Learned from your activity
          </h2>
          <div className="rounded-xl border border-border bg-surface p-2 shadow-sm">
            <ol className="relative">
              {activity.map((item, i) => {
                const Icon = item.icon;
                return (
                  <li
                    key={i}
                    className="flex gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-background animate-fade-in"
                    style={{ animationDelay: `${i * 70}ms`, animationFillMode: "both" }}
                  >
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-background text-gold">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {item.when}
                      </p>
                      <p className="mt-0.5 text-sm leading-snug text-primary">
                        {item.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* Personalization */}
      <div className="mt-12">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold" />
          <h2 className="font-serif text-xl font-semibold text-primary">
            How this personalizes your experience
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {personalizations.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[var(--shadow-elegant)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-primary">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/copilot"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Continue chatting with Copilot
          </Link>
        </div>
      </div>
    </section>
  );
}
