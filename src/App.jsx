import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-grow container mx-auto px-5 py-8 max-w-5xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<ArticleDetail />} />
          </Routes>
        </main>
        <footer className="text-center py-8 text-slate-400 text-sm border-t border-slate-200 mt-auto bg-white">
          <p>© {new Date().getFullYear()} DevBlog. Designed with React & Tailwind.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;