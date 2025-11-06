import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user-name");
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background:
          "linear-gradient(180deg, rgba(135,206,235,0.95), rgba(173,216,230,0.9))",
        backdropFilter: "saturate(140%) blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.3)",
        color: "#001a33",
        paddingRight:
          "48px" /* increased right margin so nav buttons (Logout) sit away from edge */,
        paddingLeft: 0,
      }}
    >
      <div className="w-full px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg shadow-md"
              style={{
                background: "linear-gradient(135deg,#0066cc 0%,#0099ff 100%)",
                boxShadow: "0 6px 18px rgba(0,102,204,0.2)",
                border: "1px solid rgba(255,255,255,0.4)",
                marginLeft: "16px" /* Adjusted margin for alignment */,
              }}
            />
            <span
              className="font-semibold text-lg tracking-tight"
              style={{ color: "#001a33" }}
            >
              Dress Customizer
            </span>
          </Link>
          <span
            className="hidden sm:inline text-sm"
            style={{ color: "#0066cc" }}
          >
            · AI-powered design
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center md:hidden p-2 rounded-md"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#001a33",
            }}
          >
            {menuOpen ? (
              <CloseIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
          {isAuthenticated ? (
            <>
              {/* <Link
                to="/profile"
                className="hidden md:inline px-3 py-1.5 rounded-md text-sm font-medium"
                style={{
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "#001a33",
                  background: "rgba(255,255,255,0.3)",
                }}
              >
                Profile
              </Link>
              <Link
                to="/studio"
                className="hidden lg:inline px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                  color: "#ffffff",
                  boxShadow: "0 8px 30px rgba(0,153,255,0.2)",
                }}
              >
                Studio
              </Link> */}
              <button
                onClick={handleLogout}
                className="hidden md:inline px-3 py-1.5 rounded-md text-sm font-medium hover:scale-105 transition-all duration-200"
                style={{
                  background: "rgba(220,38,38,0.5)",
                  color: "#fff",
                  boxShadow: "0 8px 28px rgba(0,102,204,0.2)",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="hidden md:inline px-3 py-1.5 rounded-md text-sm font-medium"
                style={{
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "#001a33",
                  background: "rgba(255,255,255,0.3)",
                }}
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="hidden md:inline px-3 py-1.5 rounded-md text-sm font-medium"
                style={{
                  background: "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                  color: "#ffffff",
                  boxShadow: "0 8px 28px rgba(0,102,204,0.2)",
                }}
              >
                Sign up
              </Link>
              <Link
                to="/studio"
                className="hidden lg:inline px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                  color: "#ffffff",
                  boxShadow: "0 8px 30px rgba(0,153,255,0.2)",
                }}
              >
                Launch Studio
              </Link>
            </>
          )}
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden">
          <div
            className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.3)",
              background:
                "linear-gradient(180deg, rgba(135,206,235,0.9), rgba(173,216,230,0.85))",
            }}
          >
            {isAuthenticated ? (
              <>
                {/* <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-md font-medium"
                  style={{
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "#001a33",
                  }}
                >
                  Profile
                </Link>
                <Link
                  to="/studio"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-md font-medium"
                  style={{
                    background:
                      "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                    color: "#fff",
                  }}
                >
                  Studio
                </Link> */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md font-medium"
                  style={{
                    background:
                      "linear-gradient(90deg,#dc2626 0%,#f87171 100%)",
                    color: "#fff",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-md font-medium"
                  style={{
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "#001a33",
                  }}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-md font-medium"
                  style={{
                    background:
                      "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                    color: "#fff",
                  }}
                >
                  Sign up
                </Link>
                <Link
                  to="/studio"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-md font-medium"
                  style={{
                    background:
                      "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                    color: "#fff",
                  }}
                >
                  Launch Studio
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6l-12 12" />
    </svg>
  );
}
