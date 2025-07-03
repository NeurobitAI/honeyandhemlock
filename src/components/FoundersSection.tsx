
const FoundersSection = () => {
  return (
    <section className="bg-portfolio-black text-white py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold mb-4">Meet Our Founders</h2>
          <p className="font-open-sans text-lg text-portfolio-gold">The creative minds behind Honey & Hemlock Productions</p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Shanna */}
          <div className="text-center">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/94dcbd50-94f9-49c9-a62e-e8f4082790d0.png"
                alt="Shanna Riker"
                className="w-[300px] h-[400px] object-cover rounded-lg mx-auto shadow-2xl"
              />
            </div>
            <h3 className="font-playfair text-2xl font-bold mb-2">Shanna Riker</h3>
            <h4 className="font-open-sans text-lg text-portfolio-gold mb-4">Co-Founder, Writer, Director & Producer</h4>
            <p className="font-open-sans text-sm leading-relaxed text-white/80 max-w-md mx-auto">
              Shanna Riker is a Writer, Director, and Producer and Co-Founder of Honey & Hemlock Productions. Her award winning short film, SPACEMAN, was an official selection in 15+ festivals. The Austin Revolution Film Festival named her the 2023 FEMALE FILMMAKER OF THE YEAR & Spaceman received 3 Best Director Nominations. Shanna has directed and produced multiple, award-winning short films. Highlights include: SOLITARITY (Co-directed with the talented Melissa Bronski) & THE LEAP. Shanna's most recent film, DUELING WATCHERS is currently in post production. Her screenplays BOTTOM OF THE BARREL, BLOOD SPLATTERED PEARLS, UNFINISHED WORKS, & THE LIGHT BEFORE CHRISTMAS have also created buzz in the festival circuit, claiming awards for Best Screenplay across various festivals. Shanna has produced 100+ national and award-winning commercials and client testimonials for SPECTRUM REACH. She also produces live events for clients such as DISNEY, NISSAN, BLIZZARD, and SPOTIFY. Shanna hopes her work with Honey & Hemlock inspires audiences and provides characters who are authentically human.
            </p>
          </div>

          {/* Melissa */}
          <div className="text-center">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/53eb1d38-cf71-455a-be1e-9a7383960f98.png"
                alt="Melissa Bronski"
                className="w-[300px] h-[400px] object-cover rounded-lg mx-auto shadow-2xl"
              />
            </div>
            <h3 className="font-playfair text-2xl font-bold mb-2">Melissa Bronski</h3>
            <h4 className="font-open-sans text-lg text-portfolio-gold mb-4">Co-Founder, Executive Producer & Director</h4>
            <p className="font-open-sans text-sm leading-relaxed text-white/80 max-w-md mx-auto">
              Melissa Bronski, Co-Founder, Executive Producer - Director, a California based female filmmaker dedicated to the art of storytelling. She has produced 5 short films, two seasons of 'Honey Writes Screenplay competition', Co-directed the short film Solitarity, made her solo directorial debut with 'Speechless' which is now in its festival run and has most recently won Best Short Drama and Directors Choice of Best Short at the Austin Revolution Film Festival. She is now in post production for the horror short Beholder. One of the true joys and dedications of her life is to her company Honey & Hemlock Productions, which she founded with producer/director Shanna Riker. Along with her work at Honey & Hemlock Melissa works at NBCUniversal in Lot operations and Corporate Services. She has a deep passion for the work that she does and hopes that her work inspires others to do and be more than they were before seeing it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
