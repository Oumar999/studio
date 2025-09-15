// src/app/restaurants/[id]/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Star, Utensils } from 'lucide-react';
import { type Listing } from '@/types/listing';
import { getImage } from '@/lib/images';

// Mock data
const mockBusiness = {
    id: 'b1',
    name: 'The Corner Bakery',
    description: 'A cozy local bakery specializing in artisanal bread and pastries. We aim to reduce food waste by offering our delicious leftovers at the end of the day.',
    location: '123 Main St, Amsterdam',
    rating: 4.8,
    reviewCount: 256,
    imageId: 'business-bakery',
    heroImageId: 'hero-bakery',
};

const mockListings: Listing[] = [
  {
    id: '1',
    name: 'Surprise Bag - Pastries',
    price: 4.99,
    quantity: 5,
    status: 'active',
    pickupTime: '4:00 PM - 6:00 PM',
  },
  {
    id: '1a',
    name: 'Surprise Bag - Bread',
    price: 3.50,
    quantity: 8,
    status: 'active',
    pickupTime: '4:00 PM - 6:00 PM',
  },
];


export default function RestaurantPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=/restaurants/${id}`);
    }
  }, [user, router, id]);
  
  // In a real app, you would fetch business data and listings based on params.id
  const business = mockBusiness;
  const listings = mockListings.filter(l => l.status === 'active');
  const heroImage = getImage(business.heroImageId);
  const logoImage = getImage(business.imageId);


  if (!user) {
    return null; // Or a loading component
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <section className="relative h-64 md:h-80">
            <Image 
                src={heroImage?.imageUrl || `https://picsum.photos/seed/${business.heroImageId}/1200/400`}
                alt={heroImage?.description || `A view of ${business.name}`}
                fill
                className="object-cover"
                data-ai-hint={heroImage?.imageHint}
                priority
            />
             <div className="absolute inset-0 bg-black/40" />
        </section>

        <section className="container mx-auto px-4 -mt-20 z-10 relative">
            <div className='p-4 sm:p-6 bg-card rounded-xl shadow-2xl'>
                 <div className="flex flex-col sm:flex-row items-start gap-6">
                    <Image 
                        src={logoImage?.imageUrl || `https://picsum.photos/seed/${business.imageId}/128/128`}
                        alt={logoImage?.description || `Logo of ${business.name}`}
                        width={128}
                        height={128}
                        className="rounded-lg border-4 border-background object-cover w-24 h-24 sm:w-32 sm:h-32 -mt-12 sm:-mt-16 shadow-lg"
                         data-ai-hint={logoImage?.imageHint}
                    />
                    <div className='flex-grow'>
                        <CardTitle className="text-3xl font-headline">{business.name}</CardTitle>
                        <CardDescription className='mt-2'>
                           {business.description}
                        </CardDescription>
                         <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-muted-foreground">
                            <div className='flex items-center'>
                                <Star className="w-4 h-4 mr-1.5 text-yellow-500 fill-yellow-500" /> 
                                <span className='font-semibold text-foreground'>{business.rating}</span> 
                                <span className='ml-1'>({business.reviewCount} reviews)</span>
                            </div>
                            <div className='flex items-center'>
                                <MapPin className="w-4 h-4 mr-1.5" /> {business.location}
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </section>

        <section className="container mx-auto px-4 py-12">
            <h2 className='text-2xl font-bold font-headline mb-6 flex items-center gap-3'>
                <Utensils />
                Available Today
            </h2>
            {listings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map(listing => (
                        <Card key={listing.id}>
                            <CardHeader>
                                <CardTitle>{listing.name}</CardTitle>
                                <CardDescription>A surprise assortment of delicious items.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4 mr-2" /> Pickup: {listing.pickupTime}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <span className="font-bold text-2xl text-primary">€{listing.price.toFixed(2)}</span>
                                <Button size="lg" disabled={listing.quantity === 0}>
                                    {listing.quantity > 0 ? `Reserve (${listing.quantity} left)`: 'Sold Out'}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="text-center py-12">
                    <CardHeader>
                        <CardTitle>All Gone for Today!</CardTitle>
                        <CardDescription>Check back tomorrow for more delicious deals.</CardDescription>
                    </CardHeader>
                </Card>
            )}
        </section>

      </main>
      <Footer />
    </div>
  );
}
