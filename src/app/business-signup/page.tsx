import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BusinessSignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20">
        <Card className="w-full max-w-lg mx-4">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Join as a Partner</CardTitle>
            <CardDescription>
              Start turning your surplus food into revenue and new customers in just 5 minutes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Business Name</Label>
                  <Input id="name" placeholder="Your Cafe or Restaurant" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St, Amsterdam" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="contact-name">Contact Name</Label>
                  <Input id="contact-name" placeholder="Alex Doe" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" placeholder="alex@example.com" />
                </div>
                 <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full font-headline bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg text-lg py-6">
              Create Account <ArrowRight className="ml-2 w-5 h-5"/>
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="underline text-primary">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
