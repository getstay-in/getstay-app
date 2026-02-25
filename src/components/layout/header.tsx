"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isSearchPage = pathname === '/search';
  const urlQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Update search query when URL changes
  useEffect(() => {
    if (isSearchPage && urlQuery) {
      setSearchQuery(urlQuery);
      setIsMobileSearchOpen(true); // Keep mobile search open on search page
    }
  }, [isSearchPage, urlQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      // Don't close mobile search or clear input on search page
      if (!isSearchPage) {
        setIsMobileSearchOpen(false);
      }
    }
  };

  const handleClose = () => {
    if (isSearchPage) {
      // If on search page, go back to home
      router.push('/');
      setSearchQuery("");
    }
    setIsMobileSearchOpen(false);
  };

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8 lg:px-12">
        {/* Mobile Search Expanded View */}
        {isMobileSearchOpen ? (
          <div className="flex w-full items-center gap-2 md:hidden">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search hostels or rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 rounded-lg border border-border bg-muted/30 pl-10 pr-4 text-sm transition-colors focus:border-brand-primary focus:bg-background"
                  autoFocus={!isSearchPage}
                />
              </div>
            </form>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <>
            {/* Logo */}
            <h1 className="text-2xl font-light tracking-tight">
              get<span className="font-mono font-bold text-brand-primary">stay</span>
            </h1>
            
            {/* Desktop Search bar */}
            <form onSubmit={handleSearch} className="relative hidden w-96 md:flex">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search hostels or rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 rounded-lg border border-border bg-muted/30 pl-10 text-sm transition-colors focus:border-brand-primary focus:bg-background"
              />
            </form>
            
            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Mobile Search Icon */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <ThemeToggle />
              <Button className="hidden h-10 rounded-lg bg-brand-primary px-6 text-sm font-medium text-brand-white hover:bg-brand-primary/90 sm:flex">
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button
                size="icon"
                className="flex h-10 w-10 rounded-lg bg-brand-primary text-brand-white hover:bg-brand-primary/90 sm:hidden"
              >
                <User className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
