
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
          <h2 className="font-playfair text-4xl font-bold mb-4">My Skillset</h2>
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
              {/* Studio lights shot - Top Left */}
              <div className="absolute top-0 left-0 z-30">
                <img 
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=320&h=200&fit=crop"
                  alt="Studio lighting setup"
                  className="w-[160px] h-[100px] object-cover rounded-md"
                />
              </div>

              {/* Photographer at work - Top Right (overlapped by top-left) */}
              <div className="absolute top-0 right-0 z-20" style={{ right: '15px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=320&h=200&fit=crop"
                  alt="Photographer working"
                  className="w-[160px] h-[100px] object-cover rounded-md"
                />
              </div>

              {/* Urban street scene - Bottom Left */}
              <div className="absolute bottom-0 left-0 z-20">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=320&h=200&fit=crop"
                  alt="Urban street photography"
                  className="w-[160px] h-[100px] object-cover rounded-md"
                />
              </div>

              {/* DSLR close-up - Bottom Right (overlapped by bottom-left) */}
              <div className="absolute bottom-0 right-0 z-10" style={{ right: '20px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=320&h=200&fit=crop"
                  alt="DSLR camera close-up"
                  className="w-[160px] h-[100px] object-cover rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsetSection;
