import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import { useRef } from "react";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

const projects = [
  { title: "Nova Liquid", category: "Brand Film", year: "2026", img: p1, accent: "oklch(0.55 0.24 285)" },
  { title: "Solace", category: "Short Film", year: "2026", img: p2, accent: "oklch(0.63 0.18 255)" },
  { title: "Motion OS", category: "Type in Motion", year: "2025", img: p3, accent: "oklch(0.58 0.22 270)" },
  { title: "Maison Aura", category: "Product", year: "2025", img: p4, accent: "oklch(0.52 0.24 290)" },
  { title: "Pulse Live", category: "Music Video", year: "2025", img: p5, accent: "oklch(0.6 0.2 275)" },
  { title: "Velocity", category: "Sports", year: "2024", img: p6, accent: "oklch(0.65 0.18 250)" },
];

function Card({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { damping: 18, stiffness: 200 });
  const sry = useSpring(ry, { damping: 18, stiffness: 200 });
  const rotateX = useTransform(srx, (v) => v);
  const rotateY = useTransform(sry, (v) => v);

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="project"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`group relative ${i % 2 === 1 ? "lg:translate-y-16" : ""}`}
    >
      <div
        className="relative overflow-hidden rounded-[28px] glass-strong p-3 transition-shadow duration-500 group-hover:shadow-[0_30px_80px_-20px_var(--accent-glow)]"
        style={{ ["--accent-glow" as string]: p.accent }}
      >
        {/* gradient border */}
        <span
          className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            padding: 1,
            background: `linear-gradient(135deg, ${p.accent}, oklch(0.63 0.18 255), oklch(0.55 0.24 285))`,
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div className="relative overflow-hidden rounded-[20px]">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <motion.img
              src={p.img}
              alt={p.title}
              width={1280}
              height={800}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />
          </div>
          {/* glow */}
          <div
            className="pointer-events-none absolute inset-x-0 -bottom-20 h-40 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
            style={{ background: p.accent }}
          />
        </div>

        <div className="flex items-end justify-between p-5 pt-6">
          <div>
            <motion.span
              className="glass mb-3 inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              whileHover={{ scale: 1.05 }}
            >
              {p.category} · {p.year}
            </motion.span>
            <h3 className="font-display text-3xl font-semibold md:text-4xl">{p.title}</h3>
          </div>
          <motion.span
            className="grid h-12 w-12 place-items-center rounded-full glass"
            whileHover={{ rotate: 45 }}
            transition={{ type: "spring", damping: 14, stiffness: 200 }}
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-32 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">Selected Work · 2024 — 2026</p>
          <h2 className="font-display text-5xl font-semibold leading-[0.95] md:text-7xl">
            Stories rendered <span className="font-serif italic text-gradient">frame by frame</span>.
          </h2>
        </div>
        <a href="#contact" data-cursor="link" data-cursor-label="All work" className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          View all projects →
        </a>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <Card key={p.title} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}