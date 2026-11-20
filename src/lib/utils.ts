/** Join class names, skipping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Zero-padded index label, e.g. 1 -> "01". */
export function pad(value: number) {
  return String(value).padStart(2, "0");
}
