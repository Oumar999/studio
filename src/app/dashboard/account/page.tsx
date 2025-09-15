// src/app/dashboard/account/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const accountSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  businessDescription: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountSchema>;

export default function AccountPage() {
  const { user, login } = useAuth();
  const { toast } = useToast();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      businessName: 'The Corner Bakery',
      contactName: user?.name || '',
      email: user?.email || '',
      address: '123 Main St, Amsterdam',
      businessDescription: 'A cozy local bakery specializing in artisanal bread and pastries. We aim to reduce food waste by offering our delicious leftovers at the end of the day.',
    },
  });

  const onSubmit = (values: AccountFormValues) => {
    login({ name: values.contactName, email: values.email });
    toast({
      title: 'Account Updated',
      description: 'Your business details have been saved successfully.',
    });
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
          <CardDescription>
            Update your business information. This is shown to customers on the app.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="businessName">Business Name</Label>
                      <FormControl>
                        <Input id="businessName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="address">Address</Label>
                      <FormControl>
                        <Input id="address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="contactName">Contact Name</Label>
                      <FormControl>
                        <Input id="contactName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Contact Email</Label>
                      <FormControl>
                        <Input id="email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="md:col-span-2">
                    <FormField
                    control={form.control}
                    name="businessDescription"
                    render={({ field }) => (
                        <FormItem>
                        <Label htmlFor="businessDescription">Business Description</Label>
                        <FormControl>
                            <Textarea id="businessDescription" {...field} rows={4} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
