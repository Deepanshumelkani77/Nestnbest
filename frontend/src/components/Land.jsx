import React from 'react'
import { ChevronLeft, ChevronRight, MapPin, Maximize, Heart, ArrowRight, Share2, TreePine, Building } from 'lucide-react'

const LANDS = [
  {
    id: 1,
    title: 'Residential Plot',
    type: 'Residential',
    location: 'Sector 88, Gurgaon',
    price: '₹4.5 Cr',
    area: '500 sq.yards',
    dimensions: '45 x 100 ft',
    image: 'https://images.unsplash.com/photo-1587745890135-20db8c79b027?w=400&h=300&fit=crop&q=80',
    postedBy: 'Owner',
    features: ['Corner Plot', 'Park Facing', 'Gated Society'],
    featured: true,
  },
  {
    id: 2,
    title: 'Commercial Land',
    type: 'Commercial',
    location: 'NH-48, Gurgaon',
    price: '₹12 Cr',
    area: '2,000 sq.yards',
    dimensions: '100 x 180 ft',
    image: 'https://images.unsplash.com/photo-1590169834934-297bdaa63590?w=400&h=300&fit=crop&q=80',
    postedBy: 'Builder',
    features: ['Highway Facing', 'Commercial Zone', 'Clear Title'],
    featured: true,
  },
  {
    id: 3,
    title: 'Agricultural Land',
    type: 'Agricultural',
    location: 'Manesar, Gurgaon',
    price: '₹2.8 Cr',
    area: '5 Acres',
    dimensions: '200 x 1000 ft',
    image: 'https://images.unsplash.com/photo-1506695041619-5dd4f46960b7?w=400&h=300&fit=crop&q=80',
    postedBy: 'Owner',
    features: ['Water Connection', 'Road Access', 'Fertile Soil'],
    featured: false,
  },
  {
    id: 4,
    title: 'Industrial Plot',
    type: 'Industrial',
    location: 'Sector 63, Noida',
    price: '₹8.5 Cr',
    area: '1,200 sq.meters',
    dimensions: '30 x 40 m',
    image: 'https://images.unsplash.com/photo-1574320377594-45b10b980bed?w=400&h=300&fit=crop&q=80',
    postedBy: 'Dealer',
    features: ['Power Supply', 'Water Supply', 'Warehouse Ready'],
    featured: false,
  },
  {
    id: 5,
    title: 'Farm House Land',
    type: 'Farm House',
    location: 'Chhatarpur, Delhi',
    price: '₹6.2 Cr',
    area: '2 Acres',
    dimensions: '87 x 1000 ft',
    image: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=400&h=300&fit=crop&q=80',
    postedBy: 'Owner',
    features: ['Water Body', 'Tree Lined', 'Peaceful Area'],
    featured: true,
  },
  {
    id: 6,
    title: 'Residential Plot',
    type: 'Residential',
    location: 'Sector 110, Noida',
    price: '₹3.2 Cr',
    area: '300 sq.yards',
    dimensions: '30 x 90 ft',
    image: 'https://images.unsplash.com/photo-1586859821397-c81e4971ca82?w=400&h=300&fit=crop&q=80',
    postedBy: 'Dealer',
    features: ['East Facing', 'Near Metro', 'Developed Area'],
    featured: false,
  },
  {
    id: 7,
    title: 'Institutional Land',
    type: 'Institutional',
    location: 'Sector 62, Gurgaon',
    price: '₹15 Cr',
    area: '3,000 sq.yards',
    dimensions: '150 x 180 ft',
    image: 'https://images.unsplash.com/photo-1747854805840-9be7d5e360e6?w=400&h=300&fit=crop&q=80',
    postedBy: 'Builder',
    features: ['School Zone', 'Wide Road', 'Near Highway'],
    featured: false,
  },
  {
    id: 8,
    title: 'Mixed Use Land',
    type: 'Mixed Use',
    location: 'Dwarka, Delhi',
    price: '₹7.5 Cr',
    area: '800 sq.yards',
    dimensions: '60 x 120 ft',
    image: 'https://images.unsplash.com/photo-1461175827210-5ceac3e39dd2?w=400&h=300&fit=crop&q=80',
    postedBy: 'Owner',
    features: ['Commercial + Residential', 'Main Road', 'Corner Plot'],
    featured: false,
  },
]

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
    <div className="flex-shrink-0 w-[320px] sm:w-[380px] bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
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
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200">
            <Heart size={16} className="text-slate-600 hover:text-rose-500" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200">
            <Share2 size={16} className="text-slate-600 hover:text-blue-500" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-white/90 backdrop-blur-sm text-xs font-semibold flex items-center gap-1">
          {getTypeIcon(land.type)}
          {land.type}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-800">{land.title}</h3>
          <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
            {land.postedBy}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
          <MapPin size={14} />
          {land.location}
        </div>

        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <Maximize size={16} className="text-slate-400" />
            <span>{land.area}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <span className="text-xs text-slate-400">Size:</span>
            <span>{land.dimensions}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {land.features.map((feature) => (
            <span key={feature} className="px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-600">
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-500">Price</p>
            <p className="text-xl font-bold" style={{ color: '#193C06' }}>
              {land.price}
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

const Land = () => {
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
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Land & Plots for Sale</h2>
            <p className="text-slate-500">Explore residential, commercial, and agricultural land</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: '#193C06' }}>
            View All Land
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
            {LANDS.map((land) => (
              <div key={land.id} className="snap-start">
                <LandCard land={land} />
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

export default Land