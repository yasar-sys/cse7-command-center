import { achievements, memories, projects, quotes, siteDetails, stats, timeline } from "@/data/content";
import { members } from "@/data/members";

/**
 * Central registry of every editable content collection.
 * Defaults come from the static data files; the admin panel stores overrides
 * in the `site_content` table (one row per key).
 */
export const contentDefaults = {
  members,
  stats,
  achievements,
  memories,
  timeline,
  projects,
  quotes,
  siteDetails,
} as const;

export type ContentKey = keyof typeof contentDefaults;
export type ContentMap = { [K in ContentKey]: (typeof contentDefaults)[K] };

export const contentKeys = Object.keys(contentDefaults) as ContentKey[];

export const contentLabels: Record<ContentKey, string> = {
  members: "MEMBERS",
  stats: "BATCH STATS",
  achievements: "MISSION LOG",
  memories: "MEMORY CORE",
  timeline: "TIMELINE",
  projects: "BUILD LAB",
  quotes: "BATCH WALL",
  siteDetails: "SITE DETAILS",
};

/** A blank record shaped like the first default entry of a collection. */
export function blankRecord(key: ContentKey): Record<string, unknown> {
  const list = contentDefaults[key] as unknown;
  const sample = Array.isArray(list) ? (list[0] as Record<string, unknown> | undefined) : undefined;
  if (!sample) return {};
  return Object.fromEntries(
    Object.entries(sample).map(([field, value]) => [
      field,
      Array.isArray(value) ? [] : typeof value === "boolean" ? false : "",
    ]),
  );
}

export function mergeContent(rows?: Record<string, unknown> | null): ContentMap {
  const merged = { ...contentDefaults } as unknown as ContentMap;
  if (!rows) return merged;
  for (const key of contentKeys) {
    const value = rows[key];
    if (value == null) continue;
    const isArrayKey = Array.isArray(contentDefaults[key]);
    if (isArrayKey ? Array.isArray(value) : typeof value === "object") {
      (merged as Record<string, unknown>)[key] = value;
    }
  }
  return merged;
}
