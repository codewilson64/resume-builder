import AdvantagesHero from "../components/Home/AdvantagesHero";
import CTA from "../components/Home/CTAHero";
import Hero from "../components/Home/Hero";
import MarketingHero from "../components/Home/MarketingHero";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarketingHero />
      <AdvantagesHero />
      <CTA />
    </main>
  )
}