import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Heart,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  User,
  Headphones,
} from 'lucide-react'

const GREEN = '#193C06'
const GREEN_DARK = '#0f2604'
const GOLD = '#C9A24B'

const NAV_LINKS = [
  { to: '/projects', label: 'Projects' },
  { to: '/properties', label: 'Properties' },
  { to: '/agents', label: 'Agents' },
  { to: '/news', label: 'News', badge: 'NEW' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
]

const MarqueeMessage = () => (
  <p className="text-white text-sm font-medium px-8 whitespace-nowrap flex items-center gap-2 flex-shrink-0">
    <span>🏠</span>
    Special Offer: Get 20% off on premium property listings this month!
    <span className="text-yellow-300 cursor-pointer hover:underline font-semibold">Learn More</span>
    <span className="mx-4 opacity-50">|</span>
  </p>
)

const Navbar = ({ showNavbar = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [mounted, setMounted] = useState(false)
  const location = useLocation ? useLocation() : { pathname: '' }

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setScrollPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(t)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (!showNavbar) return null

  return (
    <div className={`w-full fixed top-0 z-50 transition-all duration-300 ${mounted ? 'nb-fade-down' : 'opacity-0'}`}>
      <style>{`
        @keyframes nb-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes nb-fade-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes nb-slide-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes nb-shine {
          0% { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(220%) skewX(-15deg); }
        }
        .nb-marquee-wrapper { overflow: hidden; width: 100%; position: relative; }
        .nb-marquee-track {
          display: flex;
          width: max-content;
          animation-name: nb-marquee;
          animation-duration: 22s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
          will-change: transform;
        }
        .nb-marquee-wrapper:hover .nb-marquee-track { animation-play-state: paused; }
        .nb-fade-down { animation: nb-fade-down 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .nb-slide-in { animation: nb-slide-in 0.35s ease both; }
        .nb-underline { position: relative; }
        .nb-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0%;
          height: 2px;
          border-radius: 2px;
          background-color: ${GREEN};
          transition: width 0.25s ease;
        }
        .nb-underline:hover::after,
        .nb-underline.active::after { width: 100%; }
        .nb-underline.active { color: ${GREEN}; }
        .nb-logo-mark { position: relative; overflow: hidden; }
        .nb-logo-mark::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: translateX(-120%) skewX(-15deg);
        }
        .group:hover .nb-logo-mark::before { animation: nb-shine 0.9s ease; }
        @media (prefers-reduced-motion: reduce) {
          .nb-fade-down, .nb-slide-in { animation: none; }
          .nb-logo-mark::before { animation: none !important; }
        }
      `}</style>

      {/* Topbar - right-to-left scrolling announcement (unchanged) */}
      <div className="nb-marquee-wrapper py-2" style={{ backgroundColor: GREEN }}>
        <div className="nb-marquee-track">
          <div className="flex flex-shrink-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <MarqueeMessage key={`a-${i}`} />
            ))}
          </div>
          <div className="flex flex-shrink-0" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <MarqueeMessage key={`b-${i}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar (bg colors unchanged) */}
      <nav
        className="w-full transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(244, 245, 249, 0.9)' : '#F4F5F9',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled ? '0 8px 24px rgba(25, 60, 6, 0.10)' : 'none',
        }}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: scrolled ? '68px' : '80px' }}
          >
            {/* Logo + location, like Header */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link to="/" className="group flex items-center space-x-2.5">
             
                <span className="text-2xl font-bold transition-colors duration-300" style={{ color: GREEN }}>
                  Nestnbest
                </span>
              </Link>
              <button
                className="hidden lg:flex items-center gap-1 text-sm font-medium border-l border-gray-300 pl-4 text-gray-700 hover:text-[#193C06] transition-colors duration-200"
              >
                Buy in Central Delhi
                <ChevronDown size={15} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-7">
              {NAV_LINKS.map((link) => {
                const isActive = location?.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`nb-underline flex items-center gap-1.5 font-medium transition-colors duration-200 ${isActive ? 'active' : 'text-gray-700'}`}
                    onMouseEnter={(e) => !isActive && (e.currentTarget.style.color = GREEN)}
                    onMouseLeave={(e) => !isActive && (e.currentTarget.style.color = '')}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white leading-none">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Right side, matching Header's icon set */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="group flex items-center space-x-1.5 text-gray-700 transition-all duration-300 px-2.5 py-2 rounded-lg hover:bg-white hover:shadow-sm">
                <Heart size={18} className="transition-all duration-300 group-hover:scale-110 group-hover:text-red-500" />
              </button>

              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: GREEN }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GREEN_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
              >
                Post property
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/90 leading-none" style={{ color: GREEN }}>
                  FREE
                </span>
              </button>

              <button
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:border-[#193C06] hover:text-[#193C06] transition-colors duration-200"
                aria-label="Support"
              >
                <Headphones size={16} />
              </button>

              <button className="relative flex items-center gap-1 text-gray-700 hover:text-[#193C06] transition-colors duration-200">
                <span className="relative">
                  <User size={22} />
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-rose-500 border border-[#F4F5F9]" />
                </span>
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-all duration-300"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className="absolute inset-0 transition-all duration-300"
                    style={{ opacity: isMenuOpen ? 0 : 1, transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  />
                  <X
                    size={24}
                    className="absolute inset-0 transition-all duration-300"
                    style={{ opacity: isMenuOpen ? 1 : 0, transform: isMenuOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-1 border-t border-gray-200 nb-fade-down">
              <button className="flex items-center gap-1 w-full text-left text-gray-700 font-medium py-3 px-2 border-b border-gray-100 mb-1">
                Buy in Central Delhi
                <ChevronDown size={15} />
              </button>
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-between text-gray-700 hover:text-[#193C06] font-medium py-3 px-2 rounded-lg hover:bg-white transition-all duration-200 nb-slide-in"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white leading-none">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: GREEN }} />
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-gray-200 space-y-2">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-[#193C06] font-medium py-2.5 px-2 w-full rounded-lg hover:bg-white transition-all duration-200">
                  <Heart size={18} />
                  <span>Wishlist</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-[#193C06] font-medium py-2.5 px-2 w-full rounded-lg hover:bg-white transition-all duration-200">
                  <Headphones size={18} />
                  <span>Support</span>
                </button>
                <button className="flex items-center justify-center gap-2 text-white font-medium px-6 py-2.5 rounded-lg text-center w-full transition-all duration-300 hover:shadow-md" style={{ backgroundColor: GREEN }}>
                  <User size={16} />
                  Post property (FREE)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Scroll progress indicator (unchanged) */}
        <div className="h-[2px] w-full bg-transparent">
          <div
            className="h-full transition-[width] duration-150 ease-out"
            style={{ width: `${scrollPct}%`, backgroundColor: GOLD }}
          />
        </div>
      </nav>
    </div>
  )
}

export default Navbar