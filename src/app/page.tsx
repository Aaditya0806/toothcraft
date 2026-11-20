import { AboutIntro } from "@/components/home/AboutIntro";
import { ClinicsSection } from "@/components/home/ClinicsSection";
import { DentistsSection } from "@/components/home/DentistsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { SmileGallerySection } from "@/components/home/SmileGallerySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TourismPreview } from "@/components/home/TourismPreview";
import { TourPreview } from "@/components/home/TourPreview";
import { TreatmentMarquee } from "@/components/home/TreatmentMarquee";
import { TreatmentsShowcase } from "@/components/home/TreatmentsShowcase";
import { WhyChoose } from "@/components/home/WhyChoose";
import { BookingSection } from "@/components/sections/BookingSection";
import { homeFaqs } from "@/data/faqs";
import { JsonLd, faqSchema } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TreatmentMarquee />
      <AboutIntro />
      <WhyChoose />
      <TreatmentsShowcase />
      <DentistsSection />
      <SmileGallerySection />
      <TestimonialsSection />
      <ClinicsSection />
      <TourPreview />
      <TourismPreview />
      <FaqSection />
      <BookingSection />
      <JsonLd data={faqSchema(homeFaqs)} />
    </>
  );
}
