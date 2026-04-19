import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gemologist")({
  head: () => ({
    meta: [
      { title: "Gemologist View · Rare Carat Discoverability Engine" },
      {
        name: "description",
        content:
          "Staff-side view: how Rare Carat gemologists collaborate with the Copilot to support shoppers.",
      },
      { property: "og:title", content: "Gemologist View · Rare Carat Discoverability" },
      {
        property: "og:description",
        content: "Staff-side console — gemologists working alongside the AI Copilot.",
      },
    ],
  }),
  component: GemologistPage,
});

function GemologistPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">Staff view</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-primary md:text-5xl">
        Gemologist Console
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        How Rare Carat's expert gemologists pair with the Copilot to guide shoppers,
        review AI suggestions, and step in when human judgment matters.
      </p>
      <div className="mt-10 rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-soft)]">
        <p className="text-sm text-muted-foreground">Staff console widgets to come.</p>
      </div>
    </section>
  );
}
