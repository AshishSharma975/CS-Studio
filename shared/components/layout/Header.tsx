"use client"

import { useState } from "react"
import Link from "next/link"
import { motion , AnimatePresence} from "framer-motion"
import {IconMenu2 , IconX} from "@tabler/icons-react"


const MotionLink = motion.create(Link)

export const Header =()=>{
    const [isMenuOpen , setIsMenuOpen] = useState(false);


    const navLinks = [
        {name:"works", href:"/works"},
        {name:"TOS", href:"/tos"},
        {name:"contact", href:"/contact"}
    ];


    return(
        <>
         <header className="fixed top-0 left-0 w-full z-50 px-8 lg:px-16 py-8 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
            <Link
              href="/"
              className="font-serif text-3xl font-bold italic tracking-widest pointer-events-auto"
            >
              CS.
            </Link>

            <nav className="flex gap-8 font-sans text-xs tracking-[0.2em] uppercase pointer-events-auto">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="md:hidden pointer-events-auto">
                <button onClick={()=> setIsMenuOpen(!isMenuOpen)}
                    className="text-white p-2" aria-label="toggle Menu">
                        {isMenuOpen ? <IconX size={24}/> : <IconMenu2 size={24}/>}
                    </button>
            </div>
          </header>

          <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                  initial={{opacity:0, x:"100%"}}
                  animate={{opacity:1, x:"0%"}}
                  exit={{opacity:0, x:"100%"}}
                  transition={{type: "spring", damping:25 , stiffness:200}}
                  className="fixed inset-0 z-40 bg-black/95 backdrop:blur-2xl flex flex-col items-center justify-center gap-12 md:hidden"
                >
                  <nav className="flex flex-col gap-8 font-sans text-xs tracking-[0.2em] uppercase">
                    {navLinks.map((item, index) => (
                      <MotionLink
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        {item.name}
                      </MotionLink>
                    ))}
                  </nav>
                </motion.div>
            )}
          </AnimatePresence>
        </>
    )
}