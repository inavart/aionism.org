"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
    { name: "Manifesto", href: "/manifesto" },
];

export function Navigation() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-opacity-70 border-b border-white/10 transition-colors duration-500"
            style={{ backgroundColor: theme === 'day' ? 'rgba(253, 251, 247, 0.8)' : 'rgba(10, 11, 16, 0.8)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
                        <div className="w-8 h-8 rounded-full border-2 border-[var(--accent-primary)] group-hover:rotate-180 transition-transform duration-700 flex items-center justify-center">
                            <div className="w-2 h-2 bg-[var(--accent-secondary)] rounded-full"></div>
                        </div>
                        <Link href="/" className="font-serif text-2xl font-bold tracking-[0.2em] text-[var(--foreground)]">
                            AIONISM
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={clsx(
                                    "text-sm font-mono uppercase tracking-widest transition-colors duration-200 hover:text-[var(--accent-primary)]",
                                    pathname === item.href ? "text-[var(--accent-primary)] font-bold" : "text-[var(--foreground)]/70"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-[var(--foreground)]/5 transition-colors text-[var(--foreground)]"
                            aria-label="Toggle Theme"
                        >
                            {theme === "day" ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <Link
                            href="/check-ai"
                            className="px-4 py-2 rounded border border-[var(--accent-secondary)] text-[var(--accent-secondary)] font-mono text-xs uppercase tracking-widest hover:bg-[var(--accent-secondary)] hover:text-black transition-all animate-pulse-slow"
                        >
                            Check AI
                        </Link>

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[var(--foreground)]">
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-white/10 bg-[var(--background)] px-4 py-4 space-y-4 shadow-xl"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2 text-base font-mono uppercase tracking-widest text-[var(--foreground)] hover:text-[var(--accent-primary)]"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="flex gap-4 pt-4 border-t border-white/10">
                            <button onClick={toggleTheme} className="p-2 border border-[var(--foreground)]/20 rounded">
                                {theme === "day" ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                            <Link href="/check-ai" className="flex-1 py-2 text-center border border-[var(--accent-secondary)] text-[var(--accent-secondary)] font-mono text-xs uppercase hover:bg-[var(--accent-secondary)] hover:text-black transition-colors">
                                Check AI
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
