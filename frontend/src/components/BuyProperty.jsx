import React from 'react'
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Maximize, Heart, ArrowRight, Share2 } from 'lucide-react'

const PROPERTIES = [
  {
    id: 1,
    title: '3 BHK Luxury Apartment',
    type: 'Apartment',
    location: 'Sector 49, Gurgaon',
    price: '₹1.85 Cr',
    area: '1,850 sq.ft',
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    postedBy: 'Owner',
    amenities: ['Parking', 'Power Backup', 'Security', 'Lift'],
    featured: true,
  },
  {
    id: 2,
    title: '4 BHK Independent Villa',
    type: 'Villa',
    location: 'DLF Phase 3, Gurgaon',
    price: '₹4.5 Cr',
    area: '3,200 sq.ft',
    bedrooms: 4,
    bathrooms: 4,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
    postedBy: 'Builder',
    amenities: ['Garden', 'Swimming Pool', 'Club House', 'Gym'],
    featured: true,
  },
  {
    id: 3,
    title: '2 BHK Flat',
    type: 'Flat',
    location: 'Sector 62, Noida',
    price: '₹85 Lac',
    area: '1,100 sq.ft',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    postedBy: 'Dealer',
    amenities: ['Parking', 'Security', 'Water Supply'],
    featured: false,
  },
  {
    id: 4,
    title: '5 BHK Duplex House',
    type: 'House',
    location: 'Vasant Kunj, Delhi',
    price: '₹6.2 Cr',
    area: '4,500 sq.ft',
    bedrooms: 5,
    bathrooms: 5,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    postedBy: 'Owner',
    amenities: ['Garden', 'Parking', 'Security', 'Servant Room'],
    featured: true,
  },
  {
    id: 5,
    title: '3 BHK Builder Floor',
    type: 'Builder Floor',
    location: 'Rajouri Garden, Delhi',
    price: '₹2.1 Cr',
    area: '1,400 sq.ft',
    bedrooms: 3,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
    postedBy: 'Owner',
    amenities: ['Parking', 'Security', 'Power Backup'],
    featured: false,
  },
  {
    id: 6,
    title: '4 BHK Penthouse',
    type: 'Penthouse',
    location: 'Sector 44, Gurgaon',
    price: '₹5.8 Cr',
    area: '3,800 sq.ft',
    bedrooms: 4,
    bathrooms: 4,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    postedBy: 'Builder',
    amenities: ['Terrace', 'Swimming Pool', 'Club House', 'Gym'],
    featured: true,
  },
  {
    id: 7,
    title: '2 BHK Apartment',
    type: 'Apartment',
    location: 'Indirapuram, Ghaziabad',
    price: '₹72 Lac',
    area: '1,050 sq.ft',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    postedBy: 'Dealer',
    amenities: ['Parking', 'Security', 'Lift'],
    featured: false,
  },
  {
    id: 8,
    title: '3 BHK Independent House',
    type: 'House',
    location: 'Saket, Delhi',
    price: '₹3.5 Cr',
    area: '2,200 sq.ft',
    bedrooms: 3,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    postedBy: 'Owner',
    amenities: ['Garden', 'Parking', 'Security'],
    featured: false,
  },
]

const PropertyCard = ({ property }) => {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[380px] bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {property.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200">
            <Heart size={16} className="text-slate-600 hover:text-rose-500" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200">
            <Share2 size={16} className="text-slate-600 hover:text-blue-500" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700">
          {property.type}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-800">{property.title}</h3>
          <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
            {property.postedBy}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
          <MapPin size={14} />
          {property.location}
        </div>

        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <Bed size={16} className="text-slate-400" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <Bath size={16} className="text-slate-400" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <Maximize size={16} className="text-slate-400" />
            <span>{property.area}</span>
          </div>
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
            <p className="text-xs text-slate-500">Price</p>
            <p className="text-xl font-bold" style={{ color: '#193C06' }}>
              {property.price}
            </p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 bg-[#193C06]" >
            Contact
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

const BuyProperty = () => {
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
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Properties for Sale</h2>
            <p className="text-slate-500">Find your dream home from our extensive listings</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: '#193C06' }}>
            View All Properties
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
            {PROPERTIES.map((property) => (
              <div key={property.id} className="snap-start">
                <PropertyCard property={property} />
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

export default BuyProperty
