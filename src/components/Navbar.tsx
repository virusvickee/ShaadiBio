import { Link, useNavigate } from "react-router-dom";
import { Heart, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("shaadibio_current_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("shaadibio_current_user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <span className="font-heading text-xl font-bold text-foreground">
            Shaadi<span className="text-gradient-gold">Bio</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:flex items-center gap-1.5 text-sm font-body text-muted-foreground">
                <User className="h-4 w-4" />
                {user.name}
              </span>
              <Link
                to="/create"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm hover:opacity-90 transition-opacity"
              >
                My Biodata
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg bg-secondary text-foreground font-body font-medium text-sm hover:bg-secondary/80 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/create"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Create Biodata
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
