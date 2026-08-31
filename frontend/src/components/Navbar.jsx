import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { AppContext } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import assets from '../assets/assets'
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  User,
  Headphones,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Phone,
  Mail,
  Search,
  LocateFixed,
  Mic,
} from 'lucide-react'

const GREEN = '#193C06'
const GREEN_DARK = '#0f2604'
const GOLD = '#C9A24B'
const BLUE = '#1E88E5'

const NAV_LINKS = [
  { label: 'For Buyers' },
  { label: 'For Sellers' },
  { label: 'For Tenants' },
  { label: 'Services' },
]

const AD_CARDS = {
  'For Buyers': {
    label: 'INTRODUCING',
    title: 'Insights',
    bullets: ['Understand localities', 'Read Resident Reviews', 'Check Price Trends', 'Tools, Utilities & more'],
  },
  'For Sellers': {
    label: 'GROW FASTER',
    title: 'List for Free',
    bullets: ['Reach lakhs of buyers', 'Free property valuation', 'Dedicated relationship manager', 'Priority listing boost'],
  },
  'For Tenants': {
    label: 'INTRODUCING',
    title: 'Verified Listings',
    bullets: ['Owner-verified only', 'Zero brokerage tags', 'Photo & video tours', 'Instant contact details'],
  },
}

const CONTACT_INFO = {
  phone: '1800 41 99099',
  hours: '9AM - 11PM IST',
  email: 'services@nestnbest.com',
}

const POPULAR_CITIES = [
  { name: 'Delhi', state: 'Delhi NCR' },
  { name: 'Central Delhi', state: 'Delhi' },
  { name: 'East Delhi', state: 'Delhi' },
  { name: 'North Delhi', state: 'Delhi' },
  { name: 'South Delhi', state: 'Delhi' },
  { name: 'West Delhi', state: 'Delhi' },
  { name: 'Greater Noida', state: 'Delhi NCR' },
  { name: 'Noida', state: 'Delhi NCR' },
  { name: 'Faridabad', state: 'Delhi NCR' },
  { name: 'Gurgaon', state: 'Delhi NCR' },
]

const MEGA_MENUS = {
  'For Buyers': {
    categories: [
      {
        label: 'Buy a Home',
        col2: { heading: 'Properties in Delhi', items: ['Flats / Apartments', 'Independent Houses', 'Villas', 'Builder Floors', 'Penthouses', 'Farmhouses'] },
        col3: { heading: 'Popular Searches', items: ['Property in Delhi', 'Verified Property in Delhi', 'New Projects'] },
      },
      {
        label: 'Land/Plot',
        col2: { heading: 'Plot Types', items: ['Residential Plots', 'Commercial Plots', 'Agricultural Land', 'Farm House Land', 'Industrial Land', 'Corner Plots', 'Gated Community Plots'] },
        col3: { heading: 'Popular Searches', items: ['Plots near me', 'Gated community plots'] },
      },
      {
        label: 'Commercial',
        col2: { heading: 'Commercial Spaces', items: ['Office Space', 'Retail Shops', 'Showroom', 'Warehouse', 'Industrial Building', 'Factory', 'Restaurant Space', 'Hotel', 'Co-working Space'] },
        col3: null,
      },
      {
        label: 'Popular Areas',
        col2: { heading: 'Properties in Delhi', items: ['Property in Karol Bagh', 'Property in New Rajendra Nagar', 'Property in Malcha Marg', 'Property in Connaught Place', 'Property in DaryaGanj', 'Property in Old Rajinder Nagar', 'Property in Paharganj'] },
        col3: { heading: 'Popular Searches', items: ['Property in Delhi', 'Verified Property in Delhi', 'New Projects'] },
      },
      { label: 'Insights', badge: 'NEW', col2: null, col3: null },
    ],
  },
  'For Tenants': {
    categories: [
      {
        label: 'Rent a Home',
        col2: { heading: 'Rentals in Delhi', items: ['Flats / Apartments', 'Independent Houses', 'Villas', 'Builder Floors', 'Studio Apartments', 'Penthouses', 'Farmhouses'] },
        col3: { heading: 'Popular Searches', items: ['1 BHK for Rent', '2 BHK for Rent', 'Pet-Friendly Rentals'] },
      },
      {
        label: 'PG / Co-living',
        col2: { heading: 'PG Options', items: [' Boys PG', 'Girls PG', 'Co-living Spaces', 'Single Rooms', 'Shared Rooms', 'Private Rooms'] },
        col3: { heading: 'Popular Searches', items: ['PG near me', 'PG with Food'] },
      },
      {
        label: 'Commercial Rent',
        col2: { heading: 'Rent for Business', items: ['Office Space', 'Shops', 'Showrooms', 'Retail Space', 'Warehouse', 'Factory', 'Industrial Space', 'Restaurant Space', 'Hotel Space', 'Co-working Space', 'Business Center'] },
        col3: null,
      },
    ],
  },
  'For Sellers': {
    categories: [
      {
        label: 'Owner',
        col2: { heading: 'Property Owner', items: ['List Your Property', 'Manage Listings', 'Get Buyer Leads', 'Property Valuation'] },
        col3: null,
      },
      {
        label: 'Agent',
        col2: { heading: 'Real Estate Agent', items: ['Manage Client Properties', 'Bulk Listing Tools', 'Lead Management', 'Agent Dashboard'] },
        col3: null,
      },
      {
        label: 'Builder',
        col2: { heading: 'Builder / Developer', items: ['Post New Projects', 'Project Inventory', 'Floor Plans', 'Builder Profile'] },
        col3: null,
      },
    ],
  },
  'Services': {
    categories: [
      {
        label: 'Legal Services',
        col2: { heading: 'Legal Assistance', items: ['Property Documentation', 'Title Verification', 'Registration Services', 'Legal Consultation'] },
        col3: null,
      },
      {
        label: 'Financial Services',
        col2: { heading: 'Financial Help', items: ['Home Loan Assistance', 'Loan Comparison', 'EMI Calculator', 'Credit Score Check'] },
        col3: null,
      },
      {
        label: 'Property Services',
        col2: { heading: 'Property Management', items: ['Property Valuation', 'Interior Design', 'Vastu Consultation', 'Property Management'] },
        col3: null,
      },
    ],
  },
}

const MarqueeMessage = () => (
  <p className="text-white text-sm font-medium px-8 whitespace-nowrap flex items-center gap-2 flex-shrink-0">
    <span>🏠</span>
    Special Offer: Get 20% off on premium property listings this month!
    <span className="text-yellow-300 cursor-pointer hover:underline font-semibold">Learn More</span>
    <span className="mx-4 opacity-50">|</span>
  </p>
)

const AdCard = ({ menuLabel, spanFull }) => {
  const ad = AD_CARDS[menuLabel] || AD_CARDS['For Buyers']
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col h-full ${spanFull ? 'sm:col-span-2' : ''}`}
      style={{ backgroundColor: 'rgba(30, 136, 229, 0.06)' }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: BLUE }}>
            <Sparkles size={14} className="text-white" />
          </span>
          <span className="text-xs font-bold tracking-wider" style={{ color: BLUE }}>
            {ad.label}
          </span>
        </div>
        <ArrowUpRight size={16} style={{ color: BLUE }} />
      </div>
      <h4 className="text-xl font-bold mt-1 mb-3" style={{ color: GREEN }}>
        {ad.title}
      </h4>
      <ul className="space-y-2.5">
        {ad.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
            <CheckCircle2 size={16} style={{ color: BLUE }} className="flex-shrink-0" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

const MenuColumn = ({ heading, items, menuLabel, categoryLabel }) => {
  if (!heading || !items?.length) return null

  const getFilterParams = (item) => {
    const params = new URLSearchParams()
    
    // Set property type based on menu label
    if (menuLabel === 'For Buyers') {
      params.set('type', 'buy')
    } else if (menuLabel === 'For Tenants') {
      params.set('type', 'rent')
    } else if (menuLabel === 'For Dealers / Builders') {
      params.set('type', 'commercial')
    }

    // Set category based on category label
    if (categoryLabel === 'Buy a Home' || categoryLabel === 'Rent a Home') {
      params.set('category', item)
    } else if (categoryLabel === 'Land/Plot') {
      params.set('type', 'land')
      params.set('category', item)
    } else if (categoryLabel === 'Commercial' || categoryLabel === 'Commercial Rent') {
      params.set('type', 'commercial')
      params.set('category', item)
    } else if (categoryLabel === 'PG / Co-living') {
      params.set('category', item)
    }

    return params.toString()
  }

  return (
    <div>
      <h5 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">{heading}</h5>
      <ul className="space-y-3.5">
        {items.map((item) => (
          <li key={item}>
            <Link
              to={`/filter?${getFilterParams(item)}`}
              className="text-sm font-semibold text-slate-700 hover:text-[#1E88E5] transition-colors duration-200 text-left"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Navbar = ({ showNavbar = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [mounted, setMounted] = useState(false)
  const location = useLocation ? useLocation() : { pathname: '' }
  const navigate = useNavigate()
  const { openSignup } = useContext(AppContext)
  const { user, logout } = useAuth()

  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [cityQuery, setCityQuery] = useState('')
  const locationRef = useRef(null)
  const dropdownRef = useRef(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const userDropdownRef = useRef(null)
  const userTriggerRef = useRef(null)
  const [userDropdownPosition, setUserDropdownPosition] = useState({ top: 0, left: 0 })

  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false)
  const menuDropdownRef = useRef(null)
  const menuTriggerRef = useRef(null)
  const [menuDropdownPosition, setMenuDropdownPosition] = useState({ top: 0, left: 0 })

  const [openMegaMenu, setOpenMegaMenu] = useState(null)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const megaTriggerRefs = useRef({})
  const megaPanelRef = useRef(null)
  const [megaPosition, setMegaPosition] = useState({ top: 0, left: 0 })

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

  useEffect(() => {
    const onClickOutside = (e) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsLocationOpen(false)
      }
      if (
        userTriggerRef.current &&
        !userTriggerRef.current.contains(e.target) &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target)
      ) {
        setIsUserDropdownOpen(false)
      }
      if (
        menuTriggerRef.current &&
        !menuTriggerRef.current.contains(e.target) &&
        menuDropdownRef.current &&
        !menuDropdownRef.current.contains(e.target)
      ) {
        setIsMenuDropdownOpen(false)
      }
      const currentTrigger = openMegaMenu ? megaTriggerRefs.current[openMegaMenu] : null
      if (
        openMegaMenu &&
        currentTrigger &&
        !currentTrigger.contains(e.target) &&
        megaPanelRef.current &&
        !megaPanelRef.current.contains(e.target)
      ) {
        setOpenMegaMenu(null)
      }
    }
    const onEscape = (e) => {
      if (e.key === 'Escape') {
        setIsLocationOpen(false)
        setIsUserDropdownOpen(false)
        setIsMenuDropdownOpen(false)
        setOpenMegaMenu(null)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [openMegaMenu])

  useEffect(() => {
    if (isLocationOpen && locationRef.current) {
      const rect = locationRef.current.getBoundingClientRect()
      setDropdownPosition({ top: rect.bottom + 8, left: rect.left })
    }
  }, [isLocationOpen])

  useEffect(() => {
    if (isUserDropdownOpen && userTriggerRef.current) {
      const rect = userTriggerRef.current.getBoundingClientRect()
      setUserDropdownPosition({ top: rect.bottom + 8, left: rect.right - 200 })
    }
  }, [isUserDropdownOpen])

  useEffect(() => {
    if (isMenuDropdownOpen && menuTriggerRef.current) {
      const rect = menuTriggerRef.current.getBoundingClientRect()
      setMenuDropdownPosition({ top: rect.bottom + 8, left: rect.right - 160 })
    }
  }, [isMenuDropdownOpen])

  const toggleMegaMenu = (label) => {
    setIsLocationOpen(false)
    setIsUserDropdownOpen(false)
    setActiveCategoryIndex(0)
    setOpenMegaMenu((current) => {
      const next = current === label ? null : label
      if (next) {
        const trigger = megaTriggerRefs.current[label]
        if (trigger) {
          const rect = trigger.getBoundingClientRect()
          const panelWidth = 1100
          const left = Math.max(16, (window.innerWidth - panelWidth) / 2)
          setMegaPosition({ top: rect.bottom + 12, left })
        }
      }
      return next
    })
  }

  const activeMenuData = openMegaMenu ? MEGA_MENUS[openMegaMenu] : null
  const activeCategory = activeMenuData?.categories[activeCategoryIndex]
  const hasCol3 = !!activeCategory?.col3?.items?.length

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
        @keyframes loc-in {
          from { opacity: 0; transform: scale(0.95) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-loc-in { animation: loc-in 0.18s ease both; }
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

      {/* Main Navbar — top row + right-side icon set mirrors Header.jsx exactly */}
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
            className="flex items-center justify-between transition-all duration-300 relative"
            style={{ height: scrolled ? '68px' : '80px' }}
          >
            {/* Logo + location, matching Header */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link to="/" className="group flex items-center space-x-2.5">
                <img src={assets.logo} alt="Nestnbest" className="h-16 w-auto transition-transform duration-300 group-hover:scale-105" />
              </Link>
              <div className="relative" ref={locationRef}>
                <button
                  onClick={() => {
                    setOpenMegaMenu(null)
                    setIsLocationOpen((open) => !open)
                  }}
                  className="hidden sm:flex items-center gap-1 text-sm font-medium border-l border-gray-300 pl-4 text-gray-700 hover:text-[#193C06] transition-colors duration-200"
                >
                  All India
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200"
                    style={{ transform: isLocationOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {isLocationOpen &&
                  createPortal(
                    <div
                      ref={dropdownRef}
                      className="fixed w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40"
                      style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px`, maxHeight: '400px' }}
                    >
                      <div className="p-4 pb-4">
                        <h3 className="text-lg font-bold mb-4" style={{ color: GREEN }}>
                          Select City
                        </h3>

                        <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 shadow-sm mb-4">
                          <Search size={16} className="text-slate-400 flex-shrink-0" />
                          <input
                            type="text"
                            value={cityQuery}
                            onChange={(e) => setCityQuery(e.target.value)}
                            placeholder="Search city..."
                            className="flex-1 min-w-0 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1 pb-6">
                          {POPULAR_CITIES.filter(city =>
                            city.name.toLowerCase().includes(cityQuery.toLowerCase()) ||
                            city.state.toLowerCase().includes(cityQuery.toLowerCase())
                          ).map((city) => (
                            <button
                              key={city.name}
                              onClick={() => {
                                setCityQuery(city.name)
                                setIsLocationOpen(false)
                              }}
                              className="p-2 rounded-lg border border-slate-200 hover:border-[#1E88E5] hover:bg-[rgba(30,136,229,0.04)] transition-all duration-200 text-left"
                            >
                              <div className="font-semibold text-sm" style={{ color: GREEN }}>
                                {city.name}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">
                                {city.state}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>,
                    document.body
                  )}
              </div>
            </div>

            {/* Navigation Links — centered in the navbar */}
            <div className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) => {
                const hasMenu = !!MEGA_MENUS[link.label]
                return (
                  <div key={link.label} className="relative" ref={hasMenu ? (el) => (megaTriggerRefs.current[link.label] = el) : null}>
                    <button
                      onClick={() => (hasMenu ? toggleMegaMenu(link.label) : undefined)}
                      className="relative flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-[#193C06] transition-colors duration-200"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white leading-none">
                          {link.badge}
                        </span>
                      )}
                      {hasMenu && (
                        <ChevronDown
                          size={14}
                          className="transition-transform duration-200"
                          style={{ transform: openMegaMenu === link.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      )}
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Right-side actions */}
            <div className="hidden lg:flex items-center gap-7">
              <Link
                to={user ? "/post-property" : "/auth"}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: GREEN }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GREEN_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
              >
                Post property
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 leading-none">
                  FREE
                </span>
              </Link>

              <button
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:border-[#193C06] hover:text-[#193C06] transition-colors duration-200"
                aria-label="Support"
              >
                <Headphones size={16} />
              </button>

              <div className="relative" ref={userTriggerRef}>
                <button
                  onClick={() => {
                    setIsLocationOpen(false)
                    setOpenMegaMenu(null)
                    setIsUserDropdownOpen((open) => !open)
                  }}
                  className="relative flex items-center gap-1 text-gray-700 hover:text-[#193C06] transition-colors duration-200"
                >
                  <span className="relative">
                    <User size={22} />
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-rose-500 border border-[#F4F5F9]" />
                  </span>
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-200"
                    style={{ transform: isUserDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {isUserDropdownOpen &&
                  createPortal(
                    <div
                      ref={userDropdownRef}
                      className="fixed w-56 bg-white rounded-xl shadow-2xl overflow-hidden text-left animate-loc-in z-40"
                      style={{ top: `${userDropdownPosition.top}px`, left: `${userDropdownPosition.left}px` }}
                    >
                      {user ? (
                        <div className="py-2">
                          <div className="px-4 py-3 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-800 truncate">{user.name}</p>
                                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                              </div>
                            </div>
                          </div>
                          <Link to="/dashboard" onClick={() => setIsUserDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                            <User size={16} className="text-slate-400" />
                            Dashboard
                          </Link>
                          <Link to="/post-property" onClick={() => setIsUserDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                            <Sparkles size={16} className="text-slate-400" />
                            Post Property
                          </Link>
                          <div className="my-2 border-t border-slate-100" />
                          <button onClick={() => { setIsUserDropdownOpen(false); logout() }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200">
                            <X size={16} className="text-red-400" />
                            Logout
                          </button>
                        </div>
                      ) : (
                        <div className="py-2">
                          <button onClick={() => { setIsUserDropdownOpen(false); openSignup() }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                            <User size={16} className="text-slate-400" />
                            Sign In as User
                          </button>
                          <button onClick={() => { setIsUserDropdownOpen(false); openSignup() }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                            <User size={16} className="text-slate-400" />
                            Register as User
                          </button>
                          <div className="my-2 border-t border-slate-100" />

                        </div>
                      )}
                    </div>,
                    document.body
                  )}
              </div>

              <div className="relative" ref={menuTriggerRef}>
                <button
                  onClick={() => {
                    setIsLocationOpen(false)
                    setOpenMegaMenu(null)
                    setIsUserDropdownOpen(false)
                    setIsMenuDropdownOpen((open) => !open)
                  }}
                  className="text-gray-700 hover:text-[#193C06] transition-colors duration-200"
                >
                  <Menu size={22} />
                </button>

                {isMenuDropdownOpen &&
                  createPortal(
                    <div
                      ref={menuDropdownRef}
                      className="fixed w-40 bg-white rounded-xl shadow-2xl overflow-hidden text-left animate-loc-in z-40"
                      style={{ top: `${menuDropdownPosition.top}px`, left: `${menuDropdownPosition.left}px` }}
                    >
                      <div className="py-2">
                        <Link to="/about" onClick={() => setIsMenuDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                          About
                        </Link>
                        <Link to="/contact" onClick={() => setIsMenuDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                          Contact
                        </Link>
                        <Link to="/blog" onClick={() => setIsMenuDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                          Blog
                        </Link>
                        <Link to="/career" onClick={() => setIsMenuDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                          Career
                        </Link>
                        <Link to="/insight" onClick={() => setIsMenuDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                          Insights
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white leading-none">
                            NEW
                          </span>
                        </Link>
                        <Link to="/filter" onClick={() => setIsMenuDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                          Property Search
                        </Link>
                      </div>
                    </div>,
                    document.body
                  )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
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
            <div className="lg:hidden py-4 space-y-1 border-t border-gray-200 nb-fade-down">
              <button
                onClick={() => {
                  setIsLocationOpen(!isLocationOpen)
                }}
                className="flex items-center gap-1 w-full text-left text-gray-700 font-medium py-3 px-2 border-b border-gray-100 mb-1"
              >
                All India
                <ChevronDown
                  size={15}
                  className="transition-transform duration-200"
                  style={{ transform: isLocationOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              {NAV_LINKS.map((link, i) => {
                const isInsight = link.label === 'Insights'
                return isInsight ? (
                  <Link
                    key={link.label}
                    to="/insight"
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center justify-between text-gray-700 hover:text-[#193C06] font-medium py-3 px-2 rounded-lg hover:bg-white transition-all duration-200 nb-slide-in w-full text-left"
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
                ) : (
                  <button
                    key={link.label}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center justify-between text-gray-700 hover:text-[#193C06] font-medium py-3 px-2 rounded-lg hover:bg-white transition-all duration-200 nb-slide-in w-full text-left"
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
                  </button>
                )
              })}
              <div className="pt-3 mt-2 border-t border-gray-200 space-y-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:border-[#193C06] hover:text-[#193C06] transition-colors duration-200"
                  aria-label="Support"
                >
                  <Headphones size={16} />
                </button>
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 text-gray-700 hover:text-[#193C06] font-medium py-2.5 px-2 w-full rounded-lg hover:bg-white transition-all duration-200">
                      <User size={18} />
                      <span>Dashboard</span>
                    </Link>
                    <button onClick={() => { setIsMenuOpen(false); logout() }} className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium py-2.5 px-2 w-full rounded-lg hover:bg-white transition-all duration-200">
                      <X size={18} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 text-gray-700 hover:text-[#193C06] font-medium py-2.5 px-2 w-full rounded-lg hover:bg-white transition-all duration-200">
                    <User size={18} />
                    <span>Sign In</span>
                  </Link>
                )}
                <Link to={user ? "/post-property" : "/auth"} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 text-white font-medium px-6 py-2.5 rounded-lg text-center w-full transition-all duration-300 hover:shadow-md" style={{ backgroundColor: GREEN }}>
                  Post property (FREE)
                </Link>
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

      {/* Mega menu panel (portal) — identical structure to Header.jsx */}
      {openMegaMenu &&
        activeMenuData &&
        createPortal(
          <div
            ref={megaPanelRef}
            className="fixed w-[1100px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 flex"
            style={{ top: `${megaPosition.top}px`, left: `${megaPosition.left}px`, maxHeight: 'calc(100vh - 50px)' }}
          >
            {/* Column 1 — categories */}
            <div className="w-64 flex-shrink-0 bg-slate-50 py-6 px-5 space-y-1 overflow-y-auto flex flex-col">
              <div className="flex-1 space-y-1">
                {activeMenuData.categories.map((cat, i) => {
                  const isActive = i === activeCategoryIndex
                  return (
                    <button
                      key={cat.label}
                      onClick={() => setActiveCategoryIndex(i)}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide text-left transition-colors duration-200"
                      style={{
                        color: isActive ? GREEN : '#64748B',
                        backgroundColor: isActive ? 'rgba(25,60,6,0.06)' : 'transparent',
                      }}
                    >
                      <span className="flex items-center gap-2 normal-case font-bold">
                        {cat.label}
                        {cat.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-600 text-white leading-none normal-case">
                            {cat.badge}
                          </span>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="pt-5 mt-4 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
                contact us toll free on
                <div className="text-sm font-bold mt-1" style={{ color: GREEN }}>
                  {CONTACT_INFO.phone} <span className="font-normal text-slate-400">({CONTACT_INFO.hours})</span>
                </div>
              </div>
            </div>

            {/* Columns 2-4 */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 p-6 overflow-y-auto">
                <MenuColumn heading={activeCategory?.col2?.heading} items={activeCategory?.col2?.items} menuLabel={openMegaMenu} categoryLabel={activeCategory?.label} />
                {hasCol3 && <MenuColumn heading={activeCategory?.col3?.heading} items={activeCategory?.col3?.items} menuLabel={openMegaMenu} categoryLabel={activeCategory?.label} />}
                <AdCard menuLabel={openMegaMenu} spanFull={!hasCol3} />
              </div>

              <div className="flex items-center gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 text-sm text-slate-500">
                <Mail size={14} className="flex-shrink-0" />
                Email us at <span className="font-medium text-slate-700">{CONTACT_INFO.email}</span> or call us at
                <Phone size={14} className="flex-shrink-0 ml-1" />
                <span className="font-medium text-slate-700">{CONTACT_INFO.phone}</span> (IND Toll-Free)
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default Navbar