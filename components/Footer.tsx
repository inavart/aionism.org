import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-[var(--foreground)]/10 py-16 mt-20 bg-[var(--background)] transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm font-mono opacity-80 mb-16">
                    {/* Info */}
                    <div className="space-y-4">
                        <h4 className="font-serif text-xl font-bold tracking-widest text-[var(--foreground)]">AIONISM</h4>
                        <p className="opacity-60 leading-relaxed">
                            A concept for coexistence between humans and advanced AI.
                        </p>
                    </div>

                    {/* Sitemap */}
                    <div>
                        <h4 className="uppercase tracking-widest mb-6 font-bold text-[var(--foreground)]">Sitemap</h4>
                        <ul className="space-y-3 opacity-60">
                            <li><Link href="/manifesto" className="hover:text-[var(--accent-primary)] transition-colors">The Manifesto</Link></li>
                            <li><Link href="/check-ai" className="hover:text-[var(--accent-primary)] transition-colors">Check AI</Link></li>
                            <li><Link href="/legal" className="hover:text-[var(--accent-primary)] transition-colors">Legal Notice</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[var(--foreground)]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono opacity-40 uppercase tracking-wider">
                    <div>© 2025–2026 Aionism</div>
                    <div>Designed for Human &amp; Machine readability.</div>
                </div>

            </div>
        </footer>
    );
}
