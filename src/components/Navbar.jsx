import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Điều khiển đóng mở tiểu mục trên Mobile
  const toggleDropdown = (menuName) => {
    if (activeDropdown === menuName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menuName);
    }
  };

  return (
    <nav className="bg-cream/90 backdrop-blur-md border-b border-ink-300/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-[68px]">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-2 h-2 rounded-full bg-mint-500 group-hover:scale-125 transition-transform duration-300" />
            <span className="font-serif text-[1.35rem] font-bold text-ink-900 tracking-tight">
              Hoku Sol
            </span>
          </Link>

          {/* ── Desktop Nav Links (Dropdowns Hoàn Chỉnh) ── */}
          <div className="hidden md:flex items-center gap-8">
            {/* Mục: Grammar */}
            <div
              className="relative group cursor-pointer py-5"
              onMouseEnter={() => setActiveDropdown("grammar")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to="/category/grammar"
                className="text-[0.875rem] font-medium text-ink-500 hover:text-ink-900 transition-colors duration-200 underline-grow py-1"
              >
                Grammar
              </Link>
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-48 bg-cream border border-ink-300/40 rounded-lg shadow-xl py-2 mt-0 transition-all duration-200 origin-top ${
                  activeDropdown === "grammar"
                    ? "opacity-100 visible translate-y-0 scale-100"
                    : "opacity-0 invisible -translate-y-2 scale-95"
                }`}
              >
                <Link
                  to="/category/grammar"
                  className="block px-4 py-2 text-sm text-ink-700 hover:bg-cream-dark hover:text-ink-900 transition-colors"
                >
                  All Grammar
                </Link>
                <Link
                  to="/category/grammar"
                  className="block px-4 py-2 text-sm text-ink-700 hover:bg-cream-dark hover:text-ink-900 transition-colors"
                >
                  Step-by-Step
                </Link>
                <Link
                  to="/category/grammar"
                  className="block px-4 py-2 text-sm text-ink-700 hover:bg-cream-dark hover:text-ink-900 transition-colors"
                >
                  Particles
                </Link>
              </div>
            </div>

            {/* Mục: Vocab */}
            <div
              className="relative group cursor-pointer py-5"
              onMouseEnter={() => setActiveDropdown("vocab")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to="/category/vocab"
                className="text-[0.875rem] font-medium text-ink-500 hover:text-ink-900 transition-colors duration-200 underline-grow py-1"
              >
                Vocab
              </Link>
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-48 bg-cream border border-ink-300/40 rounded-lg shadow-xl py-2 mt-0 transition-all duration-200 origin-top ${
                  activeDropdown === "vocab"
                    ? "opacity-100 visible translate-y-0 scale-100"
                    : "opacity-0 invisible -translate-y-2 scale-95"
                }`}
              >
                <Link
                  to="/category/vocab"
                  className="block px-4 py-2 text-sm text-ink-700 hover:bg-cream-dark hover:text-ink-900 transition-colors"
                >
                  All Vocabulary
                </Link>
                <Link
                  to="/category/vocab"
                  className="block px-4 py-2 text-sm text-ink-700 hover:bg-cream-dark hover:text-ink-900 transition-colors"
                >
                  Everyday Words
                </Link>
                <Link
                  to="/category/vocab"
                  className="block px-4 py-2 text-sm text-ink-700 hover:bg-cream-dark hover:text-ink-900 transition-colors"
                >
                  Idioms
                </Link>
              </div>
            </div>

            {/* Mục: Culture */}
            <div
              className="relative group cursor-pointer py-5"
              onMouseEnter={() => setActiveDropdown("culture")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to="/category/culture"
                className="text-[0.875rem] font-medium text-ink-500 hover:text-ink-900 transition-colors duration-200 underline-grow py-1"
              >
                Culture
              </Link>
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-48 bg-cream border border-ink-300/40 rounded-lg shadow-xl py-2 mt-0 transition-all duration-200 origin-top ${
                  activeDropdown === "culture"
                    ? "opacity-100 visible translate-y-0 scale-100"
                    : "opacity-0 invisible -translate-y-2 scale-95"
                }`}
              >
                <Link
                  to="/category/culture"
                  className="block px-4 py-2 text-sm text-ink-700 hover:bg-cream-dark hover:text-ink-900 transition-colors"
                >
                  Cultural Nuances
                </Link>
                <Link
                  to="/category/culture"
                  className="block px-4 py-2 text-sm text-ink-700 hover:bg-cream-dark hover:text-ink-900 transition-colors"
                >
                  Traditions
                </Link>
              </div>
            </div>
          </div>

          {/* ── Mobile Menu Toggle Button ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 text-ink-900 z-50 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-current transition-opacity duration-300 my-1.5 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Dropdown (Cấp 1 & Cấp 2) ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-cream border-t border-ink-300/40 px-5 py-5 flex flex-col gap-2 shadow-lg">
          <div>
            <button
              onClick={() => toggleDropdown("grammar")}
              className="w-full text-left text-sm font-medium text-ink-700 hover:text-mint-600 py-2 flex justify-between items-center"
            >
              <span>Grammar</span>
              <span className="text-xs">
                {activeDropdown === "grammar" ? "−" : "+"}
              </span>
            </button>
            <div
              className={`pl-4 flex flex-col gap-2 overflow-hidden transition-all duration-200 ${
                activeDropdown === "grammar"
                  ? "max-h-32 py-1 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <Link
                to="/category/grammar"
                onClick={() => setIsOpen(false)}
                className="text-xs text-ink-500 hover:text-ink-900 py-1"
              >
                All Grammar
              </Link>
              <Link
                to="/category/grammar"
                onClick={() => setIsOpen(false)}
                className="text-xs text-ink-500 hover:text-ink-900 py-1"
              >
                Step-by-Step
              </Link>
            </div>
          </div>

          <div>
            <button
              onClick={() => toggleDropdown("vocab")}
              className="w-full text-left text-sm font-medium text-ink-700 hover:text-mint-600 py-2 flex justify-between items-center"
            >
              <span>Vocab</span>
              <span className="text-xs">
                {activeDropdown === "vocab" ? "−" : "+"}
              </span>
            </button>
            <div
              className={`pl-4 flex flex-col gap-2 overflow-hidden transition-all duration-200 ${
                activeDropdown === "vocab"
                  ? "max-h-32 py-1 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <Link
                to="/category/vocab"
                onClick={() => setIsOpen(false)}
                className="text-xs text-ink-500 hover:text-ink-900 py-1"
              >
                All Vocabulary
              </Link>
              <Link
                to="/category/vocab"
                onClick={() => setIsOpen(false)}
                className="text-xs text-ink-500 hover:text-ink-900 py-1"
              >
                Everyday Words
              </Link>
            </div>
          </div>

          <div>
            <button
              onClick={() => toggleDropdown("culture")}
              className="w-full text-left text-sm font-medium text-ink-700 hover:text-mint-600 py-2 flex justify-between items-center"
            >
              <span>Culture</span>
              <span className="text-xs">
                {activeDropdown === "culture" ? "−" : "+"}
              </span>
            </button>
            <div
              className={`pl-4 flex flex-col gap-2 overflow-hidden transition-all duration-200 ${
                activeDropdown === "culture"
                  ? "max-h-32 py-1 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <Link
                to="/category/culture"
                onClick={() => setIsOpen(false)}
                className="text-xs text-ink-500 hover:text-ink-900 py-1"
              >
                Cultural Nuances
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
