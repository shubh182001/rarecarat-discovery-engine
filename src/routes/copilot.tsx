import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, ArrowRight, Network, Headset, Mic } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VoicePlayButton } from "@/components/VoicePlayButton";
import ringImage from "@/assets/ring-placeholder.jpg";

const VINTAGE_QUERY =
  "I want something vintage-looking but modern, under $3k, my girlfriend has small fingers and an artsy style.";
const MIC_QUERY = "Show me something with a yellow gold band";
const THEA_INTRO =
  "Great brief. I've pulled 5 picks that balance your style, budget, and proportion cues. Here's what I'm thinking:";
const THEA_FOLLOWUP =
  "Want to refine further, or should I escalate to Thea, one of our GIA gemologists, for a second opinion?";
const GENERIC_REPLY =
  "Great question — let me think about that. In the full version, I'd refine your picks based on this. For this demo, here's what I'd surface next…";

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



type ProfileRow = { label: string; value: string; confidence: number };

const initialProfile: ProfileRow[] = [
  { label: "Style", value: "Vintage-Modern-Artsy", confidence: 85 },
  { label: "Budget", value: "Under $3,000", confidence: 100 },
  { label: "Proportions", value: "Petite / Small Fingers", confidence: 90 },
  { label: "Setting", value: "Open", confidence: 30 },
  { label: "Metal", value: "Open", confidence: 0 },
  { label: "Quality Tier", value: "Open", confidence: 20 },
  { label: "Lab vs Natural", value: "Open", confidence: 0 },
];

type ReplyKey = "cut" | "metal" | "size" | "lab" | "vintage" | "default";

const REPLIES: Record<ReplyKey, { text: string; rings: Ring[] }> = {
  cut: {
    text: "Great question on cut quality. Of the 5 picks, the Mila and Hayden have the highest cut grades — both are Excellent rated. Cut affects how the diamond handles light more than any other factor. The Madison three-stone has a slightly softer cut grade because pear shapes show variation. Want me to filter to only Excellent-cut diamonds?",
    rings: [rings[0], rings[3]],
  },
  metal: {
    text: "Good thought on metal. All these are shown in white gold but each can be configured in 14k or 18k yellow gold, rose gold, or platinum. Yellow gold is having a moment with vintage-modern styles. Want me to re-render the Mila in yellow gold so you can see the difference?",
    rings: [rings[0], rings[4]],
  },
  size: {
    text: "Good instinct. Given small fingers, we could go down to 0.85ct without losing presence. The Hayden in 0.85ct lab oval would still read substantial because of the proportions. Here are 2 sub-1ct picks I'd consider:",
    rings: [rings[3], rings[1]],
  },
  lab: {
    text: "Lab vs natural is one of the biggest decisions in this category. Of these 5, four are lab-grown and one (Carmel) is natural. Lab gives you more carat for the same budget; natural retains slightly better long-term resale value. For a $3k budget, lab is usually the sharper choice. Here are the most popular lab picks:",
    rings: [rings[0], rings[3]],
  },
  vintage: {
    text: "If you want to push more vintage, the Carmel cushion-cut is the most overtly traditional. The Mila gets you partway there with milgrain detail. Want me to surface a few more vintage-leaning options?",
    rings: [rings[4], rings[0]],
  },
  default: {
    text: GENERIC_REPLY,
    rings: [rings[0], rings[3]],
  },
};

function classifyMessage(text: string): ReplyKey {
  const t = text.toLowerCase();
  if (/\b(cut|cutting|sparkle)\b/.test(t)) return "cut";
  if (/\b(yellow|gold|rose|metal)\b/.test(t)) return "metal";
  if (/\b(smaller|tiny|petite|size)\b/.test(t)) return "size";
  if (/\b(lab|natural|real)\b/.test(t)) return "lab";
  if (/\b(vintage|old)\b/.test(t)) return "vintage";
  return "default";
}

function applyProfileForReply(
  key: ReplyKey,
  profile: ProfileRow[],
): { next: ProfileRow[]; updated: boolean } {
  const next = profile.map((r) => ({ ...r }));
  const bump = (label: string, value: string, conf: number) => {
    const row = next.find((r) => r.label === label);
    if (!row) return false;
    if (row.confidence >= conf && row.value === value) return false;
    row.value = value;
    row.confidence = Math.max(row.confidence, conf);
    return true;
  };
  switch (key) {
    case "cut":
      return { next, updated: bump("Quality Tier", "Excellent Cut", 80) };
    case "metal":
      return { next, updated: bump("Metal", "Yellow Gold", 60) };
    case "size":
      return { next, updated: bump("Proportions", "Petite / Small Fingers", 100) };
    case "lab":
      return { next, updated: bump("Lab vs Natural", "Lab-grown", 80) };
    case "vintage":
      return { next, updated: bump("Style", "Vintage-Modern-Artsy", 100) };
    default:
      return { next, updated: false };
  }
}

type Message =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "ai"; text: string; audioSrc?: string; rings?: Ring[] };

const initialMessages: Message[] = [
  { id: "u1", role: "user", text: VINTAGE_QUERY },
  { id: "a1", role: "ai", text: THEA_INTRO, audioSrc: "/thea_response.mp3", rings },
  { id: "a2", role: "ai", text: THEA_FOLLOWUP, audioSrc: "/thea_response.mp3" },
];

function CopilotPage() {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [profile, setProfile] = useState<ProfileRow[]>(initialProfile);
  const [isReplying, setIsReplying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finalTranscriptRef = useRef<string>("");

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isReplying]);

  useEffect(() => {
    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      try {
        recognitionRef.current?.stop();
      } catch {}
    };
  }, []);

  const simulatedFallback = () => {
    setListening(true);
    setTimeout(() => {
      setInput(MIC_QUERY);
      setListening(false);
    }, 1500);
  };

  const stopListening = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    try {
      recognitionRef.current?.stop();
    } catch {}
  };

  const startListening = () => {
    if (listening) {
      stopListening();
      return;
    }

    const SR =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (!SR) {
      toast("Voice not supported in this browser", {
        description: "Showing simulated query instead.",
      });
      simulatedFallback();
      return;
    }

    try {
      const recognition = new SR();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.maxAlternatives = 1;
      recognitionRef.current = recognition;
      finalTranscriptRef.current = "";

      const resetSilenceTimer = () => {
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          try {
            recognition.stop();
          } catch {}
        }, 2000);
      };

      recognition.onstart = () => {
        setListening(true);
        resetSilenceTimer();
      };

      recognition.onresult = (event: any) => {
        let interim = "";
        let finalText = finalTranscriptRef.current;
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0]?.transcript ?? "";
          if (result.isFinal) {
            finalText += transcript;
          } else {
            interim += transcript;
          }
        }
        finalTranscriptRef.current = finalText;
        setInput((finalText + interim).trimStart());
        resetSilenceTimer();
      };

      recognition.onerror = (event: any) => {
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        setListening(false);
        if (event?.error === "not-allowed" || event?.error === "service-not-allowed") {
          toast("Microphone access required", {
            description: "Showing simulated query instead.",
          });
          simulatedFallback();
        } else if (event?.error === "no-speech" || event?.error === "aborted") {
          // silent — user just didn't speak
        } else {
          toast("Couldn't catch that, try again or type");
        }
      };

      recognition.onend = () => {
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
        setListening(false);
      };

      recognition.start();
    } catch {
      setListening(false);
      simulatedFallback();
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isReplying) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsReplying(true);

    const key = classifyMessage(text);
    const { next, updated } = applyProfileForReply(key, profile);
    if (updated) {
      setProfile(next);
      toast.success("Profile updated", { description: "New preference signals detected." });
    } else {
      toast("Profile updated");
    }

    const reply = REPLIES[key];
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "ai",
          text: reply.text,
          audioSrc: "/thea_response.mp3",
          rings: reply.rings,
        },
      ]);
      setIsReplying(false);
    }, 1500);
  };

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
          <div className="flex flex-col gap-1 border-b border-border px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-gold">
                <Sparkles className="h-4 w-4" />
              </span>
              <h2 className="font-serif text-lg font-semibold text-primary">
                Your Rare Carat Copilot
              </h2>
            </div>
            <p className="ml-10 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <span aria-hidden>🎙</span> Voice-enabled · Try speaking your query
            </p>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-6 overflow-y-auto px-4 py-6 md:px-6 max-h-[70vh]"
          >
            {messages.map((msg) =>
              msg.role === "user" ? (
                <div key={msg.id} className="flex justify-end animate-fade-in">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-primary-foreground shadow-sm">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="space-y-4 animate-fade-in">
                  <div className="flex justify-start">
                    <div className="relative max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 pr-10 text-sm text-primary shadow-sm">
                      {msg.text}
                      <div className="absolute right-1.5 top-1.5">
                        <VoicePlayButton text={msg.text} audioSrc={msg.audioSrc} />
                      </div>
                    </div>
                  </div>

                  {msg.rings && msg.rings.length > 0 && (
                    <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 xl:grid-cols-3">
                      {msg.rings.map((ring, i) => (
                        <article
                          key={`${msg.id}-${ring.name}`}
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
                  )}
                </div>
              ),
            )}

            {isReplying && (
              <div className="flex justify-start animate-fade-in">
                <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm text-muted-foreground shadow-sm">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 animate-fade-in">
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
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <button
                type="button"
                onClick={startListening}
                aria-label={listening ? "Listening" : "Start voice input"}
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:border-gold ${
                  listening ? "border-gold text-gold" : "text-muted-foreground"
                }`}
              >
                <Mic className={`h-4 w-4 ${listening ? "animate-pulse text-gold" : ""}`} />
              </button>
              {listening && (
                <span className="text-xs font-medium uppercase tracking-wider text-gold animate-pulse">
                  Listening…
                </span>
              )}
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  listening ? "Listening for your voice…" : "Ask about cut, carat, or refine your picks…"
                }
                className="flex-1 rounded-full bg-surface"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isReplying}
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
              {profile.map((row, i) => (
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

      {/* Cross-links */}
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
