
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Sponsorship = () => {
  const stats = [
    "Only 8 Women have been nominated for the Best Director Oscar",
    "Only 3 women have won the Oscar for Best Director", 
    "Women comprise only 12% of directors of the top 100 most popular movies of 2021",
    "Women only filled 25% of key positions in the top 250 grossing films of 2021",
    "Women make up 50.5% of the population"
  ];

  return (
    <div className="min-h-screen bg-portfolio-black">
      <Header />
      
      <section className="bg-portfolio-black text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl font-bold mb-4 text-portfolio-gold">
              Support Our Vision
            </h1>
            <p className="font-open-sans text-lg text-white/80 max-w-3xl mx-auto">
              Honey & Hemlock Productions is proud to be associated with The Field, a non profit organization dedicated to helping artists thrive.
            </p>
          </div>

          {/* The Field Logo Section */}
          <div className="text-center mb-12">
            <img 
              src="/lovable-uploads/942653bf-d1b9-4433-ae2e-76e1c51bdc0c.png" 
              alt="The Field Logo"
              className="mx-auto h-32 w-auto mb-6"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* What this offers */}
            <Card className="bg-portfolio-dark border-portfolio-gold/20">
              <CardHeader>
                <CardTitle className="text-portfolio-gold text-2xl">What this offers?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed">
                  By sponsoring Honey & Hemlock through The Field you are supporting through a non profit organization. 
                  This offers our sponsors the opportunity to make a tax deductible donation while supporting a female 
                  driven film production company.
                </p>
              </CardContent>
            </Card>

            {/* Why Support us */}
            <Card className="bg-portfolio-dark border-portfolio-gold/20">
              <CardHeader>
                <CardTitle className="text-portfolio-gold text-2xl">Why Support us?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-portfolio-gold font-semibold">
                    Honey & Hemlock is a female run production company
                  </p>
                  {stats.map((stat, index) => (
                    <p key={index} className="text-white/80 text-sm leading-relaxed">
                      • {stat}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-portfolio-dark border-portfolio-gold/20 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-portfolio-gold">Ready to Support?</CardTitle>
                <CardDescription className="text-white/70">
                  Contact us to learn more about sponsorship opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Help us continue creating meaningful content that inspires and entertains while supporting female voices in filmmaking.
                </p>
                <a 
                  href="mailto:contact@honeyandhemlock.productions" 
                  className="inline-block bg-portfolio-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-portfolio-gold/90 transition-colors"
                >
                  Get in Touch
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sponsorship;
