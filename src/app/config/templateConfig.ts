export const templates = [
  "Budapest",
  "Chicago",
  "Nordic",
  "Aurora",
  "Atlas",
  "Tokyo",
  "New York",
  "London",
  "Madrid",
  "Paris",
  "Jakarta",
] as const;

export type TemplateName = (typeof templates)[number];