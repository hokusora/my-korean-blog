import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/contentful';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles();
      setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 mb-8 text-center border-b border-slate-200 pb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Thoughts, stories and ideas.
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A minimalist space dedicated to frontend development, system architecture, and clean code.
        </p>
      </section>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
        {articles.map((article) => {
          const { title, slug, excerpt, coverImage, tags, date } = article.fields;
          const imageUrl = coverImage?.fields?.file?.url;
          const displayDate = new Date(date || article.sys.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

          return (
            <Link to={`/post/${slug}`} key={article.sys.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300">
              {imageUrl && (
                <div className="h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded">
                    {tags ? tags[0] : 'Blog'}
                  </span>
                  <span className="text-slate-300 text-xs">•</span>
                  <span className="text-slate-500 text-xs font-medium">{displayDate}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                  {title}
                </h2>
                <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {excerpt}
                </p>
                <div className="mt-auto flex items-center text-indigo-500 text-sm font-semibold">
                  Read article
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;