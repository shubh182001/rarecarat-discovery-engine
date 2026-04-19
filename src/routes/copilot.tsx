import { createFileRoute } from "@tanstack/react-router";

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

function CopilotPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">Phase 3</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-primary md:text-5xl">
        Live Copilot Demo
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Chat with Rare Carat's AI gemologist. Ask anything — from carat trade-offs to
        cut quality — and watch personalized recommendations appear in real time.
      </p>
      <div className="mt-10 rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-soft)]">
        <p className="text-sm text-muted-foreground">Interactive Copilot UI coming next.</p>
      </div>
    </section>
  );
}
