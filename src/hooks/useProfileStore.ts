import { useSyncExternalStore } from "react";
import {
  getProfileSnapshot,
  subscribeProfile,
  type ProfileState,
} from "@/lib/profileStore";

const ssrSnapshot: ProfileState = getProfileSnapshot();

export function useProfileStore(): ProfileState {
  return useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    () => ssrSnapshot,
  );
}
