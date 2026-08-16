
import React from 'react'
import {
  ArrowRight,
  Building2,
  Users,
  Award,
  ShieldCheck,
  MapPin,
  TrendingUp,
  Handshake,
  Home,
  CheckCircle2,
  Star,
  Target,
  Eye,
  Quote,
} from 'lucide-react'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const STATS = [
  { icon: Building2, value: '1000+', label: 'Properties Listed' },
  { icon: Users, value: '5000+', label: 'Happy Customers' },
  { icon: MapPin, value: '10+', label: 'Cities Covered' },
  { icon: Award, value: '12+', label: 'Years of Trust' },
]

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Verified Listings',
    description: 'Every property on Nestnbest is owner-verified and quality-checked before it goes live, so you never waste time on stale or fake listings.',
  },
  {
    icon: Handshake,
    title: 'Transparent Dealing',
    description: 'No hidden brokerage, no fine print. We believe every buyer, tenant, and owner deserves a clear, honest picture before they commit.',
  },
  {
    icon: TrendingUp,
    title: 'Data-Backed Decisions',
    description: 'Locality insights, price trends, and resident reviews help you make a confident decision instead of a rushed one.',
  },
  {
    icon: Home,
    title: 'End-to-End Support',
    description: 'From the first search to the final registry, our relationship managers stay with you through site visits, paperwork, and loans.',
  },
]

const MILESTONES = [
  { year: '2013', title: 'Founded in Gurgaon', description: 'Started as a two-person team helping local families find honest, verified listings.' },
  { year: '2016', title: 'Crossed 1,000 Listings', description: 'Expanded into Delhi NCR with a growing network of verified owners and dealers.' },
  { year: '2019', title: 'Launched Insights & Price Trends', description: 'Introduced locality analytics so buyers could compare neighbourhoods with real data.' },
  { year: '2022', title: 'Went Pan-India', description: 'Grew to 50+ cities, adding commercial, industrial, and plot listings alongside residential.' },
  { year: '2025', title: '25,000+ Happy Customers', description: 'Became one of the most trusted names in verified real estate across India.' },
]

const TEAM = [
  {
    name: 'Arjun Malhotra',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Head of Sales',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    name: 'Simran Kaur',
    role: 'Head of Customer Experience',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
  },
]

const TESTIMONIALS = [
  {
    quote: 'They found us a verified 3 BHK within our budget in under two weeks — no brokerage surprises, no runaround.',
    name: 'Kavita Sharma',
    role: 'Home Buyer, Gurgaon',
  },
  {
    quote: 'As a first-time landlord, their team handled tenant verification and paperwork end to end. Genuinely stress-free.',
    name: 'Deepak Verma',
    role: 'Property Owner, Noida',
  },
  {
    quote: 'The locality insights and price trend data helped us pick the right sector before construction even finished.',
    name: 'Ananya Iyer',
    role: 'Investor, Delhi NCR',
  },
]

const SectionHeading = ({ eyebrow, title, description, center = false }) => (
  <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-12`}>
    <span className="text-xs font-bold tracking-wider uppercase" style={{ color: BLUE }}>
      {eyebrow}
    </span>
    <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-3" style={{ color: NAVY }}>
      {title}
    </h2>
    {description && <p className="text-slate-500 leading-relaxed">{description}</p>}
  </div>
)

const About = () => {
  return (
    <div className="w-full bg-white pt-20">
      {/* ---- Hero ---- */}
      <div className="relative w-full h-[340px] sm:h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=800&fit=crop"
          alt="Nestnbest office and skyline"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, rgba(25,60,6,0.92), rgba(25,60,6,0.55))` }} />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <span>Home</span>
            <ChevronDivider />
            <span className="text-white font-medium">About Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white max-w-xl leading-tight">
            Real estate, made honest again.
          </h1>
          <p className="text-white/85 text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
            For over a decade, Nestnbest has helped families and businesses find verified properties without the noise — no fake listings, no hidden brokerage, just clarity.
          </p>
        </div>
      </div>

      {/* ---- Stats strip — overlaps hero edge ---- */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 -translate-y-10 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-slate-100">
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <div key={label} className={`flex items-center gap-3 px-6 py-6 ${i % 2 === 0 ? 'border-r md:border-r-0 border-slate-100' : ''}`}>
              <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(30,136,229,0.1)' }}>
                <Icon size={20} style={{ color: BLUE }} />
              </span>
              <div className="min-w-0">
                <div className="text-xl font-bold leading-tight" style={{ color: NAVY }}>{value}</div>
                <div className="text-slate-500 text-xs leading-tight">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Our story ---- */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=560&fit=crop"
              alt="Modern residential building"
              className="rounded-2xl w-full h-[420px] object-cover shadow-lg"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-6 py-5 hidden sm:flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(25,60,6,0.08)' }}>
                <Star size={20} style={{ color: NAVY }} fill={NAVY} />
              </span>
              <div>
                <div className="text-lg font-bold" style={{ color: NAVY }}>4.8 / 5</div>
                <div className="text-slate-500 text-xs">Avg. customer rating</div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold tracking-wider uppercase" style={{ color: BLUE }}>Our Story</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-5" style={{ color: NAVY }}>
              Built by people who were tired of bad real estate experiences
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Nestnbest started in 2013 with a simple frustration: finding a home shouldn't mean sifting through fake listings, chasing brokers, or paying commissions nobody explains. We set out to build a platform where every listing is verified and every step is transparent.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Today, we help thousands of buyers, tenants, owners, and businesses across 50+ cities find the right property — backed by real data, real people, and real accountability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Target size={20} style={{ color: BLUE }} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: NAVY }}>Our Mission</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Make real estate transparent, verified, and accessible for everyone.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Eye size={20} style={{ color: BLUE }} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: NAVY }}>Our Vision</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Become India's most trusted name in property discovery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Why choose us ---- */}
      <div className="bg-slate-50 py-8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Nestnbest"
            title="What makes us different"
            description="We built the platform we wished existed when we were searching for our own homes."
            center
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <span className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(25,60,6,0.08)' }}>
                  <Icon size={22} style={{ color: NAVY }} />
                </span>
                <h3 className="font-bold text-base mb-2" style={{ color: NAVY }}>{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Timeline / milestones ---- */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeading
          eyebrow="Our Journey"
          title="Over a decade of building trust"
          description="From a two-person team to a pan-India platform — here's how we got here."
        />

        <div className="relative">
          <div className="hidden md:block absolute top-0 bottom-0 left-[27px] w-px bg-slate-200" />
          <div className="space-y-8 md:space-y-10">
            {MILESTONES.map((m) => (
              <div key={m.year} className="relative flex flex-col md:flex-row gap-4 md:gap-8 md:items-start">
                <div className="flex items-center gap-4 md:w-14 flex-shrink-0">
                  <span
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 relative z-10"
                    style={{ backgroundColor: BLUE }}
                  >
                    {m.year}
                  </span>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 flex-1">
                  <h3 className="font-bold text-base mb-1.5" style={{ color: NAVY }}>{m.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Team ---- */}
      <div className="bg-slate-50 py-8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Team"
            title="The people behind Nestnbest"
            description="A small, dedicated team obsessed with making property search painless."
            center
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-sm" style={{ color: NAVY }}>{member.name}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Testimonials ---- */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeading
          eyebrow="Customer Stories"
          title="What people say about us"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
              <Quote size={28} style={{ color: BLUE }} className="mb-4 opacity-60" />
              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                ))}
              </div>
              <div className="pt-3 border-t border-slate-100">
                <div className="font-semibold text-sm" style={{ color: NAVY }}>{t.name}</div>
                <div className="text-slate-400 text-xs">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

   
    </div>
  )
}

// small inline chevron used in the hero breadcrumb, kept local to avoid
// pulling in another icon just for a 10px divider
const ChevronDivider = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 6l6 6-6 6" />
  </svg>
)

export default About