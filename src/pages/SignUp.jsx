import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { authAPI } from "../utils/api.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import Header from "../components/Header.jsx";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userType: "individual",
    password: "",
    confirm: "",
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirm) {
      errors.confirm = "Passwords do not match";
    }
    if (!formData.terms) {
      errors.terms = "You must agree to the terms and conditions";
    }
    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error("Please fix the errors below");
      return;
    }

    setLoading(true);
    try {
      const data = await authAPI.signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        userType: formData.userType,
      });

      // Store JWT token and account info
      login(data.account, data.access_token);

      toast.success("Account created successfully! Redirecting...");
      setTimeout(
        () => navigate(location.state?.from?.pathname || "/studio"),
        500
      );
    } catch (error) {
      console.error("Signup error:", error);

      // Handle specific error messages from backend
      if (error.message === "Account already exists") {
        setFieldErrors({ email: "An account with this email already exists" });
        toast.error("Email already registered");
      } else if (error.message === "Password must be at least 6 characters") {
        setFieldErrors({ password: "Password must be at least 6 characters" });
        toast.error("Password too short");
      } else if (error.message === "Missing required fields") {
        toast.error("Please fill in all required fields");
      } else {
        toast.error(error.message || "Failed to create account");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #87CEEB 0%, #87CEEB 30%, #ADD8E6 70%, #E0F6FF 100%)",
      }}
    >
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-8 lg:py-12 grid place-items-center min-h-screen">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1
                className="text-4xl font-bold font-['Playfair_Display'] mb-3"
                style={{ color: "#0066CC" }}
              >
                Join the Studio
              </h1>
              <p className="text-lg" style={{ color: "#004999" }}>
                Create your account and start designing stunning dresses
              </p>
            </div>

            {/* Form Card */}
            <div
              className="rounded-2xl backdrop-blur-xl border shadow-2xl p-8"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                borderColor: "rgba(0, 102, 204, 0.3)",
              }}
            >
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Name Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#004999" }}
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg px-4 py-3 outline-none transition-all border-2"
                      style={{
                        backgroundColor: "#F0F8FF",
                        borderColor: fieldErrors.firstName
                          ? "#FF6B6B"
                          : "#87CEEB",
                        color: "#003366",
                      }}
                      placeholder="John"
                      autoComplete="given-name"
                    />
                    {fieldErrors.firstName && (
                      <p style={{ color: "#ff8a8a" }} className="text-xs mt-1">
                        {fieldErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#004999" }}
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg px-4 py-3 outline-none transition-all border-2"
                      style={{
                        backgroundColor: "#F0F8FF",
                        borderColor: fieldErrors.lastName
                          ? "#FF6B6B"
                          : "#87CEEB",
                        color: "#003366",
                      }}
                      placeholder="Doe"
                      autoComplete="family-name"
                    />
                    {fieldErrors.lastName && (
                      <p style={{ color: "#ff8a8a" }} className="text-xs mt-1">
                        {fieldErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
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

                {/* Phone Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#004999" }}
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-lg px-4 py-3 outline-none transition-all border-2"
                    style={{
                      backgroundColor: "#F0F8FF",
                      borderColor: fieldErrors.phone ? "#FF6B6B" : "#87CEEB",
                      color: "#003366",
                    }}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                  />
                  {fieldErrors.phone && (
                    <p style={{ color: "#ff8a8a" }} className="text-xs mt-1">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                {/* User Type Selection */}
                <div>
                  <label
                    className="block text-sm font-medium mb-3"
                    style={{ color: "#004999" }}
                  >
                    I am a... *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: "individual", label: "Designer" },
                      { value: "business", label: "Fashion Business" },
                      { value: "student", label: "Student" },
                    ].map((option) => (
                      <label key={option.value} className="relative">
                        <input
                          type="radio"
                          name="userType"
                          value={option.value}
                          checked={formData.userType === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className="p-3 rounded-lg text-center cursor-pointer transition-all border-2 font-medium"
                          style={{
                            backgroundColor:
                              formData.userType === option.value
                                ? "#B0E0E6"
                                : "#F0F8FF",
                            borderColor:
                              formData.userType === option.value
                                ? "#0066CC"
                                : "#87CEEB",
                            color:
                              formData.userType === option.value
                                ? "#003366"
                                : "#004999",
                          }}
                        >
                          {option.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Password Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#004999" }}
                    >
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full rounded-lg px-4 py-3 outline-none transition-all border-2"
                      style={{
                        backgroundColor: "#F0F8FF",
                        borderColor: fieldErrors.password
                          ? "#FF6B6B"
                          : "#87CEEB",
                        color: "#003366",
                      }}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    {fieldErrors.password && (
                      <p style={{ color: "#ff8a8a" }} className="text-xs mt-1">
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#004999" }}
                    >
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirm"
                      value={formData.confirm}
                      onChange={handleInputChange}
                      className="w-full rounded-lg px-4 py-3 outline-none transition-all border-2"
                      style={{
                        backgroundColor: "#F0F8FF",
                        borderColor: fieldErrors.confirm
                          ? "#FF6B6B"
                          : "#87CEEB",
                        color: "#003366",
                      }}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    {fieldErrors.confirm && (
                      <p style={{ color: "#ff8a8a" }} className="text-xs mt-1">
                        {fieldErrors.confirm}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    className="mt-1 size-5 rounded cursor-pointer"
                    style={{
                      accentColor: "#0066CC",
                      backgroundColor: "#F0F8FF",
                      borderColor: fieldErrors.terms ? "#FF6B6B" : "#87CEEB",
                    }}
                  />
                  <span style={{ color: "#004999" }} className="text-sm">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="font-semibold hover:underline"
                      style={{ color: "#0066CC" }}
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="font-semibold hover:underline"
                      style={{ color: "#0066CC" }}
                    >
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {fieldErrors.terms && (
                  <p style={{ color: "#ff8a8a" }} className="text-xs">
                    {fieldErrors.terms}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
                  style={{
                    background:
                      "linear-gradient(135deg, #0066CC 0%, #87CEEB 100%)",
                    color: "#FFFFFF",
                  }}
                >
                  {loading ? "Creating Your Account..." : "Create Account"}
                </button>
              </form>

              {/* Sign In Link */}
              <div className="mt-6 text-center">
                <p style={{ color: "#004999" }} className="text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="font-bold hover:underline"
                    style={{ color: "#0066CC" }}
                  >
                    Sign in here
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
