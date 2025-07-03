
const PartnersSection = () => {
  const recognitions = [
    "/lovable-uploads/e2050bdd-3ebf-4ba7-966d-ce1890f2b0ac.png",
    "/lovable-uploads/006f06b8-073e-4954-91fd-26243a35ac99.png",
    "/lovable-uploads/8503da56-823a-4c60-8deb-327a17127135.png",
    "/lovable-uploads/dd4ddeb5-96e2-4c76-8bbe-ac90b5c33755.png",
    "/lovable-uploads/b4b37d22-6783-4ebd-8088-867677f279f5.png",
    "/lovable-uploads/65f0aa8c-5593-4fad-9aba-e7eea97f2988.png",
    "/lovable-uploads/30432083-8e56-4a80-bb26-974c357354f7.png",
    "/lovable-uploads/08354c69-e36b-4dc6-8756-1bdc0e435087.png",
    "/lovable-uploads/b57fa408-4c81-4a6c-ba5f-64d2cf7d0dc4.png"
  ];

  return (
    <section className="bg-portfolio-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-2xl font-bold mb-2">Recognitions</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-center justify-items-center">
          {recognitions.map((recognition, index) => (
            <div 
              key={index}
              className="hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img 
                src={recognition}
                alt={`Recognition ${index + 1}`}
                className="w-32 h-auto object-contain filter brightness-90 hover:brightness-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
