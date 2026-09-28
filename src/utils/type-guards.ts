import type { Article, GalleryItem, Employee } from "@/types";

function isStringRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

/** Runtime guard for Article JSON. Fails loudly on malformed data. */
export function isArticle(x: unknown): x is Article {
  if (!isStringRecord(x)) return false;
  return (
    typeof x.id === "string" &&
    typeof x.title === "string" &&
    typeof x.date === "string" &&
    typeof x.category === "string" &&
    typeof x.summary === "string" &&
    typeof x.url === "string"
  );
}

/** Runtime guard for GalleryItem JSON. Fails loudly on malformed data. */
export function isGalleryItem(x: unknown): x is GalleryItem {
  if (!isStringRecord(x)) return false;
  return (
    typeof x.id === "string" &&
    typeof x.date === "string" &&
    typeof x.title === "string"
  );
}

/** Runtime guard for Employee JSON. Fails loudly on malformed data. */
export function isEmployee(x: unknown): x is Employee {
  if (!isStringRecord(x)) return false;
  return (
    typeof x.id === "string" &&
    typeof x.name === "string" &&
    typeof x.position === "string"
  );
}