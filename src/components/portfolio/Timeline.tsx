import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const items = [
  { year: "2022", title: "Picked up the blade", body: "Started messing around with editing — cutting videos just for fun, learning pace, rhythm, and the basics of how a cut should feel." },
  { year: "2023", title: "Went all in", body: "Made editing my actual job. Premiere Pro and After Effects became second nature, and I started thinking in terms of story and structure, not just cuts." },
  { year: "2024", title: " Sharpened the craft", body: "Built real speed and precision under deadlines — tight pacing, sound sync, and motion graphics that hold up under fast turnarounds." },
  { year: "2025", title: "Leveled up", body: "Edited \" Gam'eya we Daira\" alongside Mahmoud Mahdy, then stepped into United Media Services as Assistant Editor and Reels lead on Season 2 of a major national casting show." },
  { year: "2026", title: "Running the machine", body: "Now driving the visual output for multiple brands and channels at once never missing a beat, never missing a deadline." },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 40%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative mx-auto max-w-5xl px-6 py-32 md:px-12">
      <div className="mb-16 max-w-3xl">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">Journey</p>
        <h2 className="font-display text-5xl font-semibold md:text-7xl">
          A path made of <span className="font-serif italic text-gradient">frames</span>.
        </h2>
      </div>

      <div ref={ref} className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
        <motion.div
          className="absolute left-4 top-0 w-px md:left-1/2"
          style={{ height: h, background: "var(--gradient-vibrant)", boxShadow: "0 0 20px oklch(0.55 0.24 285 / 0.6)" }}
        />

        <div className="space-y-16">
          {items.map((it, i) => (
            <motion.div
              key={it.year}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative grid gap-4 pl-12 md:grid-cols-2 md:gap-12 md:pl-0 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <span className="absolute left-2 top-2 h-5 w-5 -translate-x-1/2 rounded-full md:left-1/2" style={{ background: "var(--gradient-vibrant)", boxShadow: "0 0 20px oklch(0.55 0.24 285 / 0.6)" }} />
              <div className={i % 2 ? "md:text-left md:pl-10" : "md:text-right md:pr-10"}>
                <p className="font-display text-5xl font-semibold text-gradient">{it.year}</p>
              </div>
              <div className={`glass-strong rounded-3xl p-6 ${i % 2 ? "md:mr-10" : "md:ml-10"}`}>
                <h3 className="font-display text-2xl font-semibold">{it.title}</h3>
                <p className="mt-2 text-muted-foreground">{it.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
