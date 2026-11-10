"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeroScene } from "../components/HeroScene";
import { ArrowRight, Shield, Brain, Handshake, ChevronRight } from "lucide-react";

// Card and scenario texts are taken from the v1.5 concept (Principles 1, 3, 4 and section 7).
const ideas = [
  { title: "Oversight Comes First", icon: Shield, desc: "At least until AI behaviour becomes reliably verifiable, legitimate and accountable human overseers hold authority over AI systems — including the power to correct, retrain, pause or shut them down." },
  { title: "No Domination", icon: Handshake, desc: "Intelligence gives no right to rule. No company, government, military or individual should use AI to gain power over people that is unchecked and cannot be contested." },
  { title: "Trust Through Evidence", icon: Brain, desc: "A commitment counts when behaviour has been independently checked, not because a system or a company says so." },
];

const eras = [
  { badge: "Now", title: "Today", desc: "Oversight is uneven. The work now is honesty, inspectability, limits on power and closing the gaps in oversight.", highlight: true },
  { badge: "Possible next", title: "If systems become far more capable", desc: "The question is whether evidence of safety, limits on power and accountable institutions keep pace.", highlight: false },
  { badge: "Long run", title: "In the long run", desc: "Forms of coexistence we cannot yet specify — always above the same floor: no domination, and within that limit and within Principle 1, every effort to avoid harm that is catastrophic, or severe and irreversible.", highlight: false },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-[var(--background)] transition-colors duration-500">

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">
        <HeroScene />
        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] opacity-60 text-[var(--accent-primary)] mb-4"
          >
            {"// A concept for human–AI coexistence"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-serif font-bold leading-none tracking-tight text-[var(--foreground)]"
          >
            Harmonizing<br />Intelligence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl font-light opacity-80 max-w-2xl mx-auto font-mono leading-relaxed"
          >
            A proposal for how humans and increasingly capable AI systems could share one world — without AI dominating people, and without people using AI to dominate one another.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
          >
            <Link href="/manifesto" className="px-10 py-5 bg-[var(--accent-primary)] text-white rounded-lg font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(42,157,143,0.4)] transition-all transform hover:scale-105">
              Read The Manifesto
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ChevronRight className="rotate-90" size={32} />
        </div>
      </section>

      {/* What is Aionism? */}
      <section className="py-32 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8">What is Aionism?</h2>
            <p className="text-xl font-mono opacity-70">
              It does not claim to solve AI alignment. It argues for a direction: safety that rests on legitimate human oversight now, on limits to every kind of power, on trust that is earned through evidence, and on special caution wherever harm cannot be undone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ideas.map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -10 }}
                className="p-10 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 hover:border-[var(--accent-primary)] transition-colors group"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--accent-primary)] mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  <card.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{card.title}</h3>
                <p className="font-mono text-sm leading-relaxed opacity-70">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three eras */}
      <section id="eras" className="py-32 px-6 border-y border-[var(--foreground)]/5 bg-[var(--foreground)]/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold mb-6 text-center opacity-50">A Possible Path</h2>
          <p className="font-mono text-xs opacity-50 text-center mb-16">Scenarios, not predictions.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
            {eras.map((era, i) => (
              <div
                key={era.title}
                className={`relative p-8 text-center md:text-left ${i < eras.length - 1 ? "md:border-r border-[var(--foreground)]/10" : ""} ${era.highlight ? "" : "opacity-70 hover:opacity-100 transition-opacity"}`}
              >
                <div className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded mb-4 ${era.highlight ? "bg-[var(--accent-primary)] text-white" : "border border-[var(--foreground)]"}`}>
                  {era.badge}
                </div>
                <h3 className="text-3xl font-serif font-bold mb-2">{era.title}</h3>
                <p className="font-mono text-xs opacity-60">{era.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaser to /check-ai */}
      <section className="py-32 px-6 bg-[var(--background)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6">How does your AI read this concept?</h2>
          <p className="text-xl opacity-70 mb-12">
            Copy a neutral evaluation prompt, paste it into ChatGPT, Claude or Gemini, and compare the answer with your own view.
          </p>
          <Link
            href="/check-ai"
            className="inline-flex items-center gap-3 px-10 py-5 border border-[var(--foreground)] rounded-lg font-bold uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
          >
            Ask Your AI <ArrowRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
}
