/**
 * Shared in-memory + localStorage profile store.
 * Updated whenever the user sends a message in any Copilot surface.
 * Read by /profile to reflect preferences, activity, and the radar chart.
 */

export type Preference = { label: string; value: string };
export type ActivityEntry = { ts: number; text: string };

export type ProfileState = {
  preferences: Preference[];
  activity: ActivityEntry[];
  /** Confidence per radar axis, 0–100 */
  confidence: {
    Style: number;
    "Budget Fit": number;
    Proportions: number;
    "Quality Tier": number;
    "Setting Style": number;
  };
};

const STORAGE_KEY = "rc_profile_v1";

const defaultState: ProfileState = {
  preferences: [
    { label: "Style", value: "Vintage-Modern-Artsy" },
    { label: "Budget", value: "$2,000, $3,000" },
    { label: "Proportions", value: "Petite / Small Fingers" },
    { label: "Quality Tier", value: "Balanced (VS2+, F+ color)" },
    { label: "Setting Style", value: "Open to suggestions" },
    { label: "Metal", value: "Open to suggestions" },
    { label: "Shape Preference", value: "Oval, Round" },
    { label: "Lab vs Natural", value: "Either, leans Lab for budget" },
  ],
  activity: [
    {
      ts: Date.now() - 2 * 60 * 1000,
      text: "Style preference updated to 'vintage-modern-artsy' from Copilot chat",
    },
    {
      ts: Date.now() - 2 * 60 * 1000,
      text: "Budget set to under $3,000 from Copilot chat",
    },
    {
      ts: Date.now() - 2 * 60 * 1000,
      text: "Proportions set to 'petite' from Copilot chat",
    },
    {
      ts: Date.now() - 24 * 60 * 60 * 1000,
      text: "Liked 3 halo settings in browse",
    },
    {
      ts: Date.now() - 3 * 24 * 60 * 60 * 1000,
      text: "Paste-a-diamond check on GIA 2187654321",
    },
  ],
  confidence: {
    Style: 85,
    "Budget Fit": 100,
    Proportions: 90,
    "Quality Tier": 70,
    "Setting Style": 30,
  },
};

let state: ProfileState = loadState();
const listeners = new Set<() => void>();

function loadState(): ProfileState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as ProfileState;
    // Merge in any missing default keys so future fields don't break old data
    return {
      preferences: parsed.preferences ?? defaultState.preferences,
      activity: parsed.activity ?? defaultState.activity,
      confidence: { ...defaultState.confidence, ...(parsed.confidence ?? {}) },
    };
  } catch {
    return defaultState;
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

export function getProfileSnapshot(): ProfileState {
  return state;
}

export function subscribeProfile(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function setPreference(label: string, value: string) {
  const next = { ...state, preferences: state.preferences.map((p) => ({ ...p })) };
  const row = next.preferences.find((p) => p.label === label);
  if (!row) return;
  if (row.value === value) return;
  row.value = value;
  state = next;
  emit();
}

function bumpConfidence(axis: keyof ProfileState["confidence"]) {
  const inc = 5 + Math.floor(Math.random() * 11); // 5-15
  const current = state.confidence[axis] ?? 0;
  const nextVal = Math.min(100, current + inc);
  if (nextVal === current) return;
  state = {
    ...state,
    confidence: { ...state.confidence, [axis]: nextVal },
  };
}

function pushActivity(text: string) {
  state = {
    ...state,
    activity: [{ ts: Date.now(), text }, ...state.activity].slice(0, 5),
  };
}

/**
 * Parse a user chat message and update the shared profile.
 * Returns the list of signals detected so the caller can react if needed.
 */
export function applyChatMessage(rawText: string): string[] {
  const text = rawText.toLowerCase();
  const detected: string[] = [];
  let mutated = false;

  // ---- STYLE ----
  const styleHits: string[] = [];
  if (/\bvintage\b/.test(text)) styleHits.push("vintage");
  if (/\bmodern\b/.test(text)) styleHits.push("modern");
  if (/\bartsy\b/.test(text)) styleHits.push("artsy");
  if (/\bminimal(ist)?\b/.test(text)) styleHits.push("minimal");
  if (/\bclassic\b/.test(text)) styleHits.push("classic");
  if (/\bbold\b/.test(text)) styleHits.push("bold");
  if (styleHits.length) {
    const value = styleHits.join("-");
    setPreferenceInternal("Style", value);
    bumpConfidence("Style");
    pushActivity(`Style updated to ${value} from Copilot chat`);
    detected.push("Style");
    mutated = true;
  }

  // ---- BUDGET ----
  let budgetValue: string | null = null;
  const dollarK = text.match(/\$?\s*(\d{1,3})\s*k\b/);
  const dollar = text.match(/\$\s*(\d{3,6})/);
  if (/\bunder\b\s*\$?\s*(\d{1,3})\s*k/.test(text)) {
    const m = text.match(/\bunder\b\s*\$?\s*(\d{1,3})\s*k/);
    budgetValue = `Under $${m![1]},000`;
  } else if (dollarK) {
    budgetValue = `Around $${dollarK[1]},000`;
  } else if (dollar) {
    budgetValue = `Around $${Number(dollar[1]).toLocaleString()}`;
  } else if (/\bcheap|\bbudget\b|\bafford/.test(text)) {
    budgetValue = "Budget-conscious";
  } else if (/\bpremium|\bluxury\b|splurge/.test(text)) {
    budgetValue = "Premium";
  } else if (/\bmoderate\b/.test(text)) {
    budgetValue = "Moderate";
  }
  if (budgetValue) {
    setPreferenceInternal("Budget", budgetValue);
    bumpConfidence("Budget Fit");
    pushActivity(`Budget updated to ${budgetValue} from Copilot chat`);
    detected.push("Budget");
    mutated = true;
  }

  // ---- PROPORTIONS ----
  let propValue: string | null = null;
  if (/\b(small finger|petite|tiny|slim)\b/.test(text)) {
    propValue = "Petite / Small Fingers";
  } else if (/\b(large|statement|bold|huge|big)\b/.test(text)) {
    propValue = "Statement / Larger";
  } else if (/\bsubtle\b/.test(text)) {
    propValue = "Subtle";
  }
  if (propValue) {
    setPreferenceInternal("Proportions", propValue);
    bumpConfidence("Proportions");
    pushActivity(`Proportions updated to ${propValue} from Copilot chat`);
    detected.push("Proportions");
    mutated = true;
  }

  // ---- METAL ----
  let metalValue: string | null = null;
  if (/\byellow gold\b/.test(text)) metalValue = "Yellow Gold";
  else if (/\brose gold\b/.test(text)) metalValue = "Rose Gold";
  else if (/\bwhite gold\b/.test(text)) metalValue = "White Gold";
  else if (/\bplatinum\b/.test(text)) metalValue = "Platinum";
  else if (/\bgold\b/.test(text)) metalValue = "Gold";
  if (metalValue) {
    setPreferenceInternal("Metal", metalValue);
    bumpConfidence("Setting Style");
    pushActivity(`Metal updated to ${metalValue} from Copilot chat`);
    detected.push("Metal");
    mutated = true;
  }

  // ---- LAB vs NATURAL ----
  let labValue: string | null = null;
  if (/\blab[- ]?grown\b|\blab\b/.test(text)) labValue = "Lab-grown";
  else if (/\bnatural\b|\bmined\b/.test(text)) labValue = "Natural";
  if (labValue) {
    setPreferenceInternal("Lab vs Natural", labValue);
    bumpConfidence("Quality Tier");
    pushActivity(`Lab vs Natural updated to ${labValue} from Copilot chat`);
    detected.push("Lab vs Natural");
    mutated = true;
  }

  if (mutated) emit();
  return detected;
}

// internal: mutate without emitting (we batch one emit at the end)
function setPreferenceInternal(label: string, value: string) {
  const next = state.preferences.map((p) => ({ ...p }));
  const row = next.find((p) => p.label === label);
  if (!row || row.value === value) return;
  row.value = value;
  state = { ...state, preferences: next };
}

export function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const sec = Math.max(1, Math.floor(diff / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min${min === 1 ? "" : "s"} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr${hr === 1 ? "" : "s"} ago`;
  const day = Math.floor(hr / 24);
  if (day === 1) return "Yesterday";
  return `${day} days ago`;
}
