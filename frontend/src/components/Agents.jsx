import React from 'react'
import { ChevronLeft, ChevronRight, Star, MapPin, Phone, Mail, Award, Building2, ArrowRight, CheckCircle2 } from 'lucide-react'

const AGENTS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    designation: 'Senior Real Estate Consultant',
    location: 'Gurgaon',
    experience: '12 Years',
    rating: 4.9,
    reviews: 156,
    propertiesSold: 245,
    specializations: ['Residential', 'Commercial', 'Investment'],
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    designation: 'Property Advisor',
    location: 'Delhi NCR',
    experience: '8 Years',
    rating: 4.8,
    reviews: 98,
    propertiesSold: 178,
    specializations: ['Luxury Homes', 'Villas', 'Apartments'],
    verified: true,
    featured: true,
  },
  {
    id: 3,
    name: 'Amit Verma',
    designation: 'Commercial Property Expert',
    location: 'Noida',
    experience: '10 Years',
    rating: 4.7,
    reviews: 87,
    propertiesSold: 156,
    specializations: ['Office Space', 'Retail', 'Warehouses'],
    verified: true,
    featured: false,
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    designation: 'Real Estate Broker',
    location: 'Gurgaon',
    experience: '6 Years',
    rating: 4.6,
    reviews: 72,
    propertiesSold: 134,
    specializations: ['Residential', 'PG/Co-living'],
    verified: true,
    featured: false,
  },
  {
    id: 5,
    name: 'Vikram Singh',
    designation: 'Investment Advisor',
    location: 'Delhi',
    experience: '15 Years',
    rating: 4.9,
    reviews: 203,
    propertiesSold: 320,
    specializations: ['Investment', 'Land/Plots', 'Commercial'],
    verified: true,
    featured: true,
  },
  {
    id: 6,
    name: 'Neha Kapoor',
    designation: 'Property Consultant',
    location: 'Faridabad',
    experience: '5 Years',
    rating: 4.5,
    reviews: 54,
    propertiesSold: 89,
    specializations: ['Residential', 'Builder Floors'],
    verified: true,
    featured: false,
  },
]

const COMMON_AGENT_IMAGE = 'https://ui-avatars.com/api/?name=Agent&background=193C06&color=fff&size=400'

const AgentCard = ({ agent }) => {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[380px] bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <img
            src={COMMON_AGENT_IMAGE}
            alt={agent.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        {agent.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold flex items-center gap-1">
            <Award size={12} />
            Featured
          </div>
        )}
        {agent.verified && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-semibold flex items-center gap-1">
            <CheckCircle2 size={12} />
            Verified
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-800 mb-1">{agent.name}</h3>
        <p className="text-sm text-slate-500 mb-3">{agent.designation}</p>

        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
          <MapPin size={14} />
          {agent.location}
        </div>

        <div className="flex items-center gap-4  pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-700">{agent.rating}</span>
            <span className="text-xs text-slate-400">({agent.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-slate-600">
            <Building2 size={16} className="text-slate-400" />
            <span>{agent.propertiesSold} Sold</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-slate-400 mb-2">Specializations</p>
          <div className="flex flex-wrap gap-1.5">
            {agent.specializations.map((spec) => (
              <span key={spec} className="px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                {spec}
              </span>
            ))}
          </div>
        </div>

     
        
      </div>
    </div>
  )
}

const Agents = () => {
  const scrollRef = React.useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">NestnBest Preferred Agents</h2>
            <p className="text-slate-500">Connect with verified and experienced real estate professionals</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: '#193C06' }}>
            View All Agents
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} className="text-slate-600" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-8"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {AGENTS.map((agent) => (
              <div key={agent.id} className="snap-start">
                <AgentCard agent={agent} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} className="text-slate-600" />
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default Agents
