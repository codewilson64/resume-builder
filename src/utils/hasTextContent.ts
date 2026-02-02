export function hasTextContent(html?: string | null): boolean {
  if (!html) return false;

  const text = html
    .replace(/<[^>]*>/g, "")   // remove HTML tags
    .replace(/&nbsp;/g, "")   // remove non-breaking spaces
    .trim();

  return text.length > 0;
}
