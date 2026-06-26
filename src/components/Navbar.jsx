import { useState } from "react";
import { Link } from "react-router-dom";

// ============================================================
// NAVBAR — Editorial minimalist. Logo left, nav right.
// Logic: useState for mobile toggle — UNCHANGED.
// ============================================================

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-cream/90 backdrop-blur-md border-b border-ink-300/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-[68px]">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* Decorative accent dot */}
            <span className="w-2 h-2 rounded-full bg-mint-500 group-hover:scale-125 transition-transform duration-300" />
            <span className="font-serif text-[1.35rem] font-bold text-ink-900 tracking-tight">
              Hoku Sol
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group cursor-pointer">
              <span className="text-[0.875rem] font-medium text-ink-500 hover:text-ink-900 transition-colors duration-200 underline-grow py-1">
                Grammar
              </span>
            </div>

            <div className="relative group cursor-pointer">
              <span className="text-[0.875rem] font-medium text-ink-500 hover:text-ink-900 transition-colors duration-200 underline-grow py-1">
                Vocab
              </span>
            </div>

            <Link
              to="/culture"
              className="text-[0.875rem] font-medium text-ink-500 hover:text-ink-900 transition-colors duration-200 underline-grow py-1"
            >
              Culture 🎎
            </Link>

            {/* Thin divider */}
            <div className="w-px h-4 bg-ink-300" />

            {/* Search icon */}
            <button
              aria-label="Search"
              className="w-8 h-8 flex items-center justify-center text-ink-500 hover:text-ink-900
                         hover:bg-mint-100 rounded-full transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.75"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]
                       text-ink-700 hover:text-ink-900 focus:outline-none"
          >
            <span
              className={`block w-5 h-[1.5px] bg-current transition-all duration-300
                ${isOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-current transition-opacity duration-300
                ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-current transition-all duration-300
                ${isOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-smooth
          ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-cream border-t border-ink-300/40 px-5 py-5 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-ink-700 hover:text-mint-600 transition-colors"
          >
            Grammar
          </Link>
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-ink-700 hover:text-mint-600 transition-colors"
          >
            Vocab
          </Link>
          <Link
            to="/culture"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-ink-700 hover:text-mint-600 transition-colors"
          >
            Culture 🎎
          </Link>
        </div>
      </div>
    </nav>
  );
}
