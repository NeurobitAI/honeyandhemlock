
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillsetSection from "@/components/SkillsetSection";
import PartnersSection from "@/components/PartnersSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import FoundersSection from "@/components/FoundersSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-portfolio-black">
      <Header />
      <HeroSection />
      <SkillsetSection />
      <PartnersSection />
      <FeaturedProjects />
      <FoundersSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
