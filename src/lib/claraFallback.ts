import { supabase } from "@/integrations/supabase/client";
import { getProfileSnapshot, type RingMatch } from "@/lib/profileStore";

export const FALLBACK_MESSAGE =
  "I found some picks that might suit you. Here are my top recommendations based on what you shared.";

export type ClaraResult = {
  text: string;
  rings: RingMatch[]; // top 3 from cosine similarity, used when fallback fires
  fallback: boolean;
};

const TIMEOUT_MS = 8000;

function topThreeRings(): RingMatch[] {
  return getProfileSnapshot().matches.slice(0, 3);
}

function buildFallback(): ClaraResult {
  return { text: FALLBACK_MESSAGE, rings: topThreeRings(), fallback: true };
}

/**
 * Call the clara-chat edge function with an 8s timeout.
 * Any failure (network, timeout, non-2xx, server error payload) returns
 * a smooth client-side fallback. The caller never needs to show an error.
 */
export async function askClara(
  history: { role: "user" | "assistant"; content: string }[],
): Promise<ClaraResult> {
  const timeout = new Promise<ClaraResult>((resolve) =>
    setTimeout(() => resolve(buildFallback()), TIMEOUT_MS),
  );

  const call = (async (): Promise<ClaraResult> => {
    try {
      const { data, error } = await supabase.functions.invoke("clara-chat", {
        body: { messages: history },
      });
      if (error) return buildFallback();
      if (!data || data.error) return buildFallback();
      const text: string = typeof data.text === "string" ? data.text.trim() : "";
      if (!text) return buildFallback();
      return { text, rings: [], fallback: false };
    } catch {
      return buildFallback();
    }
  })();

  return Promise.race([call, timeout]);
}
