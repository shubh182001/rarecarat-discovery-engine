import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { PhaseIndicator } from "@/components/PhaseIndicator";
import { PageTransition } from "@/components/PageTransition";
import { AboutDemoButton } from "@/components/AboutDemoButton";
import { NavSearch } from "@/components/NavSearch";
import { Button } from "@/components/ui/button";
import { Headset } from "lucide-react";

const mainNav = [
  { to: "/", label: "Home" },
  { to: "/couples", label: "Couples" },
  { to: "/copilot", label: "Try Copilot" },
  { to: "/current-state", label: "Current State" },
  { to: "/opportunities", label: "Opportunities" },
] as const;

const analysisPaths = new Set(["/current-state", "/opportunities"]);

export function SiteLayout() {
  const { pathname } = useLocation();
  const isAnalysis = analysisPaths.has(pathname);
  const navItems = mainNav;
  const [homeItem, ...remainingNavItems] = navItems;
  const logoTo = "/" as const;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to={logoTo} className="flex items-center gap-2">
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
          <div className="hidden items-center gap-3 md:flex">
            <nav className="flex items-center gap-1">
              <Link
                to={homeItem.to}
                activeOptions={{ exact: true }}
                className="relative rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:text-primary data-[status=active]:bg-primary data-[status=active]:text-primary-foreground data-[status=active]:shadow-sm"
              >
                {homeItem.label}
              </Link>
              <NavSearch />
              {remainingNavItems.map((item, i) => (
                <Link
                  key={`${item.to}-${i}`}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" || item.to === "/current-state" }}
                  className="relative rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:text-primary data-[status=active]:bg-primary data-[status=active]:text-primary-foreground data-[status=active]:shadow-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button asChild variant="outline" size="sm" className="border-gold text-primary hover:bg-gold/10">
              <Link to="/gemologist">
                <Headset className="h-3.5 w-3.5" /> Talk to a Gemologist
              </Link>
            </Button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-border/60 px-4 py-2 md:hidden">
          <Link
            to={homeItem.to}
            activeOptions={{ exact: true }}
            className="whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
          >
            {homeItem.label}
          </Link>
          <div className="flex items-center">
            <NavSearch />
          </div>
          {remainingNavItems.map((item, i) => (
            <Link
              key={`m-${item.to}-${i}`}
              to={item.to}
              activeOptions={{ exact: item.to === "/" || item.to === "/current-state" }}
              className="whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {isAnalysis && <PhaseIndicator />}

      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <footer className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>Built by Shubh Dhar for Rare Carat · Concept demo · April 2026</span>
          <nav className="flex items-center gap-4">
            <Link to="/current-state" className="hover:text-primary">Current State</Link>
            <Link to="/opportunities" className="hover:text-primary">Opportunities</Link>
            <Link to="/copilot" className="hover:text-primary">Try Copilot</Link>
          </nav>
        </div>
      </footer>

      <AboutDemoButton />
    </div>
  );
}
