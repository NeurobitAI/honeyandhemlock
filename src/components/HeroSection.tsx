
const HeroSection = () => {
  return (
    <section className="bg-portfolio-black text-white py-20 relative overflow-hidden min-h-[700px] flex items-center">
      {/* Background Camera Lens Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-96 h-96 rounded-full border-4 border-white/20 flex items-center justify-center">
          <div className="w-80 h-80 rounded-full border-2 border-white/15 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border-2 border-white/10 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-white/5"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column - Images */}
          <div className="lg:col-span-7 relative">
            <div className="relative">
              {/* Main Portrait */}
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=600&fit=crop"
                  alt="Professional photographer with DSLR camera"
                  className="w-full max-w-md mx-auto rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-8 -left-8 z-0 transform -rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=240&fit=crop"
                  alt="Photography equipment"
                  className="w-40 h-48 object-cover rounded-lg shadow-xl opacity-80"
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
