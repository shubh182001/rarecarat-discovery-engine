import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/couples")({
  head: () => ({
    meta: [
      { title: "Couples · Rare Carat" },
      {
        name: "description",
        content:
          "The shared diamond shopping experience for couples — one profile, one journey.",
      },
      { property: "og:title", content: "Couples · Rare Carat" },
      {
        property: "og:description",
        content: "The shared diamond shopping experience for couples.",
      },
    ],
  }),
  component: CouplesPage,
});

function CouplesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-[oklch(0.5_0.13_84)]">
        <Heart className="h-7 w-7" />
      </div>
      <h1 className="mt-6 font-serif text-4xl font-semibold text-primary md:text-5xl">
        The Couples Experience
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
        Coming soon. A shared profile, a shared chat, and a shared journey toward
        the right ring — where both partners can shape the search together.
      </p>
    </div>
  );
}
