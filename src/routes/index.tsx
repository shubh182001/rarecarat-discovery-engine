import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, MessageCircle, Heart, Microscope, User } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rare Carat · The Discoverability Engine Demo" },
      {
        name: "description",
        content:
          "Experience the Rare Carat Discoverability Engine — a working demo of the homepage, Copilot, couples experience, and gemologist view.",
      },
      { property: "og:title", content: "Rare Carat · The Discoverability Engine Demo" },
      {
        property: "og:description",
        content:
          "A working demo of the Discoverability Engine — homepage, Copilot, couples experience, and gemologist view.",
      },
    ],
  }),
  component: HomePage,
});

const surfaces = [
  {
    to: "/copilot" as const,
    icon: MessageCircle,
    title: "Try the Copilot",
    description:
      "Chat with Clara, the AI shopping assistant that learns your taste, budget, and story.",
  },
  {
    to: "/couples" as const,
    icon: Heart,
    title: "The Couples Experience",
    description:
      "Both partners shape the search together. One shared profile, one shared journey.",
  },
  {
    to: "/profile" as const,
    icon: User,
    title: "Your Living Profile",
    description:
      "The preference graph that follows you across every surface, getting smarter with each visit.",
  },
  {
    to: "/gemologist" as const,
    icon: Microscope,
    title: "Gemologist View",
    description:
      "How a Rare Carat expert sees every chat — full context, ready to escalate when it matters.",
  },
];

function HomePage() {
  return (
    <div className="relative">
      {/* Back to analysis */}
      <Link
        to="/opportunities"
        className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:bg-surface hover:text-primary md:left-6 md:top-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to analysis
      </Link>

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 text-center md:pt-28">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[oklch(0.5_0.13_84)]">
          <Sparkles className="h-3 w-3" />
          Working Demo
        </span>
        <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-primary md:text-6xl">
          The Rare Carat Discoverability Engine
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A glimpse of what the future of diamond shopping looks like when every
          chat, click, and purchase feeds one unified understanding of each
          customer.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-24 md:grid-cols-2">
        {surfaces.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.to}
              to={s.to}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-[oklch(0.5_0.13_84)]">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-serif text-2xl font-semibold text-primary">
                {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <span className="mt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-primary/60 transition-colors group-hover:text-gold">
                Open →
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
