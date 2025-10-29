import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-[#222831]/90 border-b border-[#31363F] text-[#EEEEEE]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#76ABAE] to-[#31363F]" />
            <span className="font-semibold text-lg tracking-tight">
              Dress Customizer
            </span>
          </Link>
          <span className="hidden sm:inline text-[#BDBDBD]">
            · AI-powered UI
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center md:hidden p-2 rounded-md border border-[#BDBDBD]/30 hover:bg-[#31363F]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <CloseIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
          <Link
            to="/signin"
            className="hidden md:inline px-3 py-1.5 rounded-md text-sm border border-[#BDBDBD]/30 hover:bg-[#31363F]"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="hidden md:inline px-3 py-1.5 rounded-md text-sm bg-[#76ABAE] text-[#222831] hover:bg-[#5E9396] shadow-sm"
          >
            Sign up
          </Link>
          <Link
            to="/studio"
            className="hidden lg:inline px-3 py-1.5 rounded-md text-sm bg-[#76ABAE] text-[#222831] hover:bg-[#5E9396] shadow-sm"
          >
            Launch Studio
          </Link>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden border-t border-[#31363F] bg-[#222831]/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
            <Link
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className="w-full text-left px-3 py-2 rounded-md border border-[#BDBDBD]/30 hover:bg-[#31363F]"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="w-full text-left px-3 py-2 rounded-md bg-[#76ABAE] text-[#222831] hover:bg-[#5E9396]"
            >
              Sign up
            </Link>
            <Link
              to="/studio"
              onClick={() => setMenuOpen(false)}
              className="w-full text-left px-3 py-2 rounded-md border border-[#BDBDBD]/30 hover:bg-[#31363F]"
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
