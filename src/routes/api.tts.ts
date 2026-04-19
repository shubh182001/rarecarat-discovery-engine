import { createFileRoute } from "@tanstack/react-router";

const ELEVENLABS_URL = "https://api.elevenlabs.io/v1/text-to-speech";

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const apiKey = process.env.ELEVENLABS_API_KEY;
          if (!apiKey) {
            return new Response(
              JSON.stringify({ error: "ELEVENLABS_API_KEY not configured" }),
              { status: 500, headers: { "Content-Type": "application/json" } },
            );
          }

          const body = (await request.json()) as { text?: string; voiceId?: string };
          const text = (body.text ?? "").toString().slice(0, 4000);
          const voiceId = (body.voiceId ?? "ZIlrSGI4jZqobxRKprJz").toString();

          if (!text.trim()) {
            return new Response(JSON.stringify({ error: "Missing text" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const upstream = await fetch(
            `${ELEVENLABS_URL}/${voiceId}?output_format=mp3_44100_128`,
            {
              method: "POST",
              headers: {
                "xi-api-key": apiKey,
                "Content-Type": "application/json",
                Accept: "audio/mpeg",
              },
              body: JSON.stringify({
                text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                  stability: 0.5,
                  similarity_boost: 0.75,
                },
              }),
            },
          );

          if (!upstream.ok) {
            const errText = await upstream.text();
            console.error("ElevenLabs error", upstream.status, errText);
            return new Response(
              JSON.stringify({ error: "TTS failed", status: upstream.status }),
              { status: 502, headers: { "Content-Type": "application/json" } },
            );
          }

          const audio = await upstream.arrayBuffer();
          return new Response(audio, {
            status: 200,
            headers: {
              "Content-Type": "audio/mpeg",
              "Cache-Control": "public, max-age=3600",
            },
          });
        } catch (err) {
          console.error("api/tts error", err);
          return new Response(JSON.stringify({ error: "Internal error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
