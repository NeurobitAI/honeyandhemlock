
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

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div key={index} className="text-center p-8 group hover:bg-white/5 transition-all duration-300 rounded-lg">
              <skill.icon className="w-12 h-12 text-portfolio-gold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-playfair text-xl font-bold mb-2">{skill.title}</h3>
              <p className="font-open-sans text-sm text-white/80">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsetSection;
