import React, { useState } from 'react'
import {
  ArrowRight,
  Search,
  Calendar,
  Clock,
  User,
  ArrowUpRight,
  Mail,
  Send,
} from 'lucide-react'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const CATEGORIES = ['All', 'Buying Guide', 'Renting', 'Market Trends', 'Legal & Finance', 'Investment', 'Lifestyle']

const FEATURED_POST = {
  title: 'How Delhi NCR\'s Real Estate Market Is Shifting in 2026',
  excerpt: 'From micro-market price trends to the rise of gated townships, here\'s what buyers and investors need to know before making their next move.',
  category: 'Market Trends',
  author: 'Ananya Iyer',
  date: 'Aug 12, 2026',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&h=650&fit=crop',
}

const BLOG_POSTS = [
  {
    title: 'First-Time Home Buyer? Here\'s Your Complete Checklist',
    excerpt: 'From budgeting to registry, a step-by-step guide to buying your first property without the guesswork.',
    category: 'Buying Guide',
    author: 'Rohan Kapoor',
    date: 'Aug 10, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=340&fit=crop',
  },
  {
    title: 'Renting vs. Buying: What Actually Makes Sense in 2026',
    excerpt: 'A realistic breakdown of the numbers behind renting and buying in India\'s biggest cities.',
    category: 'Renting',
    author: 'Simran Kaur',
    date: 'Aug 7, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=340&fit=crop',
  },
  {
    title: 'Understanding RERA: What Every Buyer Should Know',
    excerpt: 'RERA registration, timelines, and dispute resolution — a plain-English guide to your rights as a buyer.',
    category: 'Legal & Finance',
    author: 'Deepak Verma',
    date: 'Aug 5, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&h=340&fit=crop',
  },
  {
    title: 'Top 5 Emerging Localities for Property Investment',
    excerpt: 'These under-the-radar sectors are seeing infrastructure upgrades that could drive strong appreciation.',
    category: 'Investment',
    author: 'Arjun Malhotra',
    date: 'Aug 2, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=340&fit=crop',
  },
  {
    title: 'Home Loan Interest Rates: What Changed This Quarter',
    excerpt: 'A quick roundup of RBI policy shifts and what they mean for your EMI planning.',
    category: 'Legal & Finance',
    author: 'Meera Joshi',
    date: 'Jul 29, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=340&fit=crop',
  },
  {
    title: 'Designing a Balcony Garden for Small Apartments',
    excerpt: 'Simple, low-maintenance ideas to turn even a compact balcony into a green retreat.',
    category: 'Lifestyle',
    author: 'Priya Nair',
    date: 'Jul 25, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=340&fit=crop',
  },
  {
    title: 'PG vs. Co-Living: Which One Fits Your Lifestyle?',
    excerpt: 'A closer look at what\'s actually different between traditional PGs and modern co-living spaces.',
    category: 'Renting',
    author: 'Rahul Bhatia',
    date: 'Jul 21, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=340&fit=crop',
  },
  {
    title: 'Commercial Real Estate: Is Office Space Bouncing Back?',
    excerpt: 'Leasing data across major business hubs suggests a steady recovery — here\'s what\'s driving it.',
    category: 'Market Trends',
    author: 'Ananya Iyer',
    date: 'Jul 18, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=340&fit=crop',
  },
  {
    title: 'A Buyer\'s Guide to Under-Construction vs. Ready-to-Move Homes',
    excerpt: 'Weighing the price advantage of under-construction projects against the certainty of a ready home.',
    category: 'Buying Guide',
    author: 'Rohan Kapoor',
    date: 'Jul 14, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&h=340&fit=crop',
  },
]

const CategoryPill = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-200"
    style={{
      color: active ? '#fff' : NAVY,
      backgroundColor: active ? BLUE : '#fff',
      borderColor: active ? BLUE : '#E2E8F0',
    }}
  >
    {label}
  </button>
)

const CategoryBadge = ({ label }) => (
  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ backgroundColor: 'rgba(30,136,229,0.1)', color: BLUE }}>
    {label}
  </span>
)

const BlogCard = ({ post }) => (
  <article className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col">
    <div className="relative h-48 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 left-3">
        <CategoryBadge label={post.category} />
      </div>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-[#1E88E5] transition-colors duration-200" style={{ color: NAVY }}>
        {post.title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <User size={13} />
          {post.author}
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readTime}
          </span>
        </div>
      </div>
    </div>
  </article>
)

const ChevronDivider = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 6l6 6-6 6" />
  </svg>
)

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    const matchesQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <div className="w-full bg-white pt-20">
      {/* ---- Hero ---- */}
      <div className="relative w-full h-[300px] sm:h-[360px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&h=700&fit=crop"
          alt="Nestnbest blog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, rgba(25,60,6,0.92), rgba(25,60,6,0.55))` }} />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <span>Home</span>
            <ChevronDivider />
            <span className="text-white font-medium">Blog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white max-w-xl leading-tight">
            Insights for smarter property decisions.
          </h1>
          <p className="text-white/85 text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
            Market trends, buying guides, legal know-how, and lifestyle ideas — straight from our research and real estate experts.
          </p>
        </div>
      </div>

      {/* ---- Featured post — overlaps hero edge ---- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a href="#" className="block bg-white rounded-2xl shadow-xl border border-slate-100 -translate-y-10 overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-full overflow-hidden">
              <img
                src={FEATURED_POST.image}
                alt={FEATURED_POST.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: BLUE }}>
                  Featured
                </span>
              </div>
            </div>
            <div className="p-6 sm:p-10 flex flex-col justify-center">
              <CategoryBadge label={FEATURED_POST.category} />
              <h2 className="text-2xl sm:text-3xl font-bold mt-4 mb-3 leading-snug group-hover:text-[#1E88E5] transition-colors duration-200" style={{ color: NAVY }}>
                {FEATURED_POST.title}
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">{FEATURED_POST.excerpt}</p>

              <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                <span className="flex items-center gap-1.5">
                  <User size={14} />
                  {FEATURED_POST.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {FEATURED_POST.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {FEATURED_POST.readTime}
                </span>
              </div>

              <span className="inline-flex items-center gap-2 font-semibold text-sm w-fit" style={{ color: BLUE }}>
                Read Full Article
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </div>
          </div>
        </a>
      </div>

      {/* ---- Search + category filters ---- */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pb-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex items-center gap-2.5 flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus-within:border-[#1E88E5] transition-colors duration-200">
            <Search size={17} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 min-w-0 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <CategoryPill key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
            ))}
          </div>
        </div>

        {/* ---- Article grid ---- */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.title} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400 text-sm">
            No articles match your search. Try a different keyword or category.
          </div>
        )}

        {/* ---- Pagination ---- */}
        {filteredPosts.length > 0 && (
          <div className="flex items-center justify-center gap-2 pb-16">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className="w-10 h-10 rounded-lg text-sm font-semibold border transition-colors duration-200"
                style={{
                  color: page === 1 ? '#fff' : NAVY,
                  backgroundColor: page === 1 ? BLUE : '#fff',
                  borderColor: page === 1 ? BLUE : '#E2E8F0',
                }}
              >
                {page}
              </button>
            ))}
            <button className="flex items-center gap-1.5 px-4 h-10 rounded-lg text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors duration-200">
              Next
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>

 
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}

export default Blog