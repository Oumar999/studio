// src/app/food/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Star } from 'lucide-react';
import { type Listing } from '@/types/listing';
import { getImage } from '@/lib/images';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

type FullListing = Listing & { business: { id: string, name: string, location: string, rating: number, imageId: string } };

// Mock data - in a real app, this would come from an API
const allListings: FullListing[] = [
  {
    id: '1',
    name: 'Surprise Bag - Pastries',
    price: 4.99,
    quantity: 5,
    status: 'active',
    pickupTime: '4:00 PM - 6:00 PM',
    business: { id: 'b1', name: 'The Corner Bakery', location: 'Amsterdam', rating: 4.8, imageId: 'business-bakery' },
  },
  {
    id: '2',
    name: 'Surprise Bag - Groceries',
    price: 7.5,
    quantity: 2,
    status: 'active',
    pickupTime: '5:00 PM - 7:00 PM',
    business: { id: 'b2', name: 'Organic Oasis', location: 'Utrecht', rating: 4.9, imageId: 'business-grocer' },
  },
  {
    id: '3',
    name: 'Surprise Bag - Meal',
    price: 9.0,
    quantity: 0,
    status: 'sold-out',
    pickupTime: '6:00 PM - 8:00 PM',
    business: { id: 'b3', name: 'Mama\'s Kitchen', location: 'Rotterdam', rating: 4.7, imageId: 'business-restaurant' },
  },
  {
    id: '5',
    name: 'Fruit & Veggie Box',
    price: 6.0,
    quantity: 1,
    status: 'active',
    pickupTime: '3:00 PM - 5:00 PM',
    business: { id: 'b2', name: 'Organic Oasis', location: 'Utrecht', rating: 4.9, imageId: 'business-grocer' },
  },
  {
    id: '6',
    name: 'Dinner for Two',
    price: 12.50,
    quantity: 3,
    status: 'active',
    pickupTime: '7:00 PM - 8:00 PM',
    business: { id: 'b3', name: 'Mama\'s Kitchen', location: 'Rotterdam', rating: 4.7, imageId: 'business-restaurant' },
  },
];

export default function FoodPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState(allListings);
  const [listingToReserve, setListingToReserve] = useState<FullListing | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.type !== 'customer') {
      // Redirect businesses away from the customer food page
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleReserveClick = (e: React.MouseEvent, listing: FullListing) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    setListingToReserve(listing);
  };

  const handleConfirmReservation = () => {
    if (!listingToReserve) return;

    setListings(prevListings =>
      prevListings.map(l => {
        if (l.id === listingToReserve.id) {
          const newQuantity = l.quantity - 1;
          return {
            ...l,
            quantity: newQuantity,
            status: newQuantity > 0 ? 'active' : 'sold-out',
          };
        }
        return l;
      })
    );

    toast({
      title: 'Reservation Confirmed!',
      description: `You've reserved "${listingToReserve.name}". Pick it up from ${listingToReserve.business.name} between ${listingToReserve.pickupTime}.`,
    });
    setListingToReserve(null);
  };

  const activeListings = listings.filter(l => l.status === 'active');

  if (!user || user.type !== 'customer') {
    // Render nothing or a loading spinner while redirecting
    return null;
  }

  return (
    <>
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold font-headline mb-2">Find Your Next Meal</h1>
          <p className="text-muted-foreground mb-8">Browse Surprise Bags available near you.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeListings.map(listing => {
               const image = getImage(listing.business.imageId);
               return (
                <Card key={listing.id} className="overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 shadow-md hover:shadow-xl">
                 <Link href={`/restaurants/${listing.business.id}`} passHref>
                    <div className="relative">
                        <Image
                            src={image?.imageUrl || `https://picsum.photos/seed/${listing.id}/400/250`}
                            alt={image?.description || `Image of ${listing.business.name}`}
                            width={400}
                            height={250}
                            className="object-cover w-full h-48"
                            data-ai-hint={image?.imageHint}
                        />
                         {listing.quantity > 0 && 
                            <Badge className="absolute top-2 right-2">
                                {listing.quantity} left
                            </Badge>
                         }
                    </div>
                    <CardHeader>
                        <CardTitle className="text-lg">{listing.name}</CardTitle>
                         <div className="flex items-center text-sm text-muted-foreground pt-1">
                            <p>{listing.business.name}</p>
                            <span className="mx-2">&bull;</span>
                            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                            {listing.business.rating}
                        </div>
                    </CardHeader>
                    <CardContent>
                       <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-2" /> {listing.business.location}
                       </div>
                       <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Clock className="w-4 h-4 mr-2" /> Pickup: {listing.pickupTime}
                       </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <span className="font-bold text-xl text-primary">€{listing.price.toFixed(2)}</span>
                        <Button onClick={(e) => handleReserveClick(e, listing)}>Reserve</Button>
                    </CardFooter>
                  </Link>
                </Card>
            )})}
          </div>
        </div>
      </main>
      <Footer />
    </div>

    <AlertDialog open={!!listingToReserve} onOpenChange={(open) => !open && setListingToReserve(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Reservation</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to reserve "{listingToReserve?.name}" for €{listingToReserve?.price.toFixed(2)}. Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setListingToReserve(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmReservation}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}