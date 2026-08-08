import React from 'react'
import { ChevronLeft, ChevronRight, MapPin, Building2, Star, ArrowRight } from 'lucide-react'

const NEW_PROJECTS = [
  {
    id: 1,
    name: 'DLF The Camellias',
    location: 'Sector 42, Gurgaon',
    price: '₹8.5 Cr onwards',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    builder: 'DLF Ltd',
    status: 'Under Construction',
    rating: 4.8,
    amenities: ['Swimming Pool', 'Gym', 'Club House', 'Park'],
  },
  {
    id: 2,
    name: 'Godrej Properties',
    location: 'Sector 49, Gurgaon',
    price: '₹3.2 Cr onwards',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    builder: 'Godrej Properties',
    status: 'Ready to Move',
    rating: 4.6,
    amenities: ['Swimming Pool', 'Gym', '24/7 Security'],
  },
  {
    id: 3,
    name: 'Tata Primanti',
    location: 'Sector 72, Gurgaon',
    price: '₹4.5 Cr onwards',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=400&h=300&fit=crop',
    builder: 'Tata Housing',
    status: 'Under Construction',
    rating: 4.7,
    amenities: ['Golf Course', 'Spa', 'Club House', 'Jogging Track'],
  },
  {
    id: 4,
    name: 'M3M Golf Estate',
    location: 'Sector 65, Gurgaon',
    price: '₹5.8 Cr onwards',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    builder: 'M3M India',
    status: 'Under Construction',
    rating: 4.5,
    amenities: ['Golf Course', 'Swimming Pool', 'Gym'],
  },
  {
    id: 5,
    name: 'Emperor Estate',
    location: 'Sector 37C, Gurgaon',
    price: '₹2.9 Cr onwards',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    builder: 'Emperor Group',
    status: 'Ready to Move',
    rating: 4.4,
    amenities: ['Club House', 'Park', '24/7 Security'],
  },
  {
    id: 6,
    name: 'Puri Emerald Bay',
    location: 'Sector 104, Gurgaon',
    price: '₹3.8 Cr onwards',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
    builder: 'Puri Constructions',
    status: 'Under Construction',
    rating: 4.6,
    amenities: ['Swimming Pool', 'Gym', 'Tennis Court'],
  },
]

const ProjectCard = ({ project }) => {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[380px] bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700">
          {project.status}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold">
          <Star size={12} fill="currentColor" />
          {project.rating}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-800 mb-1">{project.name}</h3>
        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
          <MapPin size={14} />
          {project.location}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
          <Building2 size={14} />
          {project.builder}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-600">
              {amenity}
            </span>
          ))}
          {project.amenities.length > 3 && (
            <span className="px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-600">
              +{project.amenities.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-500">Starting from</p>
            <p className="text-lg font-bold" style={{ color: '#193C06' }}>
              {project.price}
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

const NewProject = () => {
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
            <h2 className="text-3xl font-bold text-slate-800 mb-2">New Launch Projects</h2>
            <p className="text-slate-500">Explore the latest residential and commercial projects</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: '#193C06' }}>
            View All Projects
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
            {NEW_PROJECTS.map((project) => (
              <div key={project.id} className="snap-start">
                <ProjectCard project={project} />
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

export default NewProject
