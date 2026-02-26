"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface HeaderProps {
  pageTitle?: string;
  showBackButton?: boolean;
}

function HeaderContent({ pageTitle, showBackButton = false }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isSearchPage = pathname === '/search';
  const isHomePage = pathname === '/';
  const urlQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Determine if we should show the search page behavior (expanded search bar with X)
  const useSearchPageBehavior = isSearchPage && !showBackButton;

  // Update search query when URL changes
  useEffect(() => {
    if (isSearchPage && urlQuery) {
      setSearchQuery(urlQuery);
      // Only auto-expand mobile search on search page
      if (useSearchPageBehavior && window.innerWidth < 768) {
        setIsMobileSearchOpen(true);
      }
    }
  }, [isSearchPage, urlQuery, useSearchPageBehavior]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      // Only close mobile search if not on search page
      if (!useSearchPageBehavior) {
        setIsMobileSearchOpen(false);
      }
    }
  };

  const handleClose = () => {
    if (useSearchPageBehavior) {
      router.push('/');
      setSearchQuery("");
    }
    setIsMobileSearchOpen(false);
  };

  const handleBack = () => {
    router.back();
  };

  // Truncate title for display
  const truncateTitle = (title: string, maxLength: number = 30) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8 lg:px-12">
        {/* Mobile Search Expanded View - Only show on mobile when expanded */}
        {isMobileSearchOpen && (
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
        )}

        {/* Normal Header Layout - Hidden on mobile when search is expanded */}
        <div className={`flex w-full items-center justify-between ${isMobileSearchOpen ? 'hidden md:flex' : 'flex'}`}>
          {/* Left Section: Logo or Back Button + Title */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {showBackButton && !isHomePage ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="shrink-0"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                {pageTitle && (
                  <h2 className="truncate text-lg font-medium">
                    {truncateTitle(pageTitle, 40)}
                  </h2>
                )}
              </>
            ) : (
              <h1 className="text-2xl font-light tracking-tight">
                get<span className="font-mono font-bold text-brand-primary">stay</span>
              </h1>
            )}
          </div>
          
          {/* Right Section: Actions */}
          <div className="flex items-center gap-3 shrink-0">
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
          </div>
        </div>
      </div>
    </header>
  );
}

export function Header({ pageTitle, showBackButton = false }: HeaderProps) {
  return (
    <Suspense fallback={
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8 lg:px-12">
          <h1 className="text-2xl font-light tracking-tight">
            get<span className="font-mono font-bold text-brand-primary">stay</span>
          </h1>
        </div>
      </header>
    }>
      <HeaderContent pageTitle={pageTitle} showBackButton={showBackButton} />
    </Suspense>
  );
}
