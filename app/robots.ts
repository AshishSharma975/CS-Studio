
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://cs-studio-zeta.vercel.app/sitemap.xml",
    host: "https://cs-studio-zeta.vercel.app",
  };
}
