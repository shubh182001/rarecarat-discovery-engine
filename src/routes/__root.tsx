import { createRootRoute, HeadContent, Link, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AppShell } from "@/components/AppShell";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 font-serif text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/current-state"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rare Carat · Discoverability Engine" },
      {
        name: "description",
        content:
          "A concept demo exploring how Rare Carat can transform diamond discovery with an AI-powered copilot.",
      },
      { name: "author", content: "Shubh Dhar" },
      { property: "og:title", content: "Rare Carat · Discoverability Engine" },
      {
        property: "og:description",
        content: "Concept demo: AI-powered diamond discovery for Rare Carat.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Rare Carat · Discoverability Engine" },
      { name: "description", content: "Rare Carat: Discoverability Engine is a multi-page demo web app for luxury e-commerce." },
      { property: "og:description", content: "Rare Carat: Discoverability Engine is a multi-page demo web app for luxury e-commerce." },
      { name: "twitter:description", content: "Rare Carat: Discoverability Engine is a multi-page demo web app for luxury e-commerce." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/46f5d273-9156-428d-a824-3f48e7ccd78e/id-preview-f207e531--545e0e21-9834-4371-8e7b-5fd9f9f43872.lovable.app-1776595838413.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/46f5d273-9156-428d-a824-3f48e7ccd78e/id-preview-f207e531--545e0e21-9834-4371-8e7b-5fd9f9f43872.lovable.app-1776595838413.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: AppShell,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}
