
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Films = () => {
  const films = [
    {
      id: 1,
      image: "/lovable-uploads/55b25aea-6a37-4ad7-92fb-78df6ded0d21.png",
      title: "SPACEMAN",
      description: "Spaceman is an exploration of human emotion that broaches subject matter that is unfortunately too often still considered taboo. It follows Bobby on his first jaunt back into the dating world after escaping an abusive marriage in which he fell victim to domestic violence. This story is powerful and provides a sliver of hope that one can, in fact, put themselves out there again."
    },
    {
      id: 2,
      image: "/lovable-uploads/7a1ff599-69f2-4905-a0ce-0bb4fc99215c.png",
      title: "SPEECHLESS",
      description: "Speechless - Coming soon.."
    },
    {
      id: 3,
      image: "/lovable-uploads/325d73e2-d687-4668-aa2f-5127ad2bbfbb.png",
      title: "SOLITARITY",
      description: "'Solitarity' is the surrealist exploration of depression through the experience of Jeremy, a man at the end of his rope. Succumbing to his numbness, Jeremey is ready to throw in the towel when depression manifests itself into a human like entity and forces Jeremy to look his issues in the eye and realize he cannot continue alone."
    }
  ];

  return (
    <div className="min-h-screen bg-portfolio-black">
      <Header />
      
      <section className="bg-portfolio-black text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-playfair text-4xl font-bold mb-4">Our Films</h1>
            <p className="font-open-sans text-lg text-portfolio-gold">Showcasing our cinematic productions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {films.map((film) => (
              <div key={film.id} className="bg-portfolio-dark rounded-lg overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-[4/3]">
                  <img 
                    src={film.image}
                    alt={film.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold mb-3 text-portfolio-gold">{film.title}</h3>
                  <p className="font-open-sans text-sm text-white/80 leading-relaxed">
                    {film.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Films;
