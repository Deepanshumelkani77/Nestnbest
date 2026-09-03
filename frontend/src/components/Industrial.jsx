import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin, Building2, Star, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { INDUSTRIAL_DATA } from '../data/industrial'

const NEW_INDUSTRIAL_PROJECTS = Object.values(INDUSTRIAL_DATA).filter(p => p.status === 'Available')
const HOT_INDUSTRIAL_PROPERTIES = Object.values(INDUSTRIAL_DATA).filter(p => p.status === 'Available')

const IndustrialCard = ({ property }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'New Project':
        return 'bg-emerald-500'
      case 'Hot':
        return 'bg-orange-500'
      default:
        return 'bg-slate-500'
    }
  }

  return (
    <Link to={`/industrial/${property.id}`} className="block w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-sm text-white text-xs font-semibold`} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          {property.status}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs font-semibold backdrop-blur-sm" style={{ backgroundColor: 'rgba(245, 158, 11, 0.5)' }}>
          <Star size={12} fill="currentColor" />
          {property.rating}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-slate-800">{property.name}</h3>
          <div className="flex gap-2">
            {property.verified && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                <ShieldCheck size={12} />
                Verified
              </span>
            )}
            {property.preferred && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                <Sparkles size={12} />
                Preferred
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
          <MapPin size={16} />
          {property.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Building2 size={16} />
          {property.builder}
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {property.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600 font-medium">
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600 font-medium">
              +{property.amenities.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-500 mb-1">Starting from</p>
            <p className="text-xl font-bold" style={{ color: '#193C06' }}>
              {property.price}
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 bg-[#193C06]" onClick={(e) => e.preventDefault()}>
            View Details
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </Link>
  )
}

const IndustrialSection = ({ title, description, properties, viewAllText = 'View All' }) => {
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
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-3">{title}</h2>
            <p className="text-lg text-slate-500">{description}</p>
          </div>
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: '#193C06' }}>
            {viewAllText}
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft size={28} className="text-slate-600" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory px-12"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {properties.map((property) => (
              <div key={property.id} className="snap-start flex-shrink-0">
                <IndustrialCard property={property} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight size={28} className="text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

const Industrial = () => {
  return (
    <>
      <IndustrialSection
        title="Industrial Properties"
        description="Industrial sheds, warehouses, and factories for manufacturing and logistics"
        properties={NEW_INDUSTRIAL_PROJECTS}
        viewAllText="View All Industrial"
      />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}

export default Industrial
