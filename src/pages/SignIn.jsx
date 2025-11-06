import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { authAPI } from "../utils/api.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import Header from "../components/Header.jsx";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/studio", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validateFields = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (email && !email.includes("@"))
      errors.email = "Please enter a valid email";
    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error("Please fix the errors below");
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      const data = await authAPI.signin({
        email: email,
        password: password,
      });

      // Store JWT token and account info
      login(data.account, data.access_token);

      // Store email if remember me is checked
      if (remember) {
        localStorage.setItem("demo-user", email);
      }

      toast.success("Welcome back! Redirecting...");
      // Redirect to intended location or default to studio
      const from = location.state?.from?.pathname || "/studio";
      setTimeout(() => navigate(from, { replace: true }), 500);
    } catch (error) {
      console.error("Signin error:", error);

      // Handle specific error messages from backend
      if (error.message === "Invalid credentials") {
        setFieldErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
        toast.error("Invalid email or password");
      } else if (error.message === "Missing email or password") {
        toast.error("Please enter both email and password");
      } else {
        toast.error(error.message || "Failed to sign in");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(180deg, #87CEEB 0%, #87CEEB 30%, #ADD8E6 70%, #E0F6FF 100%)",
      }}
    >
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-14 lg:py-20 grid place-items-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-semibold font-['Playfair_Display']">
                Welcome back
              </h1>
              <p className="mt-2 text-[#000000]">
                Sign in to continue designing
              </p>
            </div>
            <div
              className="rounded-2xl backdrop-blur-xl border shadow-2xl p-8"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                borderColor: "rgba(0, 102, 204, 0.3)",
              }}
            >
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#004999" }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email)
                        setFieldErrors({ ...fieldErrors, email: "" });
                    }}
                    className="w-full rounded-lg px-4 py-3 outline-none transition-all border-2"
                    style={{
                      backgroundColor: "#F0F8FF",
                      borderColor: fieldErrors.email ? "#FF6B6B" : "#87CEEB",
                      color: "#003366",
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {fieldErrors.email && (
                    <p style={{ color: "#ff8a8a" }} className="text-xs mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      className="block text-sm font-medium"
                      style={{ color: "#004999" }}
                    >
                      Password *
                    </label>
                    <a
                      href="#"
                      className="text-sm hover:underline transition-all"
                      style={{ color: "#0066CC" }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password)
                        setFieldErrors({ ...fieldErrors, password: "" });
                    }}
                    className="w-full rounded-lg px-4 py-3 outline-none transition-all border-2"
                    style={{
                      backgroundColor: "#F0F8FF",
                      borderColor: fieldErrors.password ? "#FF6B6B" : "#87CEEB",
                      color: "#003366",
                    }}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  {fieldErrors.password && (
                    <p style={{ color: "#ff8a8a" }} className="text-xs mt-1">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>
                {/* Remember Me */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="size-5 rounded cursor-pointer"
                    style={{
                      accentColor: "#0066CC",
                      backgroundColor: "#F0F8FF",
                      borderColor: "#87CEEB",
                    }}
                  />
                  <span
                    style={{ color: "#004999" }}
                    className="text-sm font-medium"
                  >
                    Remember me
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #0066CC 0%, #87CEEB 100%)",
                  }}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p style={{ color: "#004999" }} className="text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-bold hover:underline"
                    style={{ color: "#0066CC" }}
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
