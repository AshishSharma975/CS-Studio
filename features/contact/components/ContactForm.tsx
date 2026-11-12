"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const t1 = setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      const t2 = setTimeout(() => setStatus("idle"), 5000);
      timersRef.current.push(t2);
    }, 1500);
    timersRef.current.push(t1);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 pb-32 z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-16"
      >
        <div className="flex flex-col space-y-12">
          <div className="space-y-4">
            <h3 className="font-cinzel text-2xl text-neutral-200">Enquiries</h3>
            <p className="text-neutral-500 font-sans text-sm leading-relaxed max-w-sm">
              I am currently open to commissions, commercial projects, and limited
              private work. Please reach out with details about your vision.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.3em] text-red-900 font-bold mb-1">
                Email
              </span>
              <a
                href="mailto:contact@calcutta.studio"
                className="text-neutral-300 hover:text-white transition-colors font-serif italic text-lg whitespace-nowrap overflow-hidden text-ellipsis"
              >
                contact@calcutta.studio
              </a>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.3em] text-red-900 font-bold mb-1">
                WhatsApp / Direct Call
              </span>
              <a
                href="https://wa.me/918839145554?text=Hello%20Calcutta%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20a%20photoshoot."
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-[#25D366] transition-colors font-serif italic text-lg whitespace-nowrap"
              >
                +91 88391 45554
              </a>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.3em] text-red-900 font-bold mb-1">
                Location
              </span>
              <span className="text-neutral-300 font-serif italic text-lg">
                Calcutta Studio / Korba &amp; Pan-India
              </span>
            </div>
          </div>

          <div className="pt-8">
            <div className="h-px w-full bg-neutral-800" />
            <div className="mt-8 flex gap-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">
                Calcutta.Studio
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
          <div className="relative group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-neutral-800 py-3 focus:outline-none focus:border-red-900 transition-colors peer text-neutral-200 font-sans"
              placeholder=" "
            />
            <label className="absolute left-0 top-3 text-neutral-500 text-xs uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-red-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-red-900">
              Name
            </label>
          </div>

          <div className="relative group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-neutral-800 py-3 focus:outline-none focus:border-red-900 transition-colors peer text-neutral-200 font-sans"
              placeholder=" "
            />
            <label className="absolute left-0 top-3 text-neutral-500 text-xs uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-red-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-red-900">
              Email
            </label>
          </div>

          <div className="relative group">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-neutral-800 py-3 focus:outline-none focus:border-red-900 transition-colors peer text-neutral-200 font-sans"
              placeholder=" "
            />
            <label className="absolute left-0 top-3 text-neutral-500 text-xs uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-red-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-red-900">
              Subject
            </label>
          </div>

          <div className="relative group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-transparent border-b border-neutral-800 py-3 focus:outline-none focus:border-red-900 transition-colors peer text-neutral-200 font-sans resize-none"
              placeholder=" "
            />
            <label className="absolute left-0 top-3 text-neutral-500 text-xs uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-red-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-red-900">
              Message
            </label>
          </div>

          <button
            type="submit"
            disabled={status !== "idle"}
            className="group relative flex items-center justify-center w-full md:w-fit px-12 py-4 bg-white text-black font-cinzel text-xs tracking-[0.3em] uppercase hover:bg-red-900 hover:text-white transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10">
              {status === "idle" && "Send Message"}
              {status === "sending" && "Sending..."}
              {status === "sent" && "Message Sent"}
              {status === "error" && "Error Sending"}
            </span>
            <div className="absolute inset-0 bg-red-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactForm;

