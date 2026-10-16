"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { IconMenu2, IconX } from "@tabler/icons-react"

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "works", href: "/works" },
        { name: "TOS", href: "/tos" },
        { name: "contact", href: "/contact" }
    ];

    return (
        <>
          <header className="fixed top-0 left-0 w-full z-50 px-8 lg:px-16 py-8 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
            <Link
              href="/"
              className="font-serif text-3xl font-bold italic tracking-widest pointer-events-auto transition-transform hover:scale-105 duration-300"
            >
              CS.
            </Link>

            <nav className="hidden md:flex gap-8 font-sans text-xs tracking-[0.2em] uppercase pointer-events-auto">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-neutral-400 hover:text-white transition-colors duration-300 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="md:hidden pointer-events-auto">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2 flex items-center justify-center" 
                aria-label="Toggle Menu"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconX size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconMenu2 size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </header>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-12 md:hidden"
              >
                <div className="flex flex-col items-center gap-8">
                  {navLinks.map((link, i) => (
                    <div key={link.name} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "120%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "120%", opacity: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.15 + i * 0.1, 
                          ease: [0.33, 1, 0.68, 1] 
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="group flex items-baseline font-cinzel text-4xl text-neutral-400 hover:text-white transition-all duration-300 uppercase tracking-[0.2em] hover:translate-x-2"
                        >
                          <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-300 transition-colors mr-3 tracking-normal select-none">
                            0{i + 1}
                          </span>
                          <span>{link.name}</span>
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.2, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.45, duration: 0.8 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 text-neutral-800 font-serif italic text-4xl pointer-events-none select-none whitespace-nowrap"
                >
                  "Gaze into the abyss"
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
    )
}