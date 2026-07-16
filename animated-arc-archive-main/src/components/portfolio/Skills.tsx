import { motion } from "framer-motion";

const skills = [
  { name: "After Effects", level: 98, color: "oklch(0.55 0.24 285)" },
  { name: "Cinema 4D", level: 90, color: "oklch(0.63 0.18 255)" },
  { name: "Premiere Pro", level: 96, color: "oklch(0.58 0.22 270)" },
  { name: "DaVinci Resolve", level: 88, color: "oklch(0.52 0.24 290)" },
  { name: "Blender", level: 82, color: "oklch(0.65 0.18 250)" },
  { name: "Figma", level: 92, color: "oklch(0.6 0.2 275)" },
];

function Ring({ level, color }: { level: number; color: string }) {
  const C = 2 * Math.PI * 36;
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
      <circle cx="40" cy="40" r="36" stroke="oklch(0 0 0 / 0.08)" strokeWidth="6" fill="none" />
      <motion.circle
        cx="40" cy="40" r="36" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        whileInView={{ strokeDashoffset: C - (C * level) / 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      />
    </svg>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-32 md:px-12">
      <div className="mb-16 max-w-3xl">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">Toolkit</p>
        <h2 className="font-display text-5xl font-semibold md:text-7xl">
          The <span className="font-serif italic text-gradient">instruments</span> of the craft.
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.7 }}
            whileHover={{ y: -6 }}
            className="glass-strong group relative flex items-center gap-5 rounded-3xl p-6"
            data-cursor="button"
          >
            <div className="relative grid place-items-center">
              <Ring level={s.level} color={s.color} />
              <span className="absolute inset-0 grid place-items-center font-display text-sm font-semibold">{s.level}%</span>
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold">{s.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Daily driver</p>
            </div>
            <span
              className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ boxShadow: `0 0 60px -10px ${s.color}` }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}