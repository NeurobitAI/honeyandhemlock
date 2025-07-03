
const HeroSection = () => {
  return (
    <section className="bg-portfolio-black text-white py-20 relative overflow-hidden min-h-[700px] flex items-center">
      {/* Background Camera Lens Image */}
      <div 
        className="absolute inset-0 opacity-[0.05] z-0"
        style={{
          backgroundImage: `url('/lovable-uploads/5270dfd1-9e29-4b9f-8a04-fc84ed90afa8.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column - Image Collage */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-[600px] mx-12">
              {/* Main Portrait - Your uploaded image */}
              <div className="absolute top-0 left-0 z-30">
                <img 
                  src="/lovable-uploads/06a85397-ee24-4888-91a0-8b608e65a420.png"
                  alt="Professional photographer portrait"
                  className="w-[300px] h-[400px] object-cover rounded-lg shadow-2xl"
                />
              </div>
              
              {/* Secondary Shot */}
              <div 
                className="absolute z-20 transform -rotate-[5deg]"
                style={{ left: '65%', top: '10%' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop"
                  alt="Photography equipment setup"
                  className="w-[200px] h-[300px] object-cover rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Tertiary Detail */}
              <div 
                className="absolute z-10 transform rotate-[8deg] border-[3px] border-portfolio-gold rounded-lg"
                style={{ left: '10%', top: '65%' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=350&h=350&fit=crop"
                  alt="Camera detail shot"
                  className="w-[175px] h-[175px] object-cover rounded-md"
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
