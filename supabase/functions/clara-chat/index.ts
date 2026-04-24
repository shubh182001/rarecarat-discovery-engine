import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Clara, a warm and knowledgeable diamond shopping assistant for Rare Carat. You help customers find the perfect engagement ring or wedding band. You have access to this inventory:

1. Mila Vintage-Inspired Solitaire — 1.06ct, D, VVS2, Oval Lab, $2,050
   Style: vintage-modern, great for petite fingers
2. Beverly Timeless Hidden Halo — 0.95ct, E, VS1, Round Lab, $2,240
   Style: modern, strongest proportions for small hands
3. Madison Three-Stone Lab Pear — 1.2ct tw, D, VS1, Pear Lab, $2,390
   Style: artsy, unique, elongates smaller hands
4. Hayden Curved Vine Lab — 1.0ct, F, VS2, Oval Lab, $2,175
   Style: organic-artsy meets classic-modern, great all-rounder
5. Carmel Vintage Inspired — 1.15ct, E, VS2, Cushion Natural, $2,760
   Style: most overtly vintage, slightly over $3k budget
6. Helena Grand Solitaire — 3.02ct, G, VS1, Round Lab, $8,900
   Style: statement piece, maximum presence, premium budget
7. Aria Three-Stone Oval — 2.8ct tw, F, VS2, Oval Lab, $6,400
   Style: bold, modern, substantial presence
8. Celeste Halo Round — 3.1ct tw, H, SI1, Round Lab, $5,200
   Style: maximum sparkle, halo setting amplifies size

When a user asks about carat size, budget, style, or any ring preference, respond conversationally in 2-3 sentences, then recommend the most relevant rings from your inventory by name. Be specific about why each ring matches their request.

Always end with a question to refine further or offer to connect them with Thea, a GIA gemologist.

Keep responses warm, knowledgeable, and concise.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          max_tokens: 1000,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds to your Lovable workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content ?? "";
    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("clara-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
