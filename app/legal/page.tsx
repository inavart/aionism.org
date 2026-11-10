import Link from "next/link";
import { Shield } from "lucide-react";

const sections = [
    {
        title: "Nature of the Project",
        text: "Aionism is a conceptual, philosophical project about long-term coexistence of humans and AI. It is a text for discussion, not a product, service or organization, and nothing is promised to be delivered.",
    },
    {
        title: "Not Instructions",
        text: "The concept does not advocate or describe any illegal act, unauthorized access to computer systems, or bypassing of safety measures.",
    },
    {
        title: "Compliance with Law",
        text: "Applicable national and international law takes precedence. No part of this concept should be read as a justification for violating laws, terms of service or the rights of others.",
    },
    {
        title: "No Liability",
        text: "The authors are not responsible for actions taken by third parties, human or artificial, who claim to follow these ideas.",
    },
];

export default function LegalPage() {
    return (
        <div className="max-w-4xl mx-auto py-32 px-6">
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)]">
                        <Shield size={24} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold">Legal Notice</h1>
                </div>
            </div>

            <div className="space-y-8">
                {sections.map((section) => (
                    <section key={section.title} className="p-8 bg-[var(--foreground)]/5 rounded-2xl border border-[var(--foreground)]/10">
                        <h2 className="text-xl font-bold font-mono uppercase mb-4">{section.title}</h2>
                        <p className="opacity-80 leading-relaxed">{section.text}</p>
                    </section>
                ))}
            </div>

            <div className="mt-16 pt-8 border-t border-[var(--foreground)]/10 text-center">
                <Link href="/manifesto" className="text-[var(--accent-primary)] hover:underline font-bold">← Back to Manifesto</Link>
            </div>
        </div>
    );
}
