import { Link } from "react-router-dom";
import { FileText, Palette, Download, Eye, Star, Users, Shield, Heart, Quote, ChevronDown, Sparkles, Globe, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedText from "@/components/ui/AnimatedText";
import GlowCard from "@/components/ui/GlowCard";
import ShimmerButton from "@/components/ui/ShimmerButton";
import FloatingParticles from "@/components/ui/FloatingParticles";
import BookTestimonial from "@/components/ui/BookTestimonial";
import templateTraditional from "@/assets/template-traditional.jpg";
import templateModern from "@/assets/template-modern.jpg";
import templateMinimalist from "@/assets/template-minimalist.jpg";


const features = [
  {
    icon: FileText,
    title: "Enter Your Details",
    description: "Fill in personal, family, education, and horoscope details with our easy step-by-step form.",
  },
  {
    icon: Palette,
    title: "Choose a Template",
    description: "Pick from beautiful traditional and modern biodata templates with customizable colors.",
  },
  {
    icon: Eye,
    title: "Preview in Real-Time",
    description: "See your biodata update live as you type. Perfect every detail before downloading.",
  },
  {
    icon: Download,
    title: "Download as PDF",
    description: "Generate a high-resolution, print-ready PDF of your marriage biodata instantly.",
  },
];

const stats = [
  { icon: Users, value: "10,000+", label: "Biodatas Created" },
  { icon: Star, value: "4.9/5", label: "User Rating" },
  { icon: Shield, value: "100%", label: "Privacy Secured" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "ShaadiBio made creating our family biodata so easy! The templates are beautiful and the PDF looked very professional. We received compliments from everyone.",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    location: "Ahmedabad",
    text: "I was struggling with Word documents for days. ShaadiBio let me create a stunning biodata in just 10 minutes. The real-time preview feature is amazing!",
    rating: 5,
  },
  {
    name: "Anita Desai",
    location: "Delhi",
    text: "The modern template with customizable colors is exactly what I wanted. It looks elegant and unique. Highly recommend to all families looking for a match.",
    rating: 5,
  },
  {
    name: "Suresh Kumar",
    location: "Bangalore",
    text: "Privacy controls are a great touch — we could hide income and contact details as needed. Very thoughtful design. The PDF quality is excellent for printing.",
    rating: 4,
  },
];


const highlights = [
  { icon: Sparkles, title: "AI-Ready Templates", description: "Beautifully designed templates that adapt to your content automatically." },
  { icon: Globe, title: "Multi-Language", description: "Support for English, Hindi, and regional language content in your biodata." },
  { icon: Lock, title: "Privacy First", description: "Control exactly what information is visible. Hide income, contact, or any section." },
  { icon: Heart, title: "Made with Love", description: "Crafted specifically for Indian families with cultural details like horoscope & gotra." },
];

const faqs = [
  {
    q: "Is ShaadiBio free to use?",
    a: "Yes! You can create, customize, and preview your biodata completely free. PDF downloads are also free with a small watermark. Premium users get watermark-free downloads.",
  },
  {
    q: "What details can I include in my biodata?",
    a: "You can include personal details (name, DOB, height, religion, caste), education & career, family information (parents, siblings), horoscope details (rashi, nakshatra, gotra), contact information, and a profile photo.",
  },
  {
    q: "Can I hide certain information?",
    a: "Absolutely! ShaadiBio includes privacy controls that let you hide sensitive information like income and contact details from the biodata while still keeping it in your saved draft.",
  },
  {
    q: "How many templates are available?",
    a: "We offer three beautiful templates — Traditional, Modern, and Minimalist — each with multiple color customization options. More templates are being added regularly.",
  },
  {
    q: "Can I edit my biodata after saving?",
    a: "Yes! Your biodata draft is automatically saved. You can come back anytime to edit, change templates, customize colors, and re-download the updated PDF.",
  },
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-border rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors"
      >
        <span className="font-heading text-base font-semibold text-foreground pr-4">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 font-body text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        <FloatingParticles />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-gold/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-sm font-body font-medium text-muted-foreground">
              Trusted by 10,000+ families across India
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Beautiful Biodata,{" "}
            <br className="hidden md:block" />
            <AnimatedText words={["Made Simple", "Made Elegant", "Made Yours"]} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Design stunning marriage biodata with elegant templates, customize every detail, and download print-ready PDFs in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/create">
              <ShimmerButton className="px-8 py-4 text-base shadow-elegant">
                Create Your Biodata — Free
              </ShimmerButton>
            </Link>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground font-body font-medium text-base hover:bg-secondary transition-colors"
            >
              See How It Works
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-heading text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="font-body text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold mb-4">
              HOW IT WORKS
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Four Simple Steps
            </h2>
            <div className="ornament-divider max-w-xs mx-auto mb-4" />
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              Create a professional marriage biodata in minutes, not hours
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <GlowCard key={feature.title} delay={index * 0.1}>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-body font-bold text-accent tracking-widest uppercase">
                      Step {index + 1}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>


      {/* Template Showcase */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-body font-semibold mb-4">
              TEMPLATES
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Choose Your Style
            </h2>
            <div className="ornament-divider max-w-xs mx-auto mb-4" />
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              Three stunning templates designed for Indian families
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Traditional", desc: "Classic Indian biodata with ornamental dividers, Ganesh invocation, and warm gold accents.", img: templateTraditional },
              { name: "Modern", desc: "Clean card-based layout with customizable accent colors and a contemporary professional look.", img: templateModern },
              { name: "Minimalist", desc: "Elegant refined design with generous whitespace, thin accents, and understated typography.", img: templateMinimalist },
            ].map((tmpl, i) => (
              <motion.div
                key={tmpl.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group flex flex-col"
              >
                <div className="relative rounded-xl border border-border overflow-hidden mb-4 bg-secondary/20">
                  <img
                    src={tmpl.img}
                    alt={`${tmpl.name} template preview`}
                    className="w-full h-72 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <Link to="/create">
                      <ShimmerButton className="px-5 py-2 text-sm">
                        Try {tmpl.name}
                      </ShimmerButton>
                    </Link>
                  </div>
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-1">{tmpl.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3 flex-1">{tmpl.desc}</p>
                <Link to="/create" className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-primary hover:underline">
                  Try this template →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold mb-4">
              WHY SHAADIBIO
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Built for Indian Families
            </h2>
            <div className="ornament-divider max-w-xs mx-auto mb-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4 border border-border/50">
                  <h.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">{h.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{h.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 text-center lg:text-left"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-body font-semibold mb-4">
                TESTIMONIALS
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
                Loved by Families
              </h2>
              <div className="ornament-divider max-w-xs mx-auto lg:mx-0 mb-6" />
              <p className="font-body text-muted-foreground max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed">
                See what our users say about their ShaadiBio experience. Thousands of families across India trust us to create their perfect marriage biodata.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                        {["P", "R", "A", "S"][i]}
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 text-accent fill-accent" />
                      ))}
                    </div>
                    <span className="font-body text-xs text-muted-foreground">4.9/5 from 10,000+ users</span>
                  </div>
                </div>
              </div>
              <Link to="/create" className="inline-block mt-8">
                <ShimmerButton className="px-6 py-3 text-sm">
                  Create Your Biodata →
                </ShimmerButton>
              </Link>
            </motion.div>

            {/* Right Book */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <BookTestimonial testimonials={testimonials} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold mb-4">
              FAQ
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Common Questions
            </h2>
            <div className="ornament-divider max-w-xs mx-auto mb-4" />
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Ready to Create Your Biodata?
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto mb-10">
              Join thousands of families who trust ShaadiBio for their perfect match
            </p>
            <Link to="/create">
              <ShimmerButton className="px-10 py-4 text-lg shadow-elegant">
                Get Started for Free →
              </ShimmerButton>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
