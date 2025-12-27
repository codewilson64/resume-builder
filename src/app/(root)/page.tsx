import { getCurrentUser } from "@/lib/actions/auth-action";
import { redirect } from "next/navigation";
import AdvantagesHero from "../components/home/AdvantagesHero";
import CTA from "../components/home/CTAHero";
import Hero from "../components/home/Hero";
import MarketingHero from "../components/home/MarketingHero";
import Footer from "../components/home/Footer";
import { ResumeCarousel } from "../components/home/ResumeCarousel";

export default async function Home() {
  const user = await getCurrentUser()

  if(user) redirect('/profile')

  return (
    <main>
      <Hero />
      <ResumeCarousel />
      <MarketingHero />
      <AdvantagesHero />
      <CTA />
      <Footer />
    </main>
  )
}