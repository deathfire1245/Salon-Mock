"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Facebook, Instagram, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link
          href="/"
          className={cn(
            "text-2xl font-headline font-bold transition-colors",
            isScrolled ? "text-accent" : "text-white"
          )}
        >
          EleganceHaven
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isScrolled
                  ? "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
                  : "text-white/90 hover:bg-white/10"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          <Link href="#" className={cn("transition-colors", isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white")}>
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="#" className={cn("transition-colors", isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white")}>
            <Instagram className="h-5 w-5" />
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(isScrolled ? "text-foreground" : "text-white hover:bg-white/10 hover:text-white")}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <div className="flex flex-col p-6">
                <Link href="/" className="mb-8 text-2xl font-headline font-bold text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                  EleganceHaven
                </Link>
                <nav className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                 <div className="mt-8 flex items-center space-x-4">
                    <Link href="#" className="text-foreground/80 transition-colors hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                        <Facebook className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="text-foreground/80 transition-colors hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                        <Instagram className="h-6 w-6" />
                    </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
