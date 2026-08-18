import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPropertyById } from '../data/properties'
import {
  MapPin,
  Building2,
  Star,
  ArrowRight,
  ArrowLeft,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Phone,
  Mail,
  Share2,
  Heart,
  Download,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Trees,
  Car,
  Waves,
  Users,
  Wifi,
  Camera,
  Zap,
  Sparkles,
  Navigation,
  School,
  ShoppingBag,
  Hospital,
  TrainFront,
  User,
  Send,
  TrendingUp,
  IndianRupee,
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const SIMILAR_PROPERTIES = [
  { name: 'M3M Golf Estate', location: 'Sector 65, Gurgaon', price: '₹5.8 Cr onwards', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop', rating: 4.5 },
  { name: 'Tata Primanti', location: 'Sector 72, Gurgaon', price: '₹4.5 Cr onwards', image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=400&h=300&fit=crop', rating: 4.7 },
  { name: 'Raheja Revanta', location: 'Sector 78, Gurgaon', price: '₹5.2 Cr onwards', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop', rating: 4.8 },
]

const AMENITY_ICONS = {
  pool: Waves,
  gym: Dumbbell,
  club: Users,
  park: Trees,
  parking: Car,
  security: ShieldCheck,
  wifi: Wifi,
  cctv: Camera,
  power: Zap,
  concierge: Sparkles,
}

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

const ChevronDivider = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 6l6 6-6 6" />
  </svg>
)

const PropertyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = getPropertyById(Number(id))
  const [activeImage, setActiveImage] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  // Redirect if property not found
  if (!project) {
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

  // ---- EMI calculator state ----
  const [loanAmount, setLoanAmount] = useState(700)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const emi = useMemo(() => {
    const principal = loanAmount * 100000
    const monthlyRate = interestRate / 12 / 100
    const months = tenure * 12
    if (monthlyRate === 0) return principal / months
    const value =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    return value
  }, [loanAmount, interestRate, tenure])

  // ---- Price trend data ----
  const priceTrendData = useMemo(() => {
    return project.priceTrend || [
      { year: '2021', price: 8200 },
      { year: '2022', price: 8900 },
      { year: '2023', price: 9800 },
      { year: '2024', price: 11200 },
      { year: '2025', price: 12600 },
      { year: '2026', price: 13900 },
    ]
  }, [project])

  const priceAppreciation = useMemo(() => {
    const first = priceTrendData[0].price
    const last = priceTrendData[priceTrendData.length - 1].price
    return (((last - first) / first) * 100).toFixed(1)
  }, [priceTrendData])

  const goToImage = (dir) => {
    setActiveImage((prev) => {
      const next = prev + dir
      if (next < 0) return project.images.length - 1
      if (next >= project.images.length) return 0
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
            <span className="hover:text-[#1E88E5] cursor-pointer transition-colors duration-150">New Launch Projects</span>
            <ChevronDivider />
            <span className="font-medium" style={{ color: NAVY }}>{project.name}</span>
          </div>
        </div>
      </div>

      {/* ---- Gallery ---- */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-3 rounded-2xl overflow-hidden">
          <div className="relative h-[280px] sm:h-[420px] rounded-2xl overflow-hidden group">
            <img
              src={project.images[activeImage]}
              alt={project.name}
              className="w-full h-full object-cover"
            />
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
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: BLUE }}>
              {project.status}
            </span>
            <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/50 text-white flex items-center gap-1.5">
              <Camera size={13} />
              {activeImage + 1} / {project.images.length}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 h-[280px] sm:h-[420px]">
            {project.images.slice(1, 5).map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i + 1)}
                className="relative rounded-xl overflow-hidden h-full"
              >
                <img src={img} alt={`${project.name} view ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
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
                <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>{project.name}</h1>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(245,158,11,0.12)', color: '#B45309' }}>
                  <Star size={12} fill="#B45309" />
                  {project.rating} <span className="font-normal">({project.reviewCount})</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-3">{project.tagline}</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-400" />
                  {project.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 size={14} className="text-slate-400" />
                  {project.builder}
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-slate-400" />
                  RERA: {project.reraId}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setIsSaved((s) => !s)}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 transition-colors duration-200"
                aria-label="Save property"
              >
                <Heart size={18} fill={isSaved ? '#EF4444' : 'none'} style={{ color: isSaved ? '#EF4444' : '#64748B' }} />
              </button>
              <button className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 transition-colors duration-200" aria-label="Share property">
                <Share2 size={18} className="text-slate-500" />
              </button>
              <div className="text-right">
                <p className="text-2xl font-bold" style={{ color: NAVY }}>{project.price}</p>
                <p className="text-slate-400 text-xs">{project.pricePerSqft}</p>
              </div>
            </div>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-slate-100">
            <StatCard icon={Bed} label="Bedrooms" value={project.bedrooms} />
            <StatCard icon={Bath} label="Bathrooms" value={project.bathrooms} />
            <StatCard icon={Maximize} label="Area" value={project.area} />
            <StatCard icon={Building2} label="Type" value={project.propertyType} />
            <StatCard icon={Calendar} label="Possession" value={project.possession} />
            <StatCard icon={ShieldCheck} label="RERA" value="Verified" />
          </div>
        </div>
      </div>

      {/* ---- Main grid: content + sticky sidebar ---- */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <SectionCard eyebrow="Overview" title="About this property">
              <p className="text-slate-600 leading-relaxed">{project.description}</p>
            </SectionCard>

            {/* Amenities */}
            <SectionCard eyebrow="Amenities" title="What this property offers">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.amenitiesDetailed.map((a) => {
                  const Icon = AMENITY_ICONS[a.icon] || CheckCircle2
                  return (
                    <div key={a.label} className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(25,60,6,0.08)' }}>
                        <Icon size={16} style={{ color: NAVY }} />
                      </span>
                      <span className="text-sm font-medium text-slate-700">{a.label}</span>
                    </div>
                  )
                })}
              </div>
            </SectionCard>

           
            {/* Location & connectivity */}
            <SectionCard eyebrow="Location" title="Location & connectivity">
              <div className="rounded-xl overflow-hidden border border-slate-100 h-64 mb-5">
                <iframe
                  title={`${project.name} location`}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${project.coordinates}&z=14&output=embed`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {project.nearby.map((n) => {
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

            {/* Builder info */}
            <SectionCard eyebrow="Developer" title="About the builder">
              <div className="flex items-start gap-4">
                <span className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(25,60,6,0.08)' }}>
                  <Building2 size={24} style={{ color: NAVY }} />
                </span>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: NAVY }}>{project.builder}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    A trusted name in Indian real estate with a portfolio of premium residential and commercial developments delivered on time across major metro cities.
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* Similar properties */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-5" style={{ color: NAVY }}>Similar properties nearby</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {SIMILAR_PROPERTIES.map((p) => (
                  <div key={p.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="h-36 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm mb-1" style={{ color: NAVY }}>{p.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                        <MapPin size={11} />
                        {p.location}
                      </p>
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
                <p className="text-slate-500 text-sm mb-5">Get a callback from our relationship manager within 30 minutes.</p>

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

              {/* EMI calculator */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="font-bold text-base mb-5" style={{ color: NAVY }}>EMI Calculator</h3>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-500">Loan Amount</label>
                      <span className="text-sm font-bold" style={{ color: NAVY }}>₹{loanAmount} L</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="2000"
                      step="10"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full accent-[#1E88E5]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-500">Interest Rate</label>
                      <span className="text-sm font-bold" style={{ color: NAVY }}>{interestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="15"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-[#1E88E5]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-500">Tenure</label>
                      <span className="text-sm font-bold" style={{ color: NAVY }}>{tenure} yrs</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full accent-[#1E88E5]"
                    />
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-400 mb-1">Estimated Monthly EMI</p>
                  <p className="text-2xl font-bold" style={{ color: BLUE }}>
                    ₹{Math.round(emi).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Trust badge */}
              <div className="rounded-2xl p-6" style={{ background: `linear-gradient(120deg, ${NAVY}, #2E5C10)` }}>
                <span className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-white/10">
                  <ShieldCheck size={20} className="text-white" />
                </span>
                <h3 className="text-white font-bold text-base mb-2">Verified Listing</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  This property and its RERA registration have been verified by our team for accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail