import { Link, useNavigate } from "react-router-dom";
import { Heart, LogOut, User, Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains("dark"));
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("shaadibio_current_user");
    if (stored) setUser(JSON.parse(stored));

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("shaadibio_current_user");
    setUser(null);
    navigate("/");
  };

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("shaadibio_theme", next ? "dark" : "light");
  };

  useEffect(() => {
    const saved = localStorage.getItem("shaadibio_theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-background/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
            <Heart className="h-6 w-6 text-primary fill-primary" />
          </motion.div>
          <span className="font-heading text-xl font-bold text-foreground">
            Shaadi<span className="text-gradient-gold">Bio</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </motion.button>
          {user ? (
            <>
              <span className="flex items-center gap-1.5 text-sm font-body text-muted-foreground px-3 py-1.5 rounded-lg bg-secondary/50">
                <User className="h-3.5 w-3.5" />
                {user.name}
              </span>
              <Link to="/create">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm"
                >
                  My Biodata
                </motion.span>
              </Link>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </motion.button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg text-foreground font-body font-medium text-sm hover:bg-secondary transition-colors"
              >
                Sign In
              </Link>
              <Link to="/create">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm shadow-sm"
                >
                  Create Biodata
                </motion.span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-secondary text-foreground font-body text-sm"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-sm font-body text-muted-foreground pb-3 border-b border-border">
                    <User className="h-4 w-4" />
                    {user.name}
                  </div>
                  <Link to="/create" onClick={() => setMobileOpen(false)}
                    className="block w-full text-center py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm">
                    My Biodata
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-secondary text-foreground font-body text-sm">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setMobileOpen(false)}
                    className="block w-full text-center py-2.5 rounded-lg bg-secondary text-foreground font-body font-medium text-sm">
                    Sign In
                  </Link>
                  <Link to="/create" onClick={() => setMobileOpen(false)}
                    className="block w-full text-center py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm">
                    Create Biodata
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
