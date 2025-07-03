
import { User, Mountain, Briefcase, Heart } from "lucide-react";

const SkillsetSection = () => {
  const skills = [
    {
      icon: User,
      title: "Portraits",
      description: "Capturing the essence of individuals"
    },
    {
      icon: Mountain,
      title: "Landscapes", 
      description: "Breathtaking natural scenery"
    },
    {
      icon: Briefcase,
      title: "Commercial / Corporate",
      description: "Professional business photography"
    },
    {
      icon: Heart,
      title: "Weddings",
      description: "Your special day preserved forever"
    }
  ];

  return (
    <section className="bg-portfolio-black text-white py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold mb-4">Our Work</h2>
          <p className="font-open-sans text-lg text-portfolio-gold">I'm very talented. Check what I can do!</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
          {/* Left Column - Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="text-center p-8 group hover:bg-white/5 transition-all duration-300 rounded-lg">
                <skill.icon className="w-12 h-12 text-portfolio-gold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-playfair text-xl font-bold mb-2">{skill.title}</h3>
                <p className="font-open-sans text-sm text-white/80">{skill.description}</p>
              </div>
            ))}
          </div>

          {/* Right Column - Image Collage */}
          <div className="relative -ml-5 border-[2px] border-portfolio-gold rounded-lg p-6">
            <div className="relative h-[400px]">
              {/* Main image - Hand holding yellow item */}
              <div className="absolute top-0 left-0 z-30">
                <img 
                  src="/lovable-uploads/942653bf-d1b9-4433-ae2e-76e1c51bdc0c.png"
                  alt="Creative work detail"
                  className="w-[180px] h-[120px] object-cover rounded-md"
                />
              </div>

              {/* Second image - Couple touching foreheads */}
              <div className="absolute top-0 right-0 z-20" style={{ right: '10px' }}>
                <img 
                  src="/lovable-uploads/23281ae9-1a58-4a14-b30f-73803cecb1e9.png"
                  alt="Intimate scene"
                  className="w-[180px] h-[120px] object-cover rounded-md"
                />
              </div>

              {/* Third image - Bar scene */}
              <div className="absolute bottom-0 left-0 z-20">
                <img 
                  src="/lovable-uploads/66592ec3-dc1a-475b-9d26-f9f9cbe2ce08.png"
                  alt="Bar scene"
                  className="w-[180px] h-[120px] object-cover rounded-md"
                />
              </div>

              {/* Fourth image overlapping - positioning to create overlap */}
              <div className="absolute bottom-0 right-0 z-10" style={{ right: '15px' }}>
                <div className="w-[180px] h-[120px] bg-portfolio-gold/20 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm">More Work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsetSection;
