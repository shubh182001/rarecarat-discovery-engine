import { useEffect, useRef, useState } from "react";
import { Volume2, Pause, AudioLines } from "lucide-react";

type Props = {
  text: string;
  audioSrc?: string;
  className?: string;
};

export function VoicePlayButton({ text, audioSrc, className = "" }: Props) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

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

  const speakWithSynthesis = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const warm =
      voices.find((v) => /female|samantha|victoria|karen|zira|google us english/i.test(v.name)) ||
      voices.find((v) => v.lang?.startsWith("en"));
    if (warm) u.voice = warm;
    u.rate = 1;
    u.pitch = 1.05;
    u.onend = () => setPlaying(false);
    u.onerror = () => setPlaying(false);
    utterRef.current = u;
    setPlaying(true);
    window.speechSynthesis.speak(u);
  };

  const play = () => {
    if (playing) {
      stop();
      return;
    }
    if (audioSrc) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.onended = () => setPlaying(false);
        audioRef.current.onerror = () => {
          setPlaying(false);
          speakWithSynthesis();
        };
      }
      setPlaying(true);
      audioRef.current.play().catch(() => {
        setPlaying(false);
        speakWithSynthesis();
      });
    } else {
      speakWithSynthesis();
    }
  };

  return (
    <button
      type="button"
      onClick={play}
      aria-label={playing ? "Pause voice" : "Play voice"}
      className={`flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-gold ${
        playing ? "text-gold" : ""
      } ${className}`}
    >
      {playing ? (
        <AudioLines className="h-3.5 w-3.5 animate-pulse" />
      ) : (
        <Volume2 className="h-3.5 w-3.5" />
      )}
      {playing && (
        <span className="sr-only">Playing</span>
      )}
      {playing && (
        <PauseOverlay />
      )}
    </button>
  );
}

function PauseOverlay() {
  return (
    <span className="pointer-events-none absolute opacity-0">
      <Pause className="h-3 w-3" />
    </span>
  );
}
