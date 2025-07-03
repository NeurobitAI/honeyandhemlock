
const HeroSection = () => {
  return (
    <section className="bg-portfolio-black text-white py-20 relative overflow-hidden min-h-[700px] flex items-center">
      {/* Background Camera Lens Image */}
      <div 
        className="absolute inset-0 opacity-[0.08] z-0"
        style={{
          backgroundImage: `url('/lovable-uploads/74c9a851-6d57-412e-9a5e-b83bc5a76b7c.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column - Single Image - Reduced by 25% */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-[450px] mx-12">
              {/* Main Image from uploaded content - reduced from h-[600px] to h-[450px] */}
              <div className="absolute top-0 left-0 z-30">
                <img 
                  src="/lovable-uploads/921dc20e-d8e8-4341-8aa0-c542f110c9c8.png"
                  alt="Honey & Hemlock Productions work"
                  className="w-full h-[375px] object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-5">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Hi! My name is John Doe, I'm a photographer.
            </h1>
            <p className="font-open-sans text-lg leading-relaxed text-white/80 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
