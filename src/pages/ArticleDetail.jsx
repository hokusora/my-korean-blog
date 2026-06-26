import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { getArticleBySlug } from "../services/contentful";

// Custom rich text rendering rules for Tailwind styling
const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-6 text-lg leading-relaxed text-slate-700">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 tracking-tight">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
        {children}
      </h3>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="border-l-4 border-indigo-500 pl-6 italic text-slate-600 my-8 bg-slate-50 py-4 pr-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:underline font-medium"
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
          className="rounded-xl my-10 w-full shadow-sm"
        />
      );
    },
  },
};

const ArticleDetail = () => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-start pt-20 h-screen">
        <div className="animate-pulse flex flex-col w-full max-w-3xl gap-6">
          <div className="h-4 bg-slate-200 rounded w-24 mx-auto mb-4"></div>
          <div className="h-12 bg-slate-200 rounded w-3/4 mx-auto mb-8"></div>
          <div className="h-64 bg-slate-200 rounded-2xl w-full mb-10"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!article)
    return (
      <div className="text-center py-20 font-bold text-slate-800">
        Article not found
      </div>
    );

  const { title, coverImage, content, date, tags } = article.fields;
  const imageUrl = coverImage?.fields?.file?.url;

  return (
    <article className="max-w-3xl mx-auto py-10">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 mb-10 transition-colors"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to articles
      </Link>

      <header className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full"
            >
              {tag}
            </span>
          ))}
          {tags && <span className="text-slate-300">•</span>}
          <time className="text-slate-500 text-sm font-medium">
            {new Date(date || article.sys.createdAt).toLocaleDateString(
              "en-US",
              { month: "long", day: "numeric", year: "numeric" }
            )}
          </time>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
          {title}
        </h1>
      </header>

      {imageUrl && (
        <div className="mb-14 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
          <img
            src={imageUrl}
            alt={title}
            className="w-full object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* Rich Text Body */}
      <div className="prose prose-lg max-w-none prose-img:rounded-xl">
        {documentToReactComponents(content, renderOptions)}
      </div>
    </article>
  );
};

export default ArticleDetail;
