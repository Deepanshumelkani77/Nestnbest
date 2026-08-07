import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Headphones,
  User,
  Menu,
  LocateFixed,
  Mic,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Phone,
  Mail,
} from 'lucide-react'
import assets from '../assets/assets'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

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
const POPULAR_CITIES = [
  { name: 'Delhi', state: 'Delhi NCR' },
  { name: 'Mumbai', state: 'Maharashtra' },
  { name: 'Bangalore', state: 'Karnataka' },
  { name: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Hyderabad', state: 'Telangana' },
  { name: 'Pune', state: 'Maharashtra' },
  { name: 'Kolkata', state: 'West Bengal' },
  { name: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Jaipur', state: 'Rajasthan' },
  { name: 'Lucknow', state: 'Uttar Pradesh' },
  { name: 'Chandigarh', state: 'Punjab' },
  { name: 'Noida', state: 'Delhi NCR' },
  { name: 'Gurgaon', state: 'Delhi NCR' },
  { name: 'Faridabad', state: 'Delhi NCR' },
  { name: 'Ghaziabad', state: 'Delhi NCR' },
]

const HERO_IMAGES = [assets.header, assets.header2, assets.header3, assets.header4].filter(Boolean)

// ---- Mega menu content -----------------------------------------------
// Each top-level nav item -> a left sidebar of categories, and per-category
// content for column 2 (sub-items) and column 3 (sub-sub / popular items).
// If a category has no column-3 data, the ad card automatically spans
// columns 3-4 instead of just column 4.

const AD_CARDS = {
  'For Buyers': {
    label: 'INTRODUCING',
    title: 'Insights',
    bullets: ['Understand localities', 'Read Resident Reviews', 'Check Price Trends', 'Tools, Utilities & more'],
  },
  'For Tenants': {
    label: 'INTRODUCING',
    title: 'Verified Listings',
    bullets: ['Owner-verified only', 'Zero brokerage tags', 'Photo & video tours', 'Instant contact details'],
  },
  'For Owners': {
    label: 'GROW FASTER',
    title: 'List for Free',
    bullets: ['Reach lakhs of buyers', 'Free property valuation', 'Dedicated relationship manager', 'Priority listing boost'],
  },
  'For Dealers / Builders': {
    label: 'PARTNER WITH US',
    title: 'Dealer Suite',
    bullets: ['Bulk lead management', 'Project microsites', 'Performance dashboard', 'Verified dealer badge'],
  },
}

const CONTACT_INFO = {
  phone: '1800 41 99099',
  hours: '9AM - 11PM IST',
  email: 'services@nestnbest.com',
}

const MEGA_MENUS = {
  'For Buyers': {
    categories: [
      {
        label: 'Buy a Home',
        col2: { heading: 'Properties in Delhi', items: ['Flats / Apartments', 'Independent Houses', 'Villas', 'Builder Floors','Penthouses','Farmhouses'] },
        col3: { heading: 'Popular Searches', items: ['Property in Delhi', 'Verified Property in Delhi', 'New Projects'] },
      },
      {
        label: 'Land/Plot',
        col2: { heading: 'Plot Types', items: ['Residential Plots','Commercial Plots', 'Agricultural Land', 'Farm House Land','Industrial Land','Corner Plots','Gated Community Plots'] },
        col3: { heading: 'Popular Searches', items: ['Plots near me', 'Gated community plots'] },
      },
      {
        label: 'Commercial',
        col2: { heading: 'Commercial Spaces', items: ['Office Space', 'Retail Shops', 'Showroom', 'Warehouse','Industrial Building','Factory','Restaurant Space','Hotel','Co-working Space'] },
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
        col2: { heading: 'Rentals in Delhi', items: ['Flats / Apartments', 'Independent Houses', 'Villas','Builder Floors','Studio Apartments','Penthouses','Farmhouses'] },
        col3: { heading: 'Popular Searches', items: ['1 BHK for Rent', '2 BHK for Rent', 'Pet-Friendly Rentals'] },
      },
      {
 
        label: 'PG / Co-living',
        col2: { heading: 'PG Options', items: [' Boys PG', 'Girls PG', 'Co-living Spaces','Single Rooms','Shared Rooms','Private Rooms'] },
        col3: { heading: 'Popular Searches', items: ['PG near me', 'PG with Food'] },
      },
      {
        
        label: 'Commercial Rent',
        col2: { heading: 'Rent for Business', items: ['Office Space', 'Shops', 'Showrooms', 'Retail Space', 'Warehouse', 'Factory', 'Industrial Space', 'Restaurant Space', 'Hotel Space', 'Co-working Space', 'Business Center'] },
        col3: null,
      },
     
    ],
  },
  'For Owners': {
    categories: [
      {
        label: 'List Your Property',
        col2: { heading: 'Post a Listing', items: ['Post Property Free', 'Upload Photos & Videos', 'Get Verified Badge'] },
        col3: { heading: 'Popular Tools', items: ['Rent Estimator', 'Property Valuation'] },
      },
      {
        label: 'Manage Listings',
        col2: { heading: 'Owner Dashboard', items: ['Track Enquiries', 'Edit Listings', 'Boost Visibility'] },
        col3: null,
      },
      
    ],
  },
  'For Dealers / Builders': {
    categories: [
      {
        label: 'Dealer Solutions',
        col2: { heading: 'For Dealers', items: ['Bulk Listing Upload', 'Lead Management', 'Verified Dealer Badge'] },
        col3: { heading: 'Popular Tools', items: ['CRM Integration', 'Performance Reports'] },
      },
      
      { label: 'Advertise With Us', col2: null, col3: null },
    ],
  },
}

const NAV_LINKS = [
  { label: 'For Buyers' },
  { label: 'For Tenants' },
  { label: 'For Owners' },
  { label: 'For Dealers / Builders' },
  { label: 'Insights', badge: 'NEW' },
]

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
      <h4 className="text-xl font-bold mt-1 mb-3" style={{ color: NAVY }}>
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

const MenuColumn = ({ heading, items }) => {
  if (!heading || !items?.length) return null
  return (
    <div>
      <h5 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">{heading}</h5>
      <ul className="space-y-3.5">
        {items.map((item) => (
          <li key={item}>
            <button className="text-sm font-semibold text-slate-700 hover:text-[#1E88E5] transition-colors duration-200 text-left">
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Header = () => {
  const [activeTab, setActiveTab] = useState('Buy')
  const [query, setQuery] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [locationTab, setLocationTab] = useState('Buy')
  const [cityQuery, setCityQuery] = useState('')
  const locationRef = useRef(null)
  const dropdownRef = useRef(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })

  const [openMegaMenu, setOpenMegaMenu] = useState(null)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const megaTriggerRefs = useRef({})
  const megaPanelRef = useRef(null)
  const [megaPosition, setMegaPosition] = useState({ top: 0, left: 0 })

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

  const toggleMegaMenu = (label) => {
    setIsLocationOpen(false)
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

  // Image slideshow effect
  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToPreviousImage = () => setCurrentImageIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
  const goToNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)

  const activeMenuData = openMegaMenu ? MEGA_MENUS[openMegaMenu] : null
  const activeCategory = activeMenuData?.categories[activeCategoryIndex]
  const hasCol3 = !!activeCategory?.col3?.items?.length

  return (
    <div className="w-full">
      {/* Backdrop overlay when any dropdown is open */}
      {(isLocationOpen || openMegaMenu) && (
        <div
          className="fixed inset-0 bg-black/15 backdrop-blur-[2px] z-20 transition-opacity duration-200"
          onClick={() => {
            setIsLocationOpen(false)
            setOpenMegaMenu(null)
          }}
        />
      )}

      {/* Hero with overlaid nav + promo banner */}
      <div className="relative w-full h-[280px] sm:h-[400px] overflow-hidden">
        {HERO_IMAGES.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Featured property"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />

        {HERO_IMAGES.length > 1 && (
          <>
            <button
              onClick={goToPreviousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-200 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-200 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </>
        )}

        {/* Top nav overlay */}
        <div className="relative z-20">
          <div className="max-w-8xl bg-black/40 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo + location */}
              <div className="flex items-center gap-4">
                <Link to="/" className="text-2xl font-bold text-white">
                  Nestnbest
                </Link>

                <div className="relative" ref={locationRef}>
                  <button
                    onClick={() => {
                      setOpenMegaMenu(null)
                      setIsLocationOpen((open) => !open)
                    }}
                    className="hidden sm:flex items-center gap-1 text-white/90 text-sm font-medium border-l border-white/30 pl-4 hover:text-white transition-colors duration-200"
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
                          <h3 className="text-lg font-bold mb-4" style={{ color: NAVY }}>
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

                          <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
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
                                <div className="font-semibold text-sm" style={{ color: NAVY }}>
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

              {/* Right nav links */}
              <div className="hidden lg:flex items-center gap-7">
                {NAV_LINKS.map((link) => {
                  const hasMenu = !!MEGA_MENUS[link.label]
                  return (
                    <div key={link.label} className="relative" ref={hasMenu ? (el) => (megaTriggerRefs.current[link.label] = el) : null}>
                      <button
                        onClick={() => (hasMenu ? toggleMegaMenu(link.label) : undefined)}
                        className="relative flex items-center gap-1.5 text-white/90 text-sm font-medium hover:text-white transition-colors duration-200"
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

                <button className="text-white hover:text-white/80 transition-colors duration-200">
                  <Menu size={22} />
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

      {/* Mega menu panel (portal) */}
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
                        color: isActive ? NAVY : '#64748B',
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
                <div className="text-sm font-bold mt-1" style={{ color: NAVY }}>
                  {CONTACT_INFO.phone} <span className="font-normal text-slate-400">({CONTACT_INFO.hours})</span>
                </div>
              </div>
            </div>

            {/* Columns 2-4 */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 p-6 overflow-y-auto">
                <MenuColumn heading={activeCategory?.col2?.heading} items={activeCategory?.col2?.items} />
                {hasCol3 && <MenuColumn heading={activeCategory?.col3?.heading} items={activeCategory?.col3?.items} />}
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

      {/* Tab bar + search — overlapping card below the hero */}
      <div className="relative z-10 -mt-18">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-t-2xl shadow-2xl border border-slate-100">
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
                      <span className="absolute left-0 right-0 -bottom-px h-[3px] rounded-full transition-all duration-300" style={{ backgroundColor: BLUE }} />
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
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 transition-colors duration-200 hover:bg-slate-50" aria-label="Use current location">
                  <LocateFixed size={18} style={{ color: BLUE }} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 transition-colors duration-200 hover:bg-slate-50" aria-label="Search by voice">
                  <Mic size={18} style={{ color: BLUE }} />
                </button>
                <button className="px-8 py-2.5 rounded-lg text-white text-sm sm:text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg" style={{ backgroundColor: BLUE }}>
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