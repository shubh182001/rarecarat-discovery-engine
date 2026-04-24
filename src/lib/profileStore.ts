/**
 * Vector-based profile store using cosine similarity for ring recommendations.
 *
 * The user is represented as a 6-dim feature vector:
 *   [style_vintage, budget_low, size_petite, metal_warm, lab_grown, uniqueness]
 *
 * Each dimension is in [0, 1] and starts at 0.5 (neutral/unknown).
 * As the user chats, signals nudge the relevant dimension toward a target
 * value via:   new = current + 0.15 * (target - current)
 *
 * After every message, we compute cosine similarity between the user vector
 * and each ring vector, then expose ranked matches.
 *
 * The legacy ProfileState shape (preferences / activity / confidence) is
 * derived from the vector so existing UI keeps working.
 */

export type Preference = { label: string; value: string };
export type ActivityEntry = { ts: number; text: string };

export const DIMENSIONS = [
  "Style",
  "Budget Fit",
  "Proportions",
  "Metal",
  "Lab vs Natural",
  "Uniqueness",
] as const;
export type Dimension = (typeof DIMENSIONS)[number];

export type UserVector = [number, number, number, number, number, number];

export type Ring = {
  id: string;
  name: string;
  vector: UserVector;
};

export type RingMatch = {
  ring: Ring;
  similarity: number; // 0..1
  matchPercent: number; // 0..100
};

export type ProfileState = {
  vector: UserVector;
  preferences: Preference[];
  activity: ActivityEntry[];
  /** Confidence per radar axis, 0–100, derived from vector. */
  confidence: Record<Dimension, number>;
  /** Top ring matches by cosine similarity, ranked. */
  matches: RingMatch[];
};

// ---------- Ring catalog ----------

export const RINGS: Ring[] = [
  { id: "mila",     name: "Mila Vintage-Inspired Solitaire", vector: [0.95, 0.85, 0.90, 0.30, 1.0, 0.75] },
  { id: "beverly",  name: "Beverly Timeless Hidden Halo",    vector: [0.40, 0.80, 0.95, 0.20, 1.0, 0.55] },
  { id: "madison",  name: "Madison Three-Stone Lab Pear",    vector: [0.60, 0.75, 0.80, 0.40, 1.0, 0.95] },
  { id: "hayden",   name: "Hayden Curved Vine Lab",          vector: [0.75, 0.82, 0.85, 0.65, 1.0, 0.85] },
  { id: "carmel",   name: "Carmel Vintage Inspired",         vector: [0.90, 0.60, 0.80, 0.35, 0.0, 0.80] },
  { id: "helena",   name: "Helena Grand Solitaire",          vector: [0.50, 0.10, 0.40, 0.30, 1.0, 0.60] },
  { id: "aria",     name: "Aria Three-Stone Oval",           vector: [0.55, 0.20, 0.50, 0.40, 1.0, 0.85] },
  { id: "celeste",  name: "Celeste Halo Round",              vector: [0.45, 0.35, 0.55, 0.25, 1.0, 0.70] },
];

// ---------- Cosine similarity ----------

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  if (denom === 0) return 0;
  return dot / denom;
}

function rankRings(userVec: UserVector): RingMatch[] {
  return RINGS
    .map((ring) => {
      const similarity = cosineSimilarity(userVec, ring.vector);
      return {
        ring,
        similarity,
        matchPercent: Math.round(similarity * 100),
      };
    })
    .sort((a, b) => b.similarity - a.similarity);
}

// ---------- Vector → human text ----------

function styleText(v: number): string {
  if (v >= 0.75) return "Vintage-leaning";
  if (v >= 0.55) return "Vintage-Modern blend";
  if (v >= 0.45) return "Open / balanced";
  if (v >= 0.25) return "Modern-leaning";
  return "Modern / minimal";
}
function budgetText(v: number): string {
  if (v >= 0.85) return "Under $2,000";
  if (v >= 0.6) return "$2,000 – $3,000";
  if (v >= 0.4) return "$3,000 – $5,000";
  if (v >= 0.2) return "$5,000 – $10,000";
  return "Premium / flexible";
}
function sizeText(v: number): string {
  if (v >= 0.7) return "Petite / Small Fingers";
  if (v >= 0.45) return "Average proportions";
  return "Statement / Larger";
}
function metalText(v: number): string {
  if (v >= 0.7) return "Warm (Yellow / Rose Gold)";
  if (v >= 0.45) return "Open to suggestions";
  return "Cool (White Gold / Platinum)";
}
function labText(v: number): string {
  if (v >= 0.7) return "Lab-grown";
  if (v >= 0.45) return "Either, leans Lab";
  return "Natural";
}
function uniquenessText(v: number): string {
  if (v >= 0.7) return "One-of-a-kind / Artsy";
  if (v >= 0.45) return "Distinctive but wearable";
  return "Classic / Traditional";
}

function derivePreferences(vec: UserVector): Preference[] {
  return [
    { label: "Style", value: styleText(vec[0]) },
    { label: "Budget", value: budgetText(vec[1]) },
    { label: "Proportions", value: sizeText(vec[2]) },
    { label: "Metal", value: metalText(vec[3]) },
    { label: "Lab vs Natural", value: labText(vec[4]) },
    { label: "Uniqueness", value: uniquenessText(vec[5]) },
  ];
}

function deriveConfidence(vec: UserVector): Record<Dimension, number> {
  // Confidence = dimension value * 100. A neutral 0.5 reads as 50%.
  return {
    Style: Math.round(vec[0] * 100),
    "Budget Fit": Math.round(vec[1] * 100),
    Proportions: Math.round(vec[2] * 100),
    Metal: Math.round(vec[3] * 100),
    "Lab vs Natural": Math.round(vec[4] * 100),
    Uniqueness: Math.round(vec[5] * 100),
  };
}

// ---------- State management ----------

const STORAGE_KEY = "rc_profile_v2";
const NEUTRAL: UserVector = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

function buildState(vec: UserVector, activity: ActivityEntry[]): ProfileState {
  return {
    vector: vec,
    preferences: derivePreferences(vec),
    activity,
    confidence: deriveConfidence(vec),
    matches: rankRings(vec),
  };
}

function loadState(): ProfileState {
  if (typeof window === "undefined") return buildState(NEUTRAL, []);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return buildState(NEUTRAL, []);
    const parsed = JSON.parse(raw) as { vector?: UserVector; activity?: ActivityEntry[] };
    const vec: UserVector =
      Array.isArray(parsed.vector) && parsed.vector.length === 6
        ? (parsed.vector.map((n) => Math.min(1, Math.max(0, Number(n) || 0.5))) as UserVector)
        : NEUTRAL;
    return buildState(vec, parsed.activity ?? []);
  } catch {
    return buildState(NEUTRAL, []);
  }
}

let state: ProfileState = loadState();
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ vector: state.vector, activity: state.activity }),
    );
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

export function getRingMatches(): RingMatch[] {
  return state.matches;
}

/** Manual edit from /profile cards. Maps a label back to a dimension nudge to ~target. */
export function setPreference(label: string, value: string) {
  const idx = DIMENSIONS.findIndex((d) => d === label || labelAlias(label) === d);
  if (idx === -1) return;
  // Heuristic: parse the value text to estimate target
  const target = inferTargetFromText(idx, value);
  if (target == null) return;
  const next = [...state.vector] as UserVector;
  next[idx] = clamp01(target);
  state = buildState(next, [
    { ts: Date.now(), text: `${DIMENSIONS[idx]} manually set to ${value}` },
    ...state.activity,
  ].slice(0, 5));
  emit();
}

function labelAlias(label: string): Dimension | null {
  const l = label.toLowerCase();
  if (l.startsWith("budget")) return "Budget Fit";
  if (l.startsWith("style")) return "Style";
  if (l.startsWith("propor")) return "Proportions";
  if (l.startsWith("metal")) return "Metal";
  if (l.startsWith("lab")) return "Lab vs Natural";
  if (l.startsWith("unique")) return "Uniqueness";
  return null;
}

function inferTargetFromText(dimIdx: number, text: string): number | null {
  const t = text.toLowerCase();
  switch (dimIdx) {
    case 0: // Style
      if (/vintage|antique|classic|old/.test(t)) return 0.9;
      if (/modern|minimal|clean|simple/.test(t)) return 0.1;
      if (/artsy|unique|bold/.test(t)) return 0.7;
      return 0.5;
    case 1: // Budget
      return budgetTargetFromText(t) ?? 0.5;
    case 2: // Size
      if (/petite|small|dainty|subtle/.test(t)) return 0.9;
      if (/statement|large|big|bold/.test(t)) return 0.1;
      return 0.5;
    case 3: // Metal
      if (/yellow|rose|warm/.test(t)) return 0.9;
      if (/white|platinum|silver|cool/.test(t)) return 0.1;
      return 0.5;
    case 4: // Lab
      if (/lab|synthetic/.test(t)) return 0.9;
      if (/natural|mined|real/.test(t)) return 0.1;
      return 0.5;
    case 5: // Uniqueness
      if (/unique|one[- ]of[- ]a[- ]kind|artsy/.test(t)) return 0.9;
      if (/classic|traditional|simple/.test(t)) return 0.1;
      return 0.5;
  }
  return null;
}

function budgetTargetFromText(t: string): number | null {
  // Look for explicit dollar amounts first
  const k = t.match(/\$?\s*(\d{1,3})\s*k\b/);
  const dollars = t.match(/\$\s*(\d{3,7})/);
  let amount: number | null = null;
  if (k) amount = parseInt(k[1], 10) * 1000;
  else if (dollars) amount = parseInt(dollars[1], 10);
  if (amount != null) {
    if (amount < 2000) return 1.0;
    if (amount <= 3000) return 0.7;
    if (amount <= 5000) return 0.4;
    return 0.1;
  }
  if (/\bunder\s*\$?\s*2/.test(t) || /cheap|tight budget/.test(t)) return 1.0;
  if (/\bunder\s*\$?\s*3/.test(t) || /\bmoderate\b/.test(t)) return 0.7;
  if (/\bflexible|premium|luxury|splurge|no limit/.test(t)) return 0.1;
  return null;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

// ---------- Chat-driven updates ----------

const NUDGE = 0.15;

type Signal = { dim: number; target: number };

function nudge(current: number, target: number): number {
  return clamp01(current + NUDGE * (target - current));
}

function detectSignals(text: string): Signal[] {
  const t = text.toLowerCase();
  const signals: Signal[] = [];

  // Style (dim 0)
  if (/\b(vintage|antique|classic|old)\b/.test(t)) signals.push({ dim: 0, target: 1.0 });
  if (/\b(modern|minimal(ist)?|clean|simple)\b/.test(t)) signals.push({ dim: 0, target: 0.0 });
  if (/\b(artsy|unique|bold)\b/.test(t)) signals.push({ dim: 0, target: 0.7 });

  // Budget (dim 1)
  const bt = budgetTargetFromText(t);
  if (bt != null) signals.push({ dim: 1, target: bt });

  // Size (dim 2)
  if (/\b(small finger|petite|dainty|subtle|tiny|slim)\b/.test(t)) signals.push({ dim: 2, target: 1.0 });
  if (/\b(statement|large|big|huge|bold)\b/.test(t)) signals.push({ dim: 2, target: 0.0 });

  // Metal (dim 3)
  if (/\b(yellow gold|rose gold|warm)\b/.test(t)) signals.push({ dim: 3, target: 1.0 });
  if (/\b(white gold|platinum|silver)\b/.test(t)) signals.push({ dim: 3, target: 0.0 });

  // Lab (dim 4)
  if (/\b(lab[- ]?grown|lab|synthetic)\b/.test(t)) signals.push({ dim: 4, target: 1.0 });
  if (/\b(natural|mined|real diamond)\b/.test(t)) signals.push({ dim: 4, target: 0.0 });

  // Uniqueness (dim 5)
  if (/\b(unique|different|artsy|one[- ]of[- ]a[- ]kind)\b/.test(t)) signals.push({ dim: 5, target: 1.0 });
  if (/\b(classic|traditional|simple)\b/.test(t)) signals.push({ dim: 5, target: 0.0 });

  return signals;
}

function activityTextFor(dim: number, vec: UserVector): string {
  const pct = Math.round(vec[dim] * 100);
  switch (dim) {
    case 0: return `Style updated to ${styleText(vec[0])} (${pct}%) from Copilot chat`;
    case 1: return `Budget set to ${budgetText(vec[1])} from Copilot chat`;
    case 2: return `Proportions confidence increased to ${pct}% from Copilot chat`;
    case 3: return `Metal updated to ${metalText(vec[3])} from Copilot chat`;
    case 4: return `Lab vs Natural updated to ${labText(vec[4])} from Copilot chat`;
    case 5: return `Uniqueness confidence increased to ${pct}% from Copilot chat`;
    default: return `Profile updated from Copilot chat`;
  }
}

/**
 * Apply a chat message: nudge any detected dimensions, log activity, recompute matches.
 * Returns the list of dimension names changed.
 */
export function applyChatMessage(rawText: string): string[] {
  if (!rawText.trim()) return [];
  const signals = detectSignals(rawText);
  if (signals.length === 0) return [];

  // Average multiple signals on the same dim, then nudge once per dim.
  const byDim = new Map<number, number[]>();
  for (const s of signals) {
    const arr = byDim.get(s.dim) ?? [];
    arr.push(s.target);
    byDim.set(s.dim, arr);
  }

  const next = [...state.vector] as UserVector;
  const changedDims: number[] = [];
  for (const [dim, targets] of byDim) {
    const target = targets.reduce((a, b) => a + b, 0) / targets.length;
    const updated = nudge(next[dim], target);
    if (Math.abs(updated - next[dim]) > 0.001) {
      next[dim] = updated;
      changedDims.push(dim);
    }
  }
  if (changedDims.length === 0) return [];

  const newActivity: ActivityEntry[] = changedDims.map((d) => ({
    ts: Date.now(),
    text: activityTextFor(d, next),
  }));

  const activity = [...newActivity, ...state.activity].slice(0, 5);
  state = buildState(next, activity);
  emit();
  return changedDims.map((d) => DIMENSIONS[d]);
}

// ---------- Time formatting ----------

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
