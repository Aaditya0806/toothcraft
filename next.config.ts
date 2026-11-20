import type { NextConfig } from "next";

/**
 * Old .php URLs from the previous toothcrafts.com site mapped to their new homes.
 * These are served as true 301s so existing search rankings and backlinks carry over.
 */
const legacyRedirects: Record<string, string> = {
  "/index.php": "/",
  "/about-us.php": "/about",
  "/why-choose-us.php": "/about",
  "/treatments.php": "/treatments",
  "/dental-implants.php": "/treatments/dental-implants",
  "/root-canal-treatment.php": "/treatments/root-canal-treatment",
  "/dental-orthodontic-treatment.php": "/treatments/orthodontics",
  "/cosmetic-dentistry.php": "/treatments/cosmetic-dentistry",
  "/dental-veneers.php": "/treatments/dental-veneers",
  "/teeth-whitening.php": "/treatments/teeth-whitening",
  "/smile-makeover.php": "/treatments/smile-makeover",
  "/dental-bridges.php": "/treatments/dental-bridges",
  "/dental-crowns.php": "/treatments/dental-crowns",
  "/dentures.php": "/treatments/dentures",
  "/teeth-scaling.php": "/treatments/teeth-scaling",
  "/laser-dentistry.php": "/treatments/laser-dentistry",
  "/pediatric-dentistry.php": "/treatments/pediatric-dentistry",
  "/sedation-dentistry.php": "/treatments/sedation-dentistry",
  "/brushing-techniques.php": "/treatments/brushing-techniques",
  "/smile-gallery.php": "/smile-gallery",
  "/contact-us.php": "/contact",
  "/dental-tourism.php": "/dental-tourism",
  "/news-events.php": "/",
  "/virtual-saidapet.php": "/virtual-tour?clinic=saidapet",
  "/virtual-kodambakkam.php": "/virtual-tour?clinic=ashok-nagar",
  "/virtual-mugalivakkam.php": "/virtual-tour?clinic=mugalivakkam",
  "/dentist-in-saidapet.php": "/clinics/saidapet",
  "/dentist-in-kodambakkam.php": "/clinics/ashok-nagar",
  "/dentist-in-mugalivakkam.php": "/clinics/mugalivakkam",
  "/best-dentist-near-me-saidapet.php": "/clinics/saidapet",
  "/dental-hospital-near-me-kodambakkam.php": "/clinics/ashok-nagar",
  "/dental-clinic-near-me-mugalivakkam.php": "/clinics/mugalivakkam",
  "/dentist-near-by.php": "/clinics",
  "/dental-clinic-near-me.php": "/clinics",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Set NEXT_NO_DISK_CACHE=1 to stop Turbopack writing its compile cache to disk
  // (handy on machines that are short on free space; restarts are a little slower).
  experimental:
    process.env.NEXT_NO_DISK_CACHE === "1"
      ? { turbopackFileSystemCacheForDev: false, turbopackFileSystemCacheForBuild: false }
      : {},
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
  },
  async redirects() {
    return Object.entries(legacyRedirects).map(([source, destination]) => ({
      source,
      destination,
      statusCode: 301 as const,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
