
import { Award, Trophy, Star, Crown } from "lucide-react";

const PartnersSection = () => {
  const recognitions = [
    {
      icon: Award,
      title: "Film Festival Winners",
      description: "Multiple awards at prestigious festivals"
    },
    {
      icon: Trophy,
      title: "Industry Recognition", 
      description: "Acknowledged by peers and critics"
    },
    {
      icon: Star,
      title: "Critical Acclaim",
      description: "Outstanding reviews and ratings"
    },
    {
      icon: Crown,
      title: "Excellence in Craft",
      description: "Setting new standards in filmmaking"
    }
  ];

  return (
    <section className="bg-portfolio-dark text-white py-12 sm:py-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: `url('/lovable-uploads/e8503f85-c9a3-4121-9343-fe3fcb38dbe5.png')`,
          backgroundPosition: 'left center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">Recognitions</h2>
          <p className="font-open-sans text-base sm:text-lg text-portfolio-gold">Celebrating Our Achievements</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {recognitions.map((recognition, index) => (
            <div key={index} className="text-center p-6 sm:p-8 group hover:bg-white/5 transition-all duration-300 rounded-lg">
              <recognition.icon className="w-10 h-10 sm:w-12 sm:h-12 text-portfolio-gold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-playfair text-lg sm:text-xl font-bold mb-2">{recognition.title}</h3>
              <p className="font-open-sans text-sm text-white/80">{recognition.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
