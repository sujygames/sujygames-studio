import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import GamesShowcase from '@/components/GamesShowcase';
import GachaCardReveal from '@/components/GachaCardReveal';
import PipelineFlow from '@/components/PipelineFlow';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen" id="top">
      <Navbar />
      <HeroSection />
      <GamesShowcase />
      <GachaCardReveal />
      <PipelineFlow />
      <AboutSection />
      <Footer />
    </main>
  );
}
