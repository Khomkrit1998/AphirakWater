import { Hero } from "./hero"
import { ScrollSpy } from "./scroll-spy"
import {
  AreasSection,
  CtaBand,
  FaqSection,
  PricingSection,
  ProcessStory,
  ReviewsSection,
  ServicesSection,
  WhyUs,
  WorkGallery,
} from "./sections"

// `services` is a slot so the route can pass cards from the services feature.
export function HomePage({ services }: { services: React.ReactNode }) {
  return (
    <>
      <ScrollSpy />
      <Hero />
      <ServicesSection>{services}</ServicesSection>
      <ProcessStory />
      <WhyUs />
      <AreasSection />
      <PricingSection />
      <WorkGallery />
      <ReviewsSection />
      <FaqSection />
      <CtaBand />
    </>
  )
}
