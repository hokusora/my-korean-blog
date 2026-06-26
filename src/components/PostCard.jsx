import { Link } from "react-router-dom";

// ============================================================
// POST CARD — Editorial layout card.
// Data bindings: article.fields.title, slug, excerpt,
//                coverImage, tags, category — ALL WIRED UP.
// ============================================================

// Rotate through badge variants for visual rhythm
const BADGE_VARIANTS = ["badge-mint", "badge-blush", "badge-neutral"];

export default function PostCard({ article, index = 0 }) {
  const { title, slug, excerpt, coverImage, tags } = article.fields;

  // Image URL
  const imageUrl = coverImage?.fields?.file?.url || "";

  // Lấy category từ linked entry (References field), fallback về tags
  const categoryEntry = article.fields.category;
  const categoryData = Array.isArray(categoryEntry)
    ? categoryEntry[0]
    : categoryEntry;
  const categoryName =
    categoryData?.fields?.title ||
    (tags && tags.length > 0 ? tags[0] : "VOCAB | CULTURE");
  const categorySlug = categoryData?.fields?.slug || null;

  // Badge colour
  const badgeClass = BADGE_VARIANTS[index % BADGE_VARIANTS.length];

  return (
    <Link
      to={`/post/${slug}`}
      className="group flex flex-col cursor-pointer h-full"
    >
      {/* ── Cover image ── */}
      {imageUrl && (
        <div className="card-img-wrapper aspect-[4/3] rounded-2xl bg-ink-100 mb-5 shadow-card overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-103"
          />
        </div>
      )}

      {/* ── Category badge ── */}
      <div className="mb-3">
        {categorySlug ? (
          // Có slug → badge là link đến trang category
          <Link
            to={`/category/${categorySlug}`}
            className={`${badgeClass} hover:opacity-75 transition-opacity duration-200`}
            onClick={(e) => e.stopPropagation()} // Không trigger Link bọc ngoài
          >
            {categoryName}
          </Link>
        ) : (
          // Không có slug → badge tĩnh
          <span className={badgeClass}>{categoryName}</span>
        )}
      </div>

      {/* ── Title (serif) ── */}
      <h2
        className="font-serif text-xl md:text-[1.375rem] font-bold text-ink-900 leading-snug mb-3
                     group-hover:text-mint-600 transition-colors duration-300"
      >
        {title}
      </h2>

      {/* ── Excerpt ── */}
      <p className="text-sm text-ink-500 leading-relaxed line-clamp-2 mb-5 flex-grow">
        {excerpt}
      </p>

      {/* ── Read more ── */}
      <div className="mt-auto flex items-center gap-2 text-[0.8125rem] font-semibold text-ink-900">
        <span className="underline-grow">Read Article</span>
        <svg
          className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>
    </Link>
  );
}
