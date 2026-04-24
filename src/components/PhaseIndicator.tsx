import { useLocation, Link } from "@tanstack/react-router";

const phases = [
  { phase: "Phase 1", label: "Current State", paths: ["/current-state"] },
  { phase: "Phase 2", label: "Opportunities", paths: ["/opportunities"] },
  { phase: "Phase 3", label: "Live Demo", paths: ["/", "/copilot", "/couples", "/profile", "/gemologist"] },
] as const;

export function PhaseIndicator() {
  const { pathname } = useLocation();
  const activeIdx = phases.findIndex((p) => p.paths.includes(pathname as never));

  return (
    <div className="border-b border-border/60 bg-surface/30">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] sm:gap-4">
        {phases.map((p, i) => {
          const isActive = i === activeIdx;
          const isPast = activeIdx > i;
          return (
            <div key={p.phase} className="flex items-center gap-2 sm:gap-4">
              <Link
                to={p.paths[0]}
                className={`flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? "text-gold"
                    : isPast
                      ? "text-primary hover:text-gold"
                      : "text-muted-foreground hover:text-primary"
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] ${
                    isActive
                      ? "bg-gold text-gold-foreground"
                      : isPast
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-background"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="hidden sm:inline">{p.phase} · {p.label}</span>
                <span className="sm:hidden">{p.label}</span>
              </Link>
              {i < phases.length - 1 && (
                <span className={`h-px w-4 sm:w-8 ${isPast ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
