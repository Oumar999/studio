// src/components/add-listing-dialog.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import type { Listing } from '@/types/listing';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';

const listingSchema = z.object({
  name: z.string().min(1, 'Listing name is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  quantity: z.coerce.number().int().min(0, 'Quantity must be a positive integer'),
  pickupTime: z.string().min(1, 'Pickup time is required'),
});

type ListingFormValues = z.infer<typeof listingSchema>;

interface AddListingDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddListing: (listing: Omit<Listing, 'id' | 'status'>) => void;
}

export function AddListingDialog({
  isOpen,
  onOpenChange,
  onAddListing,
}: AddListingDialogProps) {
  const { toast } = useToast();
  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      name: '',
      price: 0,
      quantity: 1,
      pickupTime: '',
    },
  });

  const onSubmit = (values: ListingFormValues) => {
    onAddListing(values);
    toast({
      title: 'Listing Added',
      description: `"${values.name}" has been successfully added.`,
    });
    form.reset();
    onOpenChange(false);
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
        form.reset();
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Listing</DialogTitle>
          <DialogDescription>
            Create a new Surprise Bag to sell your surplus food.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Listing Name</Label>
                  <FormControl>
                    <Input id="name" placeholder="e.g., Surprise Bag - Pastries" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                        <Label htmlFor="price">Price (€)</Label>
                        <FormControl>
                            <Input id="price" type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                        <Label htmlFor="quantity">Quantity</Label>
                        <FormControl>
                            <Input id="quantity" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
            <FormField
              control={form.control}
              name="pickupTime"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="pickupTime">Pickup Window</Label>
                  <FormControl>
                    <Input id="pickupTime" placeholder="e.g., 4:00 PM - 6:00 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Listing</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
