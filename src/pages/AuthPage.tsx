import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

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

    // UI-only auth: store in localStorage
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
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Heart className="h-7 w-7 text-primary fill-primary" />
          <span className="font-heading text-2xl font-bold text-foreground">
            Shaadi<span className="text-gradient-gold">Bio</span>
          </span>
        </Link>

        <div className="bg-card border border-border rounded-xl p-8 shadow-elegant">
          <h1 className="font-heading text-2xl font-bold text-foreground text-center mb-2">
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
                    className="pl-10"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                  className="pl-10"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              {errors.email && <p className="text-destructive text-xs font-body">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="font-body text-sm">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10 pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                    className="pl-10"
                    type="password"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  />
                </div>
                {errors.confirmPassword && <p className="text-destructive text-xs font-body">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold hover:opacity-90 transition-opacity"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="text-primary font-medium">{isLogin ? "Sign Up" : "Sign In"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
