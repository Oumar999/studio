import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ImpactTracker } from "@/components/impact-tracker";
import { placeholderImages, getImage } from "@/lib/images";
import { Clock, Euro, Leaf, Users, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";

function HeroSection() {
  const heroImage = getImage('hero-background');
  return (
    <section id="hero" className="relative h-[80vh] min-h-[600px] text-white flex items-center">
      <div className="absolute inset-0">
        <Image
          src={heroImage?.imageUrl || "https://picsum.photos/seed/1/1920/1080"}
          alt={heroImage?.description || "A vibrant spread of fresh food"}
          fill
          className="object-cover"
          priority
          data-ai-hint="food variety"
        />
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>
      <div className="relative container mx-auto px-4 z-10 text-center">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-shadow-lg">
          Save up to 70% on Food.
        </h1>
        <p className="font-accent text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8">
          While Saving the Planet.
        </p>
        <div className="max-w-3xl mx-auto mb-10 text-lg md:text-xl">
          <p>Join thousands of food heroes in the Netherlands rescuing delicious, unsold food from local bakeries, cafes, and restaurants from going to waste.</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/signup" passHref>
            <Button size="lg" className="font-headline bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              Join 12,000+ Food Heroes
            </Button>
          </Link>
          <Link href="/business-signup" passHref>
            <Button size="lg" variant="outline" className="font-headline bg-transparent border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              Partner with Us
            </Button>
          </Link>
        </div>
        <div className="mt-12 text-center">
          <p className="font-semibold text-lg">
            <AnimatedCounter target={2847} /> meals saved in The Hague today
          </p>
        </div>
      </div>
    </section>
  );
}

function ValueProposition() {
  const features = [
    {
      icon: <Clock className="w-10 h-10 text-primary" />,
      title: "Reserve in 30 seconds",
      description: "Browse, tap, and rescue. It's that simple to save food and money.",
    },
    {
      icon: <Euro className="w-10 h-10 text-primary" />,
      title: "Save up to 70%",
      description: "Enjoy high-quality meals, groceries, and treats for a fraction of the price.",
    },
    {
      icon: <Leaf className="w-10 h-10 text-primary" />,
      title: "Track Your Impact",
      description: "See your environmental contribution grow with every meal you save.",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-headline text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground max-w-xs">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Browse & Discover",
      description: "Find delicious surprise bags from stores near you.",
    },
    {
      title: "Reserve & Pay",
      description: "Secure your food directly in the app.",
    },
    {
      title: "Pick Up & Enjoy",
      description: "Collect your food during the specified time window.",
    },
    {
      title: "Share Your Impact",
      description: "See how much you've saved and inspire others.",
    },
  ];
  return (
    <section id="about" className="py-20 sm:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">How ResQ Works</h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">Start rescuing food in four simple steps.</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-xl mb-4">
                  {index + 1}
                </div>
                <h3 className="font-headline text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactDemo() {
  return (
    <section id="impact" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Calculate Your Potential Impact</h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Use our interactive tool to see how saving food translates to real environmental benefits.
          </p>
        </div>
        <ImpactTracker />
      </div>
    </section>
  );
}

function SocialProof() {
  const testimonials = [
    {
      id: 'testimonial-1',
      name: "Maria V.",
      role: "Utrecht",
      quote: "ResQ is a game-changer! I get amazing pastries from my favorite bakery for so cheap, and I feel great about reducing waste.",
      savings: "€45 this month"
    },
    {
      id: 'testimonial-2',
      name: "Ahmed K.",
      role: "Amsterdam",
      quote: "As a student, ResQ helps me eat well on a budget. The variety is fantastic, and it's so easy to use.",
      savings: "€60 this month"
    },
    {
      id: 'testimonial-3',
      name: "Sophie L.",
      role: "Rotterdam",
      quote: "I love the surprise element! It's introduced me to so many local gems I wouldn't have tried otherwise. A brilliant concept.",
      savings: "€30 this month"
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Loved by Food Heroes</h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community is saying.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => {
            const image = getImage(testimonial.id);
            return (
              <Card key={testimonial.id} className="transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                <CardContent className="pt-6">
                  <p className="italic text-foreground/90 mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage src={image?.imageUrl} alt={image?.description} data-ai-hint="person portrait" />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role} &bull; <span className="font-semibold text-accent">{testimonial.savings}</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BusinessProposition() {
  const mapImage = getImage('map-amsterdam');
  return (
    <section id="business" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Turn Waste Into Revenue</h2>
            <p className="text-lg text-muted-foreground mb-8">Join hundreds of local businesses transforming surplus food into new customers and income. With ResQ, there are no upfront costs, just a simple success fee.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0"/>
                <span><strong>New Revenue Stream:</strong> Sell what would have been thrown away.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0"/>
                <span><strong>Attract New Customers:</strong> 70% of ResQ users return as full-paying customers.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0"/>
                <span><strong>Boost Your Brand:</strong> Showcase your commitment to sustainability.</span>
              </li>
            </ul>
            <Link href="/business-signup" passHref>
                <Button size="lg" className="font-headline bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                Start in 5 Minutes <ArrowRight className="ml-2 w-5 h-5"/>
                </Button>
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <Image 
              src={mapImage?.imageUrl || "https://picsum.photos/seed/4/600/500"}
              alt={mapImage?.description || "Map of Amsterdam showing local businesses"}
              width={600}
              height={500}
              className="w-full h-full object-cover"
              data-ai-hint="city map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function DownloadApp() {
  const qrImage = getImage('qr-code');
  const appStoreImage = getImage('app-store');
  const googlePlayImage = getImage('google-play');
  
  return (
    <section id="download" className="py-20 sm:py-32 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Your Next Great Meal Awaits</h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto">Download the app and start rescuing food today. Good for your wallet, great for the planet.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12">
            <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                   <Image 
                    src={qrImage?.imageUrl || "https://picsum.photos/seed/5/150/150"}
                    alt={qrImage?.description || "QR code to download the ResQ app"}
                    width={150}
                    height={150}
                    data-ai-hint="QR code"
                  />
                </div>
                <p className="font-semibold">Scan to Download</p>
            </div>
            <div className="flex flex-col gap-4">
               <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                <Image 
                  src={appStoreImage?.imageUrl || "https://picsum.photos/seed/6/180/60"}
                  alt={appStoreImage?.description || "Download on the App Store"}
                  width={180}
                  height={60}
                  data-ai-hint="App Store badge"
                />
              </a>
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                <Image 
                  src={googlePlayImage?.imageUrl || "https://picsum.photos/seed/7/180/60"}
                  alt={googlePlayImage?.description || "Get it on Google Play"}
                  width={180}
                  height={60}
                  data-ai-hint="Google Play badge"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <ValueProposition />
        <HowItWorks />
        <ImpactDemo />
        <SocialProof />
        <BusinessProposition />
        <DownloadApp />
      </main>
      <Footer />
    </div>
  );
}

    