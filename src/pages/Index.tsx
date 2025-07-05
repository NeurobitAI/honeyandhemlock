
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import SkillsetSection from "@/components/SkillsetSection";
import FoundersSection from "@/components/FoundersSection";
import PartnersSection from "@/components/PartnersSection";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen bg-portfolio-black">
      <Header />
      <HeroSection />
      <FeaturedProjects />
      <SkillsetSection />
      <FoundersSection />
      <PartnersSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
