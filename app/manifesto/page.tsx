import Link from "next/link";
import {
    MANIFESTO_DATE,
    MANIFESTO_FOOTNOTE,
    MANIFESTO_KIND,
    MANIFESTO_SECTIONS,
    MANIFESTO_STATUS,
    MANIFESTO_SUBTITLE,
    MANIFESTO_TITLE,
    MANIFESTO_VERSION,
} from "../../content/manifesto-v1.5";

function slugify(text: string, index: number) {
    const base = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return `s${index + 1}-${base || "section"}`;
}

// Renders **bold** and *italic* inside a line; everything else is plain text.
function renderInline(text: string) {
    return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
        return part;
    });
}

type NumberedItem = { text: string; nested: string[] };

// Groups body lines into blocks: bullets ("- "), numbered items ("1. ") with their
// nested items ("  - "), quoted paragraphs ("> "); other lines are paragraphs.
function renderBody(body: string[]) {
    const blocks: React.ReactNode[] = [];
    let bullets: string[] = [];
    let numbered: NumberedItem[] = [];
    let quote: string[] = [];

    const flush = () => {
        if (bullets.length > 0) {
            const items = bullets;
            bullets = [];
            blocks.push(
                <ul key={`ul-${blocks.length}`} className="space-y-2 pl-6 list-disc marker:text-[var(--accent-primary)] opacity-90 leading-relaxed">
                    {items.map((item, i) => (
                        <li key={i}>{renderInline(item)}</li>
                    ))}
                </ul>
            );
        }
        if (numbered.length > 0) {
            const items = numbered;
            numbered = [];
            blocks.push(
                <ol key={`ol-${blocks.length}`} className="space-y-6 pl-6 list-decimal marker:text-[var(--accent-primary)] marker:font-bold opacity-90 leading-relaxed">
                    {items.map((item, i) => (
                        <li key={i}>
                            {renderInline(item.text)}
                            {item.nested.length > 0 && (
                                <ul className="mt-3 space-y-3 pl-5 list-disc marker:text-[var(--accent-primary)]">
                                    {item.nested.map((nested, k) => (
                                        <li key={k}>{renderInline(nested)}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ol>
            );
        }
        if (quote.length > 0) {
            const items = quote;
            quote = [];
            blocks.push(
                <blockquote key={`q-${blocks.length}`} className="space-y-3 p-5 border-l-4 border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 rounded-r-lg leading-relaxed">
                    {items.map((item, i) => (
                        <p key={i}>{renderInline(item)}</p>
                    ))}
                </blockquote>
            );
        }
    };

    for (const line of body) {
        const numberedMatch = line.match(/^\d+\. (.*)$/);
        if (line.startsWith("  - ") && numbered.length > 0) {
            numbered[numbered.length - 1].nested.push(line.slice(4));
        } else if (numberedMatch) {
            if (bullets.length > 0 || quote.length > 0) flush();
            numbered.push({ text: numberedMatch[1], nested: [] });
        } else if (line.startsWith("- ")) {
            if (numbered.length > 0 || quote.length > 0) flush();
            bullets.push(line.slice(2));
        } else if (line.startsWith("> ")) {
            if (bullets.length > 0 || numbered.length > 0) flush();
            quote.push(line.slice(2));
        } else {
            flush();
            blocks.push(
                <p key={`p-${blocks.length}`} className="opacity-90 leading-relaxed">
                    {renderInline(line)}
                </p>
            );
        }
    }
    flush();
    return blocks;
}

export default function ManifestoPage() {
    const sections = MANIFESTO_SECTIONS.map((section, i) => ({
        ...section,
        id: slugify(section.heading, i),
    }));

    return (
        <div className="min-h-screen bg-[var(--background)] transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 py-24 lg:flex gap-16 relative">

                {/* Table of contents */}
                <aside className="hidden lg:block w-64 flex-shrink-0 h-[calc(100vh-8rem)] sticky top-32 overflow-y-auto pr-4">
                    <h3 className="font-serif font-bold text-xl mb-6 text-[var(--foreground)]">Contents</h3>
                    <div className="space-y-1 relative border-l-2 border-[var(--foreground)]/10">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className="block py-2 pl-4 text-xs font-mono transition-colors border-l-2 -ml-[2px] border-transparent opacity-60 hover:opacity-100 hover:text-[var(--accent-primary)]"
                            >
                                {section.heading}
                            </a>
                        ))}
                    </div>
                </aside>

                <main className="flex-1 max-w-[75ch] space-y-16">
                    <header className="border-b border-[var(--foreground)]/10 pb-12">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-4">
                            {MANIFESTO_TITLE}
                        </h1>
                        <p className="text-2xl md:text-3xl font-serif leading-snug mb-8 opacity-80">
                            {MANIFESTO_SUBTITLE}
                        </p>
                        <p className="font-mono text-sm text-[var(--accent-primary)] font-bold mb-6">
                            Version {MANIFESTO_VERSION} — {MANIFESTO_KIND} · {MANIFESTO_DATE} · {MANIFESTO_STATUS}
                        </p>
                        <p className="p-4 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 rounded-lg text-sm leading-relaxed">
                            This is a concept for public discussion — not a religion, a safety standard or a source of authority. See the{" "}
                            <Link href="/legal" className="text-[var(--accent-primary)] underline">legal notice</Link>.
                        </p>
                    </header>

                    {sections.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-32 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold">{section.heading}</h2>
                            <div className="space-y-4 text-base">{renderBody(section.body)}</div>
                        </section>
                    ))}

                    <p className="text-sm italic opacity-70 leading-relaxed">{MANIFESTO_FOOTNOTE}</p>

                    <div className="pt-8 border-t border-[var(--foreground)]/10 flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/check-ai"
                            className="px-6 py-3 rounded border border-[var(--accent-primary)] text-[var(--accent-primary)] font-mono text-xs uppercase tracking-widest text-center hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
                        >
                            Ask your AI about this concept
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}
