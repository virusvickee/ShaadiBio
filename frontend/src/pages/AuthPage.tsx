import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import ShimmerButton from "@/components/ui/ShimmerButton";
import FloatingParticles from "@/components/ui/FloatingParticles";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = useCallback((field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!isLogin && !form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (!isLogin && form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem("shaadibio_users") || "[]");
      const user = users.find((u: any) => u.email === form.email && u.password === form.password);
      if (!user) {
        setErrors({ email: "Invalid email or password" });
        return;
      }
      localStorage.setItem("shaadibio_current_user", JSON.stringify(user));
      toast({ title: "Welcome back!", description: `Logged in as ${user.name}` });
    } else {
      const users = JSON.parse(localStorage.getItem("shaadibio_users") || "[]");
      if (users.find((u: any) => u.email === form.email)) {
        setErrors({ email: "An account with this email already exists" });
        return;
      }
      const newUser = { name: form.name, email: form.email, password: form.password, id: Date.now().toString() };
      users.push(newUser);
      localStorage.setItem("shaadibio_users", JSON.stringify(users));
      localStorage.setItem("shaadibio_current_user", JSON.stringify(newUser));
      toast({ title: "Account created!", description: "Welcome to ShaadiBio" });
    }
    navigate("/create");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 relative overflow-hidden">
      <FloatingParticles />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Heart className="h-8 w-8 text-primary fill-primary" />
          </motion.div>
          <span className="font-heading text-2xl font-bold text-foreground">
            Shaadi<span className="text-gradient-gold">Bio</span>
          </span>
        </Link>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-lg" />

          <div className="relative bg-card/90 backdrop-blur-xl border border-border/60 rounded-2xl p-8 shadow-elegant">
            <div className="flex bg-secondary rounded-xl p-1 mb-6">
              {["Sign In", "Sign Up"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => { setIsLogin(i === 0); setErrors({}); }}
                  className="relative flex-1 py-2.5 text-sm font-body font-medium rounded-lg transition-colors"
                >
                  {(i === 0 ? isLogin : !isLogin) && (
                    <motion.div
                      layoutId="authTab"
                      className="absolute inset-0 bg-card rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${(i === 0 ? isLogin : !isLogin) ? "text-foreground" : "text-muted-foreground"}`}>
                    {tab}
                  </span>
                </button>
              ))}
            </div>

            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground text-center mb-1">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="font-body text-sm text-muted-foreground text-center mb-6">
                {isLogin ? "Sign in to manage your biodata" : "Sign up to save and download biodata"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-1.5">
                    <Label className="font-body text-sm">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10 bg-background/50 border-border/60 focus:border-primary/50 transition-colors"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                    </div>
                    {errors.name && <p className="text-destructive text-xs font-body">{errors.name}</p>}
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10 bg-background/50 border-border/60 focus:border-primary/50 transition-colors"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="text-destructive text-xs font-body">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10 pr-10 bg-background/50 border-border/60 focus:border-primary/50 transition-colors"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-destructive text-xs font-body">{errors.password}</p>}
                </div>

                {!isLogin && (
                  <div className="space-y-1.5">
                    <Label className="font-body text-sm">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10 bg-background/50 border-border/60 focus:border-primary/50 transition-colors"
                        type="password"
                        placeholder="••••••••"
                        value={form.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-destructive text-xs font-body">{errors.confirmPassword}</p>}
                  </div>
                )}

                <ShimmerButton type="submit" className="w-full py-3 text-base mt-2">
                  {isLogin ? "Sign In" : "Create Account"}
                </ShimmerButton>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
