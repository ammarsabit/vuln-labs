import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { loginUser } from "../services/api_client";
import { useAuth } from "../context/auth-context";
import Logo from "../assets/logo.png"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await loginUser(email, password);
      login(response.token, response.user);
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "User not found") {
          setMessage("No account found. Please register first");
        } else if (error.message === "Incorrect password") {
          setMessage("Invalid email or password.");
        } else {
          setMessage(error.message);
        }
      } else {
        setMessage("Something went wrong. Please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md text-foreground">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-xl font-bold mb-6"
        >
          <img
            src={Logo}
            className="inline-flex h-20 w-20 items-center justify-center font-mono text-sm font-bold"
          />
          <span>
            Pid<span className="text-primary">Piper</span>
          </span>
        </Link>

        <div className="bg-card p-6 rounded-xl border border-border">
          <h1 className="text-2xl font-semibold mb-6">Sign in to PiedPiper</h1>

          {message && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive mb-5">
              {message}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-muted-foreground text-sm mb-1.5">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground outline-none focus:border-primary transition-colors"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div>
              <label className="block text-muted-foreground text-sm mb-1.5">
                Password
              </label>
              <div className="flex items-center bg-secondary rounded-lg border border-border focus-within:border-primary transition-colors">
                <input
                  type={showPassword ? "password" : "text"}
                  className="flex-1 px-4 py-2.5 bg-transparent outline-none text-foreground"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-sm text-muted-foreground mt-3 cursor-pointer hover:text-primary transition-colors">
            Forgot Password?
          </div>

          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-border" />
            <span className="mx-3 text-muted-foreground text-sm">or</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <div className="text-sm text-muted-foreground">
            New to PiedPiper?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Create Account <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        <footer className="text-muted-foreground text-xs text-center mt-6">
          &copy; 2026{" "}
          <Link to="/" className="underline hover:text-primary">
            PiedPiper
          </Link>{" "}
          | All Rights Reserved
        </footer>
      </div>
    </div>
  );
}
