import { Link } from "react-router-dom";
import { FileText, Palette, Download, Eye } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-secondary border border-gold/30">
            <span className="text-sm font-body font-medium text-muted-foreground">
              ✨ Create Your Perfect Marriage Biodata
            </span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up">
            Beautiful Biodata,{" "}
            <span className="text-gradient-gold">Made Simple</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            Design stunning marriage biodata with elegant templates, customize every detail, and download print-ready PDFs in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/create"
              className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-base hover:opacity-90 transition-all shadow-elegant"
            >
              Create Your Biodata — Free
            </Link>
            <a
              href="#features"
              className="px-8 py-3.5 rounded-lg border border-border bg-background/50 text-foreground font-body font-medium text-base hover:bg-secondary transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <div className="ornament-divider max-w-xs mx-auto mb-4" />
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              Create a professional marriage biodata in four simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-elegant transition-shadow group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-xs font-body text-accent font-semibold mb-2">
                  Step {index + 1}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Create Your Biodata?
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto mb-8">
            Join thousands of families who have found their perfect match with a beautiful ShaadiBio
          </p>
          <Link
            to="/create"
            className="inline-block px-10 py-4 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-lg hover:opacity-90 transition-all shadow-elegant"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
