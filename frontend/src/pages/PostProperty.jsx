import React, { useState } from 'react'
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
  Calendar,
  Phone,
  Mail,
  User,
  Building,
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
} from 'lucide-react'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const PROPERTY_TYPES = [
  { id: 'residential', label: 'Residential', icon: Home, description: 'Apartments, villas, plots' },
  { id: 'commercial', label: 'Commercial', icon: Building2, description: 'Office spaces, retail, warehouses' },
  { id: 'land', label: 'Land', icon: MapPin, description: 'Residential, commercial, agricultural land' },
  { id: 'industrial', label: 'Industrial', icon: Factory, description: 'Sheds, factories, industrial plots' },
]

const RESIDENTIAL_SUBTYPES = [
  'Apartment', 'Villa', 'Independent House', 'Builder Floor', 'Plot', 'Penthouse', 'Studio Apartment'
]

const COMMERCIAL_SUBTYPES = [
  'Office Space', 'Retail Space', 'Warehouse', 'Showroom', 'Co-working Space', 'Industrial Shed'
]

const LAND_SUBTYPES = [
  'Residential Plot', 'Commercial Plot', 'Agricultural Land', 'Industrial Plot', 'Farm House'
]

const INDUSTRIAL_SUBTYPES = [
  'Industrial Shed', 'Factory', 'Warehouse', 'Industrial Plot', 'Manufacturing Unit'
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

const PostProperty = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
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
    city: '',
    state: '',
    pincode: '',
    price: '',
    pricePerUnit: '',
    
    // Property Details
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    area: '',
    areaUnit: 'sq.ft',
    floors: '',
    possession: '',
    age: '',
    
    // Contact Info
    contactName: user?.name || '',
    contactPhone: user?.phone || '',
    contactEmail: user?.email || '',
    
    // Additional
    reraId: '',
    status: 'pending',
  })

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
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const validateStep = () => {
    if (step === 1) {
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
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep()) return

    setLoading(true)
    setError('')

    // Simulate property submission - in production, this would be an API call
    setTimeout(() => {
      console.log('Property submitted:', { ...formData, type: selectedType, images, amenities: selectedAmenities })
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
      default: return []
    }
  }

  const renderStep1 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Select Property Type</h2>
      <p className="text-slate-500 mb-8">Choose the type of property you want to list</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROPERTY_TYPES.map((type) => {
          const Icon = type.icon
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedType(type.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                selectedType === type.id
                  ? 'border-[#193C06] bg-[#193C06]/5'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Icon size={32} className={`mb-3 ${selectedType === type.id ? 'text-[#193C06]' : 'text-slate-400'}`} />
              <h3 className="font-bold text-lg mb-1" style={{ color: NAVY }}>{type.label}</h3>
              <p className="text-sm text-slate-500">{type.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Basic Information</h2>
      <p className="text-slate-500 mb-8">Provide the basic details about your property</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Property Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="E.g., 3BHK Apartment in Sector 42"
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Property Subtype *</label>
          <select
            name="subType"
            value={formData.subType}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
            required
          >
            <option value="">Select subtype</option>
            {getSubtypes().map((subtype) => (
              <option key={subtype} value={subtype}>{subtype}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="E.g., Gurgaon"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="E.g., Haryana"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Full Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="E.g., Sector 42, Gurgaon, Haryana"
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="E.g., 122002"
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Expected Price (₹) *</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="E.g., 85,00,000"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Price per Unit</label>
            <input
              type="text"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              placeholder="E.g., ₹12,000/sq.ft"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Property Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your property in detail..."
            rows={5}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200 resize-none"
            required
          />
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Property Details</h2>
      <p className="text-slate-500 mb-8">Provide detailed specifications of your property</p>

      <div className="space-y-6">
        {selectedType === 'residential' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Bedrooms
                  <Bed size={16} className="inline mr-1" />
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="No. of bedrooms"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Bathrooms
                  <Bath size={16} className="inline mr-1" />
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="No. of bathrooms"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Balconies</label>
                <input
                  type="number"
                  name="balconies"
                  value={formData.balconies}
                  onChange={handleChange}
                  placeholder="No. of balconies"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
                />
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Area *
              <Maximize size={16} className="inline mr-1" />
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Enter area"
                className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
                required
              />
              <select
                name="areaUnit"
                value={formData.areaUnit}
                onChange={handleChange}
                className="px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
              >
                <option value="sq.ft">sq.ft</option>
                <option value="sq.yard">sq.yard</option>
                <option value="sq.m">sq.m</option>
                <option value="acre">acre</option>
                <option value="bigha">bigha</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Floors
              <Layers size={16} className="inline mr-1" />
            </label>
            <input
              type="text"
              name="floors"
              value={formData.floors}
              onChange={handleChange}
              placeholder="E.g., Ground + 2"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Possession Status</label>
            <select
              name="possession"
              value={formData.possession}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
            >
              <option value="">Select possession status</option>
              <option value="Immediate">Immediate</option>
              <option value="Within 3 months">Within 3 months</option>
              <option value="Within 6 months">Within 6 months</option>
              <option value="Within 1 year">Within 1 year</option>
              <option value="Under Construction">Under Construction</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Property Age</label>
            <select
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
            >
              <option value="">Select property age</option>
              <option value="New">New</option>
              <option value="0-5 years">0-5 years</option>
              <option value="5-10 years">5-10 years</option>
              <option value="10-20 years">10-20 years</option>
              <option value="20+ years">20+ years</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">RERA ID (if applicable)</label>
          <input
            type="text"
            name="reraId"
            value={formData.reraId}
            onChange={handleChange}
            placeholder="Enter RERA registration number"
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
          />
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Property Images</h2>
      <p className="text-slate-500 mb-8">Upload high-quality images of your property (max 10)</p>

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
        )}
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Amenities</h2>
      <p className="text-slate-500 mb-8">Select the amenities available at your property</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
  )

  const renderStep6 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Contact Information</h2>
      <p className="text-slate-500 mb-8">How should buyers contact you?</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Name
            <User size={16} className="inline mr-1" />
          </label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number
            <Phone size={16} className="inline mr-1" />
          </label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            placeholder="Your phone number"
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address
            <Mail size={16} className="inline mr-1" />
          </label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="Your email address"
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
          />
        </div>
      </div>
    </div>
  )

  const renderStep7 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Review & Submit</h2>
      <p className="text-slate-500 mb-8">Review your property details before submitting</p>

      <div className="space-y-6">
        <div className="bg-slate-50 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4" style={{ color: NAVY }}>Property Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Property Type:</span>
              <span className="ml-2 font-semibold text-slate-800 capitalize">{selectedType}</span>
            </div>
            <div>
              <span className="text-slate-500">Subtype:</span>
              <span className="ml-2 font-semibold text-slate-800">{formData.subType}</span>
            </div>
            <div>
              <span className="text-slate-500">Title:</span>
              <span className="ml-2 font-semibold text-slate-800">{formData.title}</span>
            </div>
            <div>
              <span className="text-slate-500">Location:</span>
              <span className="ml-2 font-semibold text-slate-800">{formData.location}</span>
            </div>
            <div>
              <span className="text-slate-500">Price:</span>
              <span className="ml-2 font-semibold text-slate-800">₹{formData.price}</span>
            </div>
            <div>
              <span className="text-slate-500">Area:</span>
              <span className="ml-2 font-semibold text-slate-800">{formData.area} {formData.areaUnit}</span>
            </div>
          </div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold mb-2" style={{ color: NAVY }}>Post Your Property</h1>
          <p className="text-slate-500">Fill in the details to list your property on our platform</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5, 6, 7].map((stepNum) => (
            <React.Fragment key={stepNum}>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
                    step >= stepNum
                      ? 'bg-[#193C06] text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {step > stepNum ? <CheckCircle2 size={18} /> : stepNum}
                </div>
                <span className="ml-2 text-sm font-medium whitespace-nowrap hidden sm:block">
                  {stepNum === 1 && 'Type'}
                  {stepNum === 2 && 'Basic Info'}
                  {stepNum === 3 && 'Details'}
                  {stepNum === 4 && 'Images'}
                  {stepNum === 5 && 'Amenities'}
                  {stepNum === 6 && 'Contact'}
                  {stepNum === 7 && 'Review'}
                </span>
              </div>
              {stepNum < 7 && (
                <div className="flex-1 mx-4 h-0.5 bg-slate-200 min-w-[40px]">
                  <div
                    className="h-full bg-[#193C06] transition-all duration-300"
                    style={{ width: step > stepNum ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
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
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}
            {step === 6 && renderStep6()}
            {step === 7 && renderStep7()}

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
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: NAVY }}
                >
                  Next
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  )
}

export default PostProperty
