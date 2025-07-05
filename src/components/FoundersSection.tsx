
import { Linkedin, ExternalLink } from "lucide-react";

const FoundersSection = () => {
  const founders = [
    {
      name: "Shanna Riker",
      title: "Co-Founder & Director",
      image: "/lovable-uploads/b57fa408-4c81-4a6c-ba5f-64d2cf7d0dc4.png",
      description: "Award-winning director with a passion for storytelling that challenges conventional narratives.",
      linkedin: "https://www.linkedin.com/in/shanna-riker/",
      imdb: "https://www.imdb.me/shannariker"
    },
    {
      name: "Melissa Bronski",
      title: "Co-Founder & Producer", 
      image: "/lovable-uploads/b4b37d22-6783-4ebd-8088-867677f279f5.png",
      description: "Visionary producer dedicated to amplifying diverse voices in cinema.",
      linkedin: "https://www.linkedin.com/in/melissa-bronski/",
      imdb: "https://www.imdb.com/name/nm10558693/?ref_=nv_sr_srsg_0_tt_0_nm_4_in_0_q_Melissa%2520Bronski"
    }
  ];

  return (
    <section id="founders" className="bg-portfolio-dark text-white py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">Meet Our Founders</h2>
          <p className="font-open-sans text-base sm:text-lg text-portfolio-gold max-w-2xl mx-auto">
            The visionary women behind Honey & Hemlock Productions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img 
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-80 sm:h-96 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              
              <h3 className="font-playfair text-xl sm:text-2xl font-bold mb-2">{founder.name}</h3>
              <p className="font-open-sans text-portfolio-gold text-sm sm:text-base mb-3">{founder.title}</p>
              <p className="font-open-sans text-white/80 text-sm sm:text-base mb-4 leading-relaxed">
                {founder.description}
              </p>
              
              <div className="flex justify-center space-x-4">
                <a 
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-portfolio-gold transition-colors p-2"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href={founder.imdb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-portfolio-gold transition-colors p-2"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
