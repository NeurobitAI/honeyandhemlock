
import { Film, Award, Camera, Video } from "lucide-react";

const SkillsetSection = () => {
  const skills = [
    {
      icon: Film,
      title: "Feature Films",
      description: "Cinematic storytelling at its finest"
    },
    {
      icon: Camera,
      title: "Cinematography", 
      description: "Visual artistry in motion"
    },
    {
      icon: Video,
      title: "Production",
      description: "End-to-end film production"
    },
    {
      icon: Award,
      title: "Award Winners",
      description: "Recognition for excellence"
    }
  ];

  return (
    <section className="bg-portfolio-black text-white py-20 relative overflow-hidden">
      {/* Background Camera Lens Image - positioned subtly behind content */}
      <div 
        className="absolute inset-0 opacity-8 z-0"
        style={{
          backgroundImage: `url('/lovable-uploads/9cf1eb65-bc24-4062-9ec2-2bafdbaa9642.png')`,
          backgroundPosition: 'right center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold mb-4">Our Work</h2>
          <p className="font-open-sans text-lg text-portfolio-gold">Award Winning Films</p>
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

          {/* Right Column - Single Image */}
          <div className="relative">
            <img 
              src="/lovable-uploads/2b22540e-5ab5-40fb-bf0b-1b453ba62491.png"
              alt="Our work showcase"
              className="w-full h-auto object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsetSection;
