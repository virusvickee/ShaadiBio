import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Create Biodata", href: "/create" },
      { label: "Templates", href: "/#templates" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "/#faq" },
      { label: "Contact Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

const TextHoverEffect = ({ text }: { text: string }) => (
  <span className="relative inline-block group cursor-default">
    <span className="transition-transform duration-300 inline-block group-hover:-translate-y-full group-hover:opacity-0">
      {text}
    </span>
    <span className="absolute left-0 top-0 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 text-accent">
      {text}
    </span>
  </span>
);

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Thanks for subscribing! 🎉");
      setEmail("");
      setLoading(false);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-xs">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="flex-1 px-3 py-2 rounded-lg bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/20 text-primary-foreground placeholder:text-[hsl(var(--gold-light))]/40 font-body text-sm focus:outline-none focus:border-[hsl(var(--gold))]/50 transition-colors"
      />
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-3 py-2 rounded-lg bg-[hsl(var(--gold))] text-[hsl(var(--maroon-dark))] font-body text-sm font-medium disabled:opacity-50 flex items-center gap-1"
      >
        <Send className="h-3.5 w-3.5" />
      </motion.button>
    </form>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-[hsl(var(--maroon-dark))] overflow-hidden pt-16 pb-8">
      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-[hsl(var(--gold))] fill-[hsl(var(--gold))]" />
              <span className="font-heading text-xl font-bold text-primary-foreground">
                Shaadi<span className="text-[hsl(var(--gold))]">Bio</span>
              </span>
            </div>
            <p className="font-body text-sm text-[hsl(var(--gold-light))]/70 leading-relaxed max-w-xs mb-5">
              Create beautiful marriage biodata with elegant templates trusted by thousands of Indian families.
            </p>

            {/* Newsletter Signup */}
            <NewsletterSignup />
          </div>

          {/* Link Columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-heading text-sm font-bold text-primary-foreground mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-[hsl(var(--gold-light))]/60 hover:text-[hsl(var(--gold))] transition-colors duration-200"
                    >
                      <TextHoverEffect text={link.label} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold text-primary-foreground mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 font-body text-sm text-[hsl(var(--gold-light))]/60">
                <Mail className="h-4 w-4 text-[hsl(var(--gold))]" />
                hello@shaadibio.com
              </li>
              <li className="flex items-center gap-2 font-body text-sm text-[hsl(var(--gold-light))]/60">
                <Phone className="h-4 w-4 text-[hsl(var(--gold))]" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2 font-body text-sm text-[hsl(var(--gold-light))]/60">
                <MapPin className="h-4 w-4 text-[hsl(var(--gold))]" />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[hsl(var(--gold))]/15 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full bg-[hsl(var(--gold))]/10 flex items-center justify-center text-[hsl(var(--gold-light))]/50 hover:text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/20 transition-colors"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>

          <p className="font-body text-xs text-[hsl(var(--gold-light))]/40">
            © 2026 ShaadiBio. All rights reserved.
          </p>
        </div>
      </div>

      {/* Large Watermark Text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <h2
          className="font-heading text-[8rem] md:text-[14rem] font-bold text-center leading-none text-transparent"
          style={{
            WebkitTextStroke: "1px hsla(var(--gold), 0.08)",
          }}
        >
          ShaadiBio
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
