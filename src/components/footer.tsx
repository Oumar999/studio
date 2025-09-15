import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResQLogo, MoroccanPattern } from '@/components/icons';
import { Github, Twitter, Instagram } from 'lucide-react';

const footerLinks = {
  company: [
    { href: '#', label: 'About Us' },
    { href: '#', label: 'Careers' },
    { href: '#', label: 'Press' },
    { href: '#', label: 'Blog' },
  ],
  discover: [
    { href: '#', label: 'Trust & Safety' },
    { href: '#', label: 'Refer a Friend' },
    { href: '#', label: 'For Business' },
    { href: '#', label: 'Community' },
  ],
  support: [
    { href: '#', label: 'Help Center' },
    { href: '#', label: 'Contact Us' },
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
  ],
};

const socialLinks = [
    { href: 'https://twitter.com', icon: <Twitter className="h-5 w-5" />, label: 'Twitter' },
    { href: 'https://instagram.com', icon: <Instagram className="h-5 w-5" />, label: 'Instagram' },
    { href: 'https://github.com', icon: <Github className="h-5 w-5" />, label: 'Github' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t relative">
        <div className="absolute inset-x-0 top-0 h-20 opacity-50">
            <MoroccanPattern />
        </div>
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <ResQLogo />
            <p className="mt-4 text-muted-foreground max-w-xs">
              Rescue delicious food, save money, and help the planet. One meal at a time.
            </p>
            <div className="mt-6">
                <h4 className="font-semibold text-foreground mb-2">Stay in the loop</h4>
                <form className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="Email" className="bg-background"/>
                    <Button type="submit" variant="secondary" className="font-semibold text-secondary-foreground">Subscribe</Button>
                </form>
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-headline font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-4">Discover</h4>
              <ul className="space-y-2">
                {footerLinks.discover.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} ResQ Marketplace. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
