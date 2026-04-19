import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile · Rare Carat Discoverability Engine" },
      {
        name: "description",
        content: "A Copilot-powered profile that remembers your preferences and saved diamonds.",
      },
      { property: "og:title", content: "Your Profile · Rare Carat Discoverability" },
      {
        property: "og:description",
        content: "Copilot-powered profile with preferences and saved diamonds.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">Buyer view</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-primary md:text-5xl">
        Your Profile
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Your preferences, saved stones, and Copilot-curated recommendations — all in one place.
      </p>
      <div className="mt-10 rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-soft)]">
        <p className="text-sm text-muted-foreground">Profile widgets to come.</p>
      </div>
    </section>
  );
}
