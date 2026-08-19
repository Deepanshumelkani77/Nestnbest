import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin, Maximize, Heart, ArrowRight, Share2, TreePine, Building, Star } from 'lucide-react'
import { LAND_DATA } from '../data/lands'

const LANDS = Object.values(LAND_DATA)

const LandCard = ({ land }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Residential':
      case 'Farm House':
        return <Building size={14} />
      case 'Agricultural':
        return <TreePine size={14} />
      default:
        return <Building size={14} />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'Residential':
        return 'bg-green-100 text-green-700'
      case 'Commercial':
        return 'bg-blue-100 text-blue-700'
      case 'Agricultural':
        return 'bg-emerald-100 text-emerald-700'
      case 'Industrial':
        return 'bg-orange-100 text-orange-700'
      case 'Farm House':
        return 'bg-teal-100 text-teal-700'
      case 'Institutional':
        return 'bg-purple-100 text-purple-700'
      case 'Mixed Use':
        return 'bg-amber-100 text-amber-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <Link to={`/land/${land.id}`} className="block w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden">
        <img
          src={land.image}
          alt={land.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {land.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold">
          <Star size={12} fill="currentColor" />
          {land.rating || '4.5'}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{land.title}</h3>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
          <MapPin size={16} />
          {land.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Building size={16} />
          Posted by {land.postedBy}
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {land.features?.slice(0, 3).map((feature) => (
            <span key={feature} className="px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600 font-medium">
              {feature}
            </span>
          ))}
          {land.features && land.features.length > 3 && (
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600 font-medium">
              +{land.features.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-500 mb-1">Price</p>
            <p className="text-xl font-bold" style={{ color: '#193C06' }}>
              {land.price}
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

const CommercialSection = ({ title, description, properties, viewAllText = 'View All' }) => {
  const scrollRef = React.useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 500
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
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
                <LandCard land={property} />
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

const Land = () => {
  return (
    <>
      <CommercialSection
        title="Land & Plots for Sale"
        description="Explore residential, commercial, and agricultural land"
        properties={LANDS}
        viewAllText="View All Land"
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

export default Land