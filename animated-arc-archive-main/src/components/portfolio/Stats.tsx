import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const v = useMotionValue(0);
  const rounded = useTransform(v, (x) => Math.round(x).toLocaleString());
  useEffect(() => {
    if (inView) {
      const controls = animate(v, to, { duration: 2, ease: [0.16, 1, 0.3, 1] });
      return () => controls.stop();
    }
  }, [inView, to, v]);
  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

const stats = [
  { label: "Projects shipped", value: 96, suffix: "+" },
  { label: "Brands worldwide", value: 21, suffix: "" },
  { label: "Awards & honors", value: 15, suffix: "" },
  { label: "Hours of footage", value: 7800, suffix: "+" },
];

export function Stats() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:px-12">
      <div className="glass-strong grid gap-10 rounded-[32px] p-10 md:grid-cols-4 md:p-14">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
          >
            <div className="font-display text-5xl font-semibold leading-none md:text-6xl">
              <span className="text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}