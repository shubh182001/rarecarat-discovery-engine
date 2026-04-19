import { useEffect, useRef, useState } from "react";
import { Volume2, AudioLines, Loader2 } from "lucide-react";

type Props = {
  text: string;
  audioSrc?: string;
  autoPlay?: boolean;
  className?: string;
};

// Module-level in-memory cache: text -> object URL for the generated MP3 blob
const audioCache = new Map<string, string>();
const inflight = new Map<string, Promise<string | null>>();

async function fetchTTS(text: string): Promise<string | null> {
  if (audioCache.has(text)) return audioCache.get(text)!;
  if (inflight.has(text)) return inflight.get(text)!;

  const p = (async () => {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voiceId: "ZIlrSGI4jZqobxRKprJz" }),
      });
      if (!res.ok) return null;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      audioCache.set(text, url);
      return url;
    } catch {
      return null;
    } finally {
      inflight.delete(text);
    }
  })();

  inflight.set(text, p);
  return p;
}

function speakFallback(text: string, onEnd: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd();
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const warm =
    voices.find((v) => /female|samantha|victoria|karen|zira|google us english/i.test(v.name)) ||
    voices.find((v) => v.lang?.startsWith("en"));
  if (warm) u.voice = warm;
  u.rate = 1;
  u.pitch = 1.05;
  u.onend = onEnd;
  u.onerror = onEnd;
  window.speechSynthesis.speak(u);
}

export function VoicePlayButton({ text, autoPlay = false, className = "" }: Props) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoPlayedRef = useRef(false);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stop = () => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setPlaying(false);
  };

  const play = async () => {
    if (playing) {
      stop();
      return;
    }
    setLoading(true);
    const url = await fetchTTS(text);
    setLoading(false);

    if (!url) {
      setPlaying(true);
      speakFallback(text, () => setPlaying(false));
      return;
    }

    if (!audioRef.current || audioRef.current.src !== url) {
      audioRef.current = new Audio(url);
      audioRef.current.onended = () => setPlaying(false);
      audioRef.current.onerror = () => {
        setPlaying(false);
        speakFallback(text, () => setPlaying(false));
      };
    }
    setPlaying(true);
    try {
      await audioRef.current.play();
    } catch {
      setPlaying(false);
      speakFallback(text, () => setPlaying(false));
    }
  };

  useEffect(() => {
    if (autoPlay && !autoPlayedRef.current) {
      autoPlayedRef.current = true;
      void play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  const label = loading
    ? "Generating voice..."
    : playing
    ? "Pause voice"
    : "Play voice";

  return (
    <button
      type="button"
      onClick={play}
      aria-label={label}
      title={label}
      className={`flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-gold ${
        playing || loading ? "text-gold" : ""
      } ${className}`}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : playing ? (
        <AudioLines className="h-3.5 w-3.5 animate-pulse" />
      ) : (
        <Volume2 className="h-3.5 w-3.5" />
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}
