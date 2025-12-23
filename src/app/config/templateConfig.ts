export const templates = [
  "Orion",
  "Nova",
  "Nordic",
  "Aurora",
  "Atlas",
  "Astra",
  "Zenith",
] as const;

export type TemplateName = (typeof templates)[number];