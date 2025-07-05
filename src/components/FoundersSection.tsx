
const FoundersSection = () => {
  const founders = [
    {
      name: "Shanna Riker",
      role: "Director/Writer/Producer",
      bio: "Shanna Riker is a filmmaker whose work focuses on complex female characters navigating extraordinary circumstances. Her short film \"The Date\" premiered at the Cleveland International Film Festival and has screened at festivals across the country.",
      image: "/lovable-uploads/eca3ac1a-d2e0-4854-a1cc-5cb2d4f38cdf.png",
      imdbLink: "https://www.imdb.com/name/nm3847982/"
    },
    {
      name: "Melissa Bronski",
      role: "Producer/Writer",
      bio: "Melissa Bronski is a producer and writer known for developing character-driven narratives. She brings extensive experience in project development and has a keen eye for compelling storytelling.",
      image: "/lovable-uploads/985588a5-ba45-423f-84bc-583819590955.png",
      imdbLink: "https://www.imdb.com/name/nm4981054/"
    }
  ];

  return (
    <section id="founders" className="bg-portfolio-dark text-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Meet the Founders</h2>
          <p className="font-open-sans text-base sm:text-lg text-portfolio-gold">The creative minds behind Honey & Hemlock Productions</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {founders.map((founder, index) => (
            <div key={index} className="flip-card">
              <div className="flip-card-inner">
                {/* Front of card */}
                <div className="flip-card-front">
                  <div className="bg-portfolio-black rounded-lg overflow-hidden shadow-2xl h-full">
                    <div className="h-3/4 overflow-hidden">
                      <img 
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-4 sm:p-6 h-1/4 flex flex-col justify-center">
                      <h3 className="font-playfair text-xl sm:text-2xl font-bold text-portfolio-gold mb-1">{founder.name}</h3>
                      <p className="font-open-sans text-sm sm:text-base text-portfolio-gold/80">{founder.role}</p>
                    </div>
                  </div>
                </div>
                
                {/* Back of card */}
                <div className="flip-card-back">
                  <div className="bg-portfolio-black rounded-lg shadow-2xl h-full p-4 sm:p-6 flex flex-col justify-center">
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-portfolio-gold mb-3">{founder.name}</h3>
                    <p className="font-open-sans text-sm sm:text-base text-portfolio-gold/80 mb-4">{founder.role}</p>
                    <p className="font-open-sans text-sm sm:text-base text-white/90 leading-relaxed mb-6">{founder.bio}</p>
                    <a 
                      href={founder.imdbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-gold hover:text-white transition-colors text-sm font-semibold underline self-center"
                    >
                      View IMDB Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
