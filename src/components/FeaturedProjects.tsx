
const FeaturedProjects = () => {
  const projects = [
    {
      image: "/lovable-uploads/55b25aea-6a37-4ad7-92fb-78df6ded0d21.png",
      title: "SPACEMAN"
    },
    {
      image: "/lovable-uploads/7a1ff599-69f2-4905-a0ce-0bb4fc99215c.png",
      title: "SPEECHLESS"
    },
    {
      image: "/lovable-uploads/325d73e2-d687-4668-aa2f-5127ad2bbfbb.png",
      title: "SOLITARITY"
    },
    {
      image: "/lovable-uploads/921dc20e-d8e8-4341-8aa0-c542f110c9c8.png",
      title: "BEHIND THE SCENES"
    }
  ];

  return (
    <section className="bg-portfolio-black text-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold">Featured Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                <div className="p-4">
                  <span className="text-white font-playfair text-lg font-bold">{project.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
