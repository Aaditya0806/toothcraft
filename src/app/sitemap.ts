import type { MetadataRoute } from "next";
import { clinics } from "@/data/clinics";
import { site } from "@/data/site";
import { treatments } from "@/data/treatments";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/treatments", 0.9),
    ...treatments.map((treatment) => page(`/treatments/${treatment.slug}`, treatment.kind === "guide" ? 0.5 : 0.8)),
    page("/clinics", 0.9),
    ...clinics.map((clinic) => page(`/clinics/${clinic.slug}`, 0.9)),
    page("/dentists", 0.8),
    page("/about", 0.8),
    page("/smile-gallery", 0.7),
    page("/virtual-tour", 0.6),
    page("/dental-tourism", 0.7),
    page("/faq", 0.6),
    page("/contact", 0.9),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
