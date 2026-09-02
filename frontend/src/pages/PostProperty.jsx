import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Home,
  Building2,
  MapPin,
  Factory,
  ArrowRight,
  Upload,
  X,
  Plus,
  CheckCircle2,
  AlertCircle,
  Bed,
  Bath,
  Maximize,
  Phone,
  Mail,
  User,
  Layers,
  ShieldCheck,
  Droplets,
  Zap,
  Car,
  Trees,
  Waves,
  Dumbbell,
  Users,
  Camera,
  Wifi,
  Sparkles,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Compass,
  Sofa,
  Clock,
  FileText,
  Landmark,
  IndianRupee,
  ClipboardList,
  Images,
  ListChecks,
  Contact,
  BadgeCheck,
  TrendingUp,
  Eye,
  ImageOff,
  Ruler,
  Route,
  Gauge,
  Warehouse,
  Truck,
  Tag,
  KeyRound,
  Trash,
} from 'lucide-react'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const LISTING_FOR_OPTIONS = [
  { id: 'sale', label: 'For Sale', icon: Tag, description: 'List this property for outright purchase' },
  { id: 'rent', label: 'For Rent / Lease', icon: KeyRound, description: 'List this property for rent or lease' },
]

const PROPERTY_TYPES = [
  { id: 'residential', label: 'Residential', icon: Home, description: 'Apartments, villas, plots' },
  { id: 'commercial', label: 'Commercial', icon: Building2, description: 'Office spaces, retail, warehouses' },
  { id: 'land', label: 'Land', icon: MapPin, description: 'Residential, commercial, agricultural land' },
  { id: 'industrial', label: 'Industrial', icon: Factory, description: 'Sheds, factories, industrial plots' },
  { id: 'pg', label: 'PG / Co-Living', icon: Users, description: 'PG, co-living spaces' },
]

const RESIDENTIAL_SUBTYPES = [
  'Flats / Apartments', 'Independent Houses', 'Villas', 'Builder Floors', 'Studio Apartments',
  'Duplex Homes', 'Penthouse', 'Residential Plots', 'Gated Community', 'Farm Houses'
]
const COMMERCIAL_SUBTYPES = [
  'Office Space', 'Commercial Shops', 'Showrooms', 'Retail Spaces', 'Commercial Buildings', 'Hospital',
  'Commercial Plots', 'Co-working Spaces', 'Food Court / Restaurant Space', 'Hotels & Resorts', 'Commercial Complexes'
]
const LAND_SUBTYPES = [
  'Residential Plots', 'Commercial Plots', 'Agricultural Land', 'Farm Land', 'Orchard',
  'Plantation', 'Dairy Farm', 'Poultry Farm', 'Fish Farm', 'Horticulture Land', 'Vineyard', 'Industrial Land'
]
const INDUSTRIAL_SUBTYPES = [
  'Industrial Plots', 'Factory / Manufacturing Units', 'Industrial Sheds', 'Warehouses', 'Logistics & Distribution Centers',
  'Cold Storage', 'Industrial Buildings', 'Godowns', 'Workshop Units', 'Industrial Land'
]
const PG_SUBTYPES = [
  'Boys PG', 'Girls PG', 'Co-Living Spaces', 'Single Room', 'Shared Room', 'Student Accommodation', 'Working Professionals'
]

const AREA_UNITS_STANDARD = ['sq.ft', 'sq.yard', 'sq.m', 'acre', 'bigha']
const AREA_UNITS_LAND = ['acre', 'bigha', 'sq.yard', 'sq.ft', 'sq.m']

const BHK_OPTIONS = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK']
const FURNISHING_OPTIONS = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished']
const FACING_OPTIONS = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West']
const OWNERSHIP_OPTIONS = ['Freehold', 'Leasehold', 'Co-operative Society', 'Power of Attorney']
const CONTACT_TIME_OPTIONS = ['Anytime', 'Morning (9am–12pm)', 'Afternoon (12pm–4pm)', 'Evening (4pm–8pm)']
const WAREHOUSE_SUBTYPES = ['Warehouse', 'Industrial Shed']

// Additional filter options from website
const CONSTRUCTION_STATUS_OPTIONS = [
  'Under Expression of Interest (EOI)',
  'New Launch',
  'Under Construction',
  'NOC Obtained',
  'Under Physical Handover',
  'Ready to Move/Registry',
  'Ready to Move (Registry Pending)',
  'Resale/Secondary Sale',
]

const POSSESSION_STATUS_OPTIONS = [
  'Ready to Move',
  'Within 6 Months',
  'Within 1 Year',
  'Within 2 Years',
  'Within 3 Years',
  'More Than 3 Years',
  'Under Construction',
]

const AGE_OF_PROPERTY_OPTIONS = ['New Construction', '0-5 Years', '5-10 Years', '10+ Years']
const PARKING_TYPE_OPTIONS = [
  'Covered Parking - Basement',
  'Covered Parking - Podium',
  'Covered Parking - Mechanical',
  'Open Parking',
  'No Parking'
]
const WATER_SOURCE_OPTIONS = ['Municipal', 'Borewell', 'Tanker', 'Well']
const MAINTENANCE_CHARGES_OPTIONS = ['Below ₹2000', '₹2000 - ₹5000', '₹5000 - ₹10000', 'Above ₹10000']
const POSTED_BY_OPTIONS = ['Owner', 'Agent', 'Builder']
const SALE_TYPE_OPTIONS = ['Primary Sale / New Booking (No Brokerage)', 'Secondary Sale (Resale)']
const FLOOR_NUMBER_OPTIONS = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor', '6th Floor +']

const ADDITIONAL_AMENITIES_OPTIONS = [
  { id: 'lift', label: 'Lift/Elevator', icon: ChevronUp },
  { id: 'gym', label: 'Gym/Fitness Center', icon: Dumbbell },
  { id: 'swimming_pool', label: 'Swimming Pool', icon: Waves },
  { id: 'club_house', label: 'Club House', icon: Users },
  { id: 'park', label: 'Park/Garden', icon: Trees },
  { id: 'fire_safety', label: 'Fire Safety', icon: ShieldCheck },
  { id: 'intercom', label: 'Intercom', icon: Phone },
  { id: 'gas_pipeline', label: 'Gas Pipeline', icon: Droplets },
  { id: 'ac', label: 'Central AC', icon: Zap },
  { id: 'servant_room', label: 'Servant Room', icon: User },
  { id: 'rainwater_harvesting', label: 'Rainwater Harvesting', icon: Droplets },
  { id: 'waste_disposal', label: 'Waste Disposal', icon: Trash },
]

const AMENITIES_OPTIONS = [
  { id: 'power_backup', label: 'Power Backup', icon: Zap },
  { id: 'water_supply', label: 'Water Supply', icon: Droplets },
  { id: 'security', label: '24/7 Security', icon: ShieldCheck },
  { id: 'parking', label: 'Parking', icon: Car },
  { id: 'park', label: 'Park/Garden', icon: Trees },
  { id: 'pool', label: 'Swimming Pool', icon: Waves },
  { id: 'gym', label: 'Gym', icon: Dumbbell },
  { id: 'club', label: 'Club House', icon: Users },
  { id: 'cctv', label: 'CCTV', icon: Camera },
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'concierge', label: 'Concierge', icon: Sparkles },
  { id: 'fire_safety', label: 'Fire Safety', icon: ShieldCheck },
]

const STEPS = [
  { label: 'Listing', icon: Home },
  { label: 'Basic Info', icon: ClipboardList },
  { label: 'Details', icon: Layers },
  { label: 'Images', icon: Images },
  { label: 'Amenities', icon: ListChecks },
  { label: 'Contact', icon: Contact },
  { label: 'Review', icon: BadgeCheck },
]

const TIPS = [
  { icon: Camera, text: 'Listings with 5+ photos get up to 3x more enquiries.' },
  { icon: TrendingUp, text: 'Marking price as negotiable increases buyer response rate.' },
  { icon: Eye, text: 'A detailed description helps your listing rank higher in search.' },
]

/* ---- Reusable, consistently-styled form controls (original palette) ---- */
const Label = ({ children, required }) => (
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    {children}{required && <span className="text-red-500"> *</span>}
  </label>
)

/* Section-level heading, one notch bigger than a field Label — used to separate
   "Listing For" and "Property Type" within Step 1 without duplicating StepHeader. */
const SectionLabel = ({ children, required }) => (
  <div className="flex items-center gap-1.5 mb-3">
    <span className="text-base font-bold" style={{ color: NAVY }}>{children}</span>
    {required && <span className="text-red-500 text-sm">*</span>}
  </div>
)

const TextField = ({ label, required, icon: Icon, ...props }) => (
  <div>
    <Label required={required}>{label}</Label>
    <div className="relative">
      {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />}
      <input
        {...props}
        className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200`}
      />
    </div>
  </div>
)

const SelectField = ({ label, required, icon: Icon, options, placeholder, ...props }) => (
  <div>
    <Label required={required}>{label}</Label>
    <div className="relative">
      {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />}
      <select
        {...props}
        className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-10 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200 bg-white appearance-none cursor-pointer`}
      >
        <option value="">{placeholder || 'Select'}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
  </div>
)

/* Two-option Yes/No style toggle used for plot attributes (boundary wall, corner plot, loading dock) */
const ToggleField = ({ label, icon: Icon, value, onChange }) => (
  <div>
    <Label>{label}</Label>
    <div className="flex gap-2">
      {['Yes', 'No'].map((opt) => {
        const isActive = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
              isActive ? 'border-[#193C06] bg-[#193C06] text-white' : 'border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            {Icon && <Icon size={15} />}
            {opt}
          </button>
        )
      })}
    </div>
  </div>
)

const PostProperty = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [listingFor, setListingFor] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [images, setImages] = useState([])
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    description: '',
    propertyType: '',
    subType: '',
    location: '',
    locality: '',
    city: '',
    state: '',
    pincode: '',
    price: '',
    pricePerUnit: '',
    securityDeposit: '',
    priceNegotiable: false,
    maintenance: '',
    ownershipType: '',
    postedBy: user?.role === 'agent' ? 'Agent' : user?.role === 'builder' ? 'Builder' : 'Owner',
    saleType: '',

    // Property Details — residential / commercial (office)
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    furnishing: '',
    facing: '',
    floorNumber: '',
    totalFloors: '',
    parkingCovered: '',
    parkingOpen: '',
    parkingType: '',
    constructionStatus: '',
    waterSource: '',
    maintenanceCharges: '',
    postedBy: '',
    saleType: '',
    meals: '',

    // Property Details — land
    plotLength: '',
    plotBreadth: '',
    roadWidth: '',
    boundaryWall: '',
    cornerPlot: '',

    // Property Details — industrial / warehouse-like commercial
    powerLoad: '',
    ceilingHeight: '',
    loadingDock: '',

    // Shared
    area: '',
    areaUnit: 'sq.ft',
    possession: '',
    age: '',
    builtUpArea: '',
    superArea: '',

    // Contact Info
    contactName: user?.name || '',
    contactPhone: user?.phone || '',
    contactEmail: user?.email || '',
    contactTime: 'Anytime',

    // Additional
    reraId: '',
    status: 'pending',
  })

  const isRent = listingFor === 'rent'
  const isResidential = selectedType === 'residential'
  const isLand = selectedType === 'land'
  const isIndustrial = selectedType === 'industrial'
  const isPG = selectedType === 'pg'
  const isWarehouseLike = selectedType === 'industrial' || (selectedType === 'commercial' && WAREHOUSE_SUBTYPES.includes(formData.subType))
  const isCommercialOffice = selectedType === 'commercial' && !isWarehouseLike
  const areaUnitOptions = isLand ? AREA_UNITS_LAND : AREA_UNITS_STANDARD

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + images.length > 10) {
      setError('Maximum 10 images allowed')
      return
    }

    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages(prev => [...prev, e.target.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const toggleAmenity = (amenityId) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    )
  }

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
    setError('')
  }

  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateStep = () => {
    if (step === 1) {
      if (!listingFor) {
        setError('Please select whether this listing is for sale or rent/lease')
        return false
      }
      if (!selectedType) {
        setError('Please select a property type')
        return false
      }
    }
    if (step === 2) {
      if (!formData.title || !formData.location || !formData.price) {
        setError('Please fill in all required fields')
        return false
      }
    }
    if (step === 3) {
      if (!formData.area) {
        setError('Please enter the property area')
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep()) return

    setLoading(true)
    setError('')

    setTimeout(() => {
      console.log('Property submitted:', { ...formData, listingFor, type: selectedType, images, amenities: selectedAmenities })
      navigate('/dashboard', { state: { success: true } })
      setLoading(false)
    }, 2000)
  }

  const getSubtypes = () => {
    switch (selectedType) {
      case 'residential': return RESIDENTIAL_SUBTYPES
      case 'commercial': return COMMERCIAL_SUBTYPES
      case 'land': return LAND_SUBTYPES
      case 'industrial': return INDUSTRIAL_SUBTYPES
      case 'pg': return PG_SUBTYPES
      default: return []
    }
  }

  /* Listing completeness score, used for the sidebar meter */
  const completeness = useMemo(() => {
    const checks = [
      !!listingFor,
      !!selectedType,
      !!formData.title,
      !!formData.subType,
      !!formData.location,
      !!formData.price,
      !!formData.description,
      !!formData.area,
      images.length > 0,
      selectedAmenities.length > 0,
      !!formData.contactPhone,
    ]
    const filled = checks.filter(Boolean).length
    return Math.round((filled / checks.length) * 100)
  }, [listingFor, selectedType, formData, images, selectedAmenities])

  const progressPct = Math.round((step / STEPS.length) * 100)

  const StepHeader = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-4 mb-8">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${NAVY}0F` }}>
        <Icon size={22} style={{ color: NAVY }} />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: NAVY }}>{title}</h2>
        <p className="text-slate-500 text-sm">{description}</p>
      </div>
    </div>
  )

  const renderStep1 = () => (
    <div>
      <StepHeader icon={Home} title="Listing Details" description="Start with what you're listing, and its category" />

      <div className="mb-8">
        <SectionLabel required>Listing For</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LISTING_FOR_OPTIONS.map((opt) => {
            const Icon = opt.icon
            const isActive = listingFor === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setListingFor(opt.id)}
                className={`relative p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                  isActive ? 'border-[#193C06] bg-[#193C06]/5 shadow-sm' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {isActive && (
                  <CheckCircle2 size={18} className="absolute top-4 right-4" style={{ color: NAVY }} />
                )}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: isActive ? NAVY : '#F1F5F9' }}
                >
                  <Icon size={19} className={isActive ? 'text-white' : 'text-slate-400'} />
                </div>
                <h3 className="font-bold text-base mb-0.5" style={{ color: NAVY }}>{opt.label}</h3>
                <p className="text-xs text-slate-500">{opt.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <SectionLabel required>Property Type</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROPERTY_TYPES.filter(type => {
            // Hide PG/Co-Living when listing is for sale
            if (type.id === 'pg' && listingFor === 'sale') return false
            return true
          }).map((type) => {
            const Icon = type.icon
            const isActive = selectedType === type.id
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => {
                  setSelectedType(type.id)
                  setField('areaUnit', type.id === 'land' ? 'acre' : 'sq.ft')
                }}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                  isActive ? 'border-[#193C06] bg-[#193C06]/5 shadow-sm' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {isActive && (
                  <CheckCircle2 size={20} className="absolute top-4 right-4" style={{ color: NAVY }} />
                )}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: isActive ? NAVY : '#F1F5F9' }}
                >
                  <Icon size={22} className={isActive ? 'text-white' : 'text-slate-400'} />
                </div>
                <h3 className="font-bold text-lg mb-1" style={{ color: NAVY }}>{type.label}</h3>
                <p className="text-sm text-slate-500">{type.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div>
      <StepHeader icon={ClipboardList} title="Basic Information" description="Tell buyers what makes this listing worth a look" />

      <div className="space-y-6">
        <TextField
          label="Property Title"
          required
          icon={FileText}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="E.g., 3BHK Apartment in Sector 42"
        />

        <SelectField
          label="Property Subtype"
          required
          icon={Layers}
          name="subType"
          value={formData.subType}
          onChange={handleChange}
          options={getSubtypes()}
          placeholder="Select subtype"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="City"
            required
            icon={MapPin}
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="E.g., Gurgaon"
          />
          <TextField
            label="State"
            required
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="E.g., Haryana"
          />
        </div>

        <TextField
          label="Full Location"
          required
          icon={MapPin}
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="E.g., Sector 42, Gurgaon, Haryana"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Locality / Landmark"
            icon={Landmark}
            type="text"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            placeholder="E.g., Near Metro Station"
          />
          <TextField
            label="Pincode"
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="E.g., 122002"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label={isRent ? 'Expected Monthly Rent (₹)' : 'Expected Price (₹)'}
            required
            icon={IndianRupee}
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder={isRent ? 'E.g., 25,000' : 'E.g., 85,00,000'}
          />
          {isRent ? (
            <TextField
              label="Security Deposit (₹)"
              type="text"
              name="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleChange}
              placeholder="E.g., 1,00,000"
            />
          ) : (
            <TextField
              label="Price per Unit"
              type="text"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              placeholder="E.g., ₹12,000/sq.ft"
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Posted By"
            icon={User}
            name="postedBy"
            value={formData.postedBy}
            onChange={handleChange}
            options={POSTED_BY_OPTIONS}
            placeholder="Select who is posting"
          />
          {!isRent && (
            <SelectField
              label="Sale Type"
              icon={Tag}
              name="saleType"
              value={formData.saleType}
              onChange={handleChange}
              options={SALE_TYPE_OPTIONS}
              placeholder="Select sale type"
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Maintenance (₹ / month)"
            type="text"
            name="maintenance"
            value={formData.maintenance}
            onChange={handleChange}
            placeholder="E.g., 2,500"
          />
          <SelectField
            label="Ownership Type"
            name="ownershipType"
            value={formData.ownershipType}
            onChange={handleChange}
            options={OWNERSHIP_OPTIONS}
            placeholder="Select ownership"
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none w-fit px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
          <span
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              formData.priceNegotiable ? 'border-[#193C06] bg-[#193C06]' : 'border-slate-300'
            }`}
          >
            {formData.priceNegotiable && <CheckCircle2 size={13} className="text-white" strokeWidth={3} />}
          </span>
          <input
            type="checkbox"
            name="priceNegotiable"
            checked={formData.priceNegotiable}
            onChange={handleChange}
            className="hidden"
          />
          <span className="text-sm font-medium text-slate-700">{isRent ? 'Rent is negotiable' : 'Price is negotiable'}</span>
        </label>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label required>Property Description</Label>
            <span className="text-xs text-slate-400">{formData.description.length}/1000</span>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your property in detail — layout, condition, neighbourhood, and what makes it stand out..."
            rows={5}
            maxLength={1000}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200 resize-none"
            required
          />
        </div>
      </div>
    </div>
  )

  const renderAreaField = () => (
    <div>
      <Label required>Area</Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Maximize size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Enter area"
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
            required
          />
        </div>
        <div className="relative">
          <select
            name="areaUnit"
            value={formData.areaUnit}
            onChange={handleChange}
            className="h-full pl-4 pr-9 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200 bg-white appearance-none cursor-pointer"
          >
            {areaUnitOptions.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
          <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div>
      <StepHeader icon={Layers} title="Property Details" description="Specifications buyers filter and compare by" />

      <div className="space-y-6">
        {/* Residential-only: configuration */}
        {isResidential && (
          <div>
            <Label>Configuration (BHK)</Label>
            <div className="flex flex-wrap gap-2">
              {BHK_OPTIONS.map((n) => {
                const isActive = formData.bedrooms === n
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setField('bedrooms', n)}
                    className={`px-4 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                      isActive
                        ? 'border-[#193C06] bg-[#193C06] text-white'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {n} BHK
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Area is always first — the one field every property type needs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderAreaField()}

          {/* Land: plot dimensions replace floor count */}
          {isLand && (
            <div className="grid grid-cols-2 gap-2">
              <TextField
                label="Plot Length"
                type="text"
                name="plotLength"
                value={formData.plotLength}
                onChange={handleChange}
                placeholder="E.g., 40 ft"
              />
              <TextField
                label="Plot Breadth"
                type="text"
                name="plotBreadth"
                value={formData.plotBreadth}
                onChange={handleChange}
                placeholder="E.g., 60 ft"
              />
            </div>
          )}

          {/* Residential & commercial offices: floor details */}
          {(isResidential || isCommercialOffice || isPG) && (
            <div className="grid grid-cols-2 gap-2">
              <SelectField
                label="Floor No."
                icon={Layers}
                name="floorNumber"
                value={formData.floorNumber}
                onChange={handleChange}
                options={FLOOR_NUMBER_OPTIONS}
                placeholder="Select floor"
              />
              <TextField
                label="Total Floors"
                type="text"
                name="totalFloors"
                value={formData.totalFloors}
                onChange={handleChange}
                placeholder="E.g., 12"
              />
            </div>
          )}

          {/* Industrial & warehouse-like commercial: building specs */}
          {isWarehouseLike && (
            <TextField
              label="Ceiling Height"
              icon={Ruler}
              type="text"
              name="ceilingHeight"
              value={formData.ceilingHeight}
              onChange={handleChange}
              placeholder="E.g., 24 ft"
            />
          )}
        </div>

        {/* Residential: bathrooms & balconies */}
        {(isResidential || isPG) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Bathrooms"
              icon={Bath}
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="No. of bathrooms"
            />
            {isResidential && (
              <TextField
                label="Balconies"
                icon={Bed}
                type="number"
                name="balconies"
                value={formData.balconies}
                onChange={handleChange}
                placeholder="No. of balconies"
              />
            )}
            {isPG && (
              <TextField
                label="Meals"
                icon={Sofa}
                type="text"
                name="meals"
                value={formData.meals}
                onChange={handleChange}
                placeholder="E.g., 3 times/day"
              />
            )}
          </div>
        )}

        {/* Commercial office: washrooms */}
        {isCommercialOffice && (
          <TextField
            label="Washrooms"
            icon={Bath}
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            placeholder="No. of washrooms"
          />
        )}

        {/* Furnishing + Facing — residential, commercial office, and PG */}
        {(isResidential || isCommercialOffice || isPG) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Furnishing Status"
              icon={Sofa}
              name="furnishing"
              value={formData.furnishing}
              onChange={handleChange}
              options={FURNISHING_OPTIONS}
              placeholder="Select furnishing"
            />
            <SelectField
              label="Facing"
              icon={Compass}
              name="facing"
              value={formData.facing}
              onChange={handleChange}
              options={FACING_OPTIONS}
              placeholder="Select facing"
            />
          </div>
        )}

        {/* Land: facing + road width */}
        {isLand && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Facing"
              icon={Compass}
              name="facing"
              value={formData.facing}
              onChange={handleChange}
              options={FACING_OPTIONS}
              placeholder="Select facing"
            />
            <TextField
              label="Road Width"
              icon={Route}
              type="text"
              name="roadWidth"
              value={formData.roadWidth}
              onChange={handleChange}
              placeholder="E.g., 30 ft"
            />
          </div>
        )}

        {/* Land: boundary wall & corner plot */}
        {isLand && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ToggleField
              label="Boundary Wall"
              icon={ShieldCheck}
              value={formData.boundaryWall}
              onChange={(v) => setField('boundaryWall', v)}
            />
            <ToggleField
              label="Corner Plot"
              icon={MapPin}
              value={formData.cornerPlot}
              onChange={(v) => setField('cornerPlot', v)}
            />
          </div>
        )}

        {/* Industrial / warehouse-like: facing + power load */}
        {isWarehouseLike && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Facing"
              icon={Compass}
              name="facing"
              value={formData.facing}
              onChange={handleChange}
              options={FACING_OPTIONS}
              placeholder="Select facing"
            />
            <TextField
              label="Power Load"
              icon={Gauge}
              type="text"
              name="powerLoad"
              value={formData.powerLoad}
              onChange={handleChange}
              placeholder="E.g., 50 KVA"
            />
          </div>
        )}

        {isWarehouseLike && (
          <ToggleField
            label="Loading Dock Available"
            icon={Truck}
            value={formData.loadingDock}
            onChange={(v) => setField('loadingDock', v)}
          />
        )}

        {/* Parking — everything except plain land */}
        {!isLand && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Covered Parking"
              icon={Car}
              type="number"
              name="parkingCovered"
              value={formData.parkingCovered}
              onChange={handleChange}
              placeholder="No. of covered spots"
            />
            <TextField
              label="Open Parking"
              icon={Car}
              type="number"
              name="parkingOpen"
              value={formData.parkingOpen}
              onChange={handleChange}
              placeholder="No. of open spots"
            />
          </div>
        )}

        {!isLand && (
          <SelectField
            label="Parking Type"
            icon={Car}
            name="parkingType"
            value={formData.parkingType}
            onChange={handleChange}
            options={PARKING_TYPE_OPTIONS}
            placeholder="Select parking type"
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Construction Status"
            icon={Building2}
            name="constructionStatus"
            value={formData.constructionStatus}
            onChange={handleChange}
            options={CONSTRUCTION_STATUS_OPTIONS}
            placeholder="Select construction status"
          />
          {!isLand && (
            <SelectField
              label="Water Source"
              icon={Droplets}
              name="waterSource"
              value={formData.waterSource}
              onChange={handleChange}
              options={WATER_SOURCE_OPTIONS}
              placeholder="Select water source"
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Possession Status"
            name="possession"
            value={formData.possession}
            onChange={handleChange}
            options={POSSESSION_STATUS_OPTIONS}
            placeholder="Select possession status"
          />
          {!isLand && (
            <SelectField
              label="Maintenance Charges"
              icon={IndianRupee}
              name="maintenanceCharges"
              value={formData.maintenanceCharges}
              onChange={handleChange}
              options={MAINTENANCE_CHARGES_OPTIONS}
              placeholder="Select maintenance charges"
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {!isLand && (
            <SelectField
              label="Property Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              options={AGE_OF_PROPERTY_OPTIONS}
              placeholder="Select property age"
            />
          )}
          <TextField
            label="RERA ID (if applicable)"
            icon={ShieldCheck}
            type="text"
            name="reraId"
            value={formData.reraId}
            onChange={handleChange}
            placeholder="Enter RERA registration number"
          />
        </div>

        {/* Additional Area Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Built-up Area"
            icon={Maximize}
            type="text"
            name="builtUpArea"
            value={formData.builtUpArea}
            onChange={handleChange}
            placeholder="E.g., 1200 sq.ft"
          />
          <TextField
            label="Super Area"
            icon={Maximize}
            type="text"
            name="superArea"
            value={formData.superArea}
            onChange={handleChange}
            placeholder="E.g., 1400 sq.ft"
          />
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div>
      <StepHeader icon={Images} title="Property Images" description="Upload high-quality images of your property (max 10)" />

      <div className="space-y-6">
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-[#1E88E5] transition-colors">
          <Upload size={48} className="mx-auto mb-4 text-slate-400" />
          <p className="text-slate-600 mb-2">Drag and drop images here, or</p>
          <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold cursor-pointer transition-all duration-200 hover:shadow-lg" style={{ backgroundColor: NAVY }}>
            <Plus size={20} />
            Browse Files
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <p className="text-slate-400 text-sm mt-3">Supported formats: JPG, PNG, WEBP (max 5MB each)</p>
        </div>

        {images.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">{images.length} of 10 images uploaded — first image is used as cover</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img src={image} alt={`Property ${index + 1}`} className="w-full h-32 object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-[#193C06] text-white text-xs font-semibold">
                      Cover
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div>
      <StepHeader icon={ListChecks} title="Amenities" description="Select the amenities available at your property" />

      <div className="space-y-6">
        <div>
          <Label>Basic Amenities</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3">
            {AMENITIES_OPTIONS.map((amenity) => {
              const Icon = amenity.icon
              const isSelected = selectedAmenities.includes(amenity.id)
              return (
                <button
                  key={amenity.id}
                  type="button"
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                    isSelected
                      ? 'border-[#193C06] bg-[#193C06]/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Icon size={24} className={`mx-auto mb-2 ${isSelected ? 'text-[#193C06]' : 'text-slate-400'}`} />
                  <span className={`text-sm font-medium ${isSelected ? 'text-[#193C06]' : 'text-slate-600'}`}>
                    {amenity.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <Label>Additional Amenities</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3">
            {ADDITIONAL_AMENITIES_OPTIONS.map((amenity) => {
              const Icon = amenity.icon
              const isSelected = selectedAmenities.includes(amenity.id)
              return (
                <button
                  key={amenity.id}
                  type="button"
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                    isSelected
                      ? 'border-[#193C06] bg-[#193C06]/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Icon size={24} className={`mx-auto mb-2 ${isSelected ? 'text-[#193C06]' : 'text-slate-400'}`} />
                  <span className={`text-sm font-medium ${isSelected ? 'text-[#193C06]' : 'text-slate-600'}`}>
                    {amenity.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep6 = () => (
    <div>
      <StepHeader icon={Contact} title="Contact Information" description="How should buyers reach you about this listing?" />

      <div className="space-y-6">
        <TextField
          label="Contact Name"
          icon={User}
          type="text"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          placeholder="Your name"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Phone Number"
            icon={Phone}
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            placeholder="Your phone number"
          />
          <TextField
            label="Email Address"
            icon={Mail}
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="Your email address"
          />
        </div>

        <SelectField
          label="Preferred Contact Time"
          icon={Clock}
          name="contactTime"
          value={formData.contactTime}
          onChange={handleChange}
          options={CONTACT_TIME_OPTIONS}
          placeholder="Select preferred time"
        />
      </div>
    </div>
  )

  const SummaryRow = ({ label, value }) => {
    if (!value) return null
    return (
      <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
        <span className="text-slate-500 text-sm">{label}</span>
        <span className="font-semibold text-slate-800 text-sm text-right">{value}</span>
      </div>
    )
  }

  const renderStep7 = () => (
    <div>
      <StepHeader icon={BadgeCheck} title="Review & Submit" description="Double-check the details before this goes live" />

      <div className="space-y-6">
        <div className="bg-slate-50 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-3" style={{ color: NAVY }}>Property Summary</h3>
          <SummaryRow label="Listing For" value={listingFor && (isRent ? 'Rent / Lease' : 'Sale')} />
          <SummaryRow label="Property Type" value={selectedType && selectedType[0].toUpperCase() + selectedType.slice(1)} />
          <SummaryRow label="Subtype" value={formData.subType} />
          <SummaryRow label="Title" value={formData.title} />
          <SummaryRow label="Location" value={formData.location} />
          {isResidential && <SummaryRow label="Configuration" value={formData.bedrooms && `${formData.bedrooms} BHK`} />}
          {(isResidential || isCommercialOffice) && <SummaryRow label="Furnishing" value={formData.furnishing} />}
          <SummaryRow label={isRent ? 'Monthly Rent' : 'Price'} value={formData.price && `₹${formData.price}${formData.priceNegotiable ? ' (Negotiable)' : ''}`} />
          {isRent && <SummaryRow label="Security Deposit" value={formData.securityDeposit && `₹${formData.securityDeposit}`} />}
          <SummaryRow label="Area" value={formData.area && `${formData.area} ${formData.areaUnit}`} />
          {isLand && <SummaryRow label="Plot Dimensions" value={formData.plotLength && formData.plotBreadth && `${formData.plotLength} x ${formData.plotBreadth}`} />}
          {isLand && <SummaryRow label="Road Width" value={formData.roadWidth} />}
          {isWarehouseLike && <SummaryRow label="Power Load" value={formData.powerLoad} />}
          <SummaryRow label="Possession" value={formData.possession} />
        </div>

        {images.length > 0 && (
          <div className="bg-slate-50 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4" style={{ color: NAVY }}>Uploaded Images ({images.length})</h3>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Preview ${index + 1}`} className="w-full h-20 object-cover rounded-lg" />
              ))}
            </div>
          </div>
        )}

        {selectedAmenities.length > 0 && (
          <div className="bg-slate-50 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4" style={{ color: NAVY }}>Selected Amenities ({selectedAmenities.length})</h3>
            <div className="flex flex-wrap gap-2">
              {selectedAmenities.map((amenityId) => {
                const amenity = AMENITIES_OPTIONS.find(a => a.id === amenityId)
                return (
                  <span key={amenityId} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700">
                    {amenity?.label}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            By submitting this property, you agree to our Terms of Service and Privacy Policy. Your property will be reviewed by our team before being published.
          </p>
        </div>
      </div>
    </div>
  )

  /* ---- Live listing preview sidebar ---- */
  const PreviewSidebar = () => (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-6">
        <div className="relative aspect-[4/3] bg-slate-100">
          {images.length > 0 ? (
            <img src={images[0]} alt="Cover preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
              <ImageOff size={32} />
              <span className="text-xs mt-2 text-slate-400">No photos yet</span>
            </div>
          )}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            {selectedType && (
              <span
                className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white capitalize"
                style={{ backgroundColor: NAVY }}
              >
                {selectedType}
              </span>
            )}
            {listingFor && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: BLUE }}>
                {isRent ? 'For Rent' : 'For Sale'}
              </span>
            )}
          </div>
          {formData.priceNegotiable && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/95 text-slate-700">
              Negotiable
            </span>
          )}
        </div>

        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: BLUE }}>
            Live preview
          </p>
          <h3 className="font-bold text-base leading-snug mb-1 truncate" style={{ color: NAVY }}>
            {formData.title || 'Your property title will appear here'}
          </h3>
          <p className="text-slate-400 text-xs flex items-center gap-1 mb-3">
            <MapPin size={12} className="flex-shrink-0" />
            <span className="truncate">{formData.location || 'Location not added yet'}</span>
          </p>

          <p className="text-xl font-bold mb-3" style={{ color: NAVY }}>
            {formData.price ? `₹${formData.price}${isRent ? ' /mo' : ''}` : '₹ —'}
          </p>

          {(formData.bedrooms || formData.area) && (
            <div className="flex items-center gap-3 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100 flex-wrap">
              {isResidential && formData.bedrooms && (
                <span className="flex items-center gap-1"><Bed size={13} /> {formData.bedrooms} BHK</span>
              )}
              {(isResidential || isCommercialOffice) && formData.bathrooms && (
                <span className="flex items-center gap-1"><Bath size={13} /> {formData.bathrooms}</span>
              )}
              {formData.area && (
                <span className="flex items-center gap-1"><Maximize size={13} /> {formData.area} {formData.areaUnit}</span>
              )}
              {isWarehouseLike && formData.powerLoad && (
                <span className="flex items-center gap-1"><Gauge size={13} /> {formData.powerLoad}</span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 font-medium">Listing strength</span>
            <span className="font-semibold" style={{ color: NAVY }}>{completeness}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${completeness}%`, backgroundColor: completeness === 100 ? '#16A34A' : BLUE }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hidden lg:block">
        <p className="text-sm font-bold mb-3" style={{ color: NAVY }}>Tips for a stronger listing</p>
        <div className="space-y-3">
          {TIPS.map((tip, i) => {
            const Icon = tip.icon
            return (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${BLUE}12` }}>
                  <Icon size={14} style={{ color: BLUE }} />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{tip.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes stepFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .step-fade { animation: stepFadeIn 0.35s ease-out; }
        select::-ms-expand { display: none; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: NAVY }}>Post Your Property</h1>
              <p className="text-slate-500">Fill in the details to list your property on our platform</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: `${NAVY}0F`, color: NAVY }}>
              <ShieldCheck size={14} />
              Reviewed before it goes live
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-4 sm:px-6 py-5 mb-6 overflow-x-auto">
              <div className="flex items-center justify-between mb-4 min-w-max sm:min-w-0">
                <span className="text-sm font-semibold text-slate-700">Step {step} of {STEPS.length} · {STEPS[step - 1].label}</span>
                <span className="text-sm font-semibold" style={{ color: NAVY }}>{progressPct}% complete</span>
              </div>
              <div className="flex items-center min-w-max sm:min-w-0">
                {STEPS.map((s, i) => {
                  const stepNum = i + 1
                  const isDone = step > stepNum
                  const isActive = step === stepNum
                  const Icon = s.icon
                  return (
                    <React.Fragment key={s.label}>
                      <div className="flex items-center flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
                            isDone || isActive ? 'text-white shadow-sm' : 'bg-slate-100 text-slate-400'
                          }`}
                          style={{ backgroundColor: isDone || isActive ? NAVY : undefined }}
                        >
                          {isDone ? <CheckCircle2 size={18} /> : <Icon size={16} />}
                        </div>
                        <span
                          className={`ml-2 text-sm font-medium whitespace-nowrap hidden sm:block ${
                            isActive ? 'text-slate-800' : 'text-slate-400'
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                      {stepNum < STEPS.length && (
                        <div className="flex-1 mx-4 h-1 bg-slate-100 rounded-full min-w-[32px] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{ width: step > stepNum ? '100%' : '0%', backgroundColor: NAVY }}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              {error && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-600 mb-6">
                  <AlertCircle size={20} />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div key={step} className="step-fade">
                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                  {step === 4 && renderStep4()}
                  {step === 5 && renderStep5()}
                  {step === 6 && renderStep6()}
                  {step === 7 && renderStep7()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                    >
                      <ChevronLeft size={20} />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 7 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                      style={{ backgroundColor: NAVY }}
                    >
                      Next
                      <ArrowRight size={20} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      style={{ backgroundColor: NAVY }}
                    >
                      {loading ? 'Submitting...' : 'Submit Property'}
                      {!loading && <CheckCircle2 size={20} />}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <PreviewSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostProperty