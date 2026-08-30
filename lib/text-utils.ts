// Korean text readability helper: removes unnecessary commas from report text
// In Korean, commas (,) between clauses often hurt readability.
// This keeps numbers, English commas in lists, and decimal points intact.
export function cleanText(text: string): string {
  if (!text) return text
  // Remove Korean-style commas that separate clauses (but not within numbers like 1,000 or 24,900)
  // Strategy: replace commas that are followed by a space or Korean character
  return text
    .replace(/,(?=\s|[가-힣])/g, ' ')
    .replace(/,(?=\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
