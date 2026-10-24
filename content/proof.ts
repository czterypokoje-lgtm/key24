export type Metric = {
  label: string;
  value: string;
  period: string;
  denominator: string;
  evidenceRef: string;
  verified: boolean;
};
export type CustomerProof = {
  slug: string;
  locale: "en-GB" | "de-DE";
  publish: boolean;
  name: string;
  business: string;
  quote: string;
  releaseRef: string;
  approvedOn: string;
  consentForName: boolean;
  consentForQuote: boolean;
  photo?: string;
  consentForPhoto?: boolean;
  metrics: Metric[];
  story?: { title: string; paragraphs: string[] };
  storyApproved?: boolean;
};
// Empty deliberately. Add actual permissioned records; never seed public fake reviews.
export const customerProof: CustomerProof[] = [];
export function publishable(record: CustomerProof): boolean {
  return (
    record.publish === true &&
    record.consentForName === true &&
    record.consentForQuote === true &&
    [
      record.slug,
      record.name,
      record.business,
      record.quote,
      record.releaseRef,
    ].every((s) => typeof s === "string" && s.trim().length > 0) &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug) &&
    /^\d{4}-\d{2}-\d{2}$/.test(record.approvedOn) &&
    Number.isFinite(Date.parse(record.approvedOn)) &&
    Date.parse(record.approvedOn) <= Date.now()
  );
}
export function publicProof(record: CustomerProof) {
  if (!publishable(record)) return null;
  return {
    slug: record.slug,
    name: record.name,
    business: record.business,
    quote: record.quote,
    photo:
      record.consentForPhoto && record.photo?.startsWith("/customer-assets/")
        ? record.photo
        : null,
    metrics: record.metrics
      .filter(
        (m) =>
          m.verified &&
          [m.label, m.value, m.period, m.denominator, m.evidenceRef].every(
            (s) => s?.trim(),
          ),
      )
      .map(({ evidenceRef, ...metric }) => {
        void evidenceRef;
        return metric;
      }),
    story:
      record.storyApproved && record.story?.paragraphs.length
        ? record.story
        : null,
  };
}

export type PublicCustomerProof = NonNullable<ReturnType<typeof publicProof>>;
