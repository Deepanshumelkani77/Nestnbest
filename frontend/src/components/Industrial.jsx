import React from 'react'
import { ChevronLeft, ChevronRight, MapPin, Building2, Star, ArrowRight } from 'lucide-react'

const NEW_INDUSTRIAL_PROJECTS = [
  {
    id: 1,
    name: 'DLF Industrial Park',
    location: 'Sector 25, Gurgaon',
    price: '₹45/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
    builder: 'DLF Ltd',
    status: 'New Project',
    rating: 4.7,
    amenities: ['Power Backup', 'Water Supply', 'Security', 'Loading Bay'],
  },
  {
    id: 2,
    name: 'Godrej Industrial Hub',
    location: 'Sector 49, Gurgaon',
    price: '₹38/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1565514020126-cc4c5675f9e2?w=400&h=300&fit=crop',
    builder: 'Godrej Properties',
    status: 'New Project',
    rating: 4.5,
    amenities: ['Fire Safety', 'Parking', '24/7 Security'],
  },
  {
    id: 3,
    name: 'Tata Industrial Zone',
    location: 'Sector 72, Gurgaon',
    price: '₹42/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    builder: 'Tata Housing',
    status: 'New Project',
    rating: 4.6,
    amenities: ['Warehouse', 'Cold Storage', 'Office Space'],
  },
  {
    id: 4,
    name: 'M3M Industrial Estate',
    location: 'Sector 65, Gurgaon',
    price: '₹40/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1504384308090-c54be3852f33?w=400&h=300&fit=crop',
    builder: 'M3M India',
    status: 'New Project',
    rating: 4.4,
    amenities: ['Manufacturing Unit', 'Logistics', 'Parking'],
  },
  {
    id: 5,
    name: 'Emperor Industrial Complex',
    location: 'Sector 37C, Gurgaon',
    price: '₹35/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    builder: 'Emperor Group',
    status: 'New Project',
    rating: 4.3,
    amenities: ['Workshop', 'Power Backup', 'Water Supply'],
  },
]

const HOT_INDUSTRIAL_PROPERTIES = [
  {
    id: 1,
    name: 'DLF Logistics Hub',
    location: 'Sector 18, Noida',
    price: '₹55/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?w=400&h=300&fit=crop',
    builder: 'DLF Ltd',
    status: 'Hot',
    rating: 4.8,
    amenities: ['High Connectivity', 'Cold Storage', 'Parking', 'Security'],
  },
  {
    id: 2,
    name: 'Omaxe Industrial Park',
    location: 'Sector 79, Gurgaon',
    price: '₹48/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=300&fit=crop',
    builder: 'Omaxe Group',
    status: 'Hot',
    rating: 4.6,
    amenities: ['Factory Space', 'Power Backup', 'Parking'],
  },
  {
    id: 3,
    name: 'Emaar Industrial Zone',
    location: 'Sector 62, Gurgaon',
    price: '₹52/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    builder: 'Emaar India',
    status: 'Hot',
    rating: 4.7,
    amenities: ['Warehouse', 'Logistics', 'Office Space'],
  },
  {
    id: 4,
    name: 'Vatika Industrial Estate',
    location: 'Sector 49, Gurgaon',
    price: '₹44/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=400&h=300&fit=crop',
    builder: 'Vatika Group',
    status: 'Hot',
    rating: 4.5,
    amenities: ['Manufacturing', 'Power Backup', '24/7 Security'],
  },
  {
    id: 5,
    name: 'Raheja Industrial Hub',
    location: 'Sector 78, Gurgaon',
    price: '₹50/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    builder: 'Raheja Developers',
    status: 'Hot',
    rating: 4.9,
    amenities: ['Cold Storage', 'Logistics', 'Power Backup', 'Parking'],
  },
]

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
    <div className="flex-shrink-0 w-[320px] sm:w-[380px] bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full ${getStatusColor(property.status)} text-white text-xs font-semibold`}>
          {property.status}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold">
          <Star size={12} fill="currentColor" />
          {property.rating}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-800 mb-1">{property.name}</h3>
        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
          <MapPin size={14} />
          {property.location}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
          <Building2 size={14} />
          {property.builder}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {property.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-600">
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-600">
              +{property.amenities.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-500">Starting from</p>
            <p className="text-lg font-bold" style={{ color: '#193C06' }}>
              {property.price}
            </p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 bg-[#193C06]" >
            View Details
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
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
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">{title}</h2>
            <p className="text-slate-500">{description}</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: '#193C06' }}>
            {viewAllText}
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
            {properties.map((property) => (
              <div key={property.id} className="snap-start">
                <IndustrialCard property={property} />
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
    </div>
  )
}

const Industrial = () => {
  return (
    <>
      <IndustrialSection
        title="New Industrial Projects"
        description="Latest industrial developments for manufacturing and logistics"
        properties={NEW_INDUSTRIAL_PROJECTS}
        viewAllText="View All New Projects"
      />

      <IndustrialSection
        title="Hot Industrial Properties"
        description="High-demand industrial properties with excellent connectivity"
        properties={HOT_INDUSTRIAL_PROPERTIES}
        viewAllText="View All Hot Properties"
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
