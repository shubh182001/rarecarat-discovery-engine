import { useLocation } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [displayKey, setDisplayKey] = useState(pathname);

  useEffect(() => {
    setDisplayKey(pathname);
  }, [pathname]);

  return (
    <div key={displayKey} className="animate-fade-in">
      {children}
    </div>
  );
}
