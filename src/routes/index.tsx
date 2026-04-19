import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Current State · Rare Carat Discoverability Engine" },
      {
        name: "description",
        content:
          "Phase 1: A snapshot of how diamond shoppers discover products on Rare Carat today.",
      },
      { property: "og:title", content: "Current State · Rare Carat Discoverability" },
      {
        property: "og:description",
        content: "Phase 1 dashboard exploring today's discovery experience.",
      },
    ],
  }),
  component: CurrentStatePage,
});

function CurrentStatePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">Phase 1</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-primary md:text-5xl">
        Current State Dashboard
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        A baseline view of how shoppers discover diamonds on Rare Carat today — the funnel,
        friction points, and the questions buyers struggle to answer alone.
      </p>
      <div className="mt-10 rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-soft)]">
        <p className="text-sm text-muted-foreground">
          Dashboard widgets land here next. Shell, navigation, and design tokens are wired up.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/opportunities"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            See opportunities →
          </Link>
          <Link
            to="/copilot"
            className="inline-flex items-center rounded-full border border-gold/60 bg-gold/10 px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-gold/20"
          >
            Try the Copilot
          </Link>
        </div>
      </div>
    </section>
  );
}
