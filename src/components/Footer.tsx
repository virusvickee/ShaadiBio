import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-maroon-dark py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-5 w-5 text-gold fill-gold" />
          <span className="font-heading text-lg font-bold text-primary-foreground">
            ShaadiBio
          </span>
        </div>
        <p className="text-gold-light/70 font-body text-sm">
          Create beautiful marriage biodata in minutes
        </p>
        <div className="ornament-divider max-w-xs mx-auto my-6" />
        <p className="text-gold-light/50 font-body text-xs">
          © 2026 ShaadiBio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
