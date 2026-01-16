export const templates = [
  "Orion",
  "Nova",
  "Nordic",
  "Aurora",
  "Atlas",
  "Astra",
  "Zenith",
  "Vega"
] as const;

export type TemplateName = (typeof templates)[number];