// src/pages/CategoryPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticlesByCategory } from "../services/contentful";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

export default function CategoryPage() {
  const { categorySlug } = useParams(); // lấy "korean" / "japanese" từ URL
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getArticlesByCategory(categorySlug);
      setArticles(data);
      setLoading(false);
    };
    fetch();
  }, [categorySlug]); // re-fetch khi đổi category

  const categoryLabel =
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <Navbar />
        <main className="flex-grow w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4 animate-pulse">
                <div className="aspect-[4/3] rounded-2xl bg-ink-300/30" />
                <div className="h-3 w-20 bg-ink-300/30 rounded-full" />
                <div className="h-5 w-3/4 bg-ink-300/40 rounded-lg" />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 md:py-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-5">
          <Link
            to="/"
            className="text-[10px] font-semibold tracking-ultra-wide text-ink-500 uppercase hover:text-ink-900"
          >
            Home
          </Link>
          <span className="text-ink-300 text-xs">›</span>
          <span className="text-[10px] font-semibold tracking-ultra-wide text-mint-600 uppercase">
            {categoryLabel}
          </span>
        </div>

        {/* Header */}
        <header className="mb-16 border-b border-ink-300/60 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-[2.5rem] md:text-[3.25rem] font-bold text-ink-900 tracking-tight leading-[1.1]">
              {categoryLabel}
            </h1>
            <p className="mt-4 text-base text-ink-500 leading-relaxed max-w-lg">
              All articles in the <strong>{categoryLabel}</strong> category.
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="badge-mint text-xs px-4 py-2 rounded-full">
              {articles.length} Articles
            </span>
          </div>
        </header>

        {/* Grid */}
        {articles.length === 0 ? (
          <p className="text-ink-500 text-center py-20">
            No articles found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
            {articles.map((article, index) => (
              <PostCard key={article.sys.id} article={article} index={index} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-ink-300/50 bg-cream-dark mt-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-serif text-base font-bold text-ink-900">
            Sol's Korean
          </span>
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} Sol's Korean. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
