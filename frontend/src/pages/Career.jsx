import React, { useState } from 'react'
import {
  ArrowRight,
  MapPin,
  Users,
  Briefcase,
  Building2,
  Heart,
  GraduationCap,
  Coffee,
  Plane,
  ShieldCheck,
  TrendingUp,
  Clock,
  Search,
  Quote,
  Star,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  DollarSign,
} from 'lucide-react'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const STATS = [
  { icon: Users, value: '180+', label: 'Team Members' },
  { icon: Briefcase, value: '12', label: 'Open Roles' },
  { icon: Building2, value: '6', label: 'City Offices' },
  { icon: Clock, value: '3.4 yrs', label: 'Avg. Tenure' },
]

const PERKS = [
  { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive medical insurance for you and your family, plus an annual wellness allowance.' },
  { icon: GraduationCap, title: 'Learning Budget', description: 'A yearly stipend for courses, certifications, and conferences to keep growing your craft.' },
  { icon: Plane, title: 'Flexible Time Off', description: 'Unlimited paid leave policy — we care about outcomes, not hours logged at a desk.' },
  { icon: Coffee, title: 'Hybrid Working', description: 'Choose your rhythm — work from any of our 6 city offices or remotely, your call.' },
  { icon: TrendingUp, title: 'ESOPs for Everyone', description: 'Every full-time employee gets equity — when Nestnbest grows, so does your stake in it.' },
  { icon: ShieldCheck, title: 'Job Security & Trust', description: 'Transparent performance reviews, clear growth paths, and no surprise layoffs culture.' },
]

const DEPARTMENTS = ['All', 'Engineering', 'Sales', 'Operations', 'Design', 'Marketing']

const OPEN_ROLES = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Gurgaon',
    type: 'Full-time',
    experience: '5+ years',
    salary: '₹25L - ₹40L',
    posted: '3 days ago',
    description: 'We are looking for an experienced Frontend Developer to lead our UI/UX initiatives. You will work with React, TypeScript, and modern CSS frameworks to build beautiful, performant user interfaces.',
    requirements: [
      '5+ years of experience with React and modern JavaScript',
      'Strong proficiency in TypeScript and modern CSS (Tailwind, CSS Modules)',
      'Experience with state management (Redux, Zustand, or similar)',
      'Knowledge of performance optimization and accessibility best practices',
      'Excellent communication skills and ability to mentor junior developers',
    ],
  },
  {
    id: 2,
    title: 'Backend Engineer — Node.js',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    salary: '₹18L - ₹30L',
    posted: '1 week ago',
    description: 'Join our backend team to build scalable APIs and microservices that power our real estate platform. You will work with Node.js, PostgreSQL, and cloud infrastructure.',
    requirements: [
      '3+ years of experience with Node.js and Express or similar frameworks',
      'Strong knowledge of PostgreSQL and database design',
      'Experience with RESTful APIs and microservices architecture',
      'Familiarity with AWS, GCP, or Azure cloud services',
      'Understanding of caching strategies (Redis, Memcached)',
    ],
  },
  {
    id: 3,
    title: 'Product Designer',
    department: 'Design',
    location: 'Gurgaon',
    type: 'Full-time',
    experience: '4+ years',
    salary: '₹20L - ₹35L',
    posted: '5 days ago',
    description: 'We are seeking a creative Product Designer to craft intuitive and delightful user experiences across our web and mobile platforms. You will collaborate closely with product and engineering teams.',
    requirements: [
      '4+ years of product design experience',
      'Proficiency in Figma and design systems',
      'Strong portfolio demonstrating UX/UI skills',
      'Experience with user research and usability testing',
      'Excellent visual design and typography skills',
    ],
  },
  {
    id: 4,
    title: 'Regional Sales Manager',
    department: 'Sales',
    location: 'Bangalore',
    type: 'Full-time',
    experience: '5+ years',
    salary: '₹20L - ₹35L',
    posted: '2 days ago',
    description: 'Lead sales operations for your region and build high-performing teams. You will drive revenue growth through strategic partnerships and direct sales.',
    requirements: [
      '5+ years of sales experience in real estate or related industry',
      'Proven track record of meeting and exceeding sales targets',
      'Experience with CRM tools and sales analytics',
      'Strong leadership and team management skills',
      'Excellent negotiation and relationship building abilities',
    ],
  },
  {
    id: 5,
    title: 'Relationship Manager — Buyers',
    department: 'Sales',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '2+ years',
    salary: '₹12L - ₹18L',
    posted: '1 week ago',
    description: 'Help property buyers find their dream homes. You will be the primary point of contact for buyers, guiding them through the entire purchase journey.',
    requirements: [
      '2+ years of experience in real estate sales or customer relationship management',
      'Excellent communication and interpersonal skills',
      'Knowledge of the real estate market and buying process',
      'Ability to work flexible hours and weekends',
      'Fluency in English and at least one regional language',
    ],
  },
  {
    id: 6,
    title: 'Field Verification Executive',
    department: 'Operations',
    location: 'Delhi NCR',
    type: 'Full-time',
    experience: '1+ years',
    salary: '₹6L - ₹10L',
    posted: '4 days ago',
    description: 'Conduct on-site verification of properties listed on our platform. Ensure accuracy of property details and maintain quality standards.',
    requirements: [
      '1+ years of experience in field operations or property verification',
      'Valid driving license and willingness to travel',
      'Strong attention to detail and documentation skills',
      'Good knowledge of local geography and property markets',
      'Ability to use mobile apps and digital tools for reporting',
    ],
  },
  {
    id: 7,
    title: 'Performance Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    experience: '4+ years',
    salary: '₹18L - ₹30L',
    posted: '6 days ago',
    description: 'Drive user acquisition and lead generation through paid marketing channels. You will manage campaigns across Google, Meta, and other platforms.',
    requirements: [
      '4+ years of experience in performance marketing',
      'Strong expertise in Google Ads, Facebook Ads, and programmatic advertising',
      'Experience with marketing analytics and attribution models',
      'Excellent analytical skills and data-driven decision making',
      'Knowledge of A/B testing and conversion optimization',
    ],
  },
  {
    id: 8,
    title: 'Content Writer — Real Estate',
    department: 'Marketing',
    location: 'Gurgaon',
    type: 'Part-time',
    experience: '2+ years',
    salary: '₹8L - ₹12L',
    posted: '2 weeks ago',
    description: 'Create engaging content about real estate trends, buying guides, and property listings. You will write blog posts, social media content, and marketing copy.',
    requirements: [
      '2+ years of content writing experience, preferably in real estate',
      'Excellent writing skills with attention to SEO best practices',
      'Ability to simplify complex topics for diverse audiences',
      'Experience with content management systems and basic HTML',
      'Strong research and fact-checking abilities',
    ],
  },
  {
    id: 9,
    title: 'Customer Support Associate',
    department: 'Operations',
    location: 'Hyderabad',
    type: 'Full-time',
    experience: '1+ years',
    salary: '₹5L - ₹8L',
    posted: '3 days ago',
    description: 'Provide excellent customer service to property seekers and sellers. You will handle queries via phone, email, and chat, ensuring high satisfaction levels.',
    requirements: [
      '1+ years of customer support experience',
      'Excellent communication and problem-solving skills',
      'Patience and empathy when dealing with customer issues',
      'Familiarity with CRM tools and ticketing systems',
      'Ability to work in shifts including weekends',
    ],
  },
]

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&h=400&fit=crop',
]

const TESTIMONIALS = [
  {
    quote: 'I joined as a support associate and moved into operations leadership in two years. Nestnbest actually invests in growth conversations.',
    name: 'Rahul Bhatia',
    role: 'Operations Lead, 3 yrs at Nestnbest',
  },
  {
    quote: 'The hybrid setup and unlimited leave policy aren\'t just on paper — my manager actively pushes the team to actually take time off.',
    name: 'Meera Joshi',
    role: 'Senior Designer, 2 yrs at Nestnbest',
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

const ChevronDivider = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 6l6 6-6 6" />
  </svg>
)

const RoleCard = ({ role, isExpanded, onToggle }) => (
  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md">
    <button
      onClick={() => onToggle(role.id)}
      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h3 className="text-lg font-bold" style={{ color: NAVY }}>{role.title}</h3>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: 'rgba(30,136,229,0.1)', color: BLUE }}
          >
            {role.department}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            {role.location}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            {role.type}
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase size={14} />
            {role.experience}
          </div>
          <div className="flex items-center gap-1.5 font-semibold" style={{ color: BLUE }}>
            <DollarSign size={14} />
            {role.salary}
          </div>
        </div>
      </div>
      <ChevronRight
        size={20}
        className="flex-shrink-0 transition-transform duration-300"
        style={{ color: NAVY, transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
      />
    </button>

    {isExpanded && (
      <div className="px-6 pb-6 pt-2 border-t border-slate-100">
        <div className="pt-4 space-y-4">
          <div>
            <h4 className="text-sm font-bold mb-2" style={{ color: NAVY }}>About this role</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{role.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-3" style={{ color: NAVY }}>Requirements</h4>
            <ul className="space-y-2">
              {role.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: BLUE }} />
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2">
            <button
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              style={{ backgroundColor: BLUE }}
            >
              Apply Now
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)

const Careers = () => {
  const [activeDept, setActiveDept] = useState('All')
  const [query, setQuery] = useState('')
  const [expandedJob, setExpandedJob] = useState(null)

  const filteredRoles = OPEN_ROLES.filter((role) => {
    const matchesDept = activeDept === 'All' || role.department === activeDept
    const matchesQuery = role.title.toLowerCase().includes(query.toLowerCase())
    return matchesDept && matchesQuery
  })

  return (
    <div className="w-full bg-white pt-20">
      {/* ---- Hero ---- */}
      <div className="relative w-full h-[340px] sm:h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=800&fit=crop"
          alt="Nestnbest team at work"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, rgba(25,60,6,0.92), rgba(25,60,6,0.55))` }} />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <span>Home</span>
            <ChevronDivider />
            <span className="text-white font-medium">Careers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white max-w-xl leading-tight">
            Build the future of real estate with us.
          </h1>
          <p className="text-white/85 text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
            We're a team of builders, closers, and problem-solvers on a mission to make property search honest. Come do the best work of your career.
          </p>
          <div className="mt-6">
            <a href="#open-roles" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg" style={{ color: NAVY }}>
              View Open Roles
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* ---- Stats strip — overlaps hero edge ---- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* ---- Culture blurb + gallery ---- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 -mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase" style={{ color: BLUE }}>Life at Nestnbest</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-5" style={{ color: NAVY }}>
              A team that moves fast and cares deeply
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We're a mid-sized team that still feels like a startup — flat hierarchy, direct feedback, and real ownership from day one. Whether you're closing deals in the field or shipping code from home, your work is visible and valued.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We hire for curiosity and accountability over pedigree. If you enjoy solving real problems for real people, you'll fit right in.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <img
                key={img}
                src={img}
                alt="Team at Nestnbest"
                className={`rounded-2xl object-cover w-full shadow-md ${i % 2 === 0 ? 'h-52 mt-6' : 'h-52'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ---- Perks & benefits ---- */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Perks & Benefits"
            title="We take care of the people who take care of our customers"
            center
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map(({ icon: Icon, title, description }) => (
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

      {/* ---- Open roles ---- */}
      <div id="open-roles" className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        <SectionHeading
          eyebrow="Join Us"
          title="Open positions"
          description="Don't see a role that fits? Send us your resume anyway — we're always looking for great people."
        />

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex items-center gap-2.5 flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus-within:border-[#1E88E5] transition-colors duration-200">
            <Search size={17} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search roles..."
              className="flex-1 min-w-0 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setActiveDept(dept)}
                className="flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-200"
                style={{
                  color: activeDept === dept ? '#fff' : NAVY,
                  backgroundColor: activeDept === dept ? BLUE : '#fff',
                  borderColor: activeDept === dept ? BLUE : '#E2E8F0',
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Role list */}
        <div className="space-y-4">
          {filteredRoles.length > 0 ? (
            filteredRoles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                isExpanded={expandedJob === role.id}
                onToggle={(id) => setExpandedJob(expandedJob === id ? null : id)}
              />
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 text-sm">
              No roles match your search right now — check back soon or send us your resume anyway.
            </div>
          )}
        </div>
      </div>

   
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}

export default Careers