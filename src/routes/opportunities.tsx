import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunities · Rare Carat Discoverability Engine" },
      {
        name: "description",
        content:
          "Phase 2: Transformation opportunities to reshape diamond discovery on Rare Carat.",
      },
      { property: "og:title", content: "Opportunities · Rare Carat Discoverability" },
      {
        property: "og:description",
        content: "Phase 2 — strategic opportunities for transforming discovery.",
      },
    ],
  }),
  component: OpportunitiesPage,
});

function OpportunitiesPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">Phase 2</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-primary md:text-5xl">
        Transformation Opportunities
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Where Rare Carat can lead — moving from a search-and-filter catalog to a guided,
        intelligent diamond concierge.
      </p>
      <div className="mt-10 rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-soft)]">
        <p className="text-sm text-muted-foreground">Opportunity cards will live here.</p>
      </div>
    </section>
  );
}
