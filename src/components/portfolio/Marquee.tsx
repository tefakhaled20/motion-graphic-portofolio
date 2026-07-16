const items = ["GAMING CONTENT", "FACELESS VIDEOS", "SOCIAL REELS", " BRAND VIDEOS", " YOUTUBE EDITING","AUTOMATION VIDEOS"];
export function Marquee() {
  const row = [...items, ...items];
  return (
    <section aria-label="Recognition" className="relative overflow-hidden border-y border-border/60 py-8">
      <div className="flex animate-marquee gap-12 whitespace-nowrap font-display text-3xl uppercase tracking-tight md:text-5xl">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 text-muted-foreground">
            {w}
            <span className="text-gradient">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
