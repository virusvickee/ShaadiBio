import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <span className="font-heading text-xl font-bold text-foreground">
            Shaadi<span className="text-gradient-gold">Bio</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/create"
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Create Biodata
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
