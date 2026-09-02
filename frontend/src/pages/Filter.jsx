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
  ShieldCheck,
  BadgeCheck,
  Award,
  Users,
  Camera,
  Video,
  Info,
  Globe,
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

const BUILT_UP_AREA_OPTIONS = [
  '500 sq.ft and below',
  '501 – 750 sq.ft',
  '751 – 1,000 sq.ft',
  '1,001 – 1,250 sq.ft',
  '1,251 – 1,500 sq.ft',
  '1,501 – 2,000 sq.ft',
  '2,001 – 2,500 sq.ft',
  '2,501 – 3,000 sq.ft',
  '3,001 – 4,000 sq.ft',
  '4,001 – 5,000 sq.ft',
  '5,001 – 7,500 sq.ft',
  '7,501 – 10,000 sq.ft',
  '10,000+ sq.ft'
]

const SUPER_AREA_OPTIONS = [
  '500 sq.ft and below',
  '501 – 750 sq.ft',
  '751 – 1,000 sq.ft',
  '1,001 – 1,250 sq.ft',
  '1,251 – 1,500 sq.ft',
  '1,501 – 2,000 sq.ft',
  '2,001 – 2,500 sq.ft',
  '2,501 – 3,000 sq.ft',
  '3,001 – 4,000 sq.ft',
  '4,001 – 5,000 sq.ft',
  '5,001 – 7,500 sq.ft',
  '7,501 – 10,000 sq.ft',
  '10,000+ sq.ft'
]

const AREA_RANGES = [
  { label: 'Under 500 sqft', min: 0, max: 500 },
  { label: '500 - 1000 sqft', min: 500, max: 1000 },
  { label: '1000 - 1500 sqft', min: 1000, max: 1500 },
  { label: '1500 - 2000 sqft', min: 1500, max: 2000 },
  { label: '2000 - 3000 sqft', min: 2000, max: 3000 },
  { label: 'Above 3000 sqft', min: 3000, max: null },
]

// Listing / possession status. "Under Expression of Interest (EOI)" is used
// in place of "Pre Launch" per business requirement.
const LISTING_STATUS = [
  'Under Expression of Interest (EOI)',
  'Under Construction',
  'Under Possession',
  'Ready to Move',
  'Registry',
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

// Trust / quality tags shown as filters and as badges on each listing.
const TAGS = [
  { id: 'rera', label: 'RERA Compliant', icon: ShieldCheck },
  { id: 'preferred', label: 'Preferred', icon: Award },
  { id: 'verified', label: 'Verified', icon: BadgeCheck },
  { id: 'preferredAgent', label: 'Preferred Agent', icon: Users },
]

const SALE_TYPES = [
  'Primary Sale / New Booking (No Brokerage)',
  'Secondary Sale  (Resale)',
]

const POSTED_BY = ['Owner', 'Agent', 'Builder']

const POSSESSION_STATUS = ['Ready to Move', 'Within 6 Months', 'Within 1 Year', 'Within 2 Years', 'Within 3 Years', 'More Than 3 Years']

const FURNISHING = ['Furnished', 'Semi-Furnished', 'Unfurnished']

const FLOOR_NUMBER = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor', '6th Floor +']

const AGE_OF_PROPERTY = ['New Construction', '0-5 Years', '5-10 Years', '10+ Years']

const FACING = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West']

const PARKING_COUNT = ['1', '2', '3', '4', '5+']

const PARKING_TYPE = [
  'Covered Parking - Basement',
  'Covered Parking - Podium',
  'Covered Parking - Mechanical',
  'Open Parking',
  'No Parking'
]

const WATER_SOURCE = ['Municipal', 'Borewell', 'Tanker', 'Well']

const MAINTENANCE_CHARGES = ['Below ₹2000', '₹2000 - ₹5000', '₹5000 - ₹10000', 'Above ₹10000']

const POSTED_SINCE = [
  'Last 12 Hours',
  'Last 24 Hours',
  'Last 3 Days',
  'Last 7 Days',
  'Last 15 Days',
  'Last 30 Days',
  'Last 3 Months',
  'Last 6 Months',
  'Last 1 Year'
]

const TAG_STYLES = {
  rera: { text: '#047857', bg: '#ECFDF5', icon: ShieldCheck, label: 'RERA Compliant' },
  preferred: { text: '#B45309', bg: '#FFFBEB', icon: Award, label: 'Preferred Property' },
  verified: { text: '#1D4ED8', bg: '#EFF6FF', icon: BadgeCheck, label: 'Verified' },
  preferredAgent: { text: '#7C3AED', bg: '#F5F3FF', icon: Users, label: 'Preferred Agent' },
}

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
    tags: ['rera', 'verified'],
    listingStatus: 'Ready to Move',
    saleType: 'Secondary Sale / Resale',
    nri: false,
    photos: 18,
    videos: 2,
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
    tags: ['verified'],
    listingStatus: 'Registry',
    saleType: 'Secondary Sale / Resale',
    nri: true,
    photos: 9,
    videos: 0,
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
    tags: ['rera', 'preferred', 'preferredAgent'],
    listingStatus: 'Under Construction',
    saleType: 'Primary Sale / No Brokerage',
    nri: false,
    photos: 24,
    videos: 3,
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
    tags: ['rera'],
    listingStatus: 'Under Expression of Interest (EOI)',
    saleType: 'Primary Sale / No Brokerage',
    nri: false,
    photos: 12,
    videos: 1,
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
    tags: [],
    listingStatus: 'Under Possession',
    saleType: 'Secondary Sale / Resale',
    nri: true,
    photos: 6,
    videos: 0,
  },
]

const FilterSection = ({ title, children, isOpen, onToggle, badge }) => (
  <div className="border-b border-slate-100 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-4 px-5 text-left hover:bg-slate-50 transition-colors duration-200"
    >
      <span className="flex items-center gap-2 font-semibold text-sm" style={{ color: NAVY }}>
        {title}
        {badge > 0 && (
          <span
            className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold text-white"
            style={{ backgroundColor: BLUE }}
          >
            {badge}
          </span>
        )}
      </span>
      <ChevronRight
        size={18}
        className="transition-transform duration-200"
        style={{ color: NAVY, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
      />
    </button>
    {isOpen && <div className="px-5 pb-4">{children}</div>}
  </div>
)

const CheckboxOption = ({ label, checked, onChange, icon: Icon }) => (
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
    {Icon && <Icon size={15} className="text-slate-400 group-hover:text-slate-500 flex-shrink-0" />}
    <span className="text-sm text-slate-700">{label}</span>
  </label>
)

// Small pill used both in the property card badges and could be reused elsewhere.
const Pill = ({ text, bg, color, icon: Icon }) => (
  <span
    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold"
    style={{ backgroundColor: bg, color }}
  >
    {Icon && <Icon size={11} />}
    {text}
  </span>
)

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedType, setSelectedType] = useState('buy')
  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState([])
  const [selectedBedrooms, setSelectedBedrooms] = useState([])
  const [selectedBathrooms, setSelectedBathrooms] = useState([])
  const [selectedBuiltUpArea, setSelectedBuiltUpArea] = useState([])
  const [selectedSuperArea, setSelectedSuperArea] = useState([])
  const [selectedListingStatus, setSelectedListingStatus] = useState([])
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedSaleType, setSelectedSaleType] = useState([])
  const [selectedPostedBy, setSelectedPostedBy] = useState([])
  const [selectedPossessionStatus, setSelectedPossessionStatus] = useState([])
  const [selectedFurnishing, setSelectedFurnishing] = useState([])
  const [selectedFloorNumber, setSelectedFloorNumber] = useState([])
  const [selectedAgeOfProperty, setSelectedAgeOfProperty] = useState([])
  const [selectedFacing, setSelectedFacing] = useState([])
  const [selectedParkingCount, setSelectedParkingCount] = useState([])
  const [selectedParkingType, setSelectedParkingType] = useState([])
  const [selectedWaterSource, setSelectedWaterSource] = useState([])
  const [selectedMaintenanceCharges, setSelectedMaintenanceCharges] = useState([])
  const [selectedPostedSince, setSelectedPostedSince] = useState([])
  const [nriOnly, setNriOnly] = useState(false)
  const [photosOnly, setPhotosOnly] = useState(false)
  const [videosOnly, setVideosOnly] = useState(false)
  const [showNriInfo, setShowNriInfo] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    tags: true,
    bedrooms: false,
    bathrooms: false,
    builtUpArea: false,
    superArea: false,
    listingStatus: false,
    saleType: false,
    amenities: false,
    postedBy: false,
    possessionStatus: false,
    furnishing: false,
    floorNumber: false,
    ageOfProperty: false,
    facing: false,
    parkingCount: false,
    parkingType: false,
    waterSource: false,
    maintenanceCharges: false,
    postedSince: false,
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
    const status = searchParams.get('status')
    const tags = searchParams.get('tags')
    const saleType = searchParams.get('saleType')
    const nri = searchParams.get('nri')

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
    if (status) {
      setSelectedListingStatus(status.split(','))
    }
    if (tags) {
      setSelectedTags(tags.split(','))
    }
    if (saleType) {
      setSelectedSaleType(saleType.split(','))
    }
    if (nri === '1') {
      setNriOnly(true)
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

  const handleTagToggle = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    )
  }

  const handleSaleTypeToggle = (value) => {
    setSelectedSaleType((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    )
  }

  const filteredProperties = SAMPLE_PROPERTIES.filter((property) => {
    if (selectedType && property.type !== selectedType) return false
    if (selectedCategory.length > 0 && !selectedCategory.includes(property.category)) return false
    if (selectedCity && property.location !== selectedCity) return false
    if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (selectedListingStatus.length > 0 && !selectedListingStatus.includes(property.listingStatus)) return false
    if (selectedSaleType.length > 0 && !selectedSaleType.includes(property.saleType)) return false
    if (selectedTags.length > 0 && !selectedTags.every((t) => property.tags.includes(t))) return false
    if (nriOnly && !property.nri) return false
    return true
  })

  const activeFilterCount =
    selectedCategory.length +
    selectedPriceRange.length +
    selectedBedrooms.length +
    selectedBathrooms.length +
    selectedBuiltUpArea.length +
    selectedSuperArea.length +
    selectedListingStatus.length +
    selectedAmenities.length +
    selectedTags.length +
    selectedSaleType.length +
    selectedPostedBy.length +
    selectedPossessionStatus.length +
    selectedFurnishing.length +
    selectedFloorNumber.length +
    selectedAgeOfProperty.length +
    selectedFacing.length +
    selectedParkingCount.length +
    selectedParkingType.length +
    selectedWaterSource.length +
    selectedMaintenanceCharges.length +
    selectedPostedSince.length +
    (nriOnly ? 1 : 0) +
    (photosOnly ? 1 : 0) +
    (videosOnly ? 1 : 0) +
    (selectedCity ? 1 : 0)

  const clearAllFilters = () => {
    setSelectedCategory([])
    setSelectedCity('')
    setSelectedPriceRange([])
    setSelectedBedrooms([])
    setSelectedBathrooms([])
    setSelectedBuiltUpArea([])
    setSelectedSuperArea([])
    setSelectedListingStatus([])
    setSelectedAmenities([])
    setSelectedTags([])
    setSelectedSaleType([])
    setSelectedPostedBy([])
    setSelectedPossessionStatus([])
    setSelectedFurnishing([])
    setSelectedFloorNumber([])
    setSelectedAgeOfProperty([])
    setSelectedFacing([])
    setSelectedParkingCount([])
    setSelectedParkingType([])
    setSelectedWaterSource([])
    setSelectedMaintenanceCharges([])
    setSelectedPostedSince([])
    setNriOnly(false)
    setPhotosOnly(false)
    setVideosOnly(false)
    setSearchQuery('')
  }

  // Get all selected filters as an array of objects with label, category, and remove function
  const getSelectedFilters = () => {
    const filters = []

    // City
    if (selectedCity) {
      filters.push({
        label: selectedCity,
        category: 'City',
        onRemove: () => setSelectedCity('')
      })
    }

    // Categories
    selectedCategory.forEach(cat => {
      filters.push({
        label: cat,
        category: 'Category',
        onRemove: () => setSelectedCategory(prev => prev.filter(c => c !== cat))
      })
    })

    // Price Ranges
    selectedPriceRange.forEach(range => {
      filters.push({
        label: range.label,
        category: 'Price',
        onRemove: () => setSelectedPriceRange(prev => prev.filter(r => r.label !== range.label))
      })
    })

    // Bedrooms
    selectedBedrooms.forEach(bed => {
      filters.push({
        label: `${bed} BHK`,
        category: 'Bedrooms',
        onRemove: () => setSelectedBedrooms(prev => prev.filter(b => b !== bed))
      })
    })

    // Bathrooms
    selectedBathrooms.forEach(bath => {
      filters.push({
        label: `${bath} Bath`,
        category: 'Bathrooms',
        onRemove: () => setSelectedBathrooms(prev => prev.filter(b => b !== bath))
      })
    })

    // Built Up Area
    selectedBuiltUpArea.forEach(area => {
      filters.push({
        label: area,
        category: 'Built Up Area',
        onRemove: () => setSelectedBuiltUpArea(prev => prev.filter(a => a !== area))
      })
    })

    // Super Area
    selectedSuperArea.forEach(area => {
      filters.push({
        label: area,
        category: 'Super Area',
        onRemove: () => setSelectedSuperArea(prev => prev.filter(a => a !== area))
      })
    })

    // Listing Status
    selectedListingStatus.forEach(status => {
      filters.push({
        label: status,
        category: 'Property Status',
        onRemove: () => setSelectedListingStatus(prev => prev.filter(s => s !== status))
      })
    })

    // Amenities
    selectedAmenities.forEach(amenity => {
      filters.push({
        label: amenity,
        category: 'Amenities',
        onRemove: () => setSelectedAmenities(prev => prev.filter(a => a !== amenity))
      })
    })

    // Tags
    selectedTags.forEach(tag => {
      const tagInfo = TAG_STYLES[tag]
      filters.push({
        label: tagInfo?.label || tag,
        category: 'Tags',
        onRemove: () => setSelectedTags(prev => prev.filter(t => t !== tag))
      })
    })

    // Sale Type
    selectedSaleType.forEach(sale => {
      filters.push({
        label: sale,
        category: 'Sale Type',
        onRemove: () => setSelectedSaleType(prev => prev.filter(s => s !== sale))
      })
    })

    // Posted By
    selectedPostedBy.forEach(option => {
      filters.push({
        label: option,
        category: 'Posted By',
        onRemove: () => setSelectedPostedBy(prev => prev.filter(o => o !== option))
      })
    })

    // Possession Status
    selectedPossessionStatus.forEach(status => {
      filters.push({
        label: status,
        category: 'Possession',
        onRemove: () => setSelectedPossessionStatus(prev => prev.filter(s => s !== status))
      })
    })

    // Furnishing
    selectedFurnishing.forEach(option => {
      filters.push({
        label: option,
        category: 'Furnishing',
        onRemove: () => setSelectedFurnishing(prev => prev.filter(o => o !== option))
      })
    })

    // Floor Number
    selectedFloorNumber.forEach(floor => {
      filters.push({
        label: floor,
        category: 'Floor',
        onRemove: () => setSelectedFloorNumber(prev => prev.filter(f => f !== floor))
      })
    })

    // Age of Property
    selectedAgeOfProperty.forEach(age => {
      filters.push({
        label: age,
        category: 'Property Age',
        onRemove: () => setSelectedAgeOfProperty(prev => prev.filter(a => a !== age))
      })
    })

    // Facing
    selectedFacing.forEach(direction => {
      filters.push({
        label: direction,
        category: 'Facing',
        onRemove: () => setSelectedFacing(prev => prev.filter(d => d !== direction))
      })
    })

    // Parking Count
    selectedParkingCount.forEach(count => {
      filters.push({
        label: `${count} Parking`,
        category: 'Parking',
        onRemove: () => setSelectedParkingCount(prev => prev.filter(c => c !== count))
      })
    })

    // Parking Type
    selectedParkingType.forEach(type => {
      filters.push({
        label: type,
        category: 'Parking',
        onRemove: () => setSelectedParkingType(prev => prev.filter(t => t !== type))
      })
    })

    // Water Source
    selectedWaterSource.forEach(source => {
      filters.push({
        label: source,
        category: 'Water',
        onRemove: () => setSelectedWaterSource(prev => prev.filter(s => s !== source))
      })
    })

    // Maintenance Charges
    selectedMaintenanceCharges.forEach(charges => {
      filters.push({
        label: charges,
        category: 'Maintenance',
        onRemove: () => setSelectedMaintenanceCharges(prev => prev.filter(c => c !== charges))
      })
    })

    // Posted Since
    selectedPostedSince.forEach(time => {
      filters.push({
        label: time,
        category: 'Posted',
        onRemove: () => setSelectedPostedSince(prev => prev.filter(t => t !== time))
      })
    })

    // NRI Only
    if (nriOnly) {
      filters.push({
        label: 'NRI Only',
        category: 'Special',
        onRemove: () => setNriOnly(false)
      })
    }

    // Photos Only
    if (photosOnly) {
      filters.push({
        label: 'Photos Only',
        category: 'Media',
        onRemove: () => setPhotosOnly(false)
      })
    }

    // Videos Only
    if (videosOnly) {
      filters.push({
        label: 'Videos Only',
        category: 'Media',
        onRemove: () => setVideosOnly(false)
      })
    }

    return filters
  }

  return (
    <div className="w-full bg-white pt-24 min-h-screen">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>
                Property Search
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Find your perfect property from <span className="font-semibold" style={{ color: NAVY }}>{SAMPLE_PROPERTIES.length}</span> listings
              </p>
              
              {/* Selected Filters Display */}
              {activeFilterCount > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">Active filters:</span>
                  {getSelectedFilters().map((filter, index) => (
                    <button
                      key={`${filter.category}-${filter.label}-${index}`}
                      onClick={filter.onRemove}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                    >
                      <span className="text-slate-400 group-hover:text-red-400 text-[10px] uppercase tracking-wider font-semibold">
                        {filter.category}:
                      </span>
                      <span>{filter.label}</span>
                      <X size={12} className="text-slate-400 group-hover:text-red-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {activeFilterCount > 0 && (
                <span className="hidden sm:inline text-xs font-medium text-slate-500">
                  {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} applied
                </span>
              )}
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
                {/* Quick Filters */}
                <div className="p-5 border-b border-slate-100">
                  <h3 className="font-semibold text-sm mb-3" style={{ color: NAVY }}>Quick Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Verified Only', 'New Listings', 'Price Drop', 'Photos Only'].map((filter) => (
                      <button
                        key={filter}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 text-slate-600 hover:border-[#1E88E5] hover:text-[#1E88E5] transition-all duration-200"
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <FilterSection
                  title="Property Category"
                  isOpen={openSections.category}
                  onToggle={() => toggleSection('category')}
                  badge={selectedCategory.length}
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
                  badge={selectedPriceRange.length}
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

                {/* Trust & Quality Tags */}
                <FilterSection
                  title="Tags"
                  isOpen={openSections.tags}
                  onToggle={() => toggleSection('tags')}
                  badge={selectedTags.length}
                >
                  <div className="space-y-3">
                    {TAGS.map((tag) => (
                      <CheckboxOption
                        key={tag.id}
                        label={tag.label}
                        icon={tag.icon}
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => handleTagToggle(tag.id)}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Bedrooms"
                  isOpen={openSections.bedrooms}
                  onToggle={() => toggleSection('bedrooms')}
                  badge={selectedBedrooms.length}
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
                  badge={selectedBathrooms.length}
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
                  title="Built Up Area"
                  isOpen={openSections.builtUpArea}
                  onToggle={() => toggleSection('builtUpArea')}
                  badge={selectedBuiltUpArea.length}
                >
                  <div className="space-y-3">
                    {BUILT_UP_AREA_OPTIONS.map((area) => (
                      <CheckboxOption
                        key={area}
                        label={area}
                        checked={selectedBuiltUpArea.includes(area)}
                        onChange={() => setSelectedBuiltUpArea((prev) =>
                          prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Super Area"
                  isOpen={openSections.superArea}
                  onToggle={() => toggleSection('superArea')}
                  badge={selectedSuperArea.length}
                >
                  <div className="space-y-3">
                    {SUPER_AREA_OPTIONS.map((area) => (
                      <CheckboxOption
                        key={area}
                        label={area}
                        checked={selectedSuperArea.includes(area)}
                        onChange={() => setSelectedSuperArea((prev) =>
                          prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Property Status"
                  isOpen={openSections.listingStatus}
                  onToggle={() => toggleSection('listingStatus')}
                  badge={selectedListingStatus.length}
                >
                  <div className="space-y-3">
                    {LISTING_STATUS.map((status) => (
                      <CheckboxOption
                        key={status}
                        label={status}
                        checked={selectedListingStatus.includes(status)}
                        onChange={() => setSelectedListingStatus((prev) =>
                          prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Sale Type"
                  isOpen={openSections.saleType}
                  onToggle={() => toggleSection('saleType')}
                  badge={selectedSaleType.length}
                >
                  <div className="space-y-3">
                    {SALE_TYPES.map((type) => (
                      <CheckboxOption
                        key={type}
                        label={type}
                        checked={selectedSaleType.includes(type)}
                        onChange={() => handleSaleTypeToggle(type)}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Amenities"
                  isOpen={openSections.amenities}
                  onToggle={() => toggleSection('amenities')}
                  badge={selectedAmenities.length}
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

                <FilterSection
                  title="Posted By"
                  isOpen={openSections.postedBy}
                  onToggle={() => toggleSection('postedBy')}
                  badge={selectedPostedBy.length}
                >
                  <div className="space-y-3">
                    {POSTED_BY.map((option) => (
                      <CheckboxOption
                        key={option}
                        label={option}
                        checked={selectedPostedBy.includes(option)}
                        onChange={() => setSelectedPostedBy((prev) =>
                          prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Possession Status"
                  isOpen={openSections.possessionStatus}
                  onToggle={() => toggleSection('possessionStatus')}
                  badge={selectedPossessionStatus.length}
                >
                  <div className="space-y-3">
                    {POSSESSION_STATUS.map((status) => (
                      <CheckboxOption
                        key={status}
                        label={status}
                        checked={selectedPossessionStatus.includes(status)}
                        onChange={() => setSelectedPossessionStatus((prev) =>
                          prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Furnishing"
                  isOpen={openSections.furnishing}
                  onToggle={() => toggleSection('furnishing')}
                  badge={selectedFurnishing.length}
                >
                  <div className="space-y-3">
                    {FURNISHING.map((option) => (
                      <CheckboxOption
                        key={option}
                        label={option}
                        checked={selectedFurnishing.includes(option)}
                        onChange={() => setSelectedFurnishing((prev) =>
                          prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Floor Number"
                  isOpen={openSections.floorNumber}
                  onToggle={() => toggleSection('floorNumber')}
                  badge={selectedFloorNumber.length}
                >
                  <div className="space-y-3">
                    {FLOOR_NUMBER.map((floor) => (
                      <CheckboxOption
                        key={floor}
                        label={floor}
                        checked={selectedFloorNumber.includes(floor)}
                        onChange={() => setSelectedFloorNumber((prev) =>
                          prev.includes(floor) ? prev.filter((f) => f !== floor) : [...prev, floor]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Age of Property"
                  isOpen={openSections.ageOfProperty}
                  onToggle={() => toggleSection('ageOfProperty')}
                  badge={selectedAgeOfProperty.length}
                >
                  <div className="space-y-3">
                    {AGE_OF_PROPERTY.map((age) => (
                      <CheckboxOption
                        key={age}
                        label={age}
                        checked={selectedAgeOfProperty.includes(age)}
                        onChange={() => setSelectedAgeOfProperty((prev) =>
                          prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Facing"
                  isOpen={openSections.facing}
                  onToggle={() => toggleSection('facing')}
                  badge={selectedFacing.length}
                >
                  <div className="space-y-3">
                    {FACING.map((direction) => (
                      <CheckboxOption
                        key={direction}
                        label={direction}
                        checked={selectedFacing.includes(direction)}
                        onChange={() => setSelectedFacing((prev) =>
                          prev.includes(direction) ? prev.filter((d) => d !== direction) : [...prev, direction]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="No. of Parkings"
                  isOpen={openSections.parkingCount}
                  onToggle={() => toggleSection('parkingCount')}
                  badge={selectedParkingCount.length}
                >
                  <div className="space-y-3">
                    {PARKING_COUNT.map((count) => (
                      <CheckboxOption
                        key={count}
                        label={count}
                        checked={selectedParkingCount.includes(count)}
                        onChange={() => setSelectedParkingCount((prev) =>
                          prev.includes(count) ? prev.filter((c) => c !== count) : [...prev, count]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Type of Parking"
                  isOpen={openSections.parkingType}
                  onToggle={() => toggleSection('parkingType')}
                  badge={selectedParkingType.length}
                >
                  <div className="space-y-3">
                    {PARKING_TYPE.map((type) => (
                      <CheckboxOption
                        key={type}
                        label={type}
                        checked={selectedParkingType.includes(type)}
                        onChange={() => setSelectedParkingType((prev) =>
                          prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Water Source"
                  isOpen={openSections.waterSource}
                  onToggle={() => toggleSection('waterSource')}
                  badge={selectedWaterSource.length}
                >
                  <div className="space-y-3">
                    {WATER_SOURCE.map((source) => (
                      <CheckboxOption
                        key={source}
                        label={source}
                        checked={selectedWaterSource.includes(source)}
                        onChange={() => setSelectedWaterSource((prev) =>
                          prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Maintenance Charges"
                  isOpen={openSections.maintenanceCharges}
                  onToggle={() => toggleSection('maintenanceCharges')}
                  badge={selectedMaintenanceCharges.length}
                >
                  <div className="space-y-3">
                    {MAINTENANCE_CHARGES.map((charges) => (
                      <CheckboxOption
                        key={charges}
                        label={charges}
                        checked={selectedMaintenanceCharges.includes(charges)}
                        onChange={() => setSelectedMaintenanceCharges((prev) =>
                          prev.includes(charges) ? prev.filter((c) => c !== charges) : [...prev, charges]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Posted Since"
                  isOpen={openSections.postedSince}
                  onToggle={() => toggleSection('postedSince')}
                  badge={selectedPostedSince.length}
                >
                  <div className="space-y-3">
                    {POSTED_SINCE.map((time) => (
                      <CheckboxOption
                        key={time}
                        label={time}
                        checked={selectedPostedSince.includes(time)}
                        onChange={() => setSelectedPostedSince((prev) =>
                          prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
                        )}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* NRI Property — separate toggle since it is a single flag, not a multi-select list */}
                <div className="border-b border-slate-100 last:border-b-0 px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Globe size={16} style={{ color: NAVY }} />
                      <span className="font-semibold text-sm" style={{ color: NAVY }}>NRI Property</span>
                      <button
                        type="button"
                        onMouseEnter={() => setShowNriInfo(true)}
                        onMouseLeave={() => setShowNriInfo(false)}
                        onClick={() => setShowNriInfo((v) => !v)}
                        className="relative text-slate-400 hover:text-slate-600"
                      >
                        <Info size={14} />
                        {showNriInfo && (
                          <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-6 w-56 p-2.5 rounded-lg bg-slate-800 text-white text-[11px] leading-snug shadow-lg">
                            NRI properties attract a higher rate of TDS (Tax Deducted at Source) on transactions.
                          </div>
                        )}
                      </button>
                    </div>
                    <button
                      onClick={() => setNriOnly((v) => !v)}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
                        nriOnly ? 'bg-blue-500' : 'bg-slate-300'
                      }`}
                      role="switch"
                      aria-checked={nriOnly}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                          nriOnly ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Properties with Photos */}
                <div className="border-b border-slate-100 last:border-b-0 px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Camera size={16} style={{ color: NAVY }} />
                      <span className="font-semibold text-sm" style={{ color: NAVY }}>Properties with Photos</span>
                    </div>
                    <button
                      onClick={() => setPhotosOnly((v) => !v)}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
                        photosOnly ? 'bg-blue-500' : 'bg-slate-300'
                      }`}
                      role="switch"
                      aria-checked={photosOnly}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                          photosOnly ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Properties with Videos */}
                <div className="border-b border-slate-100 last:border-b-0 px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Video size={16} style={{ color: NAVY }} />
                      <span className="font-semibold text-sm" style={{ color: NAVY }}>Properties with Videos</span>
                    </div>
                    <button
                      onClick={() => setVideosOnly((v) => !v)}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
                        videosOnly ? 'bg-blue-500' : 'bg-slate-300'
                      }`}
                      role="switch"
                      aria-checked={videosOnly}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                          videosOnly ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <p className="text-slate-600 text-sm">
                Showing <span className="font-semibold" style={{ color: NAVY }}>{filteredProperties.length}</span> properties
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                  <button className="p-1.5 rounded-md bg-white shadow-sm text-slate-700">
                    <Layers size={16} />
                  </button>
                  <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-600">
                    <MapPin size={16} />
                  </button>
                </div>
                
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Sort by:</span>
                  <select className="text-sm font-medium border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-blue-500 cursor-pointer" style={{ color: NAVY }}>
                    <option>Relevance</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Most Popular</option>
                    <option>Area: Low to High</option>
                    <option>Area: High to Low</option>
                  </select>
                </div>

                {/* Save Search */}
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  <Star size={14} className="text-slate-400" />
                  Save Search
                </button>
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
                            Preferred Property
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-700">
                          {property.posted}
                        </span>
                      </div>
                      {/* Photo / video counts */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                        {property.photos > 0 && (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-black/60 text-white">
                            <Camera size={12} />
                            {property.photos}
                          </span>
                        )}
                        {property.videos > 0 && (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-black/60 text-white">
                            <Video size={12} />
                            {property.videos}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5">
                      {/* Tag badges + property status + sale type + NRI */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                        {property.tags.map((tagId) => {
                          const t = TAG_STYLES[tagId]
                          if (!t) return null
                          return <Pill key={tagId} text={t.label} bg={t.bg} color={t.text} icon={t.icon} />
                        })}
                        <Pill text={property.listingStatus} bg="#F1F5F9" color="#334155" icon={Clock} />
                        <Pill
                          text={property.saleType.includes('Primary') ? 'Primary / No Brokerage' : 'Resale'}
                          bg="#F1F5F9"
                          color="#334155"
                        />
                        {property.nri && (
                          <Pill text="NRI Property" bg="#FFF1F2" color="#BE123C" icon={Globe} />
                        )}
                      </div>

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