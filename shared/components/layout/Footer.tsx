import Link from "next/link";
import Image from "next/image";
import {
    IconMail,
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandWhatsapp,
} from "@tabler/icons-react";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#050505] border-t border-neutral-900 text-white font-serif relative overflow-hidden py-24 px-8 lg:px-16 z-20">
            <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
                {/* Brand / Logo */}
                <div className="flex flex-col gap-6 lg:border-r border-neutral-900 lg:pr-8">
                    <Link href="/" className="group inline-block transition-transform hover:scale-105 duration-300 w-fit">
                        <Image
                            src="/assets/images/calcutta-logo.png"
                            alt="Calcutta Studio"
                            width={200}
                            height={52}
                            className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_6px_rgba(220,38,38,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(255,30,30,0.6)] transition-all duration-300"
                        />
                    </Link>
                    <p className="text-neutral-500 font-sans text-xs tracking-[0.2em] uppercase max-w-xs leading-relaxed">
                        Digital Artist specializing in inking and horrific creatures.
                    </p>
                </div>

                {/* Explore Links */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-sm tracking-[0.3em] text-neutral-400 uppercase">
                        Explore
                    </h3>
                    <div className="flex flex-col gap-4">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Works", href: "/works" },
                            { name: "Terms of Service", href: "/tos" },
                            { name: "Contact", href: "/contact" },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="font-sans text-neutral-600 hover:text-white transition-colors uppercase tracking-widest text-xs w-fit"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Connect */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-sm tracking-[0.3em] text-neutral-400 uppercase">
                        Connect
                    </h3>
                    <div className="flex gap-5 items-center">
                        <a
                            href="https://wa.me/918839145554?text=Hello%20Calcutta%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20a%20photoshoot."
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            title="WhatsApp (+91 8839145554)"
                            className="text-neutral-600 hover:text-[#25D366] transition-colors"
                        >
                            <IconBrandWhatsapp stroke={1.2} size={24} />
                        </a>
                        <Link
                            href="https://www.instagram.com/calcuttastudio98/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Calcutta Studio Instagram"
                            title="Calcutta Studio Instagram (@calcuttastudio98)"
                            className="text-neutral-600 hover:text-[#ff1a1a] transition-colors"
                        >
                            <IconBrandInstagram stroke={1.2} size={24} />
                        </Link>
                        <Link
                            href="https://www.facebook.com/motu43"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            title="Facebook"
                            className="text-neutral-600 hover:text-white transition-colors"
                        >
                            <IconBrandFacebook stroke={1.2} size={24} />
                        </Link>
                        <Link
                            href="mailto:contact@calcutta.studio"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Email"
                            title="Email"
                            className="text-neutral-600 hover:text-white transition-colors"
                        >
                            <IconMail stroke={1.2} size={24} />
                        </Link>
                    </div>

                    <div className="flex flex-col gap-1 text-[11px] font-sans tracking-widest text-neutral-500">
                        <span className="text-[10px] uppercase text-[#8a0303] tracking-[0.2em]">Instagram:</span>
                        <a
                            href="https://www.instagram.com/calcuttastudio98/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors flex items-center gap-1.5"
                        >
                            <span className="text-neutral-400">Studio:</span>
                            <span className="text-neutral-300">@calcuttastudio98</span>
                        </a>
                        <a
                            href="https://www.instagram.com/sinu__5767_/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors flex items-center gap-1.5"
                        >
                            <span className="text-neutral-400">Owner:</span>
                            <span className="text-neutral-300">@sinu__5767_</span>
                        </a>
                    </div>

                    <p className="mt-1 text-neutral-700 font-serif text-sm italic tracking-widest">
                        &ldquo;Gaze into the abyss&rdquo;
                    </p>
                </div>

                {/* Credits */}
                <div className="flex flex-col gap-6 lg:items-end lg:text-right">
                    <h3 className="text-sm tracking-[0.3em] text-neutral-400 uppercase">
                        Credits
                    </h3>
                    <div className="text-neutral-600 font-sans text-xs uppercase tracking-widest space-y-3">
                        <p>Designed &amp; Developed for</p>
                        <span className="text-neutral-300 inline-block text-sm tracking-[0.2em]">
                            Calcutta Studio
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-700">
                <p>&copy; {currentYear} Calcutta Studio. All rights reserved.</p>
                <p>Digital Art Portfolio</p>
            </div>
        </footer>
    );
};

export default Footer;

