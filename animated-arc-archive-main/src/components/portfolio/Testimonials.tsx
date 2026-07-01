const items = [
  { quote: "Kai turned a half‑formed idea into the best brand film we've ever shipped.", name: "Mara Linde", role: "Creative Director · Nova" },
  { quote: "An editor that thinks like a designer. Rare combination, real magic.", name: "Theo Park", role: "Founder · Pulse Studio" },
  { quote: "Every frame felt intentional. Our launch performance speaks for itself.", name: "Yara Okafor", role: "Head of Brand · Maison Aura" },
  { quote: "Calm, fast, and obsessed with the craft. We book him again every quarter.", name: "Ren Watanabe", role: "ECD · Frame.tokyo" },
  { quote: "He cut a 2‑minute story out of 40 hours of footage. Magician.", name: "Iris Bloom", role: "Director · Solace" },
];

export function Testimonials() {
  const row = [...items, ...items];
  return (
    <section className="relative py-32">
      <div className="mx-auto mb-14 max-w-7xl px-6 md:px-12">
        <h2 className="font-display text-5xl font-semibold md:text-7xl">
          They noticed the  <span className="font-serif italic text-gradient">difference</span> So will you.
        </h2>
      </div>
      <div className="group relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-6 px-6 [animation-duration:60s] group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <figure
              key={i}
              className="glass-strong relative w-[360px] shrink-0 rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2 md:w-[420px]"
              data-cursor="button"
            >
              <p className="font-serif text-2xl leading-snug italic">"{t.quote}"</p>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="h-10 w-10 rounded-full" style={{ background: "var(--gradient-vibrant)" }} />
                <div>
                  <p className="font-display font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}