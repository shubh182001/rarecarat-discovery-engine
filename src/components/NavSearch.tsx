import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search,
  ArrowRight,
  Gem,
  FileText,
  Sparkles,
  X,
} from "lucide-react";

type Category = "Rings" | "Pages" | "Features";

type SearchItem = {
  id: string;
  category: Category;
  label: string;
  hint?: string;
  /** Either a navigation target or a ring name to prefill on /copilot */
  to?: string;
  ringQuery?: string;
};

const INDEX: SearchItem[] = [
  // Rings → /copilot with prefilled query
  { id: "r-mila", category: "Rings", label: "Mila Vintage-Inspired Solitaire", ringQuery: "Mila Vintage-Inspired Solitaire" },
  { id: "r-beverly", category: "Rings", label: "Beverly Timeless Hidden Halo", ringQuery: "Beverly Timeless Hidden Halo" },
  { id: "r-madison", category: "Rings", label: "Madison Three-Stone Lab Pear", ringQuery: "Madison Three-Stone Lab Pear" },
  { id: "r-hayden", category: "Rings", label: "Hayden Curved Vine Lab", ringQuery: "Hayden Curved Vine Lab" },
  { id: "r-carmel", category: "Rings", label: "Carmel Vintage Inspired", ringQuery: "Carmel Vintage Inspired" },
  { id: "r-helena", category: "Rings", label: "Helena Grand Solitaire", ringQuery: "Helena Grand Solitaire" },
  { id: "r-aria", category: "Rings", label: "Aria Three-Stone Oval", ringQuery: "Aria Three-Stone Oval" },
  { id: "r-celeste", category: "Rings", label: "Celeste Halo Round", ringQuery: "Celeste Halo Round" },

  // Pages
  { id: "p-home", category: "Pages", label: "Home", to: "/" },
  { id: "p-copilot", category: "Pages", label: "Try Copilot", to: "/copilot" },
  { id: "p-couples", category: "Pages", label: "Couples", to: "/couples" },
  { id: "p-current", category: "Pages", label: "Current State", to: "/current-state" },
  { id: "p-opps", category: "Pages", label: "Opportunities", to: "/opportunities" },
  { id: "p-profile", category: "Pages", label: "Profile", to: "/profile" },
  { id: "p-gem", category: "Pages", label: "Gemologist View", to: "/gemologist" },

  // Features
  { id: "f-price", category: "Features", label: "Price breakdown", hint: "Browse homepage", to: "/" },
  { id: "f-profile", category: "Features", label: "Diamond profile", hint: "Try Copilot", to: "/copilot" },
  { id: "f-voice", category: "Features", label: "Voice input", hint: "Try Copilot", to: "/copilot" },
  { id: "f-couples", category: "Features", label: "Couples mode", hint: "Couples", to: "/couples" },
  { id: "f-thea", category: "Features", label: "Ask Thea", hint: "Gemologist View", to: "/gemologist" },
];

const CATEGORY_ICON: Record<Category, typeof Gem> = {
  Rings: Gem,
  Pages: FileText,
  Features: Sparkles,
};

function rank(item: SearchItem, q: string): number {
  const text = `${item.label} ${item.hint ?? ""}`.toLowerCase();
  const query = q.toLowerCase().trim();
  if (!query) return 0;
  if (text.startsWith(query)) return 3;
  if (item.label.toLowerCase().includes(query)) return 2;
  if (text.includes(query)) return 1;
  return 0;
}

export function NavSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      // Auto-focus on open
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery("");
      setSubmitted(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const results = (() => {
    if (!submitted && !query.trim()) return [] as SearchItem[];
    const scored = INDEX.map((item) => ({ item, score: rank(item, query) }))
      .filter((s) => (query.trim() ? s.score > 0 : true))
      .sort((a, b) => b.score - a.score)
      .map((s) => s.item);
    return scored;
  })();

  const grouped: Record<Category, SearchItem[]> = {
    Rings: [],
    Pages: [],
    Features: [],
  };
  for (const r of results) grouped[r.category].push(r);

  const handleSelect = (item: SearchItem) => {
    setOpen(false);
    if (item.ringQuery) {
      navigate({ to: "/copilot", search: { q: item.ringQuery } });
      return;
    }
    if (item.to) {
      navigate({ to: item.to });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-surface hover:text-primary"
      >
        <Search className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div ref={wrapRef} className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex h-9 w-[280px] items-center gap-1 rounded-full border border-border bg-background px-3 shadow-sm focus-within:border-gold lg:w-[340px]"
      >
        <Search className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSubmitted(false);
          }}
          placeholder="Search rings, pages, features…"
          className="flex-1 bg-transparent text-sm text-primary placeholder:text-muted-foreground focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSubmitted(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear"
            className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-surface hover:text-primary"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          type="submit"
          aria-label="Submit search"
          disabled={!query.trim()}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:bg-primary/90 disabled:opacity-40"
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </form>

      {(query.trim() || submitted) && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[360px] overflow-hidden rounded-xl border border-border/70 bg-background shadow-xl lg:w-[420px]">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No matches for "{query}"
            </div>
          ) : (
            <div className="max-h-[60vh] overflow-y-auto py-2">
              {(Object.keys(grouped) as Category[]).map((cat) => {
                const items = grouped[cat];
                if (!items.length) return null;
                const Icon = CATEGORY_ICON[cat];
                return (
                  <div key={cat} className="py-1">
                    <div className="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {cat}
                    </div>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelect(item)}
                        className="group flex w-full items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-surface"
                      >
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-surface text-muted-foreground group-hover:bg-gold/15 group-hover:text-[oklch(0.5_0.13_84)]">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="flex flex-1 flex-col">
                          <span className="text-sm font-medium text-primary">{item.label}</span>
                          {item.hint && (
                            <span className="text-[11px] text-muted-foreground">{item.hint}</span>
                          )}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
