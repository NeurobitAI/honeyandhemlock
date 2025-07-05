
const FoundersSection = () => {
  const founders = [
    {
      name: "Shanna Riker",
      role: "Director/Writer/Producer",
      bio: "Shanna Riker is a filmmaker whose work focuses on complex female characters navigating extraordinary circumstances. Her short film \"The Date\" premiered at the Cleveland International Film Festival and has screened at festivals across the country.",
      image: "/lovable-uploads/23281ae9-1a58-4a14-b30f-73803cecb1e9.png",
      imdbLink: "https://www.imdb.com/name/nm3847982/"
    },
    {
      name: "Melissa Bronski",
      role: "Producer/Writer",
      bio: "Melissa Bronski is a producer and writer known for developing character-driven narratives. She brings extensive experience in project development and has a keen eye for compelling storytelling.",
      image: "/lovable-uploads/325d73e2-d687-4668-aa2f-5127ad2bbfbb.png",
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
            <div key={index} className="group">
              <div className="bg-portfolio-black rounded-lg overflow-hidden shadow-2xl hover:shadow-portfolio-gold/20 transition-all duration-300 hover:scale-105">
                <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                  <img 
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-portfolio-gold mb-1 sm:mb-0">{founder.name}</h3>
                    <a 
                      href={founder.imdbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-gold hover:text-white transition-colors text-sm font-semibold underline"
                    >
                      View IMDB
                    </a>
                  </div>
                  <p className="font-open-sans text-sm sm:text-base text-portfolio-gold/80 mb-3 sm:mb-4">{founder.role}</p>
                  <p className="font-open-sans text-sm sm:text-base text-white/90 leading-relaxed">{founder.bio}</p>
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
