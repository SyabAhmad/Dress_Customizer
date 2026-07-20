import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const pageTitles = {
  "/studio": "Studio",
  "/recent-chats": "Recent Chats",
  "/designs": "My Designs",
  "/profile": "Profile",
  "/settings": "Settings",
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const basePath = "/" + (location.pathname.split("/")[1] || "");
  const pageTitle = pageTitles[basePath] || "";

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user-name");
    setMenuOpen(false);
    navigate("/");
  };

  const initials = user
    ? `${(user.first_name?.[0] || "").toUpperCase()}${(user.last_name?.[0] || "").toUpperCase()}`
    : user?.email?.[0]?.toUpperCase() || "?";

  return (
    <header
      className="sticky top-0 z-50 w-full shrink-0"
      style={{
        background: "linear-gradient(180deg, rgba(135,206,235,0.95), rgba(173,216,230,0.9))",
        backdropFilter: "saturate(140%) blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.3)",
        color: "#001a33",
      }}
    >
      <div className="w-full px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg shadow-md shrink-0"
            style={{
              background: "linear-gradient(135deg,#0066cc 0%,#0099ff 100%)",
              boxShadow: "0 4px 12px rgba(0,102,204,0.2)",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          />
          <span className="font-semibold text-base tracking-tight" style={{ color: "#001a33" }}>
            Dress Customizer
          </span>
          {pageTitle && (
            <>
              <span className="text-sm" style={{ color: "rgba(0,102,204,0.3)" }}>/</span>
              <span className="text-sm font-medium hidden sm:inline" style={{ color: "#0066cc" }}>
                {pageTitle}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/signin" className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ border: "1px solid rgba(255,255,255,0.4)", color: "#001a33", background: "rgba(255,255,255,0.3)" }}>
                Sign in
              </Link>
              <Link to="/signup" className="text-xs px-3 py-1.5 rounded-lg font-medium text-white" style={{ background: "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)" }}>
                Sign up
              </Link>
            </div>
          )}

          <button
            type="button"
            className="inline-flex items-center justify-center md:hidden p-2 rounded-md"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#001a33" }}
          >
            {menuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1.5" style={{ borderTop: "1px solid rgba(255,255,255,0.3)", background: "linear-gradient(180deg, rgba(135,206,235,0.9), rgba(173,216,230,0.85))" }}>
            {isAuthenticated ? (
              <>
                <Link to="/" onClick={() => setMenuOpen(false)} className="px-3 py-1.5 rounded-md text-xs font-medium" style={{ color: "#001a33" }}>Home</Link>
                <Link to="/studio" onClick={() => setMenuOpen(false)} className="px-3 py-1.5 rounded-md text-xs font-medium" style={{ color: "#001a33" }}>Studio</Link>
                <Link to="/recent-chats" onClick={() => setMenuOpen(false)} className="px-3 py-1.5 rounded-md text-xs font-medium" style={{ color: "#001a33" }}>Recent Chats</Link>
                <Link to="/styles" onClick={() => setMenuOpen(false)} className="px-3 py-1.5 rounded-md text-xs font-medium" style={{ color: "#001a33" }}>Styles</Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="px-3 py-1.5 rounded-md text-xs font-medium" style={{ color: "#001a33" }}>Profile</Link>
                <Link to="/settings" onClick={() => setMenuOpen(false)} className="px-3 py-1.5 rounded-md text-xs font-medium" style={{ color: "#001a33" }}>Settings</Link>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.3)" }} className="my-1" />
                <button onClick={handleLogout} className="w-full text-left px-3 py-1.5 rounded-md text-xs font-medium text-red-500">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={() => setMenuOpen(false)} className="w-full text-left px-3 py-2 rounded-md font-medium text-xs" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#001a33" }}>
                  Sign in
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="w-full text-left px-3 py-2 rounded-md font-medium text-xs text-white" style={{ background: "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)" }}>
                  Sign up
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
      <path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M6 6l12 12" /><path d="M18 6l-12 12" />
    </svg>
  );
}
