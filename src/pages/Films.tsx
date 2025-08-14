
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Films = () => {
  const films = [
    {
      id: 1,
      image: "/lovable-uploads/c3efdeb0-642b-46d9-ac6b-7d1d5641a0b5.png",
      title: "SPACEMAN",
      description: "Spaceman is an exploration of human emotion that broaches subject matter that is unfortunately too often still considered taboo. It follows Bobby on his first jaunt back into the dating world after escaping an abusive marriage in which he fell victim to domestic violence. This story is powerful and provides a sliver of hope that one can, in fact, put themselves out there again.",
      imdbLink: "https://www.imdb.com/title/tt21265664/?ref_=nm_knf_t_3"
    },
    {
      id: 2,
      image: "/lovable-uploads/26af3cda-d0cf-411b-8f0b-ac411f441ed3.png",
      title: "SPEECHLESS",
      description: "Speechless - When faced with the unimaginable of losing his first love in a tragic accident, Jake struggles to find the words in the pivotal moment of giving her eulogy. When literal letters start to pour from Jake, lifelong friend Allison dives deep to help her friend navigate this shared grief and find the words in a sea of letters.",
      imdbLink: "https://www.imdb.com/title/tt28655918/?ref_=fn_all_ttl_27"
    },
    {
      id: 3,
      image: "/lovable-uploads/107207e5-b126-4464-b5ad-4576c7b7c1ae.png",
      title: "SOLITARITY",
      description: "Solitarity is the surrealist exploration of depression through the expereince of Jeremy, a man at the end of his rope. Succumbing to his numbness, Jeremy is ready to throw in the towel when depression manifests itself into a human like entity and forces Jeremy to look his issues in the eye and realize that he cannot continue alone.",
      imdbLink: "https://www.imdb.com/title/tt18573788/?ref_=nv_sr_srsg_0_tt_8_nm_0_in_0_q_Solitarity"
    }
  ];

  return (
    <div className="min-h-screen bg-portfolio-black">
      <Header />
      
      <section className="bg-portfolio-black text-portfolio-white py-20 relative overflow-hidden">
        {/* Background Lens Images */}
        <div 
          className="absolute top-1/4 left-0 w-1/3 h-1/2 opacity-15 z-0 pointer-events-none"
          style={{
            backgroundImage: `url('/lovable-uploads/74c9a851-6d57-412e-9a5e-b83bc5a76b7c.png')`,
            backgroundPosition: 'center left',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-1/4 h-1/3 opacity-18 z-0 pointer-events-none"
          style={{
            backgroundImage: `url('/lovable-uploads/9cf1eb65-bc24-4062-9ec2-2bafdbaa9642.png')`,
            backgroundPosition: 'center right',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-special-elite text-4xl font-semibold mb-4">Our Films</h1>
            <p className="font-special-elite text-lg text-portfolio-gold">Showcasing our cinematic productions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {films.map((film) => (
              <a
                key={film.id}
                href={film.imdbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-portfolio-dark rounded-lg overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={film.image}
                    alt={film.title}
                    className="w-full h-full object-contain bg-black"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-special-elite text-xl font-semibold mb-3 text-portfolio-gold">{film.title}</h3>
                  <p className="font-special-elite text-base text-portfolio-white/80 leading-relaxed">
                    {film.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Films;
