import type { MetadataRoute } from "next";
import { getCategories, getPosts, getTags } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    "",
    "artigos/",
    "ensino/",
    "cursos/ia-na-pratica.html",
    "pesquisa/",
    "sobre/",
  ].map((path) => ({
    url: `${site.url}/${path}`,
    lastModified: now,
  }));

  const posts = getPosts().map((post) => ({
    url: `${site.url}/artigos/${post.slug}/`,
    lastModified: new Date(post.date),
  }));

  const tags = getTags().map((tag) => ({
    url: `${site.url}/tags/${tag}/`,
    lastModified: now,
  }));

  const categories = getCategories().map((category) => ({
    url: `${site.url}/categories/${category}/`,
    lastModified: now,
  }));

  return [...pages, ...posts, ...tags, ...categories];
}
