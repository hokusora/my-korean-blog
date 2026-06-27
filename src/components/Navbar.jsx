import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCategories } from "../services/contentful";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  // Fetch categories từ Contentful khi mount
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

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

          {/* ── Desktop Nav Links: fetch động từ Contentful, giữ dropdown logic ── */}
          <div className="hidden md:flex items-center gap-8">
            {categories.map((cat) => {
              const slug = cat.fields.slug;
              const title = cat.fields.title;
              const isActive = location.pathname === `/category/${slug}`;

              return (
                <div
                  key={cat.sys.id}
                  className="relative group cursor-pointer py-5"
                  onMouseEnter={() => setActiveDropdown(slug)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={`/category/${slug}`}
                    className={`text-[0.875rem] font-medium transition-colors duration-200 underline-grow py-1
                      ${
                        isActive
                          ? "text-mint-600 font-semibold"
                          : "text-ink-500 hover:text-ink-900"
                      }`}
                  >
                    {title}
                  </Link>
                  {/* Dropdown con — chỉ có 1 link "All {title}" vì subcategory quản lý trên Contentful */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 w-48 bg-cream border border-ink-300/40 rounded-lg shadow-xl py-2 mt-0 transition-all duration-200 origin-top ${
                      activeDropdown === slug
                        ? "opacity-100 visible translate-y-0 scale-100"
                        : "opacity-0 invisible -translate-y-2 scale-95"
                    }`}
                  >
                    <Link
                      to={`/category/${slug}`}
                      className="block px-4 py-2 text-sm text-ink-700 hover:bg-cream-dark hover:text-ink-900 transition-colors"
                    >
                      All {title}
                    </Link>
                  </div>
                </div>
              );
            })}
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

      {/* ── Mobile Menu Dropdown: accordion logic giữ nguyên, data từ Contentful ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-cream border-t border-ink-300/40 px-5 py-5 flex flex-col gap-2 shadow-lg">
          {categories.map((cat) => {
            const slug = cat.fields.slug;
            const title = cat.fields.title;

            return (
              <div key={cat.sys.id}>
                <button
                  onClick={() => toggleDropdown(slug)}
                  className="w-full text-left text-sm font-medium text-ink-700 hover:text-mint-600 py-2 flex justify-between items-center"
                >
                  <span>{title}</span>
                  <span className="text-xs">
                    {activeDropdown === slug ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`pl-4 flex flex-col gap-2 overflow-hidden transition-all duration-200 ${
                    activeDropdown === slug
                      ? "max-h-32 py-1 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <Link
                    to={`/category/${slug}`}
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-ink-500 hover:text-ink-900 py-1"
                  >
                    All {title}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
