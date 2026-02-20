"use client";

import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8 lg:px-12">
        {/* Logo */}
        <h1 className="text-2xl font-light tracking-tight">
          get<span className="font-mono font-bold text-brand-primary">stay</span>
        </h1>
        
        {/* Search bar */}
        <div className="relative hidden w-96 md:flex">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search hostels..."
            className="h-10 rounded-lg border border-border bg-muted/30 pl-10 text-sm transition-colors focus:border-brand-primary focus:bg-background"
          />
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button className="h-10 rounded-lg bg-brand-primary px-6 text-sm font-medium text-brand-white hover:bg-brand-primary/90">
            <User className="mr-2 h-4 w-4" />
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
