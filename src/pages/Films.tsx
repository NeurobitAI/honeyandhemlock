
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Films = () => {
  const films = [
    {
      id: 1,
      image: "/lovable-uploads/55b25aea-6a37-4ad7-92fb-78df6ded0d21.png",
      title: "SPACEMAN",
      description: "A Honey & Hemlock Production\nProduced by Shanna Riker and Melissa Bronski, Directed by Shanna Riker,\nCinematography by Andrew Keefe, Written by Tommy DeRoberto\nStarring Marcus Jahn and Kitty Ostapowicz"
    },
    {
      id: 2,
      image: "/lovable-uploads/7a1ff599-69f2-4905-a0ce-0bb4fc99215c.png",
      title: "SPEECHLESS",
      description: "A Honey & Hemlock Production\nExecutive Producer Iain Maguire\nProduced by Shanna Riker & Melissa Bronski,\nDirected by Melissa Bronski, Cinematography by Jordan Skutar,\nWritten by Chris Sage & Stephen Schroeder,\nStarring Garrett Sweere & Em Rose Miller"
    },
    {
      id: 3,
      image: "/lovable-uploads/325d73e2-d687-4668-aa2f-5127ad2bbfbb.png",
      title: "SOLITARITY",
      description: "A Honey & Hemlock Production\nDirected by Melissa Bronski and Shanna Riker Cinematography by Jodi Savitz\nWritten by Josh Bartosch Costume Design by Alexandra Engelson\nStarring Dillon Sibilla, Josh Bartosch , Vernon (VJ) McGhee"
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
                <div className="relative h-96">
                  <img 
                    src={film.image}
                    alt={film.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold mb-3 text-portfolio-gold">{film.title}</h3>
                  <p className="font-open-sans text-sm text-white/80 whitespace-pre-line leading-relaxed">
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
