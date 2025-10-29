import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") return true;
      if (stored === "light") return false;
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch {
      return document.documentElement.classList.contains("dark");
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    // Toggle both 'dark' and 'light' for clarity and external CSS hooks
    root.classList.toggle("dark", dark);
    root.classList.toggle("light", !dark);
    if (body) {
      body.classList.toggle("dark", dark);
      body.classList.toggle("light", !dark);
    }
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
    // Help native form controls adapt
    root.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-zinc-900/60 bg-white/90 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-rose-500 to-pink-500" />
            <span className="font-semibold text-lg tracking-tight">
              Dress Customizer
            </span>
          </Link>
          <span className="hidden sm:inline text-zinc-500 dark:text-zinc-400">
            · AI-powered UI
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center md:hidden p-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
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
            className="hidden md:inline px-3 py-1.5 rounded-md text-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="hidden md:inline px-3 py-1.5 rounded-md text-sm bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
          >
            Sign up
          </Link>
          <Link
            to="/studio"
            className="hidden lg:inline px-3 py-1.5 rounded-md text-sm bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
          >
            Launch Studio
          </Link>
          <a
            href="https://github.com/Mahboobiqbal/Dress_Customizer"
            target="_blank"
            className="hidden lg:inline px-3 py-1.5 rounded-md text-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Star on GitHub
          </a>
          <button
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={dark}
            onClick={() => setDark((v) => !v)}
            className="p-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            title={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? (
              <MoonIcon className="w-5 h-5" />
            ) : (
              <SunIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
            <Link
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className="w-full text-left px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="w-full text-left px-3 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700"
            >
              Sign up
            </Link>
            <Link
              to="/studio"
              onClick={() => setMenuOpen(false)}
              className="w-full text-left px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              Launch Studio
            </Link>
            <a
              href="https://github.com/Mahboobiqbal/Dress_Customizer"
              target="_blank"
              onClick={() => setMenuOpen(false)}
              className="w-full text-left px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              Star on GitHub
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4 12H2m20 0h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M5 19l1.5-1.5" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
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
