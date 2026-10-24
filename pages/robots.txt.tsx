import type { GetServerSideProps } from "next";
export default function Robots() {
  return null;
}
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let base = "";
  try {
    const u = new URL(process.env.KEY24_SITE_URL ?? "");
    if (
      u.protocol === "https:" &&
      !u.username &&
      !u.password &&
      u.pathname === "/"
    )
      base = u.origin;
  } catch {}
  res.setHeader("Content-Type", "text/plain");
  res.write(
    base && process.env.KEY24_PUBLIC_INDEXING === "1"
      ? `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${base}/sitemap.xml\n`
      : "User-agent: *\nDisallow: /\n",
  );
  res.end();
  return { props: {} };
};
