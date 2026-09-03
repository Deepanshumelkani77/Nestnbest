import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin, Building2, Star, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { PROPERTY_DATA } from '../data/properties'

const NEW_LAUNCH_PROJECTS = Object.values(PROPERTY_DATA).filter(p => p.status === 'EOI' || p.status === 'New Launch')
const HOT_PROJECTS = Object.values(PROPERTY_DATA).filter(p => p.status === 'Hot Project')
const RESALE_PROPERTIES = Object.values(PROPERTY_DATA).filter(p => p.status === 'Resale')

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'EOI':
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

  const getStatusLabel = (status) => {
    switch (status) {
      case 'New Launch':
        return 'EOI'
      default:
        return status
    }
  }

  return (
    <Link to={`/property/${project.id}`} className="block w-[320px] sm:w-[380px] bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm ${getStatusColor(project.status)}`} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          {getStatusLabel(project.status)}
        </span>
        <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs font-semibold backdrop-blur-sm" style={{ backgroundColor: 'rgba(245, 158, 11, 0.5)' }}>
          <Star size={12} fill="currentColor" />
          {project.rating}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-slate-800">{project.name}</h3>
          <div className="flex gap-2">
            {project.verified && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                <ShieldCheck size={12} />
                Verified
              </span>
            )}
            {project.preferred && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                <Sparkles size={12} />
                Preferred
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
          <MapPin size={16} />
          {project.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Building2 size={16} />
          {project.builder}
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600 font-medium">
              {amenity}
            </span>
          ))}
          {project.amenities.length > 3 && (
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600 font-medium">
              +{project.amenities.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-500 mb-1">Starting from</p>
            <p className="text-xl font-bold" style={{ color: '#193C06' }}>
              {project.price}
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 bg-[#193C06]" >
            View Details
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </Link>
  )
}

const ProjectSection = ({ title, description, projects, viewAllText = 'View All Projects' }) => {
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
            {projects.map((project) => (
              <div key={project.id} className="snap-start flex-shrink-0">
                <ProjectCard project={project} />
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

const Residents = () => {
  return (
    <>
      <ProjectSection
        title="Projects Under Expression of Interest (EOI)"
        description="Explore the Projects Under Expression of Interest (EOI)"
        projects={NEW_LAUNCH_PROJECTS}
        viewAllText="View All Projects under EOI"
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