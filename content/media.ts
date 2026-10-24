// Only owner-authorized local media. No third-party embed loads without a consent strategy.
export type DemoMedia = {
  approved: true;
  src: string;
  poster: string;
  captions: Record<"en-GB" | "de-DE", string>;
  transcript: Record<"en-GB" | "de-DE", string>;
};
export const demoMedia: DemoMedia | null = null;
