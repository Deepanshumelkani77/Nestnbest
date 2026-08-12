import React from 'react'
import { ChevronLeft, ChevronRight, MapPin, Building2, Star, ArrowRight } from 'lucide-react'

const READY_TO_MOVE_SPACES = [
  {
    id: 1,
    name: 'DLF Tower A',
    location: 'Sector 25, Gurgaon',
    price: '₹85/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    builder: 'DLF Ltd',
    status: 'Ready to Move',
    rating: 4.8,
    amenities: ['24/7 Security', 'Parking', 'Cafeteria', 'Conference Rooms'],
  },
  {
    id: 2,
    name: 'Godrej Infinity',
    location: 'Sector 49, Gurgaon',
    price: '₹65/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop',
    builder: 'Godrej Properties',
    status: 'Ready to Move',
    rating: 4.6,
    amenities: ['Gym', 'Power Backup', 'Central AC'],
  },
  {
    id: 3,
    name: 'Tata Business Park',
    location: 'Sector 72, Gurgaon',
    price: '₹75/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop',
    builder: 'Tata Housing',
    status: 'Ready to Move',
    rating: 4.7,
    amenities: ['Business Center', 'Spa', 'Club House'],
  },
  {
    id: 4,
    name: 'M3M Corporate Park',
    location: 'Sector 65, Gurgaon',
    price: '₹70/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1504384308090-c54be3852f33?w=400&h=300&fit=crop',
    builder: 'M3M India',
    status: 'Ready to Move',
    rating: 4.5,
    amenities: ['Swimming Pool', 'Gym', 'Parking'],
  },
  {
    id: 5,
    name: 'Emperor Business Center',
    location: 'Sector 37C, Gurgaon',
    price: '₹55/sq ft onwards',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    builder: 'Emperor Group',
    status: 'Ready to Move',
    rating: 4.4,
    amenities: ['Club House', 'Park', '24/7 Security'],
  },
]

const RESALE_COMMERCIAL = [
  {
    id: 1,
    name: 'DLF Office Space',
    location: 'Sector 18, Noida',
    price: '₹120/sq ft',
    image: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?w=400&h=300&fit=crop',
    builder: 'Resale',
    status: 'Resale',
    rating: 4.7,
    amenities: ['High Footfall', 'Food Court', 'Parking', 'Security'],
  },
  {
    id: 2,
    name: 'Omaxe Retail Space',
    location: 'Sector 79, Gurgaon',
    price: '₹95/sq ft',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=300&fit=crop',
    builder: 'Resale',
    status: 'Resale',
    rating: 4.5,
    amenities: ['Retail Space', 'Food Court', 'Parking'],
  },
  {
    id: 3,
    name: 'Emaar Commercial',
    location: 'Sector 62, Gurgaon',
    price: '₹110/sq ft',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    builder: 'Resale',
    status: 'Resale',
    rating: 4.6,
    amenities: ['Gym', 'Swimming Pool', 'Business Center'],
  },
  {
    id: 4,
    name: 'Vatika Office',
    location: 'Sector 49, Gurgaon',
    price: '₹85/sq ft',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=400&h=300&fit=crop',
    builder: 'Resale',
    status: 'Resale',
    rating: 4.4,
    amenities: ['Park', 'Club House', '24/7 Security'],
  },
  {
    id: 5,
    name: 'Raheja Commercial',
    location: 'Sector 78, Gurgaon',
    price: '₹100/sq ft',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    builder: 'Resale',
    status: 'Resale',
    rating: 4.8,
    amenities: ['Sky Lounge', 'Spa', 'Gym', 'Parking'],
  },
]

const CommercialCard = ({ property }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready to Move':
        return 'bg-emerald-500'
      case 'Resale':
        return 'bg-blue-500'
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

const CommercialSection = ({ title, description, properties, viewAllText = 'View All' }) => {
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
                <CommercialCard property={property} />
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

const Commercial = () => {
  return (
    <>
      <CommercialSection
        title="Ready-to-Move Spaces"
        description="Move-in ready commercial spaces for immediate occupancy"
        properties={READY_TO_MOVE_SPACES}
        viewAllText="View All Ready-to-Move"
      />

      <CommercialSection
        title="Resale Commercial Properties"
        description="Pre-owned commercial properties at competitive prices"
        properties={RESALE_COMMERCIAL}
        viewAllText="View All Resale"
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

export default Commercial
