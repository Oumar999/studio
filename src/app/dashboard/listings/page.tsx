// src/app/dashboard/listings/page.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ListingsPage() {
  const listings = [
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

  const renderTableRows = (statusFilter: string) => {
      const filtered = statusFilter === 'all' ? listings : listings.filter(l => l.status === statusFilter);

      if (filtered.length === 0) {
          return (
              <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                      No listings found.
                  </TableCell>
              </TableRow>
          )
      }
      return filtered.map((listing) => (
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
              className={listing.status === 'active' ? 'bg-green-600' : ''}
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
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Pause</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ));
  }

  return (
    <Tabs defaultValue="all">
        <div className="flex items-center">
             <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="sold-out">Sold Out</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
            </TabsList>
            <div className="ml-auto">
                <Button>
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
                <TabsContent value="all">{renderTableRows('all')}</TabsContent>
                <TabsContent value="active">{renderTableRows('active')}</TabsContent>
                <TabsContent value="sold-out">{renderTableRows('sold-out')}</TabsContent>
                <TabsContent value="draft">{renderTableRows('draft')}</TabsContent>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Tabs>
  );
}
