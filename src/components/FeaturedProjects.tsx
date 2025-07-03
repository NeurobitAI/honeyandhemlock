
const FeaturedProjects = () => {
  const projects = [
    {
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop",
      alt: "Family portrait in mountain field"
    },
    {
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop", 
      alt: "Red canyon landscape"
    },
    {
      image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=400&h=300&fit=crop",
      alt: "Aerial view of river bend"
    },
    {
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop",
      alt: "Wooden pier over water"
    }
  ];

  return (
    <section className="bg-portfolio-black text-white py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold">Featured Projects</h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group cursor-pointer overflow-hidden rounded-lg"
            >
              <img 
                src={project.image}
                alt={project.alt}
                className="w-full h-64 object-cover transition-all duration-300 group-hover:scale-105 group-hover:border-2 group-hover:border-portfolio-gold"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
