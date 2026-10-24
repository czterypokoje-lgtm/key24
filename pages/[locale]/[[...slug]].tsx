import type { GetStaticPaths, GetStaticProps } from "next";
import { SitePage, type SitePageProps } from "../../components/Page";
import { isLocale, locales, paths, pageFromPath } from "../../content/site";
import { customerProof, publicProof } from "../../content/proof";
export default SitePage;
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    ...locales.flatMap((locale) =>
      Object.values(paths).map((path) => ({
        params: { locale, slug: path ? path.split("/") : [] },
      })),
    ),
    ...customerProof
      .filter((c) => publicProof(c)?.story)
      .map((c) => ({
        params: { locale: c.locale, slug: ["customers", c.slug] },
      })),
  ],
  fallback: false,
});
export const getStaticProps: GetStaticProps<SitePageProps> = async ({
  params,
}) => {
  if (typeof params?.locale !== "string" || !isLocale(params.locale))
    return { notFound: true };
  const locale = params.locale,
    slug = Array.isArray(params.slug) ? params.slug : [],
    id = pageFromPath(slug);
  const record =
    slug.length === 2 && slug[0] === "customers"
      ? customerProof.find(
          (c) =>
            c.locale === locale && c.slug === slug[1] && publicProof(c)?.story,
        )
      : undefined;
  if (!id && !record) return { notFound: true };
  let siteUrl: string | null = null;
  try {
    const u = new URL(process.env.KEY24_SITE_URL ?? "");
    if (
      u.protocol === "https:" &&
      !u.username &&
      !u.password &&
      u.pathname === "/"
    )
      siteUrl = u.origin;
  } catch {}
  if (process.env.KEY24_PUBLIC_INDEXING !== "1") siteUrl = null;
  return {
    props: {
      locale,
      id: id ?? "customers",
      siteUrl,
      proof: customerProof
        .filter((c) => c.locale === locale)
        .map(publicProof)
        .filter((c): c is NonNullable<typeof c> => c !== null),
      ...(record ? { caseSlug: record.slug } : {}),
    },
  };
};
