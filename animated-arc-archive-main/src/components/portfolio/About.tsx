import { motion } from "framer-motion";
import portrait from "@/assets/portrait.jpg";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32 md:px-12">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-5"
        >
          <div className="glass-strong relative overflow-hidden rounded-[28px] p-3">
            <div className="overflow-hidden rounded-[20px]">
              <img src={portrait} alt="Kai Mercer portrait" width={900} height={1200} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full animate-float" style={{ background: "var(--gradient-vibrant)", filter: "blur(20px)", opacity: 0.7 }} />
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">About</p>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
            Cutting the <span className="font-serif italic text-gradient">moments</span> people can't scroll past.
          </h2>
          <div className="mt-8 space-y-5 text-lg text-muted-foreground">
            <p>
              Every frame either earns attention or loses it. For over 3 years I've lived in that gap — turning raw footage into cuts that hook, hold, and convert. From Red Bull's branded content to the gaming channels millions watch daily, I build pace, punch,
              and polish into everything I edit.
            </p>
            <p>
              Right now I'm running the visual output for 7+ social accounts on a nonstop schedule —
              while keeping every single delivery on time, on brand, and on point.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              ["Based", "Cairo, EG"],
              ["Experience", "3+ Years"],
              ["Clients", "Global"],
              ["Tools", "After Effects, Premiere Pro, Photoshop, Illustrator"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{k}</p>
                <p className="mt-2 font-display text-base font-medium">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}