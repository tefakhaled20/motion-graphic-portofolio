import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("done"), 1400);
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-32 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="glass-strong relative overflow-hidden rounded-[40px] p-8 md:p-16"
      >
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full blur-3xl" style={{ background: "oklch(0.55 0.24 285 / 0.25)" }} />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-3xl" style={{ background: "oklch(0.63 0.18 255 / 0.22)" }} />

        <div className="relative grid gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">Get in touch</p>
            <h2 className="font-display text-5xl font-semibold leading-[1] md:text-7xl">
              Let's <span className="font-serif italic text-gradient">raise</span> the bar.
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Ready to elevate your content? Send a message and let's create something unforgettable.
            </p>
            <div className="mt-10 space-y-2 text-sm">
              <p className="text-muted-foreground">Email</p>
              <a href="mailto:hello@kaimercer.com" data-cursor="link" data-cursor-label="Email" className="font-display text-2xl">hello@kaimercer.com</a>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {[
              { name: "name", label: "Your name", type: "text" },
              { name: "email", label: "Email", type: "email" },
            ].map((f) => (
              <FloatField key={f.name} {...f} />
            ))}
            <FloatField name="message" label="Tell me about the project" type="text" multiline />

            <motion.button
              type="submit"
              disabled={status !== "idle"}
              data-cursor="button"
              whileTap={{ scale: 0.97 }}
              className="relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-full text-sm font-medium text-primary-foreground animate-gradient"
              style={{ background: "linear-gradient(120deg, oklch(0.55 0.24 285), oklch(0.5 0.22 270), oklch(0.63 0.18 255), oklch(0.55 0.24 285))" }}
            >
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.span key="i" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2">
                    Send message <Send className="h-4 w-4" />
                  </motion.span>
                )}
                {status === "loading" && (
                  <motion.span key="l" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </motion.span>
                )}
                {status === "done" && (
                  <motion.span key="d" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2">
                    <Check className="h-5 w-5" /> Sent — talk soon!
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

function FloatField({ name, label, type, multiline }: { name: string; label: string; type: string; multiline?: boolean }) {
  const [val, setVal] = useState("");
  const [focus, setFocus] = useState(false);
  const lifted = focus || val.length > 0;
  const Tag = (multiline ? "textarea" : "input") as any;
  return (
    <label className="relative block">
      <motion.span
        animate={{ y: lifted ? -10 : 14, scale: lifted ? 0.8 : 1, color: focus ? "oklch(0.55 0.24 285)" : "oklch(0.55 0 0)" }}
        transition={{ type: "spring", damping: 22, stiffness: 220 }}
        className="pointer-events-none absolute left-5 top-3 origin-left text-sm"
      >
        {label}
      </motion.span>
      <Tag
        name={name}
        type={type}
        rows={multiline ? 4 : undefined}
        value={val}
        onChange={(e: any) => setVal(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="glass w-full rounded-2xl bg-transparent px-5 pb-3 pt-7 text-foreground outline-none transition-[box-shadow] focus:shadow-[0_0_0_2px_oklch(0.55_0.24_285_/_0.5)]"
      />
    </label>
  );
}