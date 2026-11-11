
"use client";

import { motion } from "framer-motion";

interface TosItem {
    title: string;
    content?: string;
    list?: string[];
}

const tosContent: TosItem[] = [
    {
        title: "General Overview",
        content:
            "Calcutta Studio is an independent creative studio focused on delivering original, thoughtful, and visually compelling work. By engaging our services, clients agree to the terms outlined below.",
    },
    {
        title: "Services & Scope",
        content:
            "We offer creative services including visual design, branding, digital experiences, illustrations, and other creative projects. Each project is individually discussed to establish its scope, deliverables, timeline, and pricing before work begins.",
    },
    {
        title: "Project Booking & Payment",
        content:
            "Projects are confirmed once the scope of work, pricing, and timeline have been mutually agreed upon. A deposit may be required before work begins, with remaining payments settled according to agreed project milestones.",
        list: [
            "Project booking is confirmed after mutual agreement.",
            "Advance payment may be required before commencement.",
            "Payments must be completed within the agreed timeline.",
        ],
    },
    {
        title: "Project Timeline",
        content:
            "Estimated timelines are communicated before the project begins. Delays caused by additional requests, late feedback, or unforeseen circumstances may affect the delivery schedule.",
        list: [
            "Project timelines depend on complexity and scope.",
            "Rush requests may involve additional charges.",
            "Calcutta Studio reserves the right to decline unrealistic deadlines.",
        ],
    },
    {
        title: "Revisions & Changes",
        content:
            "Each project includes a reasonable number of revisions as agreed during the initial discussion. Requests that significantly change the original scope may require additional charges and an updated timeline.",
        list: [
            "Revisions must remain within the original project scope.",
            "Major design changes may be treated as additional work.",
            "Additional revision charges will be communicated beforehand.",
        ],
    },
    {
        title: "Cancellation & Refunds",
        content:
            "Either party may request project cancellation through written communication. Payments for completed work and approved milestones are non-refundable. Any remaining balance or refund eligibility will be determined based on the work completed and the agreement between both parties.",
    },
    {
        title: "Intellectual Property",
        content:
            "All original creative work remains the intellectual property of Calcutta Studio unless otherwise agreed in writing. Clients receive usage rights for final deliverables according to the agreed project terms.",
        list: [
            "Unauthorized reproduction or redistribution is prohibited.",
            "Resale or modification of studio work requires permission.",
            "Source files are provided only when explicitly agreed upon.",
        ],
    },
    {
        title: "Portfolio & Publication",
        content:
            "Calcutta Studio reserves the right to showcase completed projects on its website, portfolio, social media, and promotional materials unless a confidentiality agreement has been established.",
    },
    {
        title: "Client Responsibilities",
        content:
            "Clients are responsible for providing accurate project information, necessary assets, references, and timely feedback. Delays in communication or missing materials may affect project completion.",
    },
    {
        title: "Deliverables",
        content:
            "Final deliverables will be provided in the agreed formats and specifications. Editable source files, working files, and additional assets are included only when explicitly agreed upon.",
    },
    {
        title: "Communication",
        content:
            "All project-related communication should take place through mutually agreed channels. Both parties are expected to maintain clear, respectful, and professional communication throughout the project.",
    },
    {
        title: "Agreement",
        content:
            "By engaging Calcutta Studio, you acknowledge that you have read, understood, and agreed to these Terms of Service.",
    },
];

export default function TOSPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-8 lg:px-16 relative overflow-hidden">
            <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 border-l-2 border-white pl-8"
                >
                    <h1 className="text-5xl md:text-7xl font-cinzel font-bold tracking-tighter mb-4">
                        Terms of Service.
                    </h1>

                    <p className="text-neutral-500 font-sans text-xs tracking-[0.3em] uppercase">
                        Last Updated: November 2026
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {tosContent.map((item, index) => (
                        <motion.section
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: 0.1 * index,
                            }}
                            className="group"
                        >
                            <h2 className="text-2xl font-cinzel tracking-widest text-neutral-200 group-hover:text-[#ff1a1a] transition-colors mb-4 flex items-baseline gap-4">
                                <span className="text-xs md:text-sm text-[#ff1a1a] font-mono tracking-widest opacity-100 shrink-0 pt-1">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {item.title}
                            </h2>

                            {item.content && (
                                <p className="text-neutral-300 font-sans text-base leading-relaxed mb-4 max-w-2xl">
                                    {item.content}
                                </p>
                            )}

                            {item.list && (
                                <ul className="space-y-3">
                                    {item.list.map((listItem, i) => (
                                        <li
                                            key={i}
                                            className="flex gap-4 items-start"
                                        >
                                            <span className="w-1.5 h-1.5 bg-neutral-700 mt-2 rotate-45 group-hover:bg-red-900 transition-colors shrink-0" />

                                            <span className="text-neutral-400 text-base font-sans tracking-wide group-hover:text-neutral-200 transition-colors">
                                                {listItem}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.section>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 pt-12 border-t border-neutral-900"
                >
                    <p className="text-neutral-500 font-serif italic text-xl tracking-widest leading-relaxed">
                        &ldquo;By engaging Calcutta Studio, you acknowledge and agree to the terms outlined above.&rdquo;
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
