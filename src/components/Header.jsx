import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-30"
      style={{
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "saturate(140%) blur(6px)",
        borderBottom: "1px solid rgba(15,23,42,0.06)",
        color: "#0b0b12",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg"
              style={{
                background: "linear-gradient(135deg,#7c5cff 0%,#3be8d0 100%)",
                boxShadow: "0 6px 18px rgba(124,92,255,0.12)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            />
            <span
              className="font-semibold text-lg tracking-tight"
              style={{ color: "#0b1220" }}
            >
              Dress Customizer
            </span>
          </Link>
          <span className="hidden sm:inline text-muted">· AI-powered UI</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center md:hidden p-2 rounded-md"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            style={{ border: "1px solid rgba(15,23,42,0.06)" }}
          >
            {menuOpen ? (
              <CloseIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
          <Link
            to="/signin"
            className="hidden md:inline px-3 py-1.5 rounded-md text-sm"
            style={{
              border: "1px solid rgba(15,23,42,0.06)",
              color: "#0b1220",
            }}
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="hidden md:inline px-3 py-1.5 rounded-md text-sm"
            style={{
              background: "linear-gradient(90deg,#7c5cff 0%,#3be8d0 100%)",
              color: "#ffffff",
              boxShadow: "0 8px 28px rgba(124,92,255,0.12)",
            }}
          >
            Sign up
          </Link>
          <Link
            to="/studio"
            className="hidden lg:inline px-3 py-1.5 rounded-full text-sm"
            style={{
              background: "linear-gradient(90deg,#7c5cff 0%,#3be8d0 100%)",
              color: "#021018",
              boxShadow: "0 8px 30px rgba(59,232,208,0.06)",
            }}
          >
            Launch Studio
          </Link>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden">
          <div
            className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2"
            style={{
              borderTop: "1px solid rgba(15,23,42,0.06)",
              background: "rgba(255,255,255,0.98)",
            }}
          >
            <Link
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className="w-full text-left px-3 py-2 rounded-md"
              style={{
                border: "1px solid rgba(15,23,42,0.06)",
                color: "#0b1220",
              }}
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="w-full text-left px-3 py-2 rounded-md"
              style={{
                background: "linear-gradient(90deg,#7c5cff 0%,#3be8d0 100%)",
                color: "#fff",
              }}
            >
              Sign up
            </Link>
            <Link
              to="/studio"
              onClick={() => setMenuOpen(false)}
              className="w-full text-left px-3 py-2 rounded-md"
              style={{
                border: "1px solid rgba(15,23,42,0.06)",
                color: "#0b1220",
              }}
            >
              Launch Studio
            </Link>
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
