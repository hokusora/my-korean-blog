import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { getArticleBySlug } from "../services/contentful";

// ============================================================
// ARTICLE DETAIL — Focused reading mode.
// Logic: useParams, useState, useEffect, getArticleBySlug
//        — ALL UNCHANGED.
// Only JSX markup and Tailwind classes updated.
// ============================================================

// ── Custom rich-text rendering — editorial typography ──
const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="text-[1.0625rem] leading-[1.875] text-ink-700 mb-6">
        {children}
      </p>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-900 mt-14 mb-5 tracking-tight">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="font-serif text-xl md:text-2xl font-semibold text-ink-800 mt-10 mb-4">
        {children}
      </h3>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote
        className="border-l-2 border-mint-400 pl-6 py-3 my-10
                             bg-mint-50 rounded-r-xl text-ink-700 italic
                             text-lg leading-relaxed"
      >
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-mint-600 underline underline-offset-2 decoration-mint-300
                   hover:text-mint-700 hover:decoration-mint-500 transition-colors"
      >
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { url, title } = node.data.target.fields.file;
      return (
        <img
          src={`https:${url}`}
          alt={title || "Embedded content"}
          className="rounded-2xl my-10 w-full shadow-card"
        />
      );
    },
  },
};

const ArticleDetail = () => {
  // ── Original logic — UNCHANGED ──
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticleBySlug(slug);
      setArticle(data);
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div className="flex justify-center pt-20 pb-32 px-5">
        <div className="animate-pulse flex flex-col w-full max-w-3xl gap-5">
          <div className="h-3 w-28 bg-ink-300/40 rounded-full mx-auto" />
          <div className="h-10 bg-ink-300/40 rounded-xl w-4/5 mx-auto" />
          <div className="h-6 bg-ink-300/30 rounded-xl w-2/3 mx-auto mt-2" />
          <div className="aspect-[16/9] bg-ink-300/30 rounded-2xl w-full mt-6" />
          <div className="space-y-3 mt-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-3 bg-ink-300/20 rounded-full"
                style={{ width: `${75 + Math.random() * 25}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Not found ──
  if (!article) {
    return (
      <div className="text-center py-32">
        <span className="text-5xl mb-6 block">🔍</span>
        <p className="font-serif text-2xl font-bold text-ink-900 mb-2">
          Article not found
        </p>
        <p className="text-ink-500 mb-8">
          This post may have moved or been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ink-900 text-cream
                     text-sm font-semibold rounded-full hover:bg-mint-600 transition-colors duration-200"
        >
          ← Back to articles
        </Link>
      </div>
    );
  }

  // ── Original data extraction — UNCHANGED ──
  const { title, coverImage, content, date, tags } = article.fields;
  const imageUrl = coverImage?.fields?.file?.url;

  return (
    <article className="max-w-3xl mx-auto px-5 sm:px-0 py-12 md:py-20">
      {/* ── Back link ── */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-500
                   hover:text-mint-600 mb-12 transition-colors group"
      >
        <svg
          className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to articles
      </Link>

      {/* ── Article header ── */}
      <header className="mb-12 text-center">
        {/* Tags + date row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-7">
          {tags?.map((tag) => (
            <span key={tag} className="badge-mint">
              {tag}
            </span>
          ))}
          {tags && tags.length > 0 && (
            <span className="text-ink-300 text-xs mx-1">·</span>
          )}
          <time className="text-ink-500 text-xs font-medium tracking-wide">
            {new Date(date || article.sys.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}
          </time>
        </div>

        {/* Title — large serif */}
        <h1
          className="font-serif text-[2rem] md:text-[2.75rem] lg:text-[3.25rem]
                     font-bold text-ink-900 tracking-tight leading-[1.15] mb-0"
        >
          {title}
        </h1>
      </header>

      {/* ── Cover image ── */}
      {imageUrl && (
        <div className="mb-14 rounded-2xl overflow-hidden shadow-card-lg border border-ink-300/30">
          <img
            src={imageUrl}
            alt={title}
            className="w-full object-cover max-h-[520px]"
          />
        </div>
      )}

      {/* ── Thin rule before body ── */}
      <div className="border-t border-ink-300/50 mb-12" />

      {/* ── Rich text body — uses .article-body CSS class from index.css ── */}
      <div className="article-body">
        {documentToReactComponents(content, renderOptions)}
      </div>

      {/* ── End of article divider ── */}
      <div className="mt-20 pt-8 border-t border-ink-300/50 flex justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3 border border-ink-900 text-ink-900
                     text-sm font-semibold rounded-full hover:bg-ink-900 hover:text-cream
                     transition-all duration-200"
        >
          ← More articles
        </Link>
      </div>
    </article>
  );
};

export default ArticleDetail;
