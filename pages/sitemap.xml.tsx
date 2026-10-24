import type { GetServerSideProps } from "next";
import { locales, paths } from "../content/site";
import { customerProof, publicProof } from "../content/proof";
export default function Sitemap() {
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
  const escape = (v: string) =>
    v
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll('"', "&quot;");
  const urls =
    base && process.env.KEY24_PUBLIC_INDEXING === "1"
      ? [
          ...locales.flatMap((l) =>
            Object.values(paths)
              .filter((p) => !p.startsWith("legal/"))
              .map((p) => `${base}/${l}${p ? "/" + p : ""}`),
          ),
          ...customerProof
            .filter((c) => publicProof(c)?.story)
            .map((c) => `${base}/${c.locale}/customers/${c.slug}`),
        ]
      : [];
  res.setHeader("Content-Type", "application/xml");
  res.write(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${escape(u)}</loc></url>`).join("")}</urlset>`,
  );
  res.end();
  return { props: {} };
};
