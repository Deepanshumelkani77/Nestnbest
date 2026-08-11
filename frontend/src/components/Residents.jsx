import React from 'react'
import { ChevronLeft, ChevronRight, MapPin, Building2, Star, ArrowRight } from 'lucide-react'

const NEW_LAUNCH_PROJECTS = [
  {
    id: 1,
    name: 'DLF The Camellias',
    location: 'Sector 42, Gurgaon',
    price: '₹8.5 Cr onwards',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    builder: 'DLF Ltd',
    status: 'New Launch',
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
    status: 'New Launch',
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
    status: 'New Launch',
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
    status: 'New Launch',
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
    status: 'New Launch',
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
    status: 'New Launch',
    rating: 4.6,
    amenities: ['Swimming Pool', 'Gym', 'Tennis Court'],
  },
]

const HOT_PROJECTS = [
  {
    id: 1,
    name: 'Sobha City',
    location: 'Sector 108, Gurgaon',
    price: '₹4.2 Cr onwards',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    builder: 'Sobha Ltd',
    status: 'Hot Project',
    rating: 4.7,
    amenities: ['Swimming Pool', 'Gym', 'Club House', 'Spa'],
  },
  {
    id: 2,
    name: 'Omaxe World Street',
    location: 'Sector 79, Gurgaon',
    price: '₹2.5 Cr onwards',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=400&h=300&fit=crop',
    builder: 'Omaxe Group',
    status: 'Hot Project',
    rating: 4.5,
    amenities: ['Retail Space', 'Food Court', 'Parking'],
  },
  {
    id: 3,
    name: 'Emaar Digital Greens',
    location: 'Sector 62, Gurgaon',
    price: '₹3.8 Cr onwards',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    builder: 'Emaar India',
    status: 'Hot Project',
    rating: 4.6,
    amenities: ['Gym', 'Swimming Pool', 'Business Center'],
  },
  {
    id: 4,
    name: 'Vatika City',
    location: 'Sector 49, Gurgaon',
    price: '₹3.1 Cr onwards',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    builder: 'Vatika Group',
    status: 'Hot Project',
    rating: 4.4,
    amenities: ['Park', 'Club House', '24/7 Security'],
  },
  {
    id: 5,
    name: 'Raheja Revanta',
    location: 'Sector 78, Gurgaon',
    price: '₹5.2 Cr onwards',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
    builder: 'Raheja Developers',
    status: 'Hot Project',
    rating: 4.8,
    amenities: ['Sky Pool', 'Spa', 'Gym', 'Lounge'],
  },
]

const RESALE_PROPERTIES = [
  {
    id: 1,
    name: '3 BHK Apartment',
    location: 'DLF Phase 3, Gurgaon',
    price: '₹1.8 Cr',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    builder: 'Resale',
    status: 'Resale',
    rating: 4.3,
    amenities: ['2 Balconies', 'Parking', 'Power Backup'],
  },
  {
    id: 2,
    name: '4 BHK Villa',
    location: 'Sushant Lok 1, Gurgaon',
    price: '₹3.5 Cr',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    builder: 'Resale',
    status: 'Resale',
    rating: 4.5,
    amenities: ['Garden', 'Private Parking', 'Security'],
  },
  {
    id: 3,
    name: '2 BHK Flat',
    location: 'Sector 56, Gurgaon',
    price: '₹95 Lac',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=400&h=300&fit=crop',
    builder: 'Resale',
    status: 'Resale',
    rating: 4.2,
    amenities: ['Semi-Furnished', 'Parking', 'Gym'],
  },
  {
    id: 4,
    name: 'Penthouse',
    location: 'DLF Phase 4, Gurgaon',
    price: '₹4.2 Cr',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    builder: 'Resale',
    status: 'Resale',
    rating: 4.7,
    amenities: ['Terrace', 'Jacuzzi', 'City View'],
  },
  {
    id: 5,
    name: '3 BHK Builder Floor',
    location: 'Sector 57, Gurgaon',
    price: '₹1.5 Cr',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    builder: 'Resale',
    status: 'Resale',
    rating: 4.4,
    amenities: ['Stilt Parking', 'Power Backup', 'Water Supply'],
  },
]

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'New Launch':
        return 'bg-emerald-500'
      case 'Hot Project':
        return 'bg-orange-500'
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
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full ${getStatusColor(project.status)} text-white text-xs font-semibold`}>
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

const ProjectSection = ({ title, description, projects, viewAllText = 'View All Projects' }) => {
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
            {projects.map((project) => (
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
    </div>
  )
}

const Residents = () => {
  return (
    <>
      <ProjectSection
        title="New Launch Projects"
        description="Explore the latest residential projects"
        projects={NEW_LAUNCH_PROJECTS}
        viewAllText="View All New Launch"
      />

      <ProjectSection
        title="Hot Projects"
        description="Discover trending and high-demand properties"
        projects={HOT_PROJECTS}
        viewAllText="View All Hot Projects"
      />

      <ProjectSection
        title="Resale Properties"
        description="Find pre-owned homes and properties"
        projects={RESALE_PROPERTIES}
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

export default Residents
