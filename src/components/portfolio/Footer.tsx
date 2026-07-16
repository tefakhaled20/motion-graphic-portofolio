const LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/amrnassarrr/" },
  { label: "WhatsApp", href: "https://wa.me/+201274157089" },
  { label: "Behance", href: "https://www.behance.net/amrnassaar" },
  { label: "Email", href: "mailto:amrrnassarrr@gmail.com" },
  { label: "Discord", href: "https://discord.com/users/829765304174379008" },
];

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-6 py-12 md:px-12">
      <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
        <p className="font-display text-xl font-semibold">Amr Nasser<span className="text-gradient">.</span></p>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              data-cursor="link"
              data-cursor-label={label}
              className="hover:text-foreground transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">© 2026 — Crafted with motion.</p>
      </div>
    </footer>
  );
}
