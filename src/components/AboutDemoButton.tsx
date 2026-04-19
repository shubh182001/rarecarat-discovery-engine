import { useState } from "react";
import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function AboutDemoButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="About this demo"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-xs font-medium text-primary shadow-lg backdrop-blur transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold hover:shadow-xl md:bottom-6 md:right-6"
      >
        <Info className="h-3.5 w-3.5" />
        About this demo
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-primary">About this demo</DialogTitle>
            <DialogDescription className="pt-3 text-sm leading-relaxed text-foreground">
              This is a concept demo built by Shubh Dhar for Rare Carat in April 2026.
              All product data is illustrative. The ideas and research are real.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
