import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { PillarsSection } from './components/PillarsSection';
import { ServicesSection } from './components/ServicesSection';
import { CreditSimulator } from './components/CreditSimulator';
import { ApprovalTrendsSection } from './components/ApprovalTrendsSection';
import { JourneySection } from './components/JourneySection';
import { TrustDirectorSection } from './components/TrustDirectorSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

export default function App() {
  return (
    <div className="min-h-screen bg-[#090D14] text-[#F3F4F6] selection:bg-[#E5C07B]/20 selection:text-[#E5C07B] overflow-x-hidden font-sans">
      {/* Premium Magnetic Custom Cursor */}
      <CustomCursor />

      {/* GSAP Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Fixed Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <PillarsSection />
        <ServicesSection />
        <CreditSimulator />
        <ApprovalTrendsSection />
        <JourneySection />
        <TrustDirectorSection />
        <FAQSection />
      </main>

      {/* Institutional & Regulatory Footer */}
      <Footer />

      {/* Persistent WhatsApp Floating Quick Access */}
      <WhatsAppFloatingButton />
    </div>
  );
}
