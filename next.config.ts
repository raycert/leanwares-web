import type { NextConfig } from "next";
import { isIndexable } from "./src/lib/site";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // 75: photographs (default); 90: the logo, whose small lettering shows JPEG artefacts at 75.
    qualities: [75, 90],
  },
  // Belt and braces with the robots meta tag and robots.txt (lib/seo.ts, app/robots.ts):
  // every response is noindex unless production indexing is explicitly approved.
  async headers() {
    if (isIndexable()) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
