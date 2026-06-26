import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-10 opacity-95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-5 max-w-5xl flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-tighter text-slate-900">
          DevBlog<span className="text-indigo-500">.</span>
        </Link>
        <nav>
          <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            Articles
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;