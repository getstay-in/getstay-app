export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-8 py-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-xl font-light">
            get<span className="font-mono font-bold text-brand-primary">stay</span>
          </div>
          
          <div className="flex gap-6 text-sm font-light text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
          
          <p className="text-xs font-light text-muted-foreground">
            © 2026 GetStay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
