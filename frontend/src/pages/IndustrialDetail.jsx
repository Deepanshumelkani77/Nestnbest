import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getIndustrialById } from '../data/industrial'
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
  Layers,
  BadgeCheck,
  AlertTriangle,
  TrendingUp,
  IndianRupee,
  Navigation,
  School,
  ShoppingBag,
  Hospital,
  TrainFront,
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const SIMILAR_INDUSTRIAL = [
  { name: 'Manesar Industrial Shed', location: 'Gurgaon', price: '₹8.5 Cr', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop', area: '7,080 sq.ft' },
  { name: 'Bhiwadi Warehouse', location: 'Rajasthan', price: '₹6.2 Cr', image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&h=300&fit=crop', area: '6,525 sq.ft' },
  { name: 'Kundli Industrial Complex', location: 'Haryana', price: '₹9.2 Cr', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', area: '8,000 sq.ft' },
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

const IndustrialDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const industrial = getIndustrialById(Number(id))
  const [activeImage, setActiveImage] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  if (!industrial) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Property Not Found</h2>
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

  const images = industrial.images || [industrial.image, industrial.image, industrial.image, industrial.image, industrial.image]

  // ---- Price trend data (per sq.ft) ----
  const priceTrendData = useMemo(() => {
    return industrial.priceTrend || [
      { year: '2021', price: 10000 },
      { year: '2022', price: 10800 },
      { year: '2023', price: 11400 },
      { year: '2024', price: 12000 },
      { year: '2025', price: 12800 },
      { year: '2026', price: 13500 },
    ]
  }, [industrial])

  const priceAppreciation = useMemo(() => {
    const first = priceTrendData[0].price
    const last = priceTrendData[priceTrendData.length - 1].price
    return (((last - first) / first) * 100).toFixed(1)
  }, [priceTrendData])

  const nearby = industrial.nearby || [
    { label: 'Industrial Area Metro', distance: '2.0 km', icon: 'metro' },
    { label: 'Industrial Market', distance: '1.5 km', icon: 'shopping' },
    { label: 'District Hospital', distance: '4.0 km', icon: 'hospital' },
    { label: 'Industrial School', distance: '2.0 km', icon: 'school' },
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
            <span className="hover:text-[#1E88E5] cursor-pointer transition-colors duration-150">Industrial</span>
            <ChevronDivider />
            <span className="font-medium" style={{ color: NAVY }}>{industrial.name}</span>
          </div>
        </div>
      </div>

      {/* ---- Gallery ---- */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-3 rounded-2xl overflow-hidden">
          <div className="relative h-[280px] sm:h-[420px] rounded-2xl overflow-hidden group">
            <img src={images[activeImage]} alt={industrial.name} className="w-full h-full object-cover" />
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
            <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/50 text-white flex items-center gap-1.5">
              <Camera size={13} />
              {activeImage + 1} / {images.length}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 h-[280px] sm:h-[420px]">
            {images.slice(1, 5).map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i + 1)} className="relative rounded-xl overflow-hidden h-full">
                <img src={img} alt={`${industrial.name} view ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
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
                <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>{industrial.name}</h1>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  {industrial.propertyType}
                </span>
                {industrial.status === 'Available' && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(30,136,229,0.1)', color: BLUE }}>
                    <BadgeCheck size={12} />
                    Available
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-400" />
                  {industrial.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 size={14} className="text-slate-400" />
                  {industrial.builder}
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
                <p className="text-2xl font-bold" style={{ color: NAVY }}>{industrial.price}</p>
                <p className="text-slate-400 text-xs">{industrial.pricePerSqft}</p>
              </div>
            </div>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-100">
            <StatCard icon={Maximize} label="Total Area" value={industrial.area} />
            <StatCard icon={Layers} label="Floors" value={industrial.floors} />
            <StatCard icon={Building2} label="Property Type" value={industrial.propertyType} />
            <StatCard icon={Compass} label="Possession" value={industrial.possession} />
            <StatCard icon={ShieldCheck} label="RERA ID" value={industrial.reraId} />
          </div>
        </div>
      </div>

      {/* ---- Main grid ---- */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <SectionCard eyebrow="Overview" title="About this property">
              <p className="text-slate-600 leading-relaxed">
                {industrial.description ||
                  `Premium ${industrial.propertyType.toLowerCase()} in ${industrial.location}, offering ${industrial.area} of modern industrial space. This property features excellent infrastructure, power backup, and is ideal for manufacturing, warehousing, and logistics operations.`}
              </p>
              {industrial.amenities && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {industrial.amenities.map((a) => (
                    <span key={a} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600">
                      {a}
                    </span>
                  ))}
                </div>
              )}
            </SectionCard>

            {/* Property specifications */}
            <SectionCard eyebrow="Specifications" title="Property details">
              <div>
                <SpecRow icon={Maximize} label="Total Area" value={industrial.area} />
                <SpecRow icon={Layers} label="Floor(s)" value={industrial.floors} />
                <SpecRow icon={Building2} label="Property Type" value={industrial.propertyType} />
                <SpecRow icon={Compass} label="Possession" value={industrial.possession} />
                <SpecRow icon={ShieldCheck} label="RERA ID" value={industrial.reraId} />
                <SpecRow icon={Droplets} label="Water Connection" value="Available" />
                <SpecRow icon={Zap} label="Power Backup" value="100%" />
                <SpecRow icon={Building2} label="Builder" value={industrial.builder} />
              </div>
            </SectionCard>

            {/* Amenities */}
            <SectionCard eyebrow="Amenities" title="What this property offers">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {industrial.amenitiesDetailed?.map((a) => (
                  <div key={a.label} className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(25,60,6,0.08)' }}>
                      <CheckCircle2 size={16} style={{ color: NAVY }} />
                    </span>
                    <span className="text-sm font-medium text-slate-700">{a.label}</span>
                  </div>
                ))}
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
                      ₹{priceTrendData[priceTrendData.length - 1].price.toLocaleString('en-IN')}/sq.ft
                    </div>
                    <div className="text-slate-500 text-xs">Current avg. rate</div>
                  </div>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="industrialPriceGradient" x1="0" y1="0" x2="0" y2="1">
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
                      formatter={(value) => [`₹${value.toLocaleString('en-IN')}/sq.ft`, 'Avg. Price']}
                      contentStyle={{ borderRadius: 10, border: '1px solid #F1F5F9', fontSize: 13 }}
                    />
                    <Area type="monotone" dataKey="price" stroke={BLUE} strokeWidth={2.5} fill="url(#industrialPriceGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-slate-400 text-xs mt-4">
                * Price trends are indicative, based on transacted industrial properties in the surrounding locality over the last 5 years.
              </p>
            </SectionCard>

            {/* Floor plans */}
            <SectionCard eyebrow="Floor Plans" title="Available configurations">
              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-sm min-w-[420px]">
                  <thead>
                    <tr className="text-left text-slate-400 text-xs uppercase tracking-wide border-b border-slate-100">
                      <th className="py-3 px-3 font-semibold">Configuration</th>
                      <th className="py-3 px-3 font-semibold">Area</th>
                      <th className="py-3 px-3 font-semibold">Price</th>
                      <th className="py-3 px-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {industrial.floorPlans?.map((plan) => (
                      <tr key={plan.type} className="border-b border-slate-50 hover:bg-slate-50 transition-colors duration-150">
                        <td className="py-4 px-3 font-semibold" style={{ color: NAVY }}>{plan.type}</td>
                        <td className="py-4 px-3 text-slate-600">{plan.area}</td>
                        <td className="py-4 px-3 font-semibold text-slate-700">{plan.price}</td>
                        <td className="py-4 px-3 text-right">
                          <button className="text-sm font-semibold hover:underline" style={{ color: BLUE }}>
                            Get Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            {/* Location & connectivity */}
            <SectionCard eyebrow="Location" title="Location & connectivity">
              <div className="rounded-xl overflow-hidden border border-slate-100 h-64 mb-5">
                <iframe
                  title={`${industrial.name} location`}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${industrial.coordinates || industrial.location}&z=14&output=embed`}
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

            {/* Similar industrial properties */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-5" style={{ color: NAVY }}>Similar properties nearby</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {SIMILAR_INDUSTRIAL.map((p) => (
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
                <h3 className="font-bold text-lg mb-1" style={{ color: NAVY }}>Interested in this property?</h3>
                <p className="text-slate-500 text-sm mb-5">Get a callback from our team within 30 minutes.</p>

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

              {/* Builder info */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="font-bold text-base mb-4" style={{ color: NAVY }}>Listed by</h3>
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(25,60,6,0.08)' }}>
                    <Building2 size={20} style={{ color: NAVY }} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: NAVY }}>{industrial.builder}</p>
                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                      <Star size={11} fill="#F59E0B" className="text-amber-500" />
                      {industrial.rating} · Verified Builder
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
                  This property's details and ownership documents have been verified by our team for accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndustrialDetail
