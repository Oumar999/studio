"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ResQLogo } from "@/components/icons";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/#hero", label: "Home" },
  { href: "/#impact", label: "Impact" },
  { href: "/#business", label: "For Business" },
  { href: "/#about", label: "About" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsHidden(true);
      } else {
        // Scrolling up
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-md" : "bg-transparent",
        isHidden ? "-translate-y-full" : "translate-y-0"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ResQLogo />
            <span className="sr-only">ResQ Marketplace</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="font-semibold text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link href="/dashboard" passHref>
                  <Button variant="ghost">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="outline">Log Out</Button>
              </>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button variant="ghost">Business Login</Button>
                </Link>
                <Link href="/#download" passHref>
                  <Button className="font-headline bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:scale-105 transition-transform duration-300">Download App</Button>
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
                <div className="p-6">
                    <div className="mb-8">
                        <ResQLogo />
                    </div>
                  <nav className="flex flex-col gap-6 text-lg">
                    {navLinks.map((link) => (
                      <Link
                        key={`${link.href}-${link.label}-mobile`}
                        href={link.href}
                        className="font-semibold text-foreground/80 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-8 flex flex-col gap-4">
                    {user ? (
                      <>
                        <Link href="/dashboard" passHref>
                          <Button variant="ghost" size="lg" className="w-full justify-start">
                            <LayoutDashboard className="mr-2 h-5 w-5" />
                            Dashboard
                          </Button>
                        </Link>
                        <Button onClick={handleLogout} variant="outline" size="lg">Log Out</Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" passHref>
                          <Button variant="ghost" size="lg" className="w-full justify-start">Business Login</Button>
                        </Link>
                        <Link href="#download" passHref>
                          <Button size="lg" className="font-headline bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg w-full">Download App</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
