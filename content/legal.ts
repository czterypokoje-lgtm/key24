import { type Locale } from "./site";
export type LegalDocument = {
  approved: boolean;
  reviewedOn: string | null;
  paragraphs: string[];
};
// Owner-reviewed company-specific legal text is required before enabling leads.
const pending = (): LegalDocument => ({
  approved: false,
  reviewedOn: null,
  paragraphs: [],
});
export const legal: Record<
  Locale,
  Record<"privacy" | "terms" | "cookies", LegalDocument>
> = {
  "en-GB": { privacy: pending(), terms: pending(), cookies: pending() },
  "de-DE": { privacy: pending(), terms: pending(), cookies: pending() },
};
export function privacyReady(locale: Locale) {
  const p = legal[locale].privacy;
  return (
    p.approved &&
    Boolean(p.reviewedOn) &&
    p.paragraphs.some((s) => s.trim().length > 0)
  );
}
