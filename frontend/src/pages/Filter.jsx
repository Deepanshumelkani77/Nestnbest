import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Search,
  MapPin,
  Home,
  Building2,
  Briefcase,
  Layers,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronRight,
  Bed,
  Bath,
  Maximize,
  IndianRupee,
  Filter as FilterIcon,
  Star,
  Clock,
  Check,
} from 'lucide-react'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const PROPERTY_TYPES = [
  { id: 'buy', label: 'Buy', icon: Home },
  { id: 'rent', label: 'Rent', icon: Briefcase },
  { id: 'commercial', label: 'Commercial', icon: Building2 },
  { id: 'land', label: 'Land/Plot', icon: Layers },
]

const PROPERTY_CATEGORIES = {
  buy: [
    'Flats / Apartments',
    'Independent Houses',
    'Villas',
    'Builder Floors',
    'Penthouses',
    'Farmhouses',
  ],
  rent: [
    'Flats / Apartments',
    'Independent Houses',
    'Villas',
    'Builder Floors',
    'Studio Apartments',
    'PG / Co-living',
  ],
  commercial: [
    'Office Space',
    'Retail Shops',
    'Showroom',
    'Warehouse',
    'Industrial Building',
    'Co-working Space',
  ],
  land: [
    'Residential Plots',
    'Commercial Plots',
    'Agricultural Land',
    'Farm House Land',
    'Industrial Land',
  ],
}

const CITIES = [
  'Delhi',
  'Gurgaon',
  'Noida',
  'Greater Noida',
  'Faridabad',
  'Mumbai',
  'Bangalore',
  'Pune',
  'Hyderabad',
  'Chennai',
]

const PRICE_RANGES = {
  buy: [
    { label: 'Under ₹50L', min: 0, max: 5000000 },
    { label: '₹50L - ₹1Cr', min: 5000000, max: 10000000 },
    { label: '₹1Cr - ₹2Cr', min: 10000000, max: 20000000 },
    { label: '₹2Cr - ₹5Cr', min: 20000000, max: 50000000 },
    { label: 'Above ₹5Cr', min: 50000000, max: null },
  ],
  rent: [
    { label: 'Under ₹10K', min: 0, max: 10000 },
    { label: '₹10K - ₹20K', min: 10000, max: 20000 },
    { label: '₹20K - ₹50K', min: 20000, max: 50000 },
    { label: '₹50K - ₹1L', min: 50000, max: 100000 },
    { label: 'Above ₹1L', min: 100000, max: null },
  ],
  commercial: [
    { label: 'Under ₹1Cr', min: 0, max: 10000000 },
    { label: '₹1Cr - ₹5Cr', min: 10000000, max: 50000000 },
    { label: '₹5Cr - ₹10Cr', min: 50000000, max: 100000000 },
    { label: 'Above ₹10Cr', min: 100000000, max: null },
  ],
  land: [
    { label: 'Under ₹50L', min: 0, max: 5000000 },
    { label: '₹50L - ₹1Cr', min: 5000000, max: 10000000 },
    { label: '₹1Cr - ₹5Cr', min: 10000000, max: 50000000 },
    { label: 'Above ₹5Cr', min: 50000000, max: null },
  ],
}

const BEDROOMS = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK']
const BATHROOMS = ['1', '2', '3', '4', '5+']
const AREA_RANGES = [
  { label: 'Under 500 sqft', min: 0, max: 500 },
  { label: '500 - 1000 sqft', min: 500, max: 1000 },
  { label: '1000 - 1500 sqft', min: 1000, max: 1500 },
  { label: '1500 - 2000 sqft', min: 1500, max: 2000 },
  { label: '2000 - 3000 sqft', min: 2000, max: 3000 },
  { label: 'Above 3000 sqft', min: 3000, max: null },
]

const POSSESSION_STATUS = [
  'Ready to Move',
  'Under Construction',
  'New Launch',
  'Possession in 6 Months',
  'Possession in 1 Year',
]

const AMENITIES = [
  'Parking',
  'Power Backup',
  'Water Supply',
  'Lift',
  'Gym',
  'Swimming Pool',
  'Security',
  'Club House',
  'Park',
  'Fire Safety',
]

const SAMPLE_PROPERTIES = [
  {
    id: 1,
    title: '3 BHK Apartment in Sector 62',
    location: 'Gurgaon',
    price: '₹1.2 Cr',
    area: '1800 sqft',
    bedrooms: 3,
    bathrooms: 2,
    type: 'buy',
    category: 'Flats / Apartments',
    posted: '2 days ago',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    featured: true,
  },
  {
    id: 2,
    title: '2 BHK Builder Floor',
    location: 'Delhi',
    price: '₹85 Lac',
    area: '1200 sqft',
    bedrooms: 2,
    bathrooms: 2,
    type: 'buy',
    category: 'Builder Floors',
    posted: '5 days ago',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
    featured: false,
  },
  {
    id: 3,
    title: '4 BHK Villa',
    location: 'Noida',
    price: '₹2.5 Cr',
    area: '3500 sqft',
    bedrooms: 4,
    bathrooms: 4,
    type: 'buy',
    category: 'Villas',
    posted: '1 week ago',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop',
    featured: true,
  },
  {
    id: 4,
    title: 'Commercial Office Space',
    location: 'Gurgaon',
    price: '₹1.8 Cr',
    area: '2500 sqft',
    bedrooms: 0,
    bathrooms: 2,
    type: 'commercial',
    category: 'Office Space',
    posted: '3 days ago',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    featured: false,
  },
  {
    id: 5,
    title: 'Residential Plot',
    location: 'Greater Noida',
    price: '₹45 Lac',
    area: '200 sqyd',
    bedrooms: 0,
    bathrooms: 0,
    type: 'land',
    category: 'Residential Plots',
    posted: '4 days ago',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
    featured: false,
  },
]

const FilterSection = ({ title, children, isOpen, onToggle }) => (
  <div className="border-b border-slate-100 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-4 px-5 text-left hover:bg-slate-50 transition-colors duration-200"
    >
      <span className="font-semibold text-sm" style={{ color: NAVY }}>{title}</span>
      <ChevronRight
        size={18}
        className="transition-transform duration-200"
        style={{ color: NAVY, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
      />
    </button>
    {isOpen && <div className="px-5 pb-4">{children}</div>}
  </div>
)

const CheckboxOption = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
          checked ? 'bg-blue-500 border-blue-500' : 'border-slate-300 group-hover:border-blue-400'
        }`}
      >
        {checked && <Check size={12} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
      </div>
    </div>
    <span className="text-sm text-slate-700">{label}</span>
  </label>
)

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedType, setSelectedType] = useState('buy')
  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState([])
  const [selectedBedrooms, setSelectedBedrooms] = useState([])
  const [selectedBathrooms, setSelectedBathrooms] = useState([])
  const [selectedArea, setSelectedArea] = useState([])
  const [selectedPossession, setSelectedPossession] = useState([])
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    bedrooms: false,
    bathrooms: false,
    area: false,
    possession: false,
    amenities: false,
  })

  // Initialize filters from URL params
  useEffect(() => {
    const type = searchParams.get('type')
    const city = searchParams.get('city')
    const query = searchParams.get('q')
    const category = searchParams.get('category')
    const price = searchParams.get('price')
    const bedrooms = searchParams.get('bedrooms')
    const bathrooms = searchParams.get('bathrooms')
    const area = searchParams.get('area')
    const possession = searchParams.get('possession')

    if (type && PROPERTY_TYPES.find((t) => t.id === type)) {
      setSelectedType(type)
    }
    if (city) {
      setSelectedCity(city)
    }
    if (query) {
      setSearchQuery(query)
    }
    if (category) {
      setSelectedCategory(category.split(','))
    }
    if (price) {
      const priceRanges = price.split(',').map((p) => {
        const range = PRICE_RANGES[selectedType]?.find((r) => r.label === p)
        return range
      }).filter(Boolean)
      setSelectedPriceRange(priceRanges)
    }
    if (bedrooms) {
      setSelectedBedrooms(bedrooms.split(','))
    }
    if (bathrooms) {
      setSelectedBathrooms(bathrooms.split(','))
    }
    if (area) {
      const areaRanges = area.split(',').map((a) => {
        const range = AREA_RANGES.find((r) => r.label === a)
        return range
      }).filter(Boolean)
      setSelectedArea(areaRanges)
    }
    if (possession) {
      setSelectedPossession(possession.split(','))
    }
  }, [searchParams])

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCategoryToggle = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const handlePriceToggle = (range) => {
    setSelectedPriceRange((prev) =>
      prev.some((r) => r.label === range.label)
        ? prev.filter((r) => r.label !== range.label)
        : [...prev, range]
    )
  }

  const filteredProperties = SAMPLE_PROPERTIES.filter((property) => {
    if (selectedType && property.type !== selectedType) return false
    if (selectedCategory.length > 0 && !selectedCategory.includes(property.category)) return false
    if (selectedCity && property.location !== selectedCity) return false
    if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const clearAllFilters = () => {
    setSelectedCategory([])
    setSelectedCity('')
    setSelectedPriceRange([])
    setSelectedBedrooms([])
    setSelectedBathrooms([])
    setSelectedArea([])
    setSelectedPossession([])
    setSelectedAmenities([])
    setSearchQuery('')
  }

  return (
    <div className="w-full bg-white pt-24 min-h-screen">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>
                Property Search
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Find your perfect property from {SAMPLE_PROPERTIES.length} listings
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors duration-200"
              >
                <X size={16} />
                Clear All
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:shadow-md" style={{ backgroundColor: NAVY }}>
                <FilterIcon size={16} />
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-24">
              {/* Property Type */}
              <div className="p-5 border-b border-slate-100">
                <h3 className="font-semibold text-sm mb-4" style={{ color: NAVY }}>Property Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {PROPERTY_TYPES.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                          selectedType === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <Icon size={20} style={{ color: selectedType === type.id ? BLUE : '#64748B' }} />
                        <span className="text-xs font-medium" style={{ color: selectedType === type.id ? NAVY : '#64748B' }}>
                          {type.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Filter Sections */}
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                <FilterSection
                  title="Property Category"
                  isOpen={openSections.category}
                  onToggle={() => toggleSection('category')}
                >
                  <div className="space-y-3">
                    {PROPERTY_CATEGORIES[selectedType]?.map((category) => (
                      <CheckboxOption
                        key={category}
                        label={category}
                        checked={selectedCategory.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Price Range"
                  isOpen={openSections.price}
                  onToggle={() => toggleSection('price')}
                >
                  <div className="space-y-3">
                    {PRICE_RANGES[selectedType]?.map((range) => (
                      <CheckboxOption
                        key={range.label}
                        label={range.label}
                        checked={selectedPriceRange.some((r) => r.label === range.label)}
                        onChange={() => handlePriceToggle(range)}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Bedrooms"
                  isOpen={openSections.bedrooms}
                  onToggle={() => toggleSection('bedrooms')}
                >
                  <div className="space-y-3">
                    {BEDROOMS.map((bed) => (
                      <CheckboxOption
                        key={bed}
                        label={bed}
                        checked={selectedBedrooms.includes(bed)}
                        onChange={() => setSelectedBedrooms((prev) =>
                          prev.includes(bed) ? prev.filter((b) => b !== bed) : [...prev, bed]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Bathrooms"
                  isOpen={openSections.bathrooms}
                  onToggle={() => toggleSection('bathrooms')}
                >
                  <div className="space-y-3">
                    {BATHROOMS.map((bath) => (
                      <CheckboxOption
                        key={bath}
                        label={bath}
                        checked={selectedBathrooms.includes(bath)}
                        onChange={() => setSelectedBathrooms((prev) =>
                          prev.includes(bath) ? prev.filter((b) => b !== bath) : [...prev, bath]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Area"
                  isOpen={openSections.area}
                  onToggle={() => toggleSection('area')}
                >
                  <div className="space-y-3">
                    {AREA_RANGES.map((area) => (
                      <CheckboxOption
                        key={area.label}
                        label={area.label}
                        checked={selectedArea.some((a) => a.label === area.label)}
                        onChange={() => setSelectedArea((prev) =>
                          prev.some((a) => a.label === area.label)
                            ? prev.filter((a) => a.label !== area.label)
                            : [...prev, area]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Possession Status"
                  isOpen={openSections.possession}
                  onToggle={() => toggleSection('possession')}
                >
                  <div className="space-y-3">
                    {POSSESSION_STATUS.map((status) => (
                      <CheckboxOption
                        key={status}
                        label={status}
                        checked={selectedPossession.includes(status)}
                        onChange={() => setSelectedPossession((prev) =>
                          prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Amenities"
                  isOpen={openSections.amenities}
                  onToggle={() => toggleSection('amenities')}
                >
                  <div className="space-y-3">
                    {AMENITIES.map((amenity) => (
                      <CheckboxOption
                        key={amenity}
                        label={amenity}
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => setSelectedAmenities((prev) =>
                          prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by location, property name..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                  />
                </div>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="pl-12 pr-10 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 appearance-none bg-white min-w-[200px]"
                  >
                    <option value="">All Cities</option>
                    {CITIES.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-600 text-sm">
                Showing <span className="font-semibold" style={{ color: NAVY }}>{filteredProperties.length}</span> properties
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Sort by:</span>
                <select className="text-sm font-medium border-0 bg-transparent focus:outline-none cursor-pointer" style={{ color: NAVY }}>
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>

            {/* Property Cards */}
            <div className="space-y-4">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-80 flex-shrink-0 relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      {property.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-yellow-900">
                            <Star size={12} fill="currentColor" />
                            Featured
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-700">
                          {property.posted}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-bold text-lg mb-1" style={{ color: NAVY }}>{property.title}</h3>
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <MapPin size={14} />
                            {property.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl" style={{ color: NAVY }}>{property.price}</div>
                          <div className="text-xs text-slate-500">{property.category}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                        {property.bedrooms > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Bed size={16} />
                            {property.bedrooms} Beds
                          </div>
                        )}
                        {property.bathrooms > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Bath size={16} />
                            {property.bathrooms} Baths
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Maximize size={16} />
                          {property.area}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <button className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors duration-200" style={{ color: BLUE }}>
                          View Details
                          <ChevronRight size={16} />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:shadow-md" style={{ backgroundColor: NAVY }}>
                          <IndianRupee size={16} />
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <Search size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: NAVY }}>No properties found</h3>
                <p className="text-slate-600 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: BLUE }}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProperties.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-300 transition-colors duration-200">
                  <ChevronRight size={20} className="rotate-180" />
                </button>
                <button className="w-10 h-10 rounded-lg font-medium text-white" style={{ backgroundColor: NAVY }}>1</button>
                <button className="w-10 h-10 rounded-lg border border-slate-200 font-medium text-slate-700 hover:border-slate-300 transition-colors duration-200">2</button>
                <button className="w-10 h-10 rounded-lg border border-slate-200 font-medium text-slate-700 hover:border-slate-300 transition-colors duration-200">3</button>
                <span className="px-2 text-slate-400">...</span>
                <button className="w-10 h-10 rounded-lg border border-slate-200 font-medium text-slate-700 hover:border-slate-300 transition-colors duration-200">10</button>
                <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:border-slate-300 transition-colors duration-200">
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
