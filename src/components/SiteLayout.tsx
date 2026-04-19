import { Link, Outlet } from "@tanstack/react-router";

const navItems = [
  { to: "/", label: "Current State" },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/copilot", label: "Try Copilot" },
  { to: "/profile", label: "Profile" },
  { to: "/gemologist", label: "Gemologist View" },
] as const;

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-gold">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 2 4 9l8 13 8-13z" />
              </svg>
            </span>
            <span className="font-serif text-lg font-semibold tracking-tight text-primary">
              Rare Carat
            </span>
            <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              · Discoverability Engine
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-primary data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-border/60 px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium text-muted-foreground hover:text-primary data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-muted-foreground">
          Built by Shubh Dhar for Rare Carat · Concept demo · April 2026
        </div>
      </footer>
    </div>
  );
}
