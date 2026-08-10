import Navbar from "../components/Landing page/Navbar";
import Hero from "../components/Landing page/Hero";
import TrustStrip from "../components/Landing page/TrustStrip";
import Features from "../components/Landing page/Features";
import HowItWorks from "../components/Landing page/HowItWorks";
import Security from "../components/Landing page/Security";
import CTA from "../components/Landing page/CTA";
import Footer from "../components/Landing page/Footer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0B1220] text-[#F1F5F9]">

      <Navbar />

      <main>
        <Hero />
        <TrustStrip />
        <Features />
        <HowItWorks />
        <Security />
        <CTA />
      </main>

      <Footer />

    </div>
  );
}