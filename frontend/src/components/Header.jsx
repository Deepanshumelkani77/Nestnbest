import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import {
  Search,
  ChevronDown,
  ChevronRight,
  Headphones,
  User,
  Menu,
  LocateFixed,
  Mic,
} from 'lucide-react'
import assets from '../assets/assets'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const NAV_LINKS = [
  { label: 'For Buyers' },
  { label: 'For Tenants' },
  { label: 'For Owners' },
  { label: 'For Dealers / Builders' },
  { label: 'Insights', badge: 'NEW' },
]

const TABS = [
  { label: 'Buy' },
  { label: 'Rent' },
  { label: 'New Launch', dot: true },
  { label: 'Commercial' },
  { label: 'Plots/Land' },
  { label: 'Projects' },
]

const LOCATION_TABS = ['Buy', 'Rent / Lease', 'Plots/Land', 'PG / Co-living']

const RECENT_SEARCHES = ['PG in Central Delhi', 'Buy in Central Delhi']

const QUICK_REGIONS = ['All India', 'Dubai', 'For NRI']

const Header = () => {
  const [activeTab, setActiveTab] = useState('Buy')
  const [query, setQuery] = useState('')

  const [isLocationOpen,setIsLocationOpen] = useState(false)
  const [locationTab, setLocationTab] = useState('Buy')
  const [cityQuery, setCityQuery] = useState('')
  const locationRef = useRef(null)
  const dropdownRef = useRef(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const onClickOutside = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target) && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsLocationOpen(false)
      }
    }
    const onEscape = (e) => {
      if (e.key === 'Escape') setIsLocationOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  useEffect(() => {
    if (isLocationOpen && locationRef.current) {
      const rect = locationRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left
      })
    }
  }, [isLocationOpen])

  return (
    <div className="w-full">
      {/* Backdrop overlay when dropdown is open */}
      {isLocationOpen && (
        <div
          className="fixed inset-0 bg-black/15 backdrop-blur-[2px] z-20 transition-opacity duration-200"
          onClick={() => setIsLocationOpen(false)}
        />
      )}

      {/* Hero with overlaid nav + promo banner */}
      <div className="relative w-full h-[280px] sm:h-[400px] overflow-hidden">
        <img
          src={assets.header}
          alt="Featured property"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />

        {/* Top nav overlay */}
        <div className="relative z-20">
          <div className="max-w-8xl bg-black/40 mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="flex items-center justify-between h-16">
              {/* Logo + location */}
              <div className="flex items-center gap-4">
                <Link to="/" className="text-2xl font-bold text-white">
                  Nestnbest
                </Link>

                <div className="relative" ref={locationRef}>
                  <button
                    onClick={() => setIsLocationOpen((open) => !open)}
                    className="hidden sm:flex items-center gap-1 text-white/90 text-sm font-medium border-l border-white/30 pl-4 hover:text-white transition-colors duration-200"
                  >
                    Buy in Central Delhi
                    <ChevronDown
                      size={16}
                      className="transition-transform duration-200"
                      style={{ transform: isLocationOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>

                  {/* Location dropdown */}
                  {isLocationOpen &&
                    createPortal(
                      <div
                        ref={dropdownRef}
                        className="fixed w-[700px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-y-auto text-left animate-loc-in z-40"
                        style={{
                          top: `${dropdownPosition.top}px`,
                          left: `${dropdownPosition.left}px`,
                          maxHeight: 'calc(100vh - 50px)'
                        }}
                      >
                      <div className="p-6 pb-5">
                        <h3 className="text-2xl font-bold mb-5" style={{ color: NAVY }}>
                          Explore real estate in...
                        </h3>

                        {/* Tabs */}
                        <div className="flex items-center gap-6 mb-5">
                          {LOCATION_TABS.map((tab) => {
                            const isActive = locationTab === tab
                            return (
                              <button
                                key={tab}
                                onClick={() => setLocationTab(tab)}
                                className="relative pb-2.5 text-sm sm:text-base font-semibold transition-colors duration-200"
                                style={{ color: isActive ? NAVY : '#94A3B8' }}
                              >
                                {tab}
                                {isActive && (
                                  <span
                                    className="absolute left-0 right-0 -bottom-px h-[3px] rounded-full"
                                    style={{ backgroundColor: BLUE }}
                                  />
                                )}
                              </button>
                            )
                          })}
                        </div>

                        {/* Search row */}
                        <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
                          <button className="flex items-center gap-1 text-sm font-semibold flex-shrink-0" style={{ color: NAVY }}>
                            Residential
                            <ChevronDown size={15} className="text-slate-400" />
                          </button>
                          <div className="h-5 w-px bg-slate-200 flex-shrink-0" />
                          <Search size={17} className="text-slate-400 flex-shrink-0" />
                          <input
                            type="text"
                            value={cityQuery}
                            onChange={(e) => setCityQuery(e.target.value)}
                            placeholder="City Name"
                            className="flex-1 min-w-0 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
                          />
                          <div className="h-5 w-px bg-slate-200 flex-shrink-0" />
                          <button
                            className="px-5 py-2 rounded-lg text-white text-sm font-semibold flex-shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                            style={{ backgroundColor: BLUE }}
                          >
                            Explore
                          </button>
                        </div>

                        {/* Recent searches */}
                        <p className="text-sm text-slate-500 mt-5 mb-3">Continue browsing where you left off...</p>
                        <div className="flex flex-wrap gap-2">
                          {RECENT_SEARCHES.map((item, i) => (
                            <button
                              key={item}
                              className="px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200"
                              style={
                                i === 0
                                  ? { color: BLUE, borderColor: BLUE, backgroundColor: 'rgba(30,136,229,0.06)' }
                                  : { color: '#334155', borderColor: '#E2E8F0' }
                              }
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Bottom quick-regions bar */}
                      <div className="flex items-center justify-between gap-4 px-6 py-4 bg-slate-50 border-t border-slate-100">
                        <div className="flex items-center gap-4 text-sm font-medium text-slate-600 flex-wrap">
                          {QUICK_REGIONS.map((region) => (
                            <button key={region} className="hover:text-[#1E88E5] transition-colors duration-200">
                              {region}
                            </button>
                          ))}
                          <div className="leading-tight">
                            <div className="text-slate-700 font-semibold">International</div>
                            <div className="text-xs text-slate-400">Powered by listglobally.com</div>
                          </div>
                        </div>
                        <button
                          className="flex items-center gap-1 text-sm font-semibold whitespace-nowrap flex-shrink-0"
                          style={{ color: NAVY }}
                        >
                          View top cities
                          <ChevronRight size={15} />
                        </button>
                      </div>
                    </div>,
                    document.body
                  )}
                </div>
              </div>

              {/* Right nav links */}
              <div className="hidden lg:flex items-center gap-7">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    className="relative flex items-center gap-1.5 text-white/90 text-sm font-medium hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white leading-none">
                        {link.badge}
                      </span>
                    )}
                  </button>
                ))}

                <button
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ color: NAVY }}
                >
                  Post property
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 leading-none">
                    FREE
                  </span>
                </button>

                <button className="w-9 h-9 flex items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors duration-200">
                  <Headphones size={16} />
                </button>

                <button className="relative flex items-center gap-1 text-white hover:text-white/80 transition-colors duration-200">
                  <span className="relative">
                    <User size={22} />
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-rose-500 border border-white" />
                  </span>
                  <ChevronDown size={14} />
                </button>
              </div>

              {/* Mobile menu button */}
              <button className="lg:hidden text-white p-2">
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab bar + search — overlapping card below the hero */}
      <div className="relative z-10 -mt-18">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-t-2xl shadow-2xl border border-slate-100">
            {/* Tabs */}
            <div className="flex items-center gap-8 px-6 pt-5 overflow-x-auto scrollbar-hide">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.label
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className="relative flex items-center gap-1.5 pb-4 text-sm sm:text-base font-semibold whitespace-nowrap transition-colors duration-200"
                    style={{ color: isActive ? NAVY : '#475569' }}
                  >
                    {tab.label}
                    {tab.dot && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                    {isActive && (
                      <span
                        className="absolute left-0 right-0 -bottom-px h-[3px] rounded-full transition-all duration-300"
                        style={{ backgroundColor: BLUE }}
                      />
                    )}
                  </button>
                )
              })}
              <div className="ml-auto flex-shrink-0 pb-4">
                <button className="flex items-center gap-1.5 text-sm sm:text-base font-semibold" style={{ color: NAVY }}>
                  Post Property
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 leading-none">
                    FREE
                  </span>
                </button>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Search row */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 px-4 sm:px-6 py-4">
              <button className="flex items-center gap-1.5 px-4 py-3 sm:pr-5 sm:border-r border-slate-200 text-sm font-semibold flex-shrink-0" style={{ color: NAVY }}>
                All Residential
                <ChevronDown size={16} className="text-slate-400" />
              </button>

              <div className="flex items-center gap-3 flex-1 px-4 sm:px-5">
                <Search size={18} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Search "Flats for rent in sector 77 Noida"'
                  className="w-full bg-transparent text-sm sm:text-base text-slate-700 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 justify-end sm:pr-2">
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 transition-colors duration-200 hover:bg-slate-50"
                  aria-label="Use current location"
                >
                  <LocateFixed size={18} style={{ color: BLUE }} />
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 transition-colors duration-200 hover:bg-slate-50"
                  aria-label="Search by voice"
                >
                  <Mic size={18} style={{ color: BLUE }} />
                </button>
                <button
                  className="px-8 py-2.5 rounded-lg text-white text-sm sm:text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: BLUE }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes loc-in {
          from { opacity: 0; transform: scale(0.97) translateY(-6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-loc-in { animation: loc-in 0.18s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .animate-loc-in { animation: none; }
        }
      `}</style>
    </div>
  )
}

export default Header