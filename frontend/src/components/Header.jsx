import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { AppContext } from '../context/AppContext'
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Headphones,
  User,
  Menu,
  LocateFixed,
  Mic,
  Check,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Phone,
  Mail,
  X,
} from 'lucide-react'
import assets from '../assets/assets'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const TABS = [
  { label: 'Buy' },
  { label: 'New Launch', dot: true },
  { label: 'Projects' },
    { label: 'Rent' },
]

const LOCATION_TABS = ['Buy', 'Rent / Lease', 'Plots/Land', 'PG / Co-living']
const RECENT_SEARCHES = ['PG in Central Delhi', 'Buy in Central Delhi']
const QUICK_REGIONS = ['All India', 'Dubai', 'For NRI']
const POPULAR_CITIES = [
  { name: 'Delhi', state: 'Delhi NCR' },
  { name: 'Central Delhi', state: 'Delhi' },
  { name: 'East Delhi', state: 'Delhi' },
  { name: 'North Delhi', state: 'Delhi' },
  { name: 'South Delhi', state: 'Delhi' },
  { name: 'West Delhi', state: 'Delhi' },
  { name: 'Greater Noida', state: 'Delhi NCR' },
  { name: 'Noida', state: 'Delhi NCR' },
  { name: 'Faridabad', state: 'Delhi NCR' },
  { name: 'Gurgaon', state: 'Delhi NCR' },
]

const HERO_IMAGES = [assets.header, assets.header2, assets.header3, assets.header4].filter(Boolean)

// ---- Filter options for professional dropdowns ----------------------------
const BUDGET_RANGE_OPTIONS = ['10 Lac', '20 Lac', '30 Lac', '40 Lac', '50 Lac', '75 Lac', '1 Cr', '1.5 Cr', '2 Cr', '3 Cr', '5 Cr', '7.5 Cr', '10 Cr+']
const AREA_RANGE_OPTIONS = ['300 sq ft', '500 sq ft', '750 sq ft', '1000 sq ft', '1500 sq ft', '2000 sq ft', '3000 sq ft', '5000 sq ft', '7500 sq ft', '10000 sq ft+']
const BEDROOM_CHIP_OPTIONS = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK']

const RANGE_FILTER_OPTIONS = { Budget: BUDGET_RANGE_OPTIONS, Area: AREA_RANGE_OPTIONS }
const CHIP_FILTER_OPTIONS = { Bedroom: BEDROOM_CHIP_OPTIONS }
const CHECKBOX_FILTER_OPTIONS = {
  'Construction Status': ['Under Construction', 'Ready to Move', 'New Launch', 'Pre-Launch'],
  'Posted By': ['Owner', 'Dealer', 'Builder'],
  'Possession Status': ['Ready to Move', 'Within 6 Months', 'Within 1 Year', 'After 1 Year'],
  Furnishing: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
}
const FILTER_KIND = {
  Budget: 'range',
  Area: 'range',
  Bedroom: 'chips',
  'Construction Status': 'checkbox',
  'Posted By': 'checkbox',
  'Possession Status': 'checkbox',
  Furnishing: 'checkbox',
}
const emptyFilterValue = (f) => (FILTER_KIND[f] === 'range' ? { min: '', max: '' } : [])

// ---- Mega menu content -----------------------------------------------
// Each top-level nav item -> a left sidebar of categories, and per-category
// content for column 2 (sub-items) and column 3 (sub-sub / popular items).
// If a category has no column-3 data, the ad card automatically spans
// columns 3-4 instead of just column 4.

const AD_CARDS = {
  'For Buyers': {
    label: 'INTRODUCING',
    title: 'Insights',
    bullets: ['Understand localities', 'Read Resident Reviews', 'Check Price Trends', 'Tools, Utilities & more'],
  },
  'For Sellers': {
    label: 'GROW FASTER',
    title: 'List for Free',
    bullets: ['Reach lakhs of buyers', 'Free property valuation', 'Dedicated relationship manager', 'Priority listing boost'],
  },
  'For Tenants': {
    label: 'INTRODUCING',
    title: 'Verified Listings',
    bullets: ['Owner-verified only', 'Zero brokerage tags', 'Photo & video tours', 'Instant contact details'],
  },
}

const CONTACT_INFO = {
  phone: '1800 41 99099',
  hours: '9AM - 11PM IST',
  email: 'services@nestnbest.com',
}

const MEGA_MENUS = {
  'For Buyers': {
    categories: [
      {
        label: 'Apartments',
        col2: { heading: 'Properties in Delhi', items: ['Flats / Apartments', 'Independent Houses', 'Villas', 'Builder Floors', 'Penthouses', 'Farmhouses'] },
        col3: { heading: 'Popular Searches', items: ['Property in Delhi', 'Verified Property in Delhi', 'New Projects'] },
      },
      {
        label: 'Land/Plot',
        col2: { heading: 'Plot Types', items: ['Residential Plots', 'Commercial Plots', 'Agricultural Land', 'Farm House Land', 'Industrial Land', 'Corner Plots', 'Gated Community Plots'] },
        col3: { heading: 'Popular Searches', items: ['Plots near me', 'Gated community plots'] },
      },
      {
        label: 'Commercial',
        col2: { heading: 'Commercial Spaces', items: ['Office Space', 'Retail Shops', 'Showroom', 'Warehouse', 'Industrial Building', 'Factory', 'Restaurant Space', 'Hotel', 'Co-working Space'] },
        col3: null,
      },
      {
        label: 'Popular Areas',
        col2: { heading: 'Properties in Delhi', items: ['Property in Karol Bagh', 'Property in New Rajendra Nagar', 'Property in Malcha Marg', 'Property in Connaught Place', 'Property in DaryaGanj', 'Property in Old Rajinder Nagar', 'Property in Paharganj'] },
        col3: { heading: 'Popular Searches', items: ['Property in Delhi', 'Verified Property in Delhi', 'New Projects'] },
      },
      { label: 'Insights', badge: 'NEW', col2: null, col3: null },
    ],
  },
  'For Tenants': {
    categories: [
      {
        label: 'Apartments',
        col2: { heading: 'Rentals in Delhi', items: ['Flats / Apartments', 'Independent Houses', 'Villas', 'Builder Floors', 'Studio Apartments', 'Penthouses', 'Farmhouses'] },
        col3: { heading: 'Popular Searches', items: ['1 BHK for Rent', '2 BHK for Rent', 'Pet-Friendly Rentals'] },
      },
      {
        label: 'PG / Co-living',
        col2: { heading: 'PG Options', items: [' Boys PG', 'Girls PG', 'Co-living Spaces', 'Single Rooms', 'Shared Rooms', 'Private Rooms'] },
        col3: { heading: 'Popular Searches', items: ['PG near me', 'PG with Food'] },
      },
      {
        label: 'Commercial Rent',
        col2: { heading: 'Rent for Business', items: ['Office Space', 'Shops', 'Showrooms', 'Retail Space', 'Warehouse', 'Factory', 'Industrial Space', 'Restaurant Space', 'Hotel Space', 'Co-working Space', 'Business Center'] },
        col3: null,
      },
    ],
  },
  'For Sellers': {
    categories: [
      {
        label: 'Owner',
        col2: { heading: 'Property Owner', items: ['List Your Property', 'Manage Listings', 'Get Buyer Leads', 'Property Valuation'] },
        col3: null,
      },
      {
        label: 'Agent',
        col2: { heading: 'Real Estate Agent', items: ['Manage Client Properties', 'Bulk Listing Tools', 'Lead Management', 'Agent Dashboard'] },
        col3: null,
      },
      {
        label: 'Builder',
        col2: { heading: 'Builder / Developer', items: ['Post New Projects', 'Project Inventory', 'Floor Plans', 'Builder Profile'] },
        col3: null,
      },
    ],
  },
  'Services': {
    categories: [
      {
        label: 'Legal Services',
        col2: { heading: 'Legal Assistance', items: ['Property Documentation', 'Title Verification', 'Registration Services', 'Legal Consultation'] },
        col3: null,
      },
      {
        label: 'Financial Services',
        col2: { heading: 'Financial Help', items: ['Home Loan Assistance', 'Loan Comparison', 'EMI Calculator', 'Credit Score Check'] },
        col3: null,
      },
      {
        label: 'Property Services',
        col2: { heading: 'Property Management', items: ['Property Valuation', 'Interior Design', 'Vastu Consultation', 'Property Management'] },
        col3: null,
      },
    ],
  },
}

const NAV_LINKS = [
  { label: 'For Buyers' },
  { label: 'For Sellers' },
  { label: 'For Tenants' },
  { label: 'Services' },
  { label: 'Insights', badge: 'NEW' },
]

// ---- Search-bar filter panel content (per tab), modelled on 99acres ---
const PROPERTY_CATEGORIES = {
  Residential: {
    Buy: {
      placeholder: 'Search "Farm house in Punjab below 1 cr"',
      showLocation: true,
      checkboxGroups: [
        ['Flats / Apartments', 'Independent Houses', 'Villas', 'Builder Floors', 'Studio Apartments'],
        ['Duplex Homes', 'Penthouse', 'Residential Plots', 'Gated Community', 'Farm Houses'],
      ],
      bottomFilters: ['Budget', 'Bedroom', 'Construction Status', 'Posted By'],
    },
    Rent: {
      placeholder: 'Search "Hyderabad"',
      showLocation: true,
      checkboxGroups: [
        ['Flats / Apartments', 'Independent Houses', 'Villas', 'Builder Floors', 'Studio Apartments'],
        ['Furnished Flats', 'Semi-Furnished Flats', 'Unfurnished Flats'],
      ],
      bottomFilters: ['Budget', 'Bedroom', 'Posted By', 'Furnishing'],
    },
    'New Launch': {
      placeholder: 'Search "New launch projects in Gurgaon"',
      showLocation: true,
      checkboxGroups: [
        ['Apartments / Flats', 'Villas', 'Independent Houses', 'Builder Floors', 'Studio Apartments'],
        ['Luxury Homes', 'Residential Plots', 'Township Projects'],
      ],
      bottomFilters: ['Budget', 'Bedroom', 'Possession Status', 'Posted By'],
    },
    Projects: {
      placeholder: 'Search "Residential projects in Hyderabad"',
      showLocation: true,
      propertyTypesHeading: 'Project Types',
      checkboxGroups: [
        ['Apartments / Flats', 'Villas', 'Independent Houses', 'Builder Floors', 'Luxury Projects'],
        ['Affordable Housing', 'Township Projects'],
      ],
      bottomFilters: ['Budget', 'Bedroom', 'Construction Status', 'Posted By'],
    },
  },
  'PG / Co-Living': {
    Rent: {
      placeholder: 'Search "PG in Hyderabad"',
      showLocation: true,
      checkboxGroups: [
        ['Boys PG', 'Girls PG', 'Co-Living Spaces', 'Single Room', 'Shared Room'],
        ['Student Accommodation', 'Working Professionals'],
      ],
      bottomFilters: ['Budget', 'Posted By', 'Furnishing'],
    },
  },
  Commercial: {
    Buy: {
      placeholder: 'Search "Hyderabad"',
      showLocation: true,
      propertyTypesHeading: 'Property Types',
      checkboxGroups: [
        ['Office Space', 'Commercial Shops', 'Showrooms', 'Retail Spaces', 'Commercial Buildings'],
        ['Commercial Plots', 'Co-working Spaces', 'Food Court / Restaurant Space', 'Hotels & Hospitality', 'Commercial Complexes'],
      ],
      bottomFilters: ['Budget', 'Area', 'Construction Status', 'Posted By'],
    },
    Rent: {
      placeholder: 'Search "Hyderabad"',
      showLocation: true,
      propertyTypesHeading: 'Property Types',
      checkboxGroups: [
        ['Office Space', 'Shops', 'Showrooms', 'Commercial Buildings', 'Co-working Spaces'],
        ['Business Centres'],
      ],
      bottomFilters: ['Budget', 'Area', 'Posted By'],
    },
    'New Launch': {
      placeholder: 'Search "New launch projects in Gurgaon"',
      showLocation: true,
      propertyTypesHeading: 'Property Types',
      checkboxGroups: [
        ['Office Spaces', 'Shops', 'Showrooms', 'Commercial Buildings', 'Commercial Plots'],
        ['Co-working Spaces', 'Business Parks'],
      ],
      bottomFilters: ['Budget', 'Area', 'Possession Status', 'Posted By'],
    },
    Projects: {
      placeholder: 'Search "Commercial projects in Hyderabad"',
      showLocation: true,
      propertyTypesHeading: 'Project Types',
      checkboxGroups: [
        ['Office Projects', 'Retail Projects', 'Shopping Complexes', 'Commercial Buildings'],
        ['Business Parks', 'Mixed-Use Projects'],
      ],
      bottomFilters: ['Budget', 'Area', 'Construction Status', 'Posted By'],
    },
  },
  Industrial: {
    Buy: {
      placeholder: 'Search "Hyderabad"',
      showLocation: true,
      propertyTypesHeading: 'Property Types',
      checkboxGroups: [
        ['Industrial Plots', 'Factory / Manufacturing Units', 'Industrial Sheds', 'Warehouses', 'Logistics & Distribution Centers'],
        ['Cold Storage', 'Industrial Buildings', 'Godowns', 'Workshop Units', 'Industrial Land'],
      ],
      bottomFilters: ['Budget', 'Area', 'Construction Status', 'Posted By'],
    },
    Rent: {
      placeholder: 'Search "Industrial rent in Hyderabad"',
      showLocation: true,
      propertyTypesHeading: 'Property Types',
      checkboxGroups: [
        ['Warehouses', 'Industrial Sheds', 'Factory Units', 'Godowns', 'Industrial Buildings'],
        ['Logistics Spaces'],
      ],
      bottomFilters: ['Budget', 'Area', 'Posted By'],
    },
    'New Launch': {
      placeholder: 'Search "New launch projects in Gurgaon"',
      showLocation: true,
      propertyTypesHeading: 'Property Types',
      checkboxGroups: [
        ['Industrial Plots', 'Industrial Sheds', 'Warehouses', 'Factories', 'Manufacturing Units'],
        ['Logistics Parks', 'Industrial Buildings'],
      ],
      bottomFilters: ['Budget', 'Area', 'Possession Status', 'Posted By'],
    },
    Projects: {
      placeholder: 'Search "Industrial projects in Hyderabad"',
      showLocation: true,
      propertyTypesHeading: 'Project Types',
      checkboxGroups: [
        ['Industrial Parks', 'Warehousing Projects', 'Logistics Parks', 'Manufacturing Projects'],
        ['Industrial Sheds', 'Factory Projects'],
      ],
      bottomFilters: ['Budget', 'Area', 'Construction Status', 'Posted By'],
    },
  },
}

const TAB_CONFIG = {
  Buy: {
    selector: 'Residential',
    placeholder: 'Search "Farm house in Punjab below 1 cr"',
    showLocation: true,
    checkboxGroups: [
      ['Flats / Apartments', 'Independent Houses', 'Villas', 'Builder Floors', 'Studio Apartments'],
      ['Duplex Homes', 'Penthouse', 'Residential Plots', 'Gated Community', 'Farm Houses'],
    ],
    bottomFilters: ['Budget', 'Bedroom', 'Construction Status', 'Posted By'],
  },
  Rent: {
    selector: 'Residential Rent',
    placeholder: 'Search "Hyderabad"',
    showLocation: true,
    checkboxGroups: [
      ['Flats / Apartments', 'Independent Houses', 'Villas', 'Builder Floors', 'Studio Apartments'],
      ['Furnished Flats', 'Semi-Furnished Flats', 'Unfurnished Flats'],
    ],
    bottomFilters: ['Budget', 'Bedroom', 'Posted By', 'Furnishing'],
  },
  'New Launch': {
    selector: 'Residential',
    placeholder: 'Search "New launch projects in Gurgaon"',
    showLocation: true,
    checkboxGroups: [
      ['Apartments / Flats', 'Villas', 'Independent Houses', 'Builder Floors', 'Studio Apartments'],
      ['Luxury Homes', 'Residential Plots', 'Township Projects'],
    ],
    bottomFilters: ['Budget', 'Bedroom', 'Possession Status', 'Posted By'],
  },
  Commercial: {
    selector: 'All Commercial',
    placeholder: 'Search "Hyderabad"',
    showLocation: true,
    propertyTypesHeading: 'Property Types',
    checkboxGroups: [
      ['Office Space', 'Commercial Shops', 'Showrooms', 'Retail Spaces', 'Commercial Buildings'],
      ['Commercial Plots', 'Co-working Spaces', 'Food Court / Restaurant Space', 'Hotels & Hospitality', 'Commercial Complexes'],
    ],
    bottomFilters: ['Budget', 'Area', 'Construction Status', 'Posted By'],
  },
  Industrial: {
    selector: 'Industrial',
    placeholder: 'Search "Hyderabad"',
    showLocation: true,
    propertyTypesHeading: 'Property Types',
    checkboxGroups: [
      ['Industrial Plots', 'Factory / Manufacturing Units', 'Industrial Sheds', 'Warehouses', 'Logistics & Distribution Centers'],
      ['Cold Storage', 'Industrial Buildings', 'Godowns', 'Workshop Units', 'Industrial Land'],
    ],
    bottomFilters: ['Budget', 'Area', 'Construction Status', 'Posted By'],
  },
  Projects: {
    selector: 'Residential Projects',
    placeholder: 'Search "Residential projects in Hyderabad"',
    showLocation: true,
    propertyTypesHeading: 'Project Types',
    checkboxGroups: [
      ['Apartments / Flats', 'Villas', 'Independent Houses', 'Builder Floors', 'Luxury Projects'],
      ['Affordable Housing', 'Township Projects'],
    ],
    bottomFilters: ['Budget', 'Bedroom', 'Construction Status', 'Posted By'],
  },
}

const AdCard = ({ menuLabel, spanFull }) => {
  const ad = AD_CARDS[menuLabel] || AD_CARDS['For Buyers']
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col h-full ${spanFull ? 'sm:col-span-2' : ''}`}
      style={{ backgroundColor: 'rgba(30, 136, 229, 0.06)' }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: BLUE }}>
            <Sparkles size={14} className="text-white" />
          </span>
          <span className="text-xs font-bold tracking-wider" style={{ color: BLUE }}>
            {ad.label}
          </span>
        </div>
        <ArrowUpRight size={16} style={{ color: BLUE }} />
      </div>
      <h4 className="text-xl font-bold mt-1 mb-3" style={{ color: NAVY }}>
        {ad.title}
      </h4>
      <ul className="space-y-2.5">
        {ad.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
            <CheckCircle2 size={16} style={{ color: BLUE }} className="flex-shrink-0" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

const MenuColumn = ({ heading, items, menuLabel, categoryLabel }) => {
  if (!heading || !items?.length) return null

  const getFilterParams = (item) => {
    const params = new URLSearchParams()
    
    // Set property type based on menu label
    if (menuLabel === 'For Buyers') {
      params.set('type', 'buy')
    } else if (menuLabel === 'For Tenants') {
      params.set('type', 'rent')
    } else if (menuLabel === 'For Dealers / Builders') {
      params.set('type', 'commercial')
    }

    // Set category based on category label
    if (categoryLabel === 'Apartments') {
      params.set('category', item)
    } else if (categoryLabel === 'Land/Plot') {
      params.set('type', 'land')
      params.set('category', item)
    } else if (categoryLabel === 'Commercial' || categoryLabel === 'Commercial Rent') {
      params.set('type', 'commercial')
      params.set('category', item)
    } else if (categoryLabel === 'PG / Co-living') {
      params.set('category', item)
    }

    return params.toString()
  }

  return (
    <div>
      <h5 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">{heading}</h5>
      <ul className="space-y-3.5">
        {items.map((item) => (
          <li key={item}>
            <Link
              to={`/filter?${getFilterParams(item)}`}
              className="text-sm font-semibold text-slate-700 hover:text-[#1E88E5] transition-colors duration-200 text-left"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ---- Filter-panel building blocks --------------------------------------
const CheckboxRow = ({ label, checked, onToggle }) => (
  <button type="button" onClick={onToggle} className="flex items-center gap-2.5 text-sm text-left group">
    <span
      className="w-[18px] h-[18px] rounded flex items-center justify-center flex-shrink-0 border-[1.5px] transition-colors duration-150"
      style={{
        backgroundColor: checked ? BLUE : '#fff',
        borderColor: checked ? BLUE : '#CBD5E1',
      }}
    >
      {checked && <Check size={12.5} className="text-white" strokeWidth={3.5} />}
    </span>
    <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors duration-150">{label}</span>
  </button>
)

const RadioRow = ({ label, selected, onSelect }) => (
  <button type="button" onClick={onSelect} className="flex items-center gap-2.5 text-sm text-left group">
    <span
      className="w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 transition-colors duration-150"
      style={{ borderColor: selected ? BLUE : '#CBD5E1' }}
    >
      {selected && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BLUE }} />}
    </span>
    <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors duration-150">{label}</span>
  </button>
)

const FilterPill = ({ label, selectedValue, onClick, isOpen, triggerRef }) => (
  <div className="relative">
    <button
      type="button"
      onClick={onClick}
      ref={triggerRef}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-200 ${
        selectedValue
          ? 'border-[#1E88E5] bg-[rgba(30,136,229,0.05)] text-[#1E88E5]'
          : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      {selectedValue || label}
      <ChevronDown size={15} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  </div>
)

const CrossLinkRow = ({ text, className = '' }) => (
  <p className={`text-sm text-slate-500 ${className}`}>
    {text} <button type="button" className="font-semibold hover:underline" style={{ color: BLUE }}>Click here</button>
  </p>
)

const NewBadge = () => (
  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500 text-white leading-none flex-shrink-0">NEW</span>
)

const Header = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Buy')
  const [query, setQuery] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { openSignup } = useContext(AppContext)

  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [locationTab, setLocationTab] = useState('Buy')
  const [cityQuery, setCityQuery] = useState('')
  const locationRef = useRef(null)
  const dropdownRef = useRef(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })

  const [openMegaMenu, setOpenMegaMenu] = useState(null)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const megaTriggerRefs = useRef({})
  const megaPanelRef = useRef(null)
  const [megaPosition, setMegaPosition] = useState({ top: 0, left: 0 })

  // Filter-panel state: per-tab checkbox selections + plots/land radio choice
  const [checkedByTab, setCheckedByTab] = useState(() => {
    const initial = {}
    Object.entries(TAB_CONFIG).forEach(([tab, cfg]) => {
      initial[tab] = {}
      cfg.checkboxGroups?.flat().forEach((item) => {
        initial[tab][item] = false
      })
      cfg.investmentOptions?.items.forEach((item) => {
        initial[tab][item] = false
      })
    })
    return initial
  })
  const [plotsSelection, setPlotsSelection] = useState(null)
  const investScrollRef = useRef(null)

  // Filter panel is collapsed by default — opens only when the property-type
  // selector ("All Residential", "All Commercial", etc.) is clicked.
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const searchCardRef = useRef(null)

  //Property category dropdown state
  const [selectedCategory, setSelectedCategory] = useState('Residential')
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const [filterPanelSelectedCategory, setFilterPanelSelectedCategory] = useState('Residential')

  // Sub-category dropdown state
  const [isSubCategoryDropdownOpen, setIsSubCategoryDropdownOpen] = useState(false)
  const subCategoryDropdownRef = useRef(null)
  const subCategoryTriggerRef = useRef(null)
  const [subCategoryDropdownPosition, setSubCategoryDropdownPosition] = useState({ top: 0, left: 0 })

  // Search city dropdown state
  const [isSearchCityDropdownOpen, setIsSearchCityDropdownOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState('')
  const searchCityDropdownRef = useRef(null)
  const searchCityTriggerRef = useRef(null)
  const [searchCityDropdownPosition, setSearchCityDropdownPosition] = useState({ top: 0, left: 0 })

  // Project status dropdown state
  const [isProjectStatusDropdownOpen, setIsProjectStatusDropdownOpen] = useState(false)
  const [selectedProjectStatus, setSelectedProjectStatus] = useState('')
  const projectStatusDropdownRef = useRef(null)
  const projectStatusTriggerRef = useRef(null)
  const [projectStatusDropdownPosition, setProjectStatusDropdownPosition] = useState({ top: 0, left: 0 })

  // User dropdown state
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const userDropdownRef = useRef(null)
  const userTriggerRef = useRef(null)
  const [userDropdownPosition, setUserDropdownPosition] = useState({ top: 0, left: 0 })

  // Neighbourhood dropdown state
  const [isNeighbourhoodDropdownOpen, setIsNeighbourhoodDropdownOpen] = useState(false)
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('')
  const neighbourhoodDropdownRef = useRef(null)
  const neighbourhoodTriggerRef = useRef(null)
  const [neighbourhoodDropdownPosition, setNeighbourhoodDropdownPosition] = useState({ top: 0, left: 0 })

  const NEIGHBOURHOODS = [
    'Connaught Place', 'Karol Bagh', 'Rajouri Garden', 'Dwarka', 'Vasant Kunj',
    'Saket', 'Greater Kailash', 'Defence Colony', 'Lajpat Nagar', 'South Extension',
    'Hauz Khas', 'Green Park', 'Mayur Vihar', 'Patparganj', 'Laxmi Nagar',
    'Preet Vihar', 'Nehru Place', 'Kalkaji', 'Okhla', 'Nehru Vihar'
  ]

  // Smart search state
  const [isSmartSearchEnabled, setIsSmartSearchEnabled] = useState(false)

  // Bottom filter dropdowns state
  const [openFilterDropdown, setOpenFilterDropdown] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState({
    Budget: { min: '', max: '' },
    Bedroom: [],
    'Construction Status': [],
    'Posted By': [],
    'Possession Status': [],
    Furnishing: [],
    Area: { min: '', max: '' },
  })
  const [pendingFilterValue, setPendingFilterValue] = useState(null)
  const filterDropdownRef = useRef(null)
  const filterTriggerRefs = useRef({})
  const [filterDropdownPosition, setFilterDropdownPosition] = useState({ top: 0, left: 0 })

  // Menu dropdown state
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false)
  const menuDropdownRef = useRef(null)
  const menuTriggerRef = useRef(null)
  const [menuDropdownPosition, setMenuDropdownPosition] = useState({ top: 0, left: 0 })

  const PROJECT_STATUS_OPTIONS = ['New Launch', 'Pre-Launch', 'Under Construction', 'Ready to Move']

  // Dynamic text animation for New Launch tab
  const [dynamicTabText, setDynamicTabText] = useState('New Launch')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setDynamicTabText((prev) => (prev === 'New Launch' ? 'New Nest' : 'New Launch'))
        setTimeout(() => setIsAnimating(false), 50)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const toggleFilterPanel = () => {
    setIsLocationOpen(false)
    setIsSearchCityDropdownOpen(false)
    setIsProjectStatusDropdownOpen(false)
    setOpenMegaMenu(null)
    setIsFilterOpen((open) => !open)
  }

  const toggleCheckbox = (tab, item) => {
    setCheckedByTab((prev) => ({ ...prev, [tab]: { ...prev[tab], [item]: !prev[tab][item] } }))
  }

  const clearTabFilters = (tab) => {
    const cfg = TAB_CONFIG[tab]
    setCheckedByTab((prev) => {
      const cleared = { ...prev[tab] }
      cfg.checkboxGroups?.flat().forEach((item) => {
        cleared[item] = false
      })
      cfg.investmentOptions?.items.forEach((item) => {
        cleared[item] = false
      })
      return { ...prev, [tab]: cleared }
    })
  }

  const scrollInvest = (dir) => {
    investScrollRef.current?.scrollBy({ top: dir * 90, behavior: 'smooth' })
  }

  useEffect(() => {
    setIsFilterOpen(false)
    setIsSearchCityDropdownOpen(false)
    setIsProjectStatusDropdownOpen(false)
  }, [activeTab])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsLocationOpen(false)
      }
      if (
        subCategoryTriggerRef.current &&
        !subCategoryTriggerRef.current.contains(e.target) &&
        subCategoryDropdownRef.current &&
        !subCategoryDropdownRef.current.contains(e.target)
      ) {
        setIsSubCategoryDropdownOpen(false)
      }
      if (
        searchCityTriggerRef.current &&
        !searchCityTriggerRef.current.contains(e.target) &&
        searchCityDropdownRef.current &&
        !searchCityDropdownRef.current.contains(e.target)
      ) {
        setIsSearchCityDropdownOpen(false)
      }
      if (
        projectStatusTriggerRef.current &&
        !projectStatusTriggerRef.current.contains(e.target) &&
        projectStatusDropdownRef.current &&
        !projectStatusDropdownRef.current.contains(e.target)
      ) {
        setIsProjectStatusDropdownOpen(false)
      }
      if (
        userTriggerRef.current &&
        !userTriggerRef.current.contains(e.target) &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target)
      ) {
        setIsUserDropdownOpen(false)
      }
      if (
        neighbourhoodTriggerRef.current &&
        !neighbourhoodTriggerRef.current.contains(e.target) &&
        neighbourhoodDropdownRef.current &&
        !neighbourhoodDropdownRef.current.contains(e.target)
      ) {
        setIsNeighbourhoodDropdownOpen(false)
      }
      if (
        openFilterDropdown &&
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(e.target)
      ) {
        setOpenFilterDropdown(null)
      }
      if (
        menuTriggerRef.current &&
        !menuTriggerRef.current.contains(e.target) &&
        menuDropdownRef.current &&
        !menuDropdownRef.current.contains(e.target)
      ) {
        setIsMenuDropdownOpen(false)
      }
      const currentTrigger = openMegaMenu ? megaTriggerRefs.current[openMegaMenu] : null
      if (
        currentTrigger &&
        !currentTrigger.contains(e.target) &&
        megaPanelRef.current &&
        !megaPanelRef.current.contains(e.target)
      ) {
        setOpenMegaMenu(null)
      }
    }
    const onEscape = (e) => {
      if (e.key === 'Escape') {
        setIsLocationOpen(false)
        setIsSubCategoryDropdownOpen(false)
        setIsSearchCityDropdownOpen(false)
        setIsProjectStatusDropdownOpen(false)
        setIsUserDropdownOpen(false)
        setIsNeighbourhoodDropdownOpen(false)
        setIsMenuDropdownOpen(false)
        setOpenMegaMenu(null)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [openMegaMenu, isFilterOpen])

  useEffect(() => {
    if (isLocationOpen && locationRef.current) {
      const rect = locationRef.current.getBoundingClientRect()
      setDropdownPosition({ top: rect.bottom + 8, left: rect.left })
    }
  }, [isLocationOpen])


  useEffect(() => {
    if (isSubCategoryDropdownOpen && subCategoryTriggerRef.current) {
      const rect = subCategoryTriggerRef.current.getBoundingClientRect()
      setSubCategoryDropdownPosition({ top: rect.top, left: rect.right + 8 })
    }
  }, [isSubCategoryDropdownOpen])

  useEffect(() => {
    if (isSearchCityDropdownOpen && searchCityTriggerRef.current) {
      const rect = searchCityTriggerRef.current.getBoundingClientRect()
      setSearchCityDropdownPosition({ top: rect.bottom + 8, left: rect.left })
    }
  }, [isSearchCityDropdownOpen])

  useEffect(() => {
    const handleScroll = () => {
      if (isSearchCityDropdownOpen && searchCityTriggerRef.current) {
        const rect = searchCityTriggerRef.current.getBoundingClientRect()
        setSearchCityDropdownPosition({ top: rect.bottom + 8, left: rect.left })
      }
    }

    if (isSearchCityDropdownOpen) {
      window.addEventListener('scroll', handleScroll, true)
      return () => window.removeEventListener('scroll', handleScroll, true)
    }
  }, [isSearchCityDropdownOpen])

  useEffect(() => {
    if (isProjectStatusDropdownOpen && projectStatusTriggerRef.current) {
      const rect = projectStatusTriggerRef.current.getBoundingClientRect()
      setProjectStatusDropdownPosition({ top: rect.bottom + 8, left: rect.left })
    }
  }, [isProjectStatusDropdownOpen])

  useEffect(() => {
    const handleScroll = () => {
      if (isProjectStatusDropdownOpen && projectStatusTriggerRef.current) {
        const rect = projectStatusTriggerRef.current.getBoundingClientRect()
        setProjectStatusDropdownPosition({ top: rect.bottom + 8, left: rect.left })
      }
    }

    if (isProjectStatusDropdownOpen) {
      window.addEventListener('scroll', handleScroll, true)
      return () => window.removeEventListener('scroll', handleScroll, true)
    }
  }, [isProjectStatusDropdownOpen])

  useEffect(() => {
    if (isUserDropdownOpen && userTriggerRef.current) {
      const rect = userTriggerRef.current.getBoundingClientRect()
      setUserDropdownPosition({ top: rect.bottom + 8, left: rect.right - 200 })
    }
  }, [isUserDropdownOpen])

  useEffect(() => {
    if (isNeighbourhoodDropdownOpen && neighbourhoodTriggerRef.current) {
      const rect = neighbourhoodTriggerRef.current.getBoundingClientRect()
      setNeighbourhoodDropdownPosition({ top: rect.bottom + 8, left: rect.left })
    }
  }, [isNeighbourhoodDropdownOpen])

  useEffect(() => {
    if (openFilterDropdown && filterTriggerRefs.current[openFilterDropdown]) {
      const rect = filterTriggerRefs.current[openFilterDropdown].getBoundingClientRect()
      setFilterDropdownPosition({ top: rect.bottom + 8, left: rect.left })
    }
  }, [openFilterDropdown])

  // Update filter dropdown position on scroll
  useEffect(() => {
    if (openFilterDropdown && filterTriggerRefs.current[openFilterDropdown]) {
      const handleScroll = () => {
        const rect = filterTriggerRefs.current[openFilterDropdown]?.getBoundingClientRect()
        if (rect) {
          setFilterDropdownPosition({ top: rect.bottom + 8, left: rect.left })
        }
      }
      window.addEventListener('scroll', handleScroll, true)
      return () => window.removeEventListener('scroll', handleScroll, true)
    }
  }, [openFilterDropdown])

  useEffect(() => {
    if (isMenuDropdownOpen && menuTriggerRef.current) {
      const rect = menuTriggerRef.current.getBoundingClientRect()
      setMenuDropdownPosition({ top: rect.bottom + 8, left: rect.right - 160 })
    }
  }, [isMenuDropdownOpen])

  // Filter dropdown handlers
  const openFilterPanel = (f) => {
    setPendingFilterValue(selectedFilters[f])
    setOpenFilterDropdown((prev) => (prev === f ? null : f))
  }

  const togglePendingItem = (value) => {
    setPendingFilterValue((prev) => {
      const list = prev || []
      return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    })
  }

  const applyFilter = (f) => {
    setSelectedFilters((prev) => ({ ...prev, [f]: pendingFilterValue }))
    setOpenFilterDropdown(null)
  }

  const clearFilter = (f) => {
    const empty = emptyFilterValue(f)
    setPendingFilterValue(empty)
    setSelectedFilters((prev) => ({ ...prev, [f]: empty }))
  }

  const getFilterLabel = (f) => {
    const val = selectedFilters[f]
    if (FILTER_KIND[f] === 'range') {
      if (!val?.min && !val?.max) return ''
      if (val.min && val.max) return `${val.min} - ${val.max}`
      return val.min ? `Above ${val.min}` : `Under ${val.max}`
    }
    if (!val || val.length === 0) return ''
    if (val.length === 1) return val[0]
    return `${val[0]} +${val.length - 1}`
  }

  const toggleMegaMenu = (label) => {
    setIsLocationOpen(false)
    setActiveCategoryIndex(0)
    setOpenMegaMenu((current) => {
      const next = current === label ? null : label
      if (next) {
        const trigger = megaTriggerRefs.current[label]
        if (trigger) {
          const rect = trigger.getBoundingClientRect()
          const panelWidth = 1100
          const left = Math.max(16, (window.innerWidth - panelWidth) / 2)
          setMegaPosition({ top: rect.bottom + 12, left })
        }
      }
      return next
    })
  }

  // Image slideshow effect
  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToPreviousImage = () => setCurrentImageIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
  const goToNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)

  const handleSearch = () => {
    const params = new URLSearchParams()
    
    // Set property type based on active tab
    if (activeTab === 'Buy') {
      params.set('type', 'buy')
    } else if (activeTab === 'Rent') {
      params.set('type', 'rent')
    } else if (activeTab === 'Commercial') {
      params.set('type', 'commercial')
    } else if (activeTab === 'New Launch' || activeTab === 'Projects') {
      params.set('type', 'buy')
    }

    // Set search query if present
    if (query.trim()) {
      params.set('q', query.trim())
    }

    // Set city if selected
    if (selectedCity) {
      params.set('city', selectedCity)
    }

    // Navigate to filter page with parameters
    navigate(`/filter?${params.toString()}`)
  }

  const activeMenuData = openMegaMenu ? MEGA_MENUS[openMegaMenu] : null
  const activeCategory = activeMenuData?.categories[activeCategoryIndex]
  const hasCol3 = !!activeCategory?.col3?.items?.length

  const tabConfig = TAB_CONFIG[activeTab]
  const categoryConfig = PROPERTY_CATEGORIES[selectedCategory]?.[activeTab] || tabConfig

  return (
    <div className="w-full">
      {/* Backdrop overlay when any dropdown is open */}
      {(isLocationOpen || openMegaMenu) && (
        <div
          className="fixed inset-0 bg-black/15 backdrop-blur-[2px] z-20 transition-opacity duration-200"
          onClick={() => {
            setIsLocationOpen(false)
            setOpenMegaMenu(null)
          }}
        />
      )}

      {/* Hero with overlaid nav + promo banner */}
      <div className="relative w-full h-[280px] sm:h-[400px] overflow-hidden">
        {HERO_IMAGES.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Featured property"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />

        {HERO_IMAGES.length > 1 && (
          <>
            <button
              onClick={goToPreviousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-200 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-200 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </>
        )}

        {/* Top nav overlay */}
        <div className="relative z-20">
          <div className="max-w-8xl bg-black/40 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo + location */}
              <div className="flex items-center gap-4">
                <Link to="/" className="text-2xl font-bold text-white">
                  Nestnbest
                </Link>

                <div className="relative" ref={locationRef}>
                  <button
                    onClick={() => {
                      setOpenMegaMenu(null)
                      setIsLocationOpen((open) => !open)
                    }}
                    className="hidden sm:flex items-center gap-1 text-white/90 text-sm font-medium border-l border-white/30 pl-4 hover:text-white transition-colors duration-200"
                  >
                 Select City
                    <ChevronDown
                      size={16}
                      className="transition-transform duration-200"
                      style={{ transform: isLocationOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>

                  {isLocationOpen &&
                    createPortal(
                      <div
                        ref={dropdownRef}
                        className="fixed w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40"
                        style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px`, maxHeight: '400px' }}
                      >
                        <div className="p-4 pb-4">
                          <h3 className="text-lg font-bold mb-4" style={{ color: NAVY }}>
                            Select City
                          </h3>

                          <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 shadow-sm mb-4">
                            <Search size={16} className="text-slate-400 flex-shrink-0" />
                            <input
                              type="text"
                              value={cityQuery}
                              onChange={(e) => setCityQuery(e.target.value)}
                              placeholder="Search city..."
                              className="flex-1 min-w-0 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                            {POPULAR_CITIES.filter(city =>
                              city.name.toLowerCase().includes(cityQuery.toLowerCase()) ||
                              city.state.toLowerCase().includes(cityQuery.toLowerCase())
                            ).map((city) => (
                              <button
                                key={city.name}
                                onClick={() => {
                                  setCityQuery(city.name)
                                  setIsLocationOpen(false)
                                }}
                                className="p-2 rounded-lg border border-slate-200 hover:border-[#1E88E5] hover:bg-[rgba(30,136,229,0.04)] transition-all duration-200 text-left"
                              >
                                <div className="font-semibold text-sm" style={{ color: NAVY }}>
                                  {city.name}
                                </div>
                                <div className="text-xs text-slate-500 mt-0.5">
                                  {city.state}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>,
                      document.body
                    )}
                </div>
              </div>

              {/* Right nav links */}
              <div className="hidden lg:flex items-center gap-7">
                {NAV_LINKS.map((link) => {
                  const hasMenu = !!MEGA_MENUS[link.label]
                  const isInsight = link.label === 'Insights'
                  return (
                    <div key={link.label} className="relative" ref={hasMenu ? (el) => (megaTriggerRefs.current[link.label] = el) : null}>
                      {isInsight ? (
                        <Link
                          to="/insight"
                          className="relative flex items-center gap-1.5 text-white/90 text-sm font-medium hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                          {link.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white leading-none">
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      ) : (
                        <button
                          onClick={() => (hasMenu ? toggleMegaMenu(link.label) : undefined)}
                          className="relative flex items-center gap-1.5 text-white/90 text-sm font-medium hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                          {link.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white leading-none">
                              {link.badge}
                            </span>
                          )}
                          {hasMenu && (
                            <ChevronDown
                              size={14}
                              className="transition-transform duration-200"
                              style={{ transform: openMegaMenu === link.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            />
                          )}
                        </button>
                      )}
                    </div>
                  )
                })}

                <Link
                  to="/auth"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ color: NAVY }}
                >
                  Post property
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 leading-none">
                    FREE
                  </span>
                </Link>

                <button className="w-9 h-9 flex items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors duration-200">
                  <Headphones size={16} />
                </button>

                <div className="relative" ref={userTriggerRef}>
                  <button
                    onClick={() => {
                      setIsLocationOpen(false)
                      setOpenMegaMenu(null)
                      setIsUserDropdownOpen((open) => !open)
                    }}
                    className="relative flex items-center gap-1 text-white hover:text-white/80 transition-colors duration-200"
                  >
                    <span className="relative">
                      <User size={22} />
                      <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-rose-500 border border-white" />
                    </span>
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200"
                      style={{ transform: isUserDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>

                  {isUserDropdownOpen &&
                    createPortal(
                      <div
                        ref={userDropdownRef}
                        className="fixed w-48 bg-white rounded-xl shadow-2xl overflow-hidden text-left animate-loc-in z-40"
                        style={{ top: `${userDropdownPosition.top}px`, left: `${userDropdownPosition.left}px` }}
                      >
                        <div className="py-2">
                          <button onClick={() => { setIsUserDropdownOpen(false); openSignup() }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                            <User size={16} className="text-slate-400" />
                            Signin as User
                          </button>
                          <button onClick={() => { setIsUserDropdownOpen(false); openSignup() }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                            <User size={16} className="text-slate-400" />
                            Register as User
                          </button>
                          <div className="my-2 border-t border-slate-100" />
                        </div>
                      </div>,
                      document.body
                    )}
                </div>

                <div className="relative" ref={menuTriggerRef}>
                  <button
                    onClick={() => {
                      setIsLocationOpen(false)
                      setOpenMegaMenu(null)
                      setIsUserDropdownOpen(false)
                      setIsMenuDropdownOpen((open) => !open)
                    }}
                    className="text-white hover:text-white/80 transition-colors duration-200"
                  >
                    <Menu size={22} />
                  </button>

                  {isMenuDropdownOpen &&
                    createPortal(
                      <div
                        ref={menuDropdownRef}
                        className="fixed w-40 bg-white rounded-xl shadow-2xl overflow-hidden text-left animate-loc-in z-40"
                        style={{ top: `${menuDropdownPosition.top}px`, left: `${menuDropdownPosition.left}px` }}
                      >
                        <div className="py-2">
                          <Link to="/about" onClick={() => setIsMenuDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                            About
                          </Link>
                          <Link to="/contact" onClick={() => setIsMenuDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                            Contact
                          </Link>
                          <Link to="/blog" onClick={() => setIsMenuDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                            Blog
                          </Link>
                          <Link to="/career" onClick={() => setIsMenuDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                            Career
                          </Link>
                        </div>
                      </div>,
                      document.body
                    )}
                </div>
              </div>

              {/* Mobile menu button */}
              <button className="lg:hidden text-white p-2">
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mega menu panel (portal) */}
      {openMegaMenu &&
        activeMenuData &&
        createPortal(
          <div
            ref={megaPanelRef}
            className="fixed w-[1100px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 flex"
            style={{ top: `${megaPosition.top}px`, left: `${megaPosition.left}px`, maxHeight: 'calc(100vh - 50px)' }}
          >
            {/* Column 1 — categories */}
            <div className="w-64 flex-shrink-0 bg-slate-50 py-6 px-5 space-y-1 overflow-y-auto flex flex-col">
              <div className="flex-1 space-y-1">
                {activeMenuData.categories.map((cat, i) => {
                  const isActive = i === activeCategoryIndex
                  return (
                    <button
                      key={cat.label}
                      onClick={() => setActiveCategoryIndex(i)}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide text-left transition-colors duration-200"
                      style={{
                        color: isActive ? NAVY : '#64748B',
                        backgroundColor: isActive ? 'rgba(25,60,6,0.06)' : 'transparent',
                      }}
                    >
                      <span className="flex items-center gap-2 normal-case font-bold">
                        {cat.label}
                        {cat.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-600 text-white leading-none normal-case">
                            {cat.badge}
                          </span>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="pt-5 mt-4 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
                contact us toll free on
                <div className="text-sm font-bold mt-1" style={{ color: NAVY }}>
                  {CONTACT_INFO.phone} <span className="font-normal text-slate-400">({CONTACT_INFO.hours})</span>
                </div>
              </div>
            </div>

            {/* Columns 2-4 */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 p-6 overflow-y-auto">
                <MenuColumn heading={activeCategory?.col2?.heading} items={activeCategory?.col2?.items} menuLabel={openMegaMenu} categoryLabel={activeCategory?.label} />
                {hasCol3 && <MenuColumn heading={activeCategory?.col3?.heading} items={activeCategory?.col3?.items} menuLabel={openMegaMenu} categoryLabel={activeCategory?.label} />}
                <AdCard menuLabel={openMegaMenu} spanFull={!hasCol3} />
              </div>

              <div className="flex items-center gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 text-sm text-slate-500">
                <Mail size={14} className="flex-shrink-0" />
                Email us at <span className="font-medium text-slate-700">{CONTACT_INFO.email}</span> or call us at
                <Phone size={14} className="flex-shrink-0 ml-1" />
                <span className="font-medium text-slate-700">{CONTACT_INFO.phone}</span> (IND Toll-Free)
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Tab bar + search — overlapping card below the hero */}
      <div className="relative z-10 -mt-18">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={searchCardRef} className="bg-white rounded-t-2xl shadow-2xl border border-slate-100">
            <div className="flex items-center gap-8 px-6 pt-5 overflow-x-auto scrollbar-hide">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.label
                const displayText = tab.label === 'New Launch' ? dynamicTabText : tab.label
                const isNewNest = tab.label === 'New Launch' && dynamicTabText === 'New Nest'
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={`relative flex items-center gap-1.5 pb-4 text-sm sm:text-base font-semibold whitespace-nowrap transition-colors duration-200 ${
                      tab.label === 'New Launch' ? 'w-[110px] justify-center' : ''
                    }`}
                    style={{ color: isNewNest ? '#EF4444' : (isActive ? NAVY : '#475569') }}
                  >
                    <span
                      className={`transition-all duration-300 ${
                        isAnimating && tab.label === 'New Launch' ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
                      }`}
                    >
                      {displayText}
                    </span>
                    {tab.dot && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                    {isActive && (
                      <span className="absolute left-0 right-0 -bottom-px h-[3px] rounded-full transition-all duration-300" style={{ backgroundColor: BLUE }} />
                    )}
                  </button>
                )
              })}
              <div className="ml-auto flex-shrink-0 pb-4">
                <Link to="/post-property" className="flex items-center gap-1.5 text-sm sm:text-base font-semibold" style={{ color: NAVY }}>
                  Post Property
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 leading-none">
                    FREE
                  </span>
                </Link>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Selector(s) + search input + action icons */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 px-4 sm:px-6 py-4">
              {tabConfig.dualSelector ? (
                <div className="flex items-center flex-shrink-0 sm:pr-5 sm:border-r border-slate-200">
                  <button type="button" className="flex items-center gap-1.5 pr-3 py-3 text-sm font-semibold hover:text-[#1E88E5] transition-colors duration-150" style={{ color: NAVY }}>
                    {tabConfig.dualSelector[0]}
                    <ChevronDown size={16} className="text-slate-400" />
                  </button>
                  <span className="w-px h-5 bg-slate-200 mx-1" />
                  <button
                    type="button"
                    onClick={toggleFilterPanel}
                    className="flex items-center gap-1.5 pl-3 py-3 text-sm font-semibold hover:text-[#1E88E5] transition-colors duration-150"
                    style={{ color: NAVY }}
                  >
                    {tabConfig.dualSelector[1]}
                    <ChevronDown
                      size={16}
                      className="text-slate-400 transition-transform duration-200"
                      style={{ transform: isFilterOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                </div>
              ) : activeTab === 'Commercial' ? (
                <button
                  type="button"
                  onClick={toggleFilterPanel}
                  className="flex items-center gap-1.5 px-4 py-3 sm:pr-5 sm:border-r border-slate-200 text-sm font-semibold flex-shrink-0 hover:text-[#1E88E5] transition-colors duration-150"
                  style={{ color: NAVY }}
                >
                  {tabConfig.selector}
                  <ChevronDown
                    size={16}
                    className="text-slate-400 transition-transform duration-200"
                    style={{ transform: isFilterOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
              ) : activeTab === 'Buy' || activeTab === 'Rent' || activeTab === 'New Launch' || activeTab === 'Projects' ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsLocationOpen(false)
                    setOpenMegaMenu(null)
                    setIsFilterOpen((open) => !open)
                  }}
                  className="flex items-center gap-1.5 px-4 py-3 sm:pr-5 sm:border-r border-slate-200 text-sm font-semibold flex-shrink-0 hover:text-[#1E88E5] transition-colors duration-150"
                  style={{ color: NAVY }}
                >
                  {selectedCategory}
                  <ChevronDown
                    size={16}
                    className="text-slate-400 transition-transform duration-200"
                    style={{ transform: isFilterOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
              ) : (
                <div className="flex items-center gap-1 flex-shrink-0 sm:pr-5 sm:border-r border-slate-200">
                  {Object.keys(PROPERTY_CATEGORIES).filter(cat => cat !== 'Plot/Land').map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        if (isFilterOpen && selectedCategory === category) {
                          setIsFilterOpen(false)
                        } else {
                          setSelectedCategory(category)
                          setIsFilterOpen(true)
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#1E88E5] transition-colors duration-150"
                      style={{ color: selectedCategory === category ? '#1E88E5' : '#1A202C' }}
                    >
                      {category}
                      <ChevronDown
                        size={14}
                        className="text-slate-400 transition-transform duration-200"
                        style={{ transform: isFilterOpen && selectedCategory === category ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'Projects' && (
                <div className="relative" ref={projectStatusTriggerRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchCityDropdownOpen(false)
                      setOpenMegaMenu(null)
                      setIsProjectStatusDropdownOpen((open) => !open)
                    }}
                    className="flex items-center gap-1.5 px-4 py-3 sm:border-r border-slate-200 text-sm font-semibold flex-shrink-0 hover:text-[#1E88E5] transition-colors duration-150"
                    style={{ color: NAVY }}
                  >
                    {selectedProjectStatus || 'Project Status'}
                    <ChevronDown
                      size={16}
                      className="text-slate-400 transition-transform duration-200"
                      style={{ transform: isProjectStatusDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>

                  {isProjectStatusDropdownOpen &&
                    createPortal(
                      <div
                        ref={projectStatusDropdownRef}
                        className="fixed w-48 bg-white rounded-xl shadow-2xl overflow-hidden text-left animate-loc-in z-40"
                        style={{ top: `${projectStatusDropdownPosition.top}px`, left: `${projectStatusDropdownPosition.left}px` }}
                      >
                        <div className="py-2">
                          {PROJECT_STATUS_OPTIONS.map((status) => (
                            <button
                              key={status}
                              onClick={() => {
                                setSelectedProjectStatus(status)
                                setIsProjectStatusDropdownOpen(false)
                              }}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                                selectedProjectStatus === status ? 'bg-slate-50 text-[#1E88E5]' : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>,
                      document.body
                    )}
                </div>
              )}

              <div className="relative" ref={searchCityTriggerRef}>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMegaMenu(null)
                    setIsSearchCityDropdownOpen((open) => !open)
                  }}
                  className="flex items-center gap-1.5 px-4 py-3 sm:border-r border-slate-200 text-sm font-semibold flex-shrink-0 hover:text-[#1E88E5] transition-colors duration-150"
                  style={{ color: NAVY }}
                >
                  {selectedCity || 'Select City'}
                  <ChevronDown
                    size={16}
                    className="text-slate-400 transition-transform duration-200"
                    style={{ transform: isSearchCityDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {isSearchCityDropdownOpen &&
                  createPortal(
                    <div
                      ref={searchCityDropdownRef}
                      className="fixed w-[320px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40"
                      style={{ top: `${searchCityDropdownPosition.top}px`, left: `${searchCityDropdownPosition.left}px`, maxHeight: '350px' }}
                    >
                      <div className="p-4 pb-3">
                        <h3 className="text-lg font-bold mb-3" style={{ color: NAVY }}>
                          Select City
                        </h3>

                        <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2.5 shadow-sm mb-4 bg-slate-50">
                          <Search size={16} className="text-slate-400 flex-shrink-0" />
                          <input
                            type="text"
                            value={cityQuery}
                            onChange={(e) => setCityQuery(e.target.value)}
                            placeholder="Search city..."
                            className="flex-1 min-w-0 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-4 gap-2 max-h-[220px] overflow-y-auto pr-2">
                          {POPULAR_CITIES.filter(city =>
                            city.name.toLowerCase().includes(cityQuery.toLowerCase()) ||
                            city.state.toLowerCase().includes(cityQuery.toLowerCase())
                          ).map((city) => (
                            <button
                              key={city.name}
                              onClick={() => {
                                setSelectedCity(city.name)
                                setCityQuery(city.name)
                                setIsSearchCityDropdownOpen(false)
                              }}
                              className="flex flex-col items-center justify-start p-2 rounded-lg border border-slate-200 hover:border-[#1E88E5] hover:bg-[rgba(30,136,229,0.04)] transition-all duration-200 text-center group"
                            >
                              <div className="font-semibold text-[11px] group-hover:text-[#1E88E5] transition-colors duration-200" style={{ color: NAVY }}>
                                {city.name}
                              </div>

                            </button>
                          ))}
                        </div>
                      </div>
                    </div>,
                    document.body
                  )}
              </div>

              <div className="relative" ref={neighbourhoodTriggerRef}>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMegaMenu(null)
                    setIsNeighbourhoodDropdownOpen((open) => !open)
                  }}
                  className="flex items-center gap-1.5 px-4 py-3 sm:border-r border-slate-200 text-sm font-semibold flex-shrink-0 hover:text-[#1E88E5] transition-colors duration-150"
                  style={{ color: NAVY }}
                >
                  {selectedNeighbourhood || 'Neighbourhood'}
                  <ChevronDown
                    size={16}
                    className="text-slate-400 transition-transform duration-200"
                    style={{ transform: isNeighbourhoodDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {isNeighbourhoodDropdownOpen &&
                  createPortal(
                    <div
                      ref={neighbourhoodDropdownRef}
                      className="fixed w-64 bg-white rounded-xl shadow-2xl overflow-hidden text-left animate-loc-in z-40"
                      style={{ top: `${neighbourhoodDropdownPosition.top}px`, left: `${neighbourhoodDropdownPosition.left}px`, maxHeight: '400px' }}
                    >
                      <div className="p-4 pb-4">
                        <h3 className="text-lg font-bold mb-3" style={{ color: NAVY }}>
                          Select Neighbourhood
                        </h3>
                        <div className="space-y-1 max-h-[320px] overflow-y-auto pr-2">
                          {NEIGHBOURHOODS.map((neighbourhood) => (
                            <button
                              key={neighbourhood}
                              onClick={() => {
                                setSelectedNeighbourhood(neighbourhood)
                                setIsNeighbourhoodDropdownOpen(false)
                              }}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors duration-200 rounded-lg ${
                                selectedNeighbourhood === neighbourhood ? 'bg-slate-50 text-[#1E88E5]' : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {neighbourhood}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>,
                    document.body
                  )}
              </div>

              <div className="flex items-center gap-3 flex-1 px-4 sm:px-5">
                <Search size={18} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter locality"
                  className="w-full bg-transparent text-sm sm:text-base text-slate-700 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 px-4 sm:px-5 sm:border-r border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isSmartSearchEnabled}
                      onChange={(e) => setIsSmartSearchEnabled(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${isSmartSearchEnabled ? 'bg-[#1E88E5]' : 'bg-slate-200'}`}>
                      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${isSmartSearchEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-700">Smart Search</span>
                </label>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 justify-end sm:pr-2">
                {categoryConfig.showLocation && (
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 transition-colors duration-200 hover:bg-slate-50" aria-label="Use current location">
                    <LocateFixed size={18} style={{ color: BLUE }} />
                  </button>
                )}
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 transition-colors duration-200 hover:bg-slate-50" aria-label="Search by voice">
                  <Mic size={18} style={{ color: BLUE }} />
                </button>
                <button 
                  onClick={handleSearch}
                  className="px-8 py-2.5 rounded-lg text-white text-sm sm:text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg" 
                  style={{ backgroundColor: BLUE }}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Expandable filter panel — content driven by categoryConfig, opens on selector click */}
            {isFilterOpen && (
            <div className="border-t border-slate-100 px-4 sm:px-6 py-6 animate-filter-in origin-top">
              <div className="flex gap-6">
                {/* Left column - Category selection */}
                <div className="w-48 flex-shrink-0">
                  <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">Categories</h4>
                  <div className="space-y-1">
                    {Object.keys(PROPERTY_CATEGORIES).filter(cat => {
                      if (cat === 'Plot/Land') return false
                      if (activeTab !== 'Rent' && cat === 'PG / Co-Living') return false
                      return true
                    }).map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setFilterPanelSelectedCategory(category)
                          setSelectedCategory(category)
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors duration-200 rounded-lg ${
                          filterPanelSelectedCategory === category ? 'bg-slate-100 text-[#1E88E5]' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right column - Checkboxes */}
                <div className="flex-1">
                  {categoryConfig.propertyTypesHeading ? (
                    <>
                      <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">
                        {categoryConfig.propertyTypesHeading}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-3.5">
                        {categoryConfig.checkboxGroups.map((group, gi) => (
                          <div key={gi} className="space-y-3.5">
                            {group.map((item) => (
                              <CheckboxRow
                                key={item}
                                label={item}
                                checked={!!checkedByTab[activeTab]?.[item]}
                                onToggle={() => toggleCheckbox(activeTab, item)}
                              />
                            ))}
                          </div>
                        ))}
                      </div>

                      {categoryConfig.crossLink && <CrossLinkRow text={categoryConfig.crossLink} className="mt-5" />}
                    </>
                  ) : categoryConfig.radioGroup ? (
                    <>
                      <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">
                        {categoryConfig.radioGroup.heading}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                        {categoryConfig.radioGroup.options.map((opt) => (
                          <RadioRow key={opt} label={opt} selected={plotsSelection === opt} onSelect={() => setPlotsSelection(opt)} />
                        ))}
                      </div>
                    </>
                  ) : categoryConfig.checkboxGroups ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-3.5">
                        {categoryConfig.checkboxGroups.map((group, gi) => (
                          <div key={gi} className="space-y-3.5">
                            {group.map((item) => (
                              <CheckboxRow
                                key={item}
                                label={item}
                                checked={!!checkedByTab[activeTab]?.[item]}
                                onToggle={() => toggleCheckbox(activeTab, item)}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                      {categoryConfig.crossLink && <CrossLinkRow text={categoryConfig.crossLink} className="mt-5" />}
                    </>
                  ) : activeTab === 'Projects' ? (
                    <>
                      <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">
                        {tabConfig.projectCheckboxHeading}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-10 gap-y-3 mb-5">
                        {tabConfig.checkboxGroups[0].map((item) => (
                          <CheckboxRow
                            key={item}
                            label={item}
                            checked={!!checkedByTab[activeTab]?.[item]}
                            onToggle={() => toggleCheckbox(activeTab, item)}
                          />
                        ))}
                      </div>
                      <CrossLinkRow text={tabConfig.crossLink} />
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3.5 mb-5">
                        {tabConfig.checkboxGroups.map((group, gi) => (
                          <div key={gi} className="space-y-3.5">
                            {group.map((item) => (
                              <CheckboxRow
                                key={item}
                                label={item}
                                checked={!!checkedByTab[activeTab]?.[item]}
                                onToggle={() => toggleCheckbox(activeTab, item)}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                      <CrossLinkRow text={tabConfig.crossLink} />
                    </>
                  )}
                </div>
              </div>

              <div className="h-px bg-slate-100 my-5" />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  {tabConfig.bottomFilters.map((f) => (
                    <div key={f} className="relative">
                      <FilterPill
                        label={f}
                        selectedValue={getFilterLabel(f)}
                        onClick={() => openFilterPanel(f)}
                        isOpen={openFilterDropdown === f}
                        triggerRef={(el) => (filterTriggerRefs.current[f] = el)}
                      />

                      {openFilterDropdown === f && createPortal(
                        <div
                          ref={filterDropdownRef}
                          className="fixed w-[320px] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-50 border border-slate-100"
                          style={{ top: `${filterDropdownPosition.top}px`, left: `${filterDropdownPosition.left}px` }}
                        >
                          {/* Header */}
                          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                            <h4 className="text-sm font-bold" style={{ color: NAVY }}>{f}</h4>
                            <button type="button" onClick={() => setOpenFilterDropdown(null)} className="text-slate-400 hover:text-slate-600">
                              <X size={16} />
                            </button>
                          </div>

                          {/* Body */}
                          <div className="p-5 max-h-80 overflow-y-auto">
                            {FILTER_KIND[f] === 'range' && (
                              <div>
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="flex-1">
                                    <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Min</label>
                                    <select
                                      value={pendingFilterValue?.min || ''}
                                      onChange={(e) => setPendingFilterValue((prev) => ({ ...prev, min: e.target.value }))}
                                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5]"
                                    >
                                      <option value="">No Min</option>
                                      {RANGE_FILTER_OPTIONS[f].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                  </div>
                                  <span className="text-slate-300 mt-5">—</span>
                                  <div className="flex-1">
                                    <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Max</label>
                                    <select
                                      value={pendingFilterValue?.max || ''}
                                      onChange={(e) => setPendingFilterValue((prev) => ({ ...prev, max: e.target.value }))}
                                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5]"
                                    >
                                      <option value="">No Max</option>
                                      {RANGE_FILTER_OPTIONS[f].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {RANGE_FILTER_OPTIONS[f].slice(0, 6).map((opt) => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => setPendingFilterValue({ min: '', max: opt })}
                                      className="px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:border-[#1E88E5] hover:text-[#1E88E5] transition-colors duration-150"
                                    >
                                      Under {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {FILTER_KIND[f] === 'chips' && (
                              <div className="flex flex-wrap gap-2">
                                {CHIP_FILTER_OPTIONS[f].map((opt) => {
                                  const isSelected = pendingFilterValue?.includes(opt)
                                  return (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => togglePendingItem(opt)}
                                      className="px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-150"
                                      style={{
                                        borderColor: isSelected ? BLUE : '#E2E8F0',
                                        backgroundColor: isSelected ? 'rgba(30,136,229,0.08)' : '#fff',
                                        color: isSelected ? BLUE : '#475569',
                                      }}
                                    >
                                      {opt}
                                    </button>
                                  )
                                })}
                              </div>
                            )}

                            {FILTER_KIND[f] === 'checkbox' && (
                              <div className="space-y-3.5">
                                {CHECKBOX_FILTER_OPTIONS[f].map((opt) => (
                                  <CheckboxRow
                                    key={opt}
                                    label={opt}
                                    checked={!!pendingFilterValue?.includes(opt)}
                                    onToggle={() => togglePendingItem(opt)}
                                  />
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50">
                            <button type="button" onClick={() => clearFilter(f)} className="text-sm font-semibold text-slate-500 hover:text-slate-700">
                              Clear
                            </button>
                            <button
                              type="button"
                              onClick={() => applyFilter(f)}
                              className="px-6 py-2 rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                              style={{ backgroundColor: BLUE }}
                            >
                              Apply
                            </button>
                          </div>
                        </div>,
                        document.body
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: BLUE }}
                >
                  Done
                </button>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes loc-in {
          from { opacity: 0; transform: scale(0.97) translateY(-6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-loc-in { animation: loc-in 0.18s ease both; }
        @keyframes filter-in {
          from { opacity: 0; transform: scaleY(0.96) translateY(-4px); }
          to { opacity: 1; transform: scaleY(1) translateY(0); }
        }
        .animate-filter-in { animation: filter-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .animate-loc-in { animation: none; }
          .animate-filter-in { animation: none; }
        }
      `}</style>
    </div>
  )
}

export default Header