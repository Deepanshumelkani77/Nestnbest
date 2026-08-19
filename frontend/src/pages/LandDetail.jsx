import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLandById } from '../data/lands'
import {
  MapPin,
  Building2,
  Star,
  Maximize,
  Compass,
  Route,
  ShieldCheck,
  Heart,
  Share2,
  Download,
  Calendar,
  Phone,
  Mail,
  User,
  Send,
  ChevronLeft,
  ChevronRight,
  Camera,
  CheckCircle2,
  FileText,
  Droplets,
  Zap,
  TreePine,
  Fence,
  Landmark,
  Navigation,
  School,
  ShoppingBag,
  Hospital,
  TrainFront,
  TrendingUp,
  IndianRupee,
  BadgeCheck,
  AlertTriangle,
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const SIMILAR_LANDS = [
  { name: 'Residential Plot, Sector 92', location: 'Gurgaon', price: '₹3.8 Cr', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop', area: '450 sq.yards' },
  { name: 'Corner Plot, Sector 108', location: 'Gurgaon', price: '₹5.1 Cr', image: 'https://images.unsplash.com/photo-1586859821397-c81e4971ca82?w=400&h=300&fit=crop', area: '520 sq.yards' },
  { name: 'Residential Land, Sohna Road', location: 'Gurgaon', price: '₹2.9 Cr', image: 'https://images.unsplash.com/photo-1587745890135-20db8c79b027?w=400&h=300&fit=crop', area: '400 sq.yards' },
]

const NEARBY_ICONS = {
  school: School,
  hospital: Hospital,
  shopping: ShoppingBag,
  metro: TrainFront,
}

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100">
    <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(30,136,229,0.1)' }}>
      <Icon size={17} style={{ color: BLUE }} />
    </span>
    <div className="min-w-0">
      <div className="font-bold text-sm leading-tight truncate" style={{ color: NAVY }}>{value}</div>
      <div className="text-slate-500 text-xs leading-tight truncate">{label}</div>
    </div>
  </div>
)

const SectionCard = ({ title, eyebrow, children }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-7">
    {eyebrow && <span className="text-xs font-bold tracking-wider uppercase" style={{ color: BLUE }}>{eyebrow}</span>}
    <h2 className="text-xl sm:text-2xl font-bold mt-1 mb-5" style={{ color: NAVY }}>{title}</h2>
    {children}
  </div>
)

const SpecRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between py-3.5 border-b border-slate-50 last:border-b-0">
    <span className="flex items-center gap-2.5 text-sm text-slate-500">
      <Icon size={15} className="text-slate-400" />
      {label}
    </span>
    <span className="text-sm font-semibold" style={{ color: NAVY }}>{value}</span>
  </div>
)

const ChevronDivider = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 6l6 6-6 6" />
  </svg>
)

const LandDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const land = getLandById(Number(id))
  const [activeImage, setActiveImage] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  if (!land) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Listing Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-lg text-white font-semibold bg-[#193C06] hover:bg-[#0f2604] transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  const images = land.images || [land.image, land.image, land.image, land.image, land.image]

  // ---- Price trend data (per sq.yard) ----
  const priceTrendData = useMemo(() => {
    return land.priceTrend || [
      { year: '2021', price: 62000 },
      { year: '2022', price: 68000 },
      { year: '2023', price: 76000 },
      { year: '2024', price: 85000 },
      { year: '2025', price: 92000 },
      { year: '2026', price: 101000 },
    ]
  }, [land])

  const priceAppreciation = useMemo(() => {
    const first = priceTrendData[0].price
    const last = priceTrendData[priceTrendData.length - 1].price
    return (((last - first) / first) * 100).toFixed(1)
  }, [priceTrendData])

  const nearby = land.nearby || [
    { label: 'DPS International School', distance: '1.2 km', icon: 'school' },
    { label: 'Max Hospital', distance: '2.5 km', icon: 'hospital' },
    { label: 'Sector 88 Market', distance: '0.8 km', icon: 'shopping' },
    { label: 'Rapid Metro Station', distance: '3.1 km', icon: 'metro' },
  ]

  const goToImage = (dir) => {
    setActiveImage((prev) => {
      const next = prev + dir
      if (next < 0) return images.length - 1
      if (next >= images.length) return 0
      return next
    })
  }

  return (
    <div className="w-full bg-slate-50 pt-20">
      {/* ---- Breadcrumb ---- */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="hover:text-[#1E88E5] cursor-pointer transition-colors duration-150">Home</span>
            <ChevronDivider />
            <span className="hover:text-[#1E88E5] cursor-pointer transition-colors duration-150">Land & Plots</span>
            <ChevronDivider />
            <span className="font-medium" style={{ color: NAVY }}>{land.title}</span>
          </div>
        </div>
      </div>

      {/* ---- Gallery ---- */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-3 rounded-2xl overflow-hidden">
          <div className="relative h-[280px] sm:h-[420px] rounded-2xl overflow-hidden group">
            <img src={images[activeImage]} alt={land.title} className="w-full h-full object-cover" />
            <button
              onClick={() => goToImage(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} style={{ color: NAVY }} />
            </button>
            <button
              onClick={() => goToImage(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={18} style={{ color: NAVY }} />
            </button>
            {land.featured && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-amber-500">
                Featured
              </span>
            )}
            <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/50 text-white flex items-center gap-1.5">
              <Camera size={13} />
              {activeImage + 1} / {images.length}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 h-[280px] sm:h-[420px]">
            {images.slice(1, 5).map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i + 1)} className="relative rounded-xl overflow-hidden h-full">
                <img src={img} alt={`${land.title} view ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Title + quick actions ---- */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-7">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>{land.title}</h1>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                  {land.type}
                </span>
                {land.verified !== false && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(30,136,229,0.1)', color: BLUE }}>
                    <BadgeCheck size={12} />
                    Verified
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-400" />
                  {land.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 size={14} className="text-slate-400" />
                  Posted by {land.postedBy}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setIsSaved((s) => !s)}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 transition-colors duration-200"
                aria-label="Save listing"
              >
                <Heart size={18} fill={isSaved ? '#EF4444' : 'none'} style={{ color: isSaved ? '#EF4444' : '#64748B' }} />
              </button>
              <button className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 transition-colors duration-200" aria-label="Share listing">
                <Share2 size={18} className="text-slate-500" />
              </button>
              <div className="text-right">
                <p className="text-2xl font-bold" style={{ color: NAVY }}>{land.price}</p>
                <p className="text-slate-400 text-xs">{land.pricePerSqyd || 'Price negotiable'}</p>
              </div>
            </div>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-100">
            <StatCard icon={Maximize} label="Area" value={land.area} />
            <StatCard icon={Fence} label="Dimensions" value={land.dimensions} />
            <StatCard icon={Landmark} label="Land Type" value={land.type} />
            <StatCard icon={Compass} label="Facing" value={land.facing || 'East'} />
            <StatCard icon={ShieldCheck} label="Title" value="Clear & Verified" />
          </div>
        </div>
      </div>

      {/* ---- Main grid ---- */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <SectionCard eyebrow="Overview" title="About this land">
              <p className="text-slate-600 leading-relaxed">
                {land.description ||
                  `A well-located ${land.area} ${land.type.toLowerCase()} plot in ${land.location}, offering ${land.dimensions} of frontage-ready land with clear title and easy access to major roads. Ideal for immediate construction or long-term investment.`}
              </p>
              {land.features && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {land.features.map((f) => (
                    <span key={f} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600">
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </SectionCard>

            {/* Plot specifications */}
            <SectionCard eyebrow="Specifications" title="Plot details">
              <div>
                <SpecRow icon={Maximize} label="Total Area" value={land.area} />
                <SpecRow icon={Fence} label="Plot Dimensions" value={land.dimensions} />
                <SpecRow icon={Compass} label="Facing Direction" value={land.facing || 'East'} />
                <SpecRow icon={Route} label="Approach Road Width" value={land.roadWidth || '40 ft'} />
                <SpecRow icon={Landmark} label="Land Use Zoning" value={land.type} />
                <SpecRow icon={Droplets} label="Water Connection" value={land.waterConnection === false ? 'Not available' : 'Available'} />
                <SpecRow icon={Zap} label="Electricity Connection" value={land.electricityConnection === false ? 'Not available' : 'Available'} />
                <SpecRow icon={TreePine} label="Boundary Wall" value={land.boundaryWall === false ? 'Not built' : 'Built'} />
              </div>
            </SectionCard>

            {/* Price trends */}
            <SectionCard eyebrow="Market Insights" title="Price trends in this locality">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(16,185,129,0.1)' }}>
                    <TrendingUp size={17} className="text-emerald-600" />
                  </span>
                  <div>
                    <div className="font-bold text-sm" style={{ color: NAVY }}>+{priceAppreciation}%</div>
                    <div className="text-slate-500 text-xs">5-year appreciation</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(30,136,229,0.1)' }}>
                    <IndianRupee size={17} style={{ color: BLUE }} />
                  </span>
                  <div>
                    <div className="font-bold text-sm" style={{ color: NAVY }}>
                      ₹{priceTrendData[priceTrendData.length - 1].price.toLocaleString('en-IN')}/sq.yd
                    </div>
                    <div className="text-slate-500 text-xs">Current avg. rate</div>
                  </div>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="landPriceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={BLUE} stopOpacity={0.25} />
                        <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#94A3B8' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `₹${v / 1000}k`}
                      width={45}
                    />
                    <Tooltip
                      formatter={(value) => [`₹${value.toLocaleString('en-IN')}/sq.yd`, 'Avg. Price']}
                      contentStyle={{ borderRadius: 10, border: '1px solid #F1F5F9', fontSize: 13 }}
                    />
                    <Area type="monotone" dataKey="price" stroke={BLUE} strokeWidth={2.5} fill="url(#landPriceGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-slate-400 text-xs mt-4">
                * Price trends are indicative, based on transacted land prices in the surrounding locality over the last 5 years.
              </p>
            </SectionCard>

            {/* Location & connectivity */}
            <SectionCard eyebrow="Location" title="Location & connectivity">
              <div className="rounded-xl overflow-hidden border border-slate-100 h-64 mb-5">
                <iframe
                  title={`${land.title} location`}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${land.coordinates || land.location}&z=14&output=embed`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {nearby.map((n) => {
                  const Icon = NEARBY_ICONS[n.icon] || Navigation
                  return (
                    <div key={n.label} className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(30,136,229,0.1)' }}>
                        <Icon size={16} style={{ color: BLUE }} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">{n.label}</p>
                        <p className="text-xs text-slate-400">{n.distance} away</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </SectionCard>

            {/* Legal & documents */}
            <SectionCard eyebrow="Legal" title="Title & documentation">
              <div className="space-y-3">
                {[
                  { label: 'Title Deed', status: 'Verified' },
                  { label: 'Encumbrance Certificate', status: 'Verified' },
                  { label: 'Latest Tax Receipt', status: 'Verified' },
                  { label: 'Land Use Conversion (if applicable)', status: land.landUseConverted === false ? 'Pending' : 'Verified' },
                ].map((doc) => (
                  <div key={doc.label} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="flex items-center gap-2.5 text-sm text-slate-600">
                      <FileText size={15} className="text-slate-400" />
                      {doc.label}
                    </span>
                    {doc.status === 'Verified' ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <CheckCircle2 size={13} />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                        <AlertTriangle size={13} />
                        Pending
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-xs mt-4">
                Buyers are advised to independently verify all documents through legal counsel before finalising the transaction.
              </p>
            </SectionCard>

            {/* Similar lands */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-5" style={{ color: NAVY }}>Similar land nearby</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {SIMILAR_LANDS.map((p) => (
                  <div key={p.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="h-36 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm mb-1" style={{ color: NAVY }}>{p.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                        <MapPin size={11} />
                        {p.location}
                      </p>
                      <p className="text-xs text-slate-400 mb-2">{p.area}</p>
                      <p className="font-bold text-sm" style={{ color: NAVY }}>{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Enquiry form */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="font-bold text-lg mb-1" style={{ color: NAVY }}>Interested in this land?</h3>
                <p className="text-slate-500 text-sm mb-5">Get a callback from the {land.postedBy.toLowerCase()} within 30 minutes.</p>

                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 focus-within:border-[#1E88E5] transition-colors duration-200">
                    <User size={15} className="text-slate-400 flex-shrink-0" />
                    <input type="text" placeholder="Your name" className="flex-1 min-w-0 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none" />
                  </div>
                  <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 focus-within:border-[#1E88E5] transition-colors duration-200">
                    <Phone size={15} className="text-slate-400 flex-shrink-0" />
                    <input type="tel" placeholder="Phone number" className="flex-1 min-w-0 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none" />
                  </div>
                  <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 focus-within:border-[#1E88E5] transition-colors duration-200">
                    <Mail size={15} className="text-slate-400 flex-shrink-0" />
                    <input type="email" placeholder="Email address" className="flex-1 min-w-0 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none" />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ backgroundColor: BLUE }}
                  >
                    Request Callback
                    <Send size={14} />
                  </button>
                </form>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                    <Download size={14} />
                    Brochure
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                    <Calendar size={14} />
                    Site Visit
                  </button>
                </div>
              </div>

              {/* Seller info */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="font-bold text-base mb-4" style={{ color: NAVY }}>Listed by</h3>
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(25,60,6,0.08)' }}>
                    <User size={20} style={{ color: NAVY }} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: NAVY }}>{land.sellerName || `${land.postedBy} Listing`}</p>
                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                      <Star size={11} fill="#F59E0B" className="text-amber-500" />
                      {land.sellerRating || '4.6'} · {land.postedBy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust badge */}
              <div className="rounded-2xl p-6" style={{ background: `linear-gradient(120deg, ${NAVY}, #2E5C10)` }}>
                <span className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-white/10">
                  <ShieldCheck size={20} className="text-white" />
                </span>
                <h3 className="text-white font-bold text-base mb-2">Verified Listing</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  This land's title and ownership documents have been verified by our team for accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandDetail
