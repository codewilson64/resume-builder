import AdvantagesHero from "../components/home/AdvantagesHero";
import CTA from "../components/home/CTAHero";
import Hero from "../components/home/Hero";
import MarketingHero from "../components/home/MarketingHero";

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