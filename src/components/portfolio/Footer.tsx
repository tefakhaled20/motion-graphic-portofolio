export function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-6 py-12 md:px-12">
      <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
        <p className="font-display text-xl font-semibold">Amr Nasser<span className="text-gradient">.</span></p>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          {["Instagram", "Vimeo", "Behance", "LinkedIn", "Email"].map((l) => (
            <a key={l} href="#" data-cursor="link" data-cursor-label={l} className="hover:text-foreground">{l}</a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">© 2026 — Crafted with motion.</p>
      </div>
    </footer>
  );
}
