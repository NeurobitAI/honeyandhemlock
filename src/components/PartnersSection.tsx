
const PartnersSection = () => {
  const partners = [
    "Avant Garde",
    "Fastlane Cinema", 
    "Lily's Flowers",
    "Golden Studio",
    "Designlovers Geekheaven"
  ];

  return (
    <section className="bg-portfolio-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-2xl font-bold mb-2">I Was Working With</h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <div className="font-open-sans text-lg font-semibold tracking-wide">
                {partner}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
