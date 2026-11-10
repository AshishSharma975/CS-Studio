import { ContactHero, ContactForm } from "@/features/contact/components";

export default function ContactPage() {
  return (
    <div className="relative z-10 w-full bg-transparent overflow-hidden selection:bg-red-900 min-h-screen">
      <ContactHero />
      <ContactForm />
    </div>
  );
}
