
const FoundersSection = () => {
  const founders = [
    {
      name: "Shanna Riker",
      role: "Writer/Director/Producer & Co-Founder",
      bio: "SHANNA RIKER is a Writer, Director, and Producer and Co-Founder of Honey & Hemlock Productions. Her award winning short film, SPACEMAN, was an official selection in 15+ festivals. The Austin Revolution Film Festival named her the 2023 FEMALE FILMMAKER OF THE YEAR & Spaceman received 3 Best Director Nominations. Shanna has directed and produced multiple, award-winning short films. Highlights include: SOLITARITY (Co-directed with the talented Melissa Bronski) & THE LEAP. Her screenplays BOTTOM OF THE BARREL, BLOOD SPLATTERED PEARLS, UNFINISHED WORKS, & THE LIGHT BEFORE CHRISTMAS have also created buzz in the festival circuit, claiming awards for Best Screenplay across various festivals. Shanna hopes her work with Honey & Hemlock inspires audiences and provides characters who are authentically human.",
      image: "/lovable-uploads/cd9678e7-08bf-421e-9622-835e73d01235.png",
      imdbLink: "https://www.imdb.com/name/nm3847982/"
    },
    {
      name: "Melissa Bronski",
      role: "Co-Founder & Executive Producer-Director",
      bio: "Melissa Bronski, Co-Founder, Executive Producer - Director, a California based female filmmaker dedicated to the art of storytelling. She has produced 5 short films, two seasons of 'Honey Writes Screenplay competition', Co-directed the short film Solitarity, made her solo directorial debut with 'Speechless' which is now in its festival run and has most recently won Best Short Drama and Directors Choice of Best Short at the Austin Revolution Film Festival. She is now in post production for the horror short Beholder. One of the true joys and dedications of her life is to her company Honey & Hemlock Productions, which she founded with producer/director Shanna Riker.",
      image: "/lovable-uploads/68217f91-0c5d-4f00-ac7c-9d9fe512c41f.png",
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
          {founders.map((founder, index) => (
            <div key={index} className="flip-card mx-auto">
              <div className="flip-card-inner">
                {/* Front of card */}
                <div className="flip-card-front">
                  <div className="bg-portfolio-black rounded-lg overflow-hidden shadow-2xl h-full">
                    <div className="h-4/5 overflow-hidden">
                      <img 
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-4 sm:p-6 h-1/5 flex flex-col justify-center">
                      <h3 className="font-playfair text-lg sm:text-xl font-bold text-portfolio-gold mb-1">{founder.name}</h3>
                      <p className="font-open-sans text-xs sm:text-sm text-portfolio-gold/80">{founder.role}</p>
                    </div>
                  </div>
                </div>
                
                {/* Back of card */}
                <div className="flip-card-back">
                  <div className="bg-portfolio-black rounded-lg shadow-2xl h-full p-4 sm:p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-playfair text-lg sm:text-xl font-bold text-portfolio-gold mb-2">{founder.name}</h3>
                      <p className="font-open-sans text-xs sm:text-sm text-portfolio-gold/80 mb-4">{founder.role}</p>
                      <p className="font-open-sans text-xs sm:text-sm text-white/90 leading-relaxed overflow-y-auto">{founder.bio}</p>
                    </div>
                    <a 
                      href={founder.imdbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-gold hover:text-white transition-colors text-sm font-semibold underline self-center mt-4"
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
