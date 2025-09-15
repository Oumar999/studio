// src/app/dashboard/listings/page.tsx
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreHorizontal, PlusCircle, Play, Pause } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AddListingDialog } from '@/components/add-listing-dialog';
import { type Listing } from '@/types/listing';
import { useToast } from '@/hooks/use-toast';


const initialListings: Listing[] = [
    {
      id: '1',
      name: 'Surprise Bag - Pastries',
      price: 4.99,
      quantity: 5,
      status: 'active',
      pickupTime: '4:00 PM - 6:00 PM',
    },
    {
      id: '2',
      name: 'Surprise Bag - Groceries',
      price: 7.5,
      quantity: 2,
      status: 'active',
      pickupTime: '5:00 PM - 7:00 PM',
    },
    {
      id: '3',
      name: 'Surprise Bag - Meal',
      price: 9.0,
      quantity: 0,
      status: 'sold-out',
      pickupTime: '6:00 PM - 8:00 PM',
    },
     {
      id: '4',
      name: 'Day-old Bread Loaf',
      price: 2.0,
      quantity: 10,
      status: 'draft',
      pickupTime: '10:00 AM - 12:00 PM',
    },
    {
      id: '5',
      name: 'Fruit & Veggie Box',
      price: 6.0,
      quantity: 1,
      status: 'active',
      pickupTime: '3:00 PM - 5:00 PM',
    },
  ];

type ListingStatus = 'all' | 'active' | 'sold-out' | 'draft';

export default function ListingsPage() {
  const [activeTab, setActiveTab] = useState<ListingStatus>('all');
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<Listing | null>(null);
  const [listingToEdit, setListingToEdit] = useState<Listing | undefined>(undefined);
  const { toast } = useToast();
  
  const handleAddListing = (newListingData: Omit<Listing, 'id' | 'status'>) => {
    const newListing: Listing = {
        ...newListingData,
        id: (listings.length + 1).toString(),
        status: newListingData.quantity > 0 ? 'active' : 'sold-out',
    };
    setListings(prevListings => [newListing, ...prevListings]);
    toast({
      title: 'Listing Added',
      description: `"${newListing.name}" has been successfully added.`,
    });
  };

  const handleEditListing = (updatedListingData: Omit<Listing, 'status'>) => {
      setListings(prevListings => 
        prevListings.map(l => 
            l.id === updatedListingData.id 
            ? { ...updatedListingData, status: updatedListingData.quantity > 0 ? 'active' : 'sold-out' }
            : l
        )
      );
      toast({
        title: 'Listing Updated',
        description: `"${updatedListingData.name}" has been successfully updated.`,
      });
  };

  const handleFormSubmit = (data: Omit<Listing, 'id' | 'status'> | Omit<Listing, 'status'>) => {
    if ('id' in data) {
        handleEditListing(data);
    } else {
        handleAddListing(data);
    }
  };

  const openAddDialog = () => {
    setListingToEdit(undefined);
    setIsDialogOpen(true);
  };

  const openEditDialog = (listing: Listing) => {
    setListingToEdit(listing);
    setIsDialogOpen(true);
  };
  
  const confirmDelete = (listing: Listing) => {
    setListingToDelete(listing);
  };

  const handleDelete = () => {
    if (listingToDelete) {
      setListings(listings.filter(l => l.id !== listingToDelete.id));
      toast({
        title: 'Listing Deleted',
        description: `"${listingToDelete.name}" has been deleted.`,
        variant: 'destructive'
      });
      setListingToDelete(null);
    }
  };

  const handleDuplicate = (listing: Listing) => {
    const newListing: Listing = {
      ...listing,
      id: (listings.length + 1).toString(),
      name: `${listing.name} (Copy)`,
      status: 'draft',
    };
    setListings(prev => [newListing, ...prev]);
    toast({
        title: 'Listing Duplicated',
        description: `A copy of "${listing.name}" has been created.`,
    });
  };

  const toggleStatus = (listing: Listing) => {
    const newStatus = listing.status === 'active' ? 'draft' : 'active';
    setListings(prev => prev.map(l => l.id === listing.id ? {...l, status: newStatus} : l));
     toast({
        title: 'Status Updated',
        description: `"${listing.name}" is now ${newStatus}.`,
    });
  };

  const filteredListings = activeTab === 'all' 
    ? listings 
    : listings.filter(l => l.status === activeTab);

  return (
    <>
      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as ListingStatus)}>
          <div className="flex items-center">
              <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="sold-out">Sold Out</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
              </TabsList>
              <div className="ml-auto">
                  <Button onClick={openAddDialog}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Listing
                  </Button>
              </div>
          </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Manage Your Listings</CardTitle>
            <CardDescription>
              View, edit, and create new Surprise Bags for your customers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity Left</TableHead>
                  <TableHead>Pickup Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredListings.length > 0 ? (
                  filteredListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">{listing.name}</TableCell>
                      <TableCell>€{listing.price.toFixed(2)}</TableCell>
                      <TableCell>{listing.quantity}</TableCell>
                      <TableCell>{listing.pickupTime}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            listing.status === 'active'
                              ? 'default'
                              : listing.status === 'sold-out'
                              ? 'destructive'
                              : 'secondary'
                          }
                          className={listing.status === 'active' ? 'bg-green-600 hover:bg-green-600/80' : ''}
                        >
                          {listing.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(listing)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(listing)}>Duplicate</DropdownMenuItem>
                            {listing.status !== 'sold-out' && (
                                <DropdownMenuItem onClick={() => toggleStatus(listing)}>
                                    {listing.status === 'active' ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                                    {listing.status === 'active' ? 'Pause' : 'Activate'}
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={() => confirmDelete(listing)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No listings found for this category.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Tabs>
      <AddListingDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onFormSubmit={handleFormSubmit}
        initialData={listingToEdit}
      />
       <AlertDialog open={!!listingToDelete} onOpenChange={(open) => !open && setListingToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the listing for "{listingToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setListingToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
