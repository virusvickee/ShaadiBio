import { Link } from "react-router-dom";
import { FileText, Palette, Download, Eye, Star, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedText from "@/components/ui/AnimatedText";
import GlowCard from "@/components/ui/GlowCard";
import ShimmerButton from "@/components/ui/ShimmerButton";
import FloatingParticles from "@/components/ui/FloatingParticles";

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
            <AnimatedText
              words={["Made Simple", "Made Elegant", "Made Yours"]}
            />
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
