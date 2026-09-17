import { MarketingHeader } from "../components/marketing/Header";
import { Hero } from "../components/marketing/Hero";
import { ProductPreview } from "../components/marketing/PreviewCard";
import { Features } from "../components/marketing/Features";
import { BudgetPlayground } from "../components/marketing/BudgetPlayground";
import { Testimonials } from "../components/marketing/Testimonials";
import { Pricing } from "../components/marketing/Pricing";
import { CtaBanner } from "../components/marketing/CtaBanner";
import { Footer } from "../components/marketing/Footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbfaff_0%,#f4f4ff_40%,#fafaff_100%)]">
      <MarketingHeader />
      <main>
        <Hero />
        <ProductPreview />
        <Features />
        <BudgetPlayground />
        <Testimonials />
        <Pricing />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
