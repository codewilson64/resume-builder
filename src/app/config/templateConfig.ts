export const templates = [
  "Budapest",
  "Chicago",
  "Vienna",
  "Berlin",
  "Oslo",
  "Tokyo",
  "New York",
  "London",
  "Madrid",
  "Paris",
  "Jakarta",
] as const;

export type TemplateName = (typeof templates)[number];