import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { AppContext } from '../context/AppContext'
import assets from '../assets/assets'
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
  Info,
} from 'lucide-react'


const NAVY = '#193C06'
const BLUE = '#1E88E5'
const INK = '#152020'

const TABS = [
  { label: 'Buy' },
  { label: 'New Launch', dot: true },
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
const BUDGET_OPTIONS = {
  'Residential': {
    'Buy': ['10 Lac', '20 Lac', '30 Lac', '40 Lac', '50 Lac', '75 Lac', '1 Cr', '1.5 Cr', '2 Cr', '3 Cr', '5 Cr', '7.5 Cr', '10 Cr+'],
    'Rent': ['10k', '20k', '40k', '60k', '80k', '1 Lakh', '1.5 Lakh', '2 Lakh', '3 Lakh', '5 Lakh+'],
    'Rent / Lease': ['10k', '20k', '40k', '60k', '80k', '1 Lakh', '1.5 Lakh', '2 Lakh', '3 Lakh', '5 Lakh+'],
    'Plots/Land': ['10 Lac', '20 Lac', '30 Lac', '40 Lac', '50 Lac', '75 Lac', '1 Cr', '1.5 Cr', '2 Cr', '3 Cr', '5 Cr', '7.5 Cr', '10 Cr+'],
    'PG / Co-living': ['5k', '10k', '15k', '20k', '25k', '30k', '40k', '50k+'],
  },
  'Commercial': {
    'Buy': ['50 Lakh', '1 Cr', '2 Cr', '3 Cr', '4 Cr', '5 Cr', '7.5 Cr', '10 Cr', '15 Cr', '20 Cr+'],
    'Rent': ['25k', '50k', '1 Lakh', '2 Lakh', '3 Lakh', '5 Lakh', '10 Lakh', '20 Lakh+'],
    'Rent / Lease': ['25k', '50k', '1 Lakh', '2 Lakh', '3 Lakh', '5 Lakh', '10 Lakh', '20 Lakh+'],
    'Plots/Land': ['50 Lakh', '1 Cr', '2 Cr', '3 Cr', '4 Cr', '5 Cr', '7.5 Cr', '10 Cr', '15 Cr', '20 Cr+'],
  }
}

// Helper function to get budget options based on category and tab
const getBudgetOptions = (category, tab) => {
  return BUDGET_OPTIONS[category]?.[tab] || BUDGET_OPTIONS['Residential']['Buy']
}

const AREA_RANGE_OPTIONS = ['300 sq ft', '500 sq ft', '750 sq ft', '1000 sq ft', '1500 sq ft', '2000 sq ft', '3000 sq ft', '5000 sq ft', '7500 sq ft', '10000 sq ft+']
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
const BEDROOM_CHIP_OPTIONS = [
  '1 RK',
  '1 BHK',
  '1 BHK + Servant Room',
  '1 BHK + Pooja Room',
  '2 BHK',
  '2 BHK + Servant Room',
  '2 BHK + Pooja Room',
  '3 BHK',
  '3 BHK + Servant Room',
  '3 BHK + Pooja Room',
  '4 BHK',
  '4 BHK + Servant Room',
  '4 BHK + Pooja Room',
  '4+ BHK'
]

const RANGE_FILTER_OPTIONS = { Budget: BUDGET_OPTIONS['Residential']['Buy'], Area: AREA_RANGE_OPTIONS }
const CHIP_FILTER_OPTIONS = { Bedroom: BEDROOM_CHIP_OPTIONS }
const CHECKBOX_FILTER_OPTIONS = {
  'Construction Status': {
    default: [
      'Under Expression of Interest (EOI)',
      'New Launch',
      'Under Construction',
      'NOC Obtained',
      'Under Physical Handover',
      'Ready to Move/Registry',
      'Ready to Move (Registry Pending)',
      'Resale/Secondary Sale',
    ],
    'New Launch': [
      'Immediately',
      'Within 15 Days',
      'Within 30 Days',
      'Within 60 Days',
      'Within 90 Days',
      'Within 6 Months',
      'Within 1 Year',
    ]
  },
  'Posted By': ['Owner', 'Agent', 'Builder'],
  'Possession Status': ['Ready to Move', 'Within 6 Months', 'Within 1 Year', 'After 1 Year'],
  Furnishing: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
  Parking: ['Covered Parking - Basement', 'Covered Parking - Podium', 'Covered Parking - Mechanical', 'Open Parking', 'No Parking'],
  Facing: ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
  'Age of Property': ['New Construction', '0-5 Years', '5-10 Years', '10+ Years'],
  'Posted Since': ['Last 12 Hours', 'Last 24 Hours', 'Last 3 Days', 'Last 7 Days', 'Last 15 Days', 'Last 30 Days', 'Last 3 Months', 'Last 6 Months', 'Last 1 Year'],
  'Maintenance Charges': ['Below ₹2000', '₹2000 - ₹5000', '₹5000 - ₹10000', 'Above ₹10000'],
}

// Helper function to get construction status options based on tab
const getConstructionStatusOptions = (tab) => {
  return CHECKBOX_FILTER_OPTIONS['Construction Status'][tab] || CHECKBOX_FILTER_OPTIONS['Construction Status'].default
}

// Hover explainer text shown next to Construction Status options that need
// extra context. Keyed by the exact option label above — add more entries
// here to surface a hover hint for any other option without touching the
// rendering logic.
const CONSTRUCTION_STATUS_INFO = {
  'NOC Obtained': 'The No Objection Certificate (NOC) has been obtained. Physical handover is expected within 60–90 days, subject to the builder schedule.',
  'Under Physical Handover': 'The NOC has been issued, and the property is currently undergoing the physical handover process. Possession is expected within 60–90 days, subject to the builder schedule.',
}

const FILTER_KIND = {
  Budget: 'range',
  Area: 'range',
  Bedroom: 'chips',
  'Construction Status': 'checkbox',
  'Posted By': 'checkbox',
  'Possession Status': 'checkbox',
  Furnishing: 'checkbox',
  Parking: 'checkbox',
  Facing: 'checkbox',
  'Age of Property': 'checkbox',
  'Posted Since': 'checkbox',
  'Maintenance Charges': 'checkbox',
}
const emptyFilterValue = (f) => (FILTER_KIND[f] === 'range' ? { min: '', max: '', rangeMin: 0, rangeMax: 100 } : [])

// ---- Mega menu content -----------------------------------------------
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
        label: 'Buy a Home',
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
        label: 'Rent a Home',
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
      bottomFilters: ['Bedroom', 'Construction Status', 'Posted By'],
    },
    Rent: {
      placeholder: 'Search "Hyderabad"',
      showLocation: true,
      checkboxGroups: [
        ['Flats / Apartments', 'Independent Houses', 'Villas', 'Builder Floors', 'Studio Apartments'],
        ['Furnished Flats', 'Semi-Furnished Flats', 'Unfurnished Flats'],
      ],
      bottomFilters: ['Bedroom', 'Posted By', 'Furnishing'],
    },
    'New Launch': {
      placeholder: 'Search "New launch projects in Gurgaon"',
      showLocation: true,
      checkboxGroups: [
        ['Apartments / Flats', 'Villas', 'Independent Houses', 'Builder Floors', 'Studio Apartments'],
        ['Luxury Homes', 'Residential Plots', 'Township Projects'],
      ],
      bottomFilters: ['Bedroom', 'Possession Status', 'Posted By'],
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
      bottomFilters: ['Posted By', 'Furnishing'],
    },
  },
  Commercial: {
    Buy: {
      placeholder: 'Search "Hyderabad"',
      showLocation: true,
      propertyTypesHeading: 'Property Types',
      checkboxGroups: [
        ['Office Space', 'Commercial Shops', 'Showrooms', 'Retail Spaces', 'Commercial Buildings', 'Hospital'],
        ['Commercial Plots', 'Co-working Spaces', 'Food Court / Restaurant Space', 'Hotels & Resorts', 'Commercial Complexes'],
      ],
      bottomFilters: ['Area', 'Construction Status', 'Posted By'],
    },
    Rent: {
      placeholder: 'Search "Hyderabad"',
      showLocation: true,
      propertyTypesHeading: 'Property Types',
      checkboxGroups: [
        ['Office Space', 'Shops', 'Showrooms', 'Commercial Buildings', 'Co-working Spaces'],
        ['Business Centres'],
      ],
      bottomFilters: ['Area', 'Posted By'],
    },
    'New Launch': {
      placeholder: 'Search "New launch projects in Gurgaon"',
      showLocation: true,
      propertyTypesHeading: 'Property Types',
      checkboxGroups: [
        ['Office Spaces', 'Shops', 'Showrooms', 'Commercial Buildings', 'Commercial Plots'],
        ['Co-working Spaces', 'Business Parks'],
      ],
      bottomFilters: ['Area', 'Possession Status', 'Posted By'],
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
      bottomFilters: ['Area', 'Construction Status', 'Posted By'],
    },
    Rent: {
      placeholder: 'Search "Industrial rent in Hyderabad"',
      showLocation: true,
      propertyTypesHeading: 'Property Types',
      checkboxGroups: [
        ['Warehouses', 'Industrial Sheds', 'Factory Units', 'Godowns', 'Industrial Buildings'],
        ['Logistics Spaces'],
      ],
      bottomFilters: ['Area', 'Posted By'],
    },
    'New Launch': {
      placeholder: 'Search "New launch projects in Gurgaon"',
      showLocation: true,
      propertyTypesHeading: 'Property Types',
      checkboxGroups: [
        ['Industrial Plots', 'Industrial Sheds', 'Warehouses', 'Factories', 'Manufacturing Units'],
        ['Logistics Parks', 'Industrial Buildings'],
      ],
      bottomFilters: ['Area', 'Possession Status', 'Posted By'],
    },
  },
  'Farming land': {
    Buy: {
      placeholder: 'Search "Agricultural land in Punjab"',
      showLocation: true,
      propertyTypesHeading: 'Land Types',
      checkboxGroups: [
        ['Agricultural Land', 'Farm Land', 'Orchard', 'Plantation', 'Dairy Farm'],
        ['Poultry Farm', 'Fish Farm', 'Horticulture Land', 'Vineyard', 'Other Farming'],
      ],
      bottomFilters: ['Area', 'Posted By'],
    },
    Rent: {
      placeholder: 'Search "Farm land on rent"',
      showLocation: true,
      propertyTypesHeading: 'Land Types',
      checkboxGroups: [
        ['Agricultural Land', 'Farm Land', 'Orchard', 'Plantation'],
        ['Dairy Farm', 'Poultry Farm', 'Fish Farm'],
      ],
      bottomFilters: ['Area', 'Posted By'],
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
    bottomFilters: ['Bedroom', 'Construction Status', 'Posted By'],
  },
  Rent: {
    selector: 'Residential Rent',
    placeholder: 'Search "Hyderabad"',
    showLocation: true,
    checkboxGroups: [
      ['Flats / Apartments', 'Independent Houses', 'Villas', 'Builder Floors', 'Studio Apartments'],
      ['Furnished Flats', 'Semi-Furnished Flats', 'Unfurnished Flats'],
    ],
    bottomFilters: ['Bedroom', 'Posted By', 'Furnishing'],
  },
  'New Launch': {
    selector: 'Residential',
    placeholder: 'Search "New launch projects in Gurgaon"',
    showLocation: true,
    checkboxGroups: [
      ['Apartments / Flats', 'Villas', 'Independent Houses', 'Builder Floors', 'Studio Apartments'],
      ['Luxury Homes', 'Residential Plots', 'Township Projects'],
    ],
    bottomFilters: ['Bedroom', 'Possession Status', 'Posted By'],
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
    bottomFilters: ['Area', 'Construction Status', 'Posted By'],
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
    bottomFilters: ['Area', 'Construction Status', 'Posted By'],
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

    if (menuLabel === 'For Buyers') {
      params.set('type', 'buy')
    } else if (menuLabel === 'For Tenants') {
      params.set('type', 'rent')
    } else if (menuLabel === 'For Dealers / Builders') {
      params.set('type', 'commercial')
    }

    if (categoryLabel === 'Buy a Home' || categoryLabel === 'Rent a Home') {
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

// ---------------------------------------------------------------------------
// Positioning hooks
//
// Every floating panel below is rendered through a React portal into
// document.body (so it can escape overflow/z-index issues), and its
// position is calculated from the trigger element's viewport-relative
// bounding box. Because portaled panels use `position: fixed`, they do NOT
// move when the page scrolls — but the *trigger button* does move (since it
// scrolls with the rest of the page). If we only calculate position once,
// on open, the panel visually "detaches" from its trigger the moment the
// user scrolls. These two hooks keep every dropdown's position locked to
// its trigger for as long as it stays open, on scroll and on resize.
// ---------------------------------------------------------------------------

// For a dropdown with a single, fixed trigger ref.
function useDropdownPosition(isOpen, triggerRef, getPosition) {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const getPositionRef = useRef(getPosition)
  getPositionRef.current = getPosition

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return undefined

    const update = () => {
      if (!triggerRef.current) return
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition(getPositionRef.current(rect))
    }

    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [isOpen, triggerRef])

  return position
}

// For a dropdown whose trigger changes at runtime (e.g. one Budget/Area
// popup anchored to whichever pill button opened it, or the mega menu
// anchored to whichever nav link opened it), keyed by name.
function useKeyedDropdownPosition(openKey, refsMap, getPosition) {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const getPositionRef = useRef(getPosition)
  getPositionRef.current = getPosition

  useEffect(() => {
    if (!openKey) return undefined
    const node = refsMap.current[openKey]
    if (!node) return undefined

    const update = () => {
      const el = refsMap.current[openKey]
      if (!el) return
      const rect = el.getBoundingClientRect()
      setPosition(getPositionRef.current(rect))
    }

    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [openKey, refsMap])

  return position
}

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

  const [openMegaMenu, setOpenMegaMenu] = useState(null)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const megaTriggerRefs = useRef({})
  const megaPanelRef = useRef(null)

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

  // Search city dropdown state
  const [isSearchCityDropdownOpen, setIsSearchCityDropdownOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState('')
  const searchCityDropdownRef = useRef(null)
  const searchCityTriggerRef = useRef(null)

  // User dropdown state
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const userDropdownRef = useRef(null)
  const userTriggerRef = useRef(null)

  // Neighbourhood dropdown state
  const [isNeighbourhoodDropdownOpen, setIsNeighbourhoodDropdownOpen] = useState(false)
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('')
  const neighbourhoodDropdownRef = useRef(null)
  const neighbourhoodTriggerRef = useRef(null)

  const NEIGHBOURHOODS = [
    'Connaught Place', 'Karol Bagh', 'Rajouri Garden', 'Dwarka', 'Vasant Kunj',
    'Saket', 'Greater Kailash', 'Defence Colony', 'Lajpat Nagar', 'South Extension',
    'Hauz Khas', 'Green Park', 'Mayur Vihar', 'Patparganj', 'Laxmi Nagar',
    'Preet Vihar', 'Nehru Place', 'Kalkaji', 'Okhla', 'Nehru Vihar'
  ]

  // Smart search state
  const [isSmartSearchEnabled, setIsSmartSearchEnabled] = useState(false)
  const [smartSearchQuery, setSmartSearchQuery] = useState('')

  // Advanced dropdown state
  const [isAdvancedDropdownOpen, setIsAdvancedDropdownOpen] = useState(false)
  const [advancedSelectedCategory, setAdvancedSelectedCategory] = useState(null)
  const advancedDropdownRef = useRef(null)
  const advancedTriggerRef = useRef(null)

  const [isBedroomDropdownOpen, setIsBedroomDropdownOpen] = useState(false)
  const bedroomDropdownRef = useRef(null)
  const bedroomTriggerRef = useRef(null)

  const [isBHKDropdownOpen, setIsBHKDropdownOpen] = useState(false)
  const bhkDropdownRef = useRef(null)
  const bhkTriggerRef = useRef(null)

  const [isToiletDropdownOpen, setIsToiletDropdownOpen] = useState(false)
  const toiletDropdownRef = useRef(null)
  const toiletTriggerRef = useRef(null)

  const [isAdvancedNeighbourhoodDropdownOpen, setIsAdvancedNeighbourhoodDropdownOpen] = useState(false)
  const advancedNeighbourhoodDropdownRef = useRef(null)
  const advancedNeighbourhoodTriggerRef = useRef(null)

  const [isConstructionStatusDropdownOpen, setIsConstructionStatusDropdownOpen] = useState(false)
  const constructionStatusDropdownRef = useRef(null)
  const constructionStatusTriggerRef = useRef(null)

  const [isBuiltUpAreaDropdownOpen, setIsBuiltUpAreaDropdownOpen] = useState(false)
  const builtUpAreaDropdownRef = useRef(null)
  const builtUpAreaTriggerRef = useRef(null)

  const [isSuperAreaDropdownOpen, setIsSuperAreaDropdownOpen] = useState(false)
  const superAreaDropdownRef = useRef(null)
  const superAreaTriggerRef = useRef(null)

  const [isParkingDropdownOpen, setIsParkingDropdownOpen] = useState(false)
  const parkingDropdownRef = useRef(null)
  const parkingTriggerRef = useRef(null)

  const [isFurnishingDropdownOpen, setIsFurnishingDropdownOpen] = useState(false)
  const furnishingDropdownRef = useRef(null)
  const furnishingTriggerRef = useRef(null)

  const [isFacingDropdownOpen, setIsFacingDropdownOpen] = useState(false)
  const facingDropdownRef = useRef(null)
  const facingTriggerRef = useRef(null)

  const [isAgeOfPropertyDropdownOpen, setIsAgeOfPropertyDropdownOpen] = useState(false)
  const ageOfPropertyDropdownRef = useRef(null)
  const ageOfPropertyTriggerRef = useRef(null)

  const [isPostedSinceDropdownOpen, setIsPostedSinceDropdownOpen] = useState(false)
  const postedSinceDropdownRef = useRef(null)
  const postedSinceTriggerRef = useRef(null)

  const [isMaintenanceChargesDropdownOpen, setIsMaintenanceChargesDropdownOpen] = useState(false)
  const maintenanceChargesDropdownRef = useRef(null)
  const maintenanceChargesTriggerRef = useRef(null)

  const ADVANCED_CATEGORIES = ['Flat Configuration', 'Parking', 'Furnishing', 'Facing', 'Super Area', 'Built Up Area', 'Construction Status', 'Age of Property', 'Maintenance Charges', 'Posted By', 'Posted Since', 'Neighbourhood']

  // Bottom filter dropdowns state
  const [openFilterDropdown, setOpenFilterDropdown] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState({
    Budget: { min: '', max: '', rangeMin: 0, rangeMax: 100 },
    Bedroom: [],
    BHK: [],
    Toilet: [],
    'Servant Room': [],
    'Pooja Room': [],
    'Construction Status': [],
    'Posted By': [],
    'Possession Status': [],
    Furnishing: [],
    Parking: [],
    Facing: [],
    'Age of Property': [],
    'Posted Since': [],
    'Maintenance Charges': [],
    Area: { min: '', max: '' },
    'Built Up Area': [],
    'Super Area': [],
    Neighbourhood: [],
  })
  const [pendingFilterValue, setPendingFilterValue] = useState(null)
  const filterDropdownRef = useRef(null)
  const filterTriggerRefs = useRef({})

  // Menu dropdown state
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false)
  const menuDropdownRef = useRef(null)
  const menuTriggerRef = useRef(null)

  const PROJECT_STATUS_OPTIONS = ['New Launch', 'Pre-Launch', 'Under Construction', 'Ready to Move']

  // Dynamic text animation for New Launch tab
  const [dynamicTabText, setDynamicTabText] = useState('New Launch')
  const [isAnimating, setIsAnimating] = useState(false)

  // ---------------------------------------------------------------------
  // Dropdown exclusivity helpers.
  //
  // Only one *top-level* floating menu should ever be open at once
  // (location picker, mega menu, user menu, hamburger menu, search-bar
  // filter panel, Advanced panel, Budget/Area popups). Opening any of
  // these now always closes every other one first, so you never end up
  // with two panels stacked on top of each other.
  //
  // Small dropdowns nested *inside* the Advanced panel (Bedroom, BHK,
  // Toilet, Neighbourhood) are left independent — closing them doesn't
  // need to tear down their parent panel.
  // ---------------------------------------------------------------------
  const closeAllDropdowns = () => {
    setIsLocationOpen(false)
    setIsSubCategoryDropdownOpen(false)
    setIsSearchCityDropdownOpen(false)
    setIsUserDropdownOpen(false)
    setIsNeighbourhoodDropdownOpen(false)
    setIsAdvancedDropdownOpen(false)
    setIsBedroomDropdownOpen(false)
    setIsBHKDropdownOpen(false)
    setIsToiletDropdownOpen(false)
    setIsAdvancedNeighbourhoodDropdownOpen(false)
    setIsConstructionStatusDropdownOpen(false)
    setIsBuiltUpAreaDropdownOpen(false)
    setIsSuperAreaDropdownOpen(false)
    setIsParkingDropdownOpen(false)
    setIsFurnishingDropdownOpen(false)
    setIsFacingDropdownOpen(false)
    setIsAgeOfPropertyDropdownOpen(false)
    setIsPostedSinceDropdownOpen(false)
    setIsMaintenanceChargesDropdownOpen(false)
    setIsMenuDropdownOpen(false)
    setOpenMegaMenu(null)
    setIsFilterOpen(false)
  }

  const openExclusive = (isOpen, setOpen) => {
    const next = !isOpen
    closeAllDropdowns()
    setOpen(next)
  }

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

  const toggleFilterPanel = () => openExclusive(isFilterOpen, setIsFilterOpen)

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

  // Switching tabs closes any open menus/panels — avoids a stale panel
  // (positioned for the previous tab's layout) staying visible.
  useEffect(() => {
    closeAllDropdowns()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  // Single outside-click / Escape handler for every floating panel.
  useEffect(() => {
    const dropdownRefPairs = [
      [locationRef, dropdownRef],
      [subCategoryTriggerRef, subCategoryDropdownRef],
      [searchCityTriggerRef, searchCityDropdownRef],
      [userTriggerRef, userDropdownRef],
      [neighbourhoodTriggerRef, neighbourhoodDropdownRef],
      [advancedTriggerRef, advancedDropdownRef],
      [bedroomTriggerRef, bedroomDropdownRef],
      [bhkTriggerRef, bhkDropdownRef],
      [toiletTriggerRef, toiletDropdownRef],
      [advancedNeighbourhoodTriggerRef, advancedNeighbourhoodDropdownRef],
      [constructionStatusTriggerRef, constructionStatusDropdownRef],
      [builtUpAreaTriggerRef, builtUpAreaDropdownRef],
      [superAreaTriggerRef, superAreaDropdownRef],
      [parkingTriggerRef, parkingDropdownRef],
      [furnishingTriggerRef, furnishingDropdownRef],
      [facingTriggerRef, facingDropdownRef],
      [ageOfPropertyTriggerRef, ageOfPropertyDropdownRef],
      [postedSinceTriggerRef, postedSinceDropdownRef],
      [maintenanceChargesTriggerRef, maintenanceChargesDropdownRef],
      [menuTriggerRef, menuDropdownRef],
    ]

    const onClickOutside = (e) => {
      const target = e.target

      const insideKnownPair = dropdownRefPairs.some(
        ([triggerRef, panelRef]) =>
          (triggerRef.current && triggerRef.current.contains(target)) ||
          (panelRef.current && panelRef.current.contains(target))
      )

      const insideFilterDropdown =
        (filterDropdownRef.current && filterDropdownRef.current.contains(target)) ||
        (openFilterDropdown && filterTriggerRefs.current[openFilterDropdown]?.contains(target))

      const insideMegaMenu =
        (megaPanelRef.current && megaPanelRef.current.contains(target)) ||
        (openMegaMenu && megaTriggerRefs.current[openMegaMenu]?.contains(target))

      // The search card contains the Budget / Advanced / category triggers
      // plus the inline expandable filter panel — clicks anywhere inside it
      // (e.g. a checkbox in the filter panel) should never be treated as
      // "outside".
      const insideSearchCard = searchCardRef.current && searchCardRef.current.contains(target)

      if (!insideKnownPair && !insideFilterDropdown && !insideMegaMenu && !insideSearchCard) {
        closeAllDropdowns()
      }
    }

    const onEscape = (e) => {
      if (e.key === 'Escape') closeAllDropdowns()
    }

    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [openFilterDropdown, openMegaMenu])

  // ---- Floating panel positions — recomputed on open, on scroll, and on resize ----
  const dropdownPosition = useDropdownPosition(isLocationOpen, locationRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.left,
  }))

  const subCategoryDropdownPosition = useDropdownPosition(isSubCategoryDropdownOpen, subCategoryTriggerRef, (rect) => ({
    top: rect.top,
    left: rect.right + 8,
  }))

  const searchCityDropdownPosition = useDropdownPosition(isSearchCityDropdownOpen, searchCityTriggerRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.left,
  }))

  const userDropdownPosition = useDropdownPosition(isUserDropdownOpen, userTriggerRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.right - 200,
  }))

  const neighbourhoodDropdownPosition = useDropdownPosition(isNeighbourhoodDropdownOpen, neighbourhoodTriggerRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.left,
  }))

  // Close Neighbourhood dropdown on page scroll
  useEffect(() => {
    if (!isNeighbourhoodDropdownOpen) return

    const handleScroll = () => {
      setIsNeighbourhoodDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isNeighbourhoodDropdownOpen])

  const advancedDropdownPosition = useDropdownPosition(isAdvancedDropdownOpen, advancedTriggerRef, (rect) => {
    const dropdownWidth = 1000
    const viewportWidth = window.innerWidth
    let left = rect.left
    if (left + dropdownWidth > viewportWidth - 16) left = viewportWidth - dropdownWidth - 16
    if (left < 16) left = 16
    return { top: rect.bottom + 8, left }
  })

  const bedroomDropdownPosition = useDropdownPosition(isBedroomDropdownOpen, bedroomTriggerRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.left,
  }))

  // Close Bedroom dropdown on page scroll
  useEffect(() => {
    if (!isBedroomDropdownOpen) return

    const handleScroll = () => {
      setIsBedroomDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isBedroomDropdownOpen])

  const bhkDropdownPosition = useDropdownPosition(isBHKDropdownOpen, bhkTriggerRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.left,
  }))

  // Close BHK dropdown on page scroll
  useEffect(() => {
    if (!isBHKDropdownOpen) return

    const handleScroll = () => {
      setIsBHKDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isBHKDropdownOpen])

  const toiletDropdownPosition = useDropdownPosition(isToiletDropdownOpen, toiletTriggerRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.left,
  }))

  // Close Toilet dropdown on page scroll
  useEffect(() => {
    if (!isToiletDropdownOpen) return

    const handleScroll = () => {
      setIsToiletDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isToiletDropdownOpen])

  const advancedNeighbourhoodDropdownPosition = useDropdownPosition(
    isAdvancedNeighbourhoodDropdownOpen,
    advancedNeighbourhoodTriggerRef,
    (rect) => ({ top: rect.bottom + 8, left: rect.left - 100 })
  )

  const constructionStatusDropdownPosition = useDropdownPosition(
    isConstructionStatusDropdownOpen,
    constructionStatusTriggerRef,
    (rect) => ({ top: rect.bottom + 8, left: rect.left })
  )

  const builtUpAreaDropdownPosition = useDropdownPosition(
    isBuiltUpAreaDropdownOpen,
    builtUpAreaTriggerRef,
    (rect) => ({ top: rect.bottom + 8, left: rect.left })
  )

  const superAreaDropdownPosition = useDropdownPosition(
    isSuperAreaDropdownOpen,
    superAreaTriggerRef,
    (rect) => ({ top: rect.bottom + 8, left: rect.left })
  )

  // Close Construction Status dropdown on page scroll
  useEffect(() => {
    if (!isConstructionStatusDropdownOpen) return

    const handleScroll = () => {
      setIsConstructionStatusDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isConstructionStatusDropdownOpen])

  // Close Built Up Area dropdown on page scroll
  useEffect(() => {
    if (!isBuiltUpAreaDropdownOpen) return

    const handleScroll = (e) => {
      // Don't close if scrolling inside the dropdown itself
      if (builtUpAreaDropdownRef.current && builtUpAreaDropdownRef.current.contains(e.target)) {
        return
      }
      setIsBuiltUpAreaDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isBuiltUpAreaDropdownOpen])

  // Close Super Area dropdown on page scroll
  useEffect(() => {
    if (!isSuperAreaDropdownOpen) return

    const handleScroll = (e) => {
      // Don't close if scrolling inside the dropdown itself
      if (superAreaDropdownRef.current && superAreaDropdownRef.current.contains(e.target)) {
        return
      }
      setIsSuperAreaDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isSuperAreaDropdownOpen])

  // Close Advanced Neighbourhood dropdown on page scroll
  useEffect(() => {
    if (!isAdvancedNeighbourhoodDropdownOpen) return

    const handleScroll = (e) => {
      // Don't close if scrolling inside the dropdown itself
      if (advancedNeighbourhoodDropdownRef.current && advancedNeighbourhoodDropdownRef.current.contains(e.target)) {
        return
      }
      setIsAdvancedNeighbourhoodDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isAdvancedNeighbourhoodDropdownOpen])

  const parkingDropdownPosition = useDropdownPosition(isParkingDropdownOpen, parkingTriggerRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.left,
  }))

  // Close Parking dropdown on page scroll
  useEffect(() => {
    if (!isParkingDropdownOpen) return

    const handleScroll = (e) => {
      // Don't close if scrolling inside the dropdown itself
      if (parkingDropdownRef.current && parkingDropdownRef.current.contains(e.target)) {
        return
      }
      setIsParkingDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isParkingDropdownOpen])

  const furnishingDropdownPosition = useDropdownPosition(isFurnishingDropdownOpen, furnishingTriggerRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.left,
  }))

  // Close Furnishing dropdown on page scroll
  useEffect(() => {
    if (!isFurnishingDropdownOpen) return

    const handleScroll = (e) => {
      // Don't close if scrolling inside the dropdown itself
      if (furnishingDropdownRef.current && furnishingDropdownRef.current.contains(e.target)) {
        return
      }
      setIsFurnishingDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isFurnishingDropdownOpen])

  const facingDropdownPosition = useDropdownPosition(isFacingDropdownOpen, facingTriggerRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.left,
  }))

  // Close Facing dropdown on page scroll
  useEffect(() => {
    if (!isFacingDropdownOpen) return

    const handleScroll = (e) => {
      // Don't close if scrolling inside the dropdown itself
      if (facingDropdownRef.current && facingDropdownRef.current.contains(e.target)) {
        return
      }
      setIsFacingDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isFacingDropdownOpen])

  const ageOfPropertyDropdownPosition = useDropdownPosition(isAgeOfPropertyDropdownOpen, ageOfPropertyTriggerRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.left,
  }))

  // Close Age of Property dropdown on page scroll
  useEffect(() => {
    if (!isAgeOfPropertyDropdownOpen) return

    const handleScroll = (e) => {
      // Don't close if scrolling inside the dropdown itself
      if (ageOfPropertyDropdownRef.current && ageOfPropertyDropdownRef.current.contains(e.target)) {
        return
      }
      setIsAgeOfPropertyDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isAgeOfPropertyDropdownOpen])

  const postedSinceDropdownPosition = useDropdownPosition(isPostedSinceDropdownOpen, postedSinceTriggerRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.left,
  }))

  // Close Posted Since dropdown on page scroll
  useEffect(() => {
    if (!isPostedSinceDropdownOpen) return

    const handleScroll = (e) => {
      // Don't close if scrolling inside the dropdown itself
      if (postedSinceDropdownRef.current && postedSinceDropdownRef.current.contains(e.target)) {
        return
      }
      setIsPostedSinceDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isPostedSinceDropdownOpen])

  const maintenanceChargesDropdownPosition = useDropdownPosition(isMaintenanceChargesDropdownOpen, maintenanceChargesTriggerRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.left,
  }))

  // Close Maintenance Charges dropdown on page scroll
  useEffect(() => {
    if (!isMaintenanceChargesDropdownOpen) return

    const handleScroll = (e) => {
      // Don't close if scrolling inside the dropdown itself
      if (maintenanceChargesDropdownRef.current && maintenanceChargesDropdownRef.current.contains(e.target)) {
        return
      }
      setIsMaintenanceChargesDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isMaintenanceChargesDropdownOpen])

  const filterDropdownPosition = useKeyedDropdownPosition(openFilterDropdown, filterTriggerRefs, (rect) => ({
    top: rect.bottom + 8,
    left: rect.left,
  }))

  const menuDropdownPosition = useDropdownPosition(isMenuDropdownOpen, menuTriggerRef, (rect) => ({
    top: rect.bottom + 8,
    left: rect.right - 160,
  }))

  const megaPosition = useKeyedDropdownPosition(openMegaMenu, megaTriggerRefs, (rect) => {
    const panelWidth = 1100
    const left = Math.max(16, (window.innerWidth - panelWidth) / 2)
    return { top: rect.bottom + 12, left }
  })

  // Filter dropdown handlers
  const openFilterPanel = (f) => {
    const next = openFilterDropdown === f ? null : f
    closeAllDropdowns()
    setOpenFilterDropdown(next)
    if (next) setPendingFilterValue(selectedFilters[f])
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
    const next = openMegaMenu === label ? null : label
    closeAllDropdowns()
    setActiveCategoryIndex(0)
    setOpenMegaMenu(next)
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
    closeAllDropdowns()
    const params = new URLSearchParams()

    if (activeTab === 'Buy') {
      params.set('type', 'buy')
    } else if (activeTab === 'Rent') {
      params.set('type', 'rent')
    } else if (activeTab === 'Commercial') {
      params.set('type', 'commercial')
    } else if (activeTab === 'New Launch') {
      params.set('type', 'buy')
    }

    if (query.trim()) {
      params.set('q', query.trim())
    }

    if (selectedCity) {
      params.set('city', selectedCity)
    }

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
          onClick={closeAllDropdowns}
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
            <div className="flex items-center justify-between h-16 relative">
              {/* Logo + location */}
              <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center">
                  <img src={assets.logo2} alt="Nestnbest" className="h-16 w-auto" />
                </Link>

                <div className="relative" ref={locationRef}>
                  <button
                    onClick={() => openExclusive(isLocationOpen, setIsLocationOpen)}
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
                        className="fixed w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 pb-5"
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

                          <div className="grid pb-10 grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
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

              {/* Centered nav links */}
              <div className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
                {NAV_LINKS.map((link) => {
                  const hasMenu = !!MEGA_MENUS[link.label]
                  return (
                    <div key={link.label} className="relative" ref={hasMenu ? (el) => (megaTriggerRefs.current[link.label] = el) : null}>
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
                    </div>
                  )
                })}
              </div>

              {/* Right-side actions */}
              <div className="hidden lg:flex items-center gap-7">
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
                    onClick={() => openExclusive(isUserDropdownOpen, setIsUserDropdownOpen)}
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
                            Sign In as User
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
                    onClick={() => openExclusive(isMenuDropdownOpen, setIsMenuDropdownOpen)}
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
                          <Link to="/insight" onClick={() => setIsMenuDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                            Insights
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white leading-none">
                              NEW
                            </span>
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
              ) : activeTab === 'Buy' || activeTab === 'Rent' || activeTab === 'New Launch' ? (
                <button
                  type="button"
                  onClick={toggleFilterPanel}
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
                          closeAllDropdowns()
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

              <div className="relative" ref={(el) => (filterTriggerRefs.current['Budget'] = el)}>
                <button
                  type="button"
                  onClick={() => openFilterPanel('Budget')}
                  className="flex items-center gap-1.5 px-4 py-3 sm:border-r border-slate-200 text-sm font-semibold flex-shrink-0 hover:text-[#1E88E5] transition-colors duration-150"
                  style={{ color: NAVY }}
                >
                  {getFilterLabel('Budget') || 'Budget'}
                  <ChevronDown
                    size={16}
                    className="text-slate-400 transition-transform duration-200"
                    style={{ transform: openFilterDropdown === 'Budget' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {openFilterDropdown === 'Budget' && createPortal(
                  <div
                    ref={filterDropdownRef}
                    className="fixed w-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                    style={{ top: `${filterDropdownPosition.top}px`, left: `${filterDropdownPosition.left}px` }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                      <h4 className="text-sm font-bold" style={{ color: NAVY }}>Budget</h4>
                      <button type="button" onClick={() => setOpenFilterDropdown(null)} className="text-slate-400 hover:text-slate-600">
                        <X size={16} />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-5 max-h-[440px] overflow-y-auto">
                      {/* Get dynamic budget options based on category and tab */}
                      {(() => {
                        const currentBudgetOptions = getBudgetOptions(selectedCategory, activeTab)
                        return (
                          <>
                            {/* Selected range readout */}
                            <div className="flex items-center justify-between gap-2 mb-6">
                              <div className="flex-1 px-3 py-2 rounded-xl text-center" style={{ backgroundColor: 'rgba(30,136,229,0.06)', border: '1px solid rgba(30,136,229,0.15)' }}>
                                <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-0.5">Min</div>
                                <div className="text-sm font-bold" style={{ color: BLUE }}>
                                  {currentBudgetOptions[Math.round(((pendingFilterValue?.rangeMin ?? 0) / 100) * (currentBudgetOptions.length - 1))]}
                                </div>
                              </div>
                              <span className="text-slate-300 font-semibold text-sm">—</span>
                              <div className="flex-1 px-3 py-2 rounded-xl text-center" style={{ backgroundColor: 'rgba(30,136,229,0.06)', border: '1px solid rgba(30,136,229,0.15)' }}>
                                <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-0.5">Max</div>
                                <div className="text-sm font-bold" style={{ color: BLUE }}>
                                  {currentBudgetOptions[Math.round(((pendingFilterValue?.rangeMax ?? 100) / 100) * (currentBudgetOptions.length - 1))]}
                                </div>
                              </div>
                            </div>

                            {/* Dual-thumb range slider */}
                            <div className="relative h-1.5 mt-2 mb-9 mx-1">
                              <div className="absolute inset-0 rounded-full" style={{ backgroundColor: '#E2E8F0' }} />
                              <div
                                className="absolute h-full rounded-full"
                                style={{
                                  backgroundColor: BLUE,
                                  left: `${pendingFilterValue?.rangeMin ?? 0}%`,
                                  right: `${100 - (pendingFilterValue?.rangeMax ?? 100)}%`,
                                }}
                              />
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={pendingFilterValue?.rangeMin ?? 0}
                                onChange={(e) => {
                                  const newVal = Math.min(parseInt(e.target.value, 10), (pendingFilterValue?.rangeMax ?? 100) - 2)
                                  setPendingFilterValue((prev) => ({
                                    ...(prev || {}),
                                    rangeMin: newVal,
                                    rangeMax: prev?.rangeMax ?? 100,
                                    min: currentBudgetOptions[Math.round((newVal / 100) * (currentBudgetOptions.length - 1))] || '',
                                    max: prev?.max ?? '',
                                  }))
                                }}
                                className="budget-range-thumb absolute top-1/2 left-0 w-full h-5 -translate-y-1/2 appearance-none bg-transparent"
                                style={{ zIndex: (pendingFilterValue?.rangeMin ?? 0) > 92 ? 5 : 3 }}
                              />
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={pendingFilterValue?.rangeMax ?? 100}
                                onChange={(e) => {
                                  const newVal = Math.max(parseInt(e.target.value, 10), (pendingFilterValue?.rangeMin ?? 0) + 2)
                                  setPendingFilterValue((prev) => ({
                                    ...(prev || {}),
                                    rangeMax: newVal,
                                    rangeMin: prev?.rangeMin ?? 0,
                                    max: currentBudgetOptions[Math.round((newVal / 100) * (currentBudgetOptions.length - 1))] || '',
                                    min: prev?.min ?? '',
                                  }))
                                }}
                                className="budget-range-thumb absolute top-1/2 left-0 w-full h-5 -translate-y-1/2 appearance-none bg-transparent"
                                style={{ zIndex: 4 }}
                              />
                              {/* Tick labels under the track */}
                              <div className="absolute left-0 right-0 top-4 flex justify-between text-[9px] text-slate-300 font-medium">
                                <span>{currentBudgetOptions[0]}</span>
                                <span>{currentBudgetOptions[currentBudgetOptions.length - 1]}</span>
                              </div>
                            </div>

                            {/* Manual min/max dropdowns, kept in sync with the slider */}
                            <div className="flex items-center gap-3 mb-5">
                              <div className="flex-1">
                                <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Min</label>
                                <select
                                  value={pendingFilterValue?.min || ''}
                                  onChange={(e) => {
                                    const val = e.target.value
                                    const idx = currentBudgetOptions.indexOf(val)
                                    setPendingFilterValue((prev) => ({
                                      ...(prev || {}),
                                      min: val,
                                      rangeMin: idx >= 0 ? Math.round((idx / (currentBudgetOptions.length - 1)) * 100) : 0,
                                    }))
                                  }}
                                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5]"
                                >
                                  <option value="">No Min</option>
                                  {currentBudgetOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                              </div>
                              <div className="flex-1">
                                <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Max</label>
                                <select
                                  value={pendingFilterValue?.max || ''}
                                  onChange={(e) => {
                                    const val = e.target.value
                                    const idx = currentBudgetOptions.indexOf(val)
                                    setPendingFilterValue((prev) => ({
                                      ...(prev || {}),
                                      max: val,
                                      rangeMax: idx >= 0 ? Math.round((idx / (currentBudgetOptions.length - 1)) * 100) : 100,
                                    }))
                                  }}
                                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5]"
                                >
                                  <option value="">No Max</option>
                                  {currentBudgetOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                              </div>
                            </div>

                            {/* Quick presets */}
                            <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-2 block">Quick Select</label>
                            <div className="grid grid-cols-2 gap-2">
                              {currentBudgetOptions.slice(0, 6).map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => {
                                    const idx = currentBudgetOptions.indexOf(opt)
                                    setPendingFilterValue({
                                      min: '',
                                      max: opt,
                                      rangeMin: 0,
                                      rangeMax: Math.round((idx / (currentBudgetOptions.length - 1)) * 100),
                                    })
                                  }}
                                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 hover:border-[#1E88E5] hover:bg-[rgba(30,136,229,0.04)] transition-all"
                                  style={{ color: NAVY }}
                                >
                                  Under {opt}
                                </button>
                              ))}
                            </div>
                          </>
                        )
                      })()}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-3 px-5 py-4 border-t border-slate-100 bg-slate-50">
                      <button
                        type="button"
                        onClick={() => clearFilter('Budget')}
                        className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wide rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors"
                        style={{ color: '#6B7280' }}
                      >
                        Clear
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFilter('Budget')}
                        className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wide rounded-lg text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: INK }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>,
                  document.body
                )}
              </div>

              <div className="relative" ref={searchCityTriggerRef}>
                <button
                  type="button"
                  onClick={() => openExclusive(isSearchCityDropdownOpen, setIsSearchCityDropdownOpen)}
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
                      className="fixed w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40"
                      style={{ top: `${searchCityDropdownPosition.top}px`, left: `${searchCityDropdownPosition.left}px`, maxHeight: '400px' }}
                    >
                      <div className="p-4 pb-4">
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

                        <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1 pb-6">
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

              <div className="flex items-center gap-3 flex-1 lex-1 px-4 sm:px-5">
                <Search size={18} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter locality"
                  className="w-full bg-transparent text-sm sm:text-base text-slate-700 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="relative" ref={advancedTriggerRef}>
                <button
                  type="button"
                  onClick={() => {
                    openExclusive(isAdvancedDropdownOpen, setIsAdvancedDropdownOpen)
                    setAdvancedSelectedCategory(null)
                  }}
                  className="flex items-center gap-1.5 px-4 py-3 sm:border-r border-slate-200 text-sm font-semibold flex-shrink-0 hover:text-[#1E88E5] transition-colors duration-150"
                  style={{ color: NAVY }}
                >
                  Advanced
                  <ChevronDown
                    size={16}
                    className="text-slate-400 transition-transform duration-200"
                    style={{ transform: isAdvancedDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {isAdvancedDropdownOpen &&
                  createPortal(
                    <div
                      ref={advancedDropdownRef}
                      className="fixed w-[1000px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                      style={{ top: `${advancedDropdownPosition.top}px`, left: `${advancedDropdownPosition.left}px` }}
                    >
                      <div className="p-5">
                        <h4 className="text-sm font-bold mb-4" style={{ color: NAVY }}>Advanced Filters</h4>
                        <div className="grid grid-cols-6 gap-4">
                          {/* Flat Configuration */}
                          <div className="relative" ref={bedroomTriggerRef}>
                            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Flat Configuration</label>
                            <button
                              type="button"
                              onClick={() => setIsBedroomDropdownOpen((open) => !open)}
                              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                            >
                              <span>{selectedFilters.BHK?.[0] || selectedFilters.Toilet?.[0] || selectedFilters['Servant Room']?.[0] || selectedFilters['Pooja Room']?.[0] ? 'Selected' : 'Select'}</span>
                              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isBedroomDropdownOpen ? 'rotate(180deg)' : ''}`} />
                            </button>

                            {isBedroomDropdownOpen &&
                              createPortal(
                                <div
                                  ref={bedroomDropdownRef}
                                  className="fixed w-[500px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                                  style={{ top: `${bedroomDropdownPosition.top}px`, left: `${bedroomDropdownPosition.left}px` }}
                                >
                                  <div className="p-5">
                                    <h4 className="text-sm font-bold mb-4" style={{ color: NAVY }}>Flat Configuration Options</h4>
                                    <div className="grid grid-cols-4 gap-4">
                                      {/* BHK */}
                                      <div className="relative" ref={bhkTriggerRef}>
                                        <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">BHK</label>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setIsBHKDropdownOpen((open) => !open)
                                          }}
                                          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                                        >
                                          <span>{selectedFilters.BHK?.length ? `${selectedFilters.BHK.length} selected` : 'Select'}</span>
                                          <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isBHKDropdownOpen ? 'rotate(180deg)' : ''}`} />
                                        </button>

                                        {isBHKDropdownOpen &&
                                          createPortal(
                                            <div
                                              ref={bhkDropdownRef}
                                              className="fixed w-[200px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                                              style={{ top: `${bhkDropdownPosition.top}px`, left: `${bhkDropdownPosition.left}px` }}
                                            >
                                              <div className="p-3 space-y-1">
                                                {[1, 2, 3, 4, 5, '5+'].map((opt) => (
                                                  <div key={opt} className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-slate-50 rounded-lg" onMouseDown={(e) => e.stopPropagation()}>
                                                    <input
                                                      type="checkbox"
                                                      checked={selectedFilters.BHK?.includes(opt.toString())}
                                                      onChange={(e) => {
                                                        setSelectedFilters(prev => ({
                                                          ...prev,
                                                          BHK: e.target.checked
                                                            ? [...(prev.BHK || []), opt.toString()]
                                                            : (prev.BHK || []).filter(item => item !== opt.toString())
                                                        }))
                                                      }}
                                                      onMouseDown={(e) => e.stopPropagation()}
                                                      className="w-4 h-4 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5]"
                                                    />
                                                    <span className="text-sm text-slate-700">{typeof opt === 'number' ? `${opt} BHK` : opt}</span>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>,
                                            document.body
                                          )}
                                      </div>

                                      {/* Toilet */}
                                      <div className="relative" ref={toiletTriggerRef}>
                                        <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Toilet</label>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setIsToiletDropdownOpen((open) => !open)
                                          }}
                                          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                                        >
                                          <span>{selectedFilters.Toilet?.length ? `${selectedFilters.Toilet.length} selected` : 'Select'}</span>
                                          <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isToiletDropdownOpen ? 'rotate(180deg)' : ''}`} />
                                        </button>

                                        {isToiletDropdownOpen &&
                                          createPortal(
                                            <div
                                              ref={toiletDropdownRef}
                                              className="fixed w-[200px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                                              style={{ top: `${toiletDropdownPosition.top}px`, left: `${toiletDropdownPosition.left}px` }}
                                            >
                                              <div className="p-3 space-y-1">
                                                {[1, 2, 3, 4, 5, '5+'].map((opt) => (
                                                  <div key={opt} className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-slate-50 rounded-lg" onMouseDown={(e) => e.stopPropagation()}>
                                                    <input
                                                      type="checkbox"
                                                      checked={selectedFilters.Toilet?.includes(opt.toString())}
                                                      onChange={(e) => {
                                                        setSelectedFilters(prev => ({
                                                          ...prev,
                                                          Toilet: e.target.checked
                                                            ? [...(prev.Toilet || []), opt.toString()]
                                                            : (prev.Toilet || []).filter(item => item !== opt.toString())
                                                        }))
                                                      }}
                                                      onMouseDown={(e) => e.stopPropagation()}
                                                      className="w-4 h-4 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5]"
                                                    />
                                                    <span className="text-sm text-slate-700">{typeof opt === 'number' ? `${opt} Toilet` : opt}</span>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>,
                                            document.body
                                          )}
                                      </div>

                                      {/* Servant Room */}
                                      <div className="relative">
                                        <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Servant Room</label>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedFilters(prev => ({
                                              ...prev,
                                              'Servant Room': prev['Servant Room']?.includes('Yes') ? [] : ['Yes']
                                            }))
                                          }}
                                          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                                        >
                                          <span>{selectedFilters['Servant Room']?.includes('Yes') ? 'Yes' : 'Select'}</span>
                                          <ChevronDown size={14} className="text-slate-400" />
                                        </button>
                                      </div>

                                      {/* Pooja Room */}
                                      <div className="relative">
                                        <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Pooja Room</label>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedFilters(prev => ({
                                              ...prev,
                                              'Pooja Room': prev['Pooja Room']?.includes('Yes') ? [] : ['Yes']
                                            }))
                                          }}
                                          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                                        >
                                          <span>{selectedFilters['Pooja Room']?.includes('Yes') ? 'Yes' : 'Select'}</span>
                                          <ChevronDown size={14} className="text-slate-400" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>,
                                document.body
                              )}
                          </div>

                          {/* Parking */}
                          <div className="relative" ref={parkingTriggerRef}>
                            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Parking</label>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsParkingDropdownOpen((open) => !open)
                              }}
                              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                            >
                              <span>{selectedFilters.Parking?.length ? `${selectedFilters.Parking.length} selected` : 'Select'}</span>
                              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isParkingDropdownOpen ? 'rotate(180deg)' : ''}`} />
                            </button>

                            {isParkingDropdownOpen &&
                              createPortal(
                                <div
                                  ref={parkingDropdownRef}
                                  className="fixed w-[250px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                                  style={{ top: `${parkingDropdownPosition.top}px`, left: `${parkingDropdownPosition.left}px` }}
                                >
                                  <div className="p-3 space-y-1 max-h-[300px] overflow-y-auto">
                                    {CHECKBOX_FILTER_OPTIONS.Parking.map((opt) => (
                                      <div key={opt} className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-slate-50 rounded-lg" onMouseDown={(e) => e.stopPropagation()}>
                                        <input
                                          type="checkbox"
                                          checked={selectedFilters.Parking?.includes(opt)}
                                          onChange={(e) => {
                                            setSelectedFilters(prev => ({
                                              ...prev,
                                              Parking: e.target.checked
                                                ? [...(prev.Parking || []), opt]
                                                : (prev.Parking || []).filter(item => item !== opt)
                                            }))
                                          }}
                                          onMouseDown={(e) => e.stopPropagation()}
                                          className="w-4 h-4 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5]"
                                        />
                                        <span className="text-sm text-slate-700">{opt}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>,
                                document.body
                              )}
                          </div>

                          {/* Furnishing */}
                          <div className="relative" ref={furnishingTriggerRef}>
                            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Furnishing</label>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsFurnishingDropdownOpen((open) => !open)
                              }}
                              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                            >
                              <span>{selectedFilters.Furnishing?.length ? `${selectedFilters.Furnishing.length} selected` : 'Select'}</span>
                              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isFurnishingDropdownOpen ? 'rotate(180deg)' : ''}`} />
                            </button>

                            {isFurnishingDropdownOpen &&
                              createPortal(
                                <div
                                  ref={furnishingDropdownRef}
                                  className="fixed w-[250px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                                  style={{ top: `${furnishingDropdownPosition.top}px`, left: `${furnishingDropdownPosition.left}px` }}
                                >
                                  <div className="p-3 space-y-1 max-h-[300px] overflow-y-auto">
                                    {CHECKBOX_FILTER_OPTIONS.Furnishing.map((opt) => (
                                      <div key={opt} className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-slate-50 rounded-lg" onMouseDown={(e) => e.stopPropagation()}>
                                        <input
                                          type="checkbox"
                                          checked={selectedFilters.Furnishing?.includes(opt)}
                                          onChange={(e) => {
                                            setSelectedFilters(prev => ({
                                              ...prev,
                                              Furnishing: e.target.checked
                                                ? [...(prev.Furnishing || []), opt]
                                                : (prev.Furnishing || []).filter(item => item !== opt)
                                            }))
                                          }}
                                          onMouseDown={(e) => e.stopPropagation()}
                                          className="w-4 h-4 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5]"
                                        />
                                        <span className="text-sm text-slate-700">{opt}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>,
                                document.body
                              )}
                          </div>

                          {/* Facing */}
                          <div className="relative" ref={facingTriggerRef}>
                            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Facing</label>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsFacingDropdownOpen((open) => !open)
                              }}
                              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                            >
                              <span>{selectedFilters.Facing?.length ? `${selectedFilters.Facing.length} selected` : 'Select'}</span>
                              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isFacingDropdownOpen ? 'rotate(180deg)' : ''}`} />
                            </button>

                            {isFacingDropdownOpen &&
                              createPortal(
                                <div
                                  ref={facingDropdownRef}
                                  className="fixed w-[250px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                                  style={{ top: `${facingDropdownPosition.top}px`, left: `${facingDropdownPosition.left}px` }}
                                >
                                  <div className="p-3 space-y-1 max-h-[300px] overflow-y-auto">
                                    {CHECKBOX_FILTER_OPTIONS.Facing.map((opt) => (
                                      <div key={opt} className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-slate-50 rounded-lg" onMouseDown={(e) => e.stopPropagation()}>
                                        <input
                                          type="checkbox"
                                          checked={selectedFilters.Facing?.includes(opt)}
                                          onChange={(e) => {
                                            setSelectedFilters(prev => ({
                                              ...prev,
                                              Facing: e.target.checked
                                                ? [...(prev.Facing || []), opt]
                                                : (prev.Facing || []).filter(item => item !== opt)
                                            }))
                                          }}
                                          onMouseDown={(e) => e.stopPropagation()}
                                          className="w-4 h-4 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5]"
                                        />
                                        <span className="text-sm text-slate-700">{opt}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>,
                                document.body
                              )}
                          </div>

                          {/* Super Area */}
                          <div className="relative" ref={superAreaTriggerRef}>
                            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Super Area</label>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsSuperAreaDropdownOpen((open) => !open)
                              }}
                              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                            >
                              <span>{selectedFilters['Super Area']?.length ? `${selectedFilters['Super Area'].length} selected` : 'Select'}</span>
                              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isSuperAreaDropdownOpen ? 'rotate(180deg)' : ''}`} />
                            </button>

                            {isSuperAreaDropdownOpen &&
                              createPortal(
                                <div
                                  ref={superAreaDropdownRef}
                                  className="fixed w-[250px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                                  style={{ top: `${superAreaDropdownPosition.top}px`, left: `${superAreaDropdownPosition.left}px` }}
                                >
                                  <div className="p-3 space-y-1 max-h-[300px] overflow-y-auto">
                                    {BUILT_UP_AREA_OPTIONS.map((opt) => (
                                      <div key={opt} className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-slate-50 rounded-lg" onMouseDown={(e) => e.stopPropagation()}>
                                        <input
                                          type="checkbox"
                                          checked={selectedFilters['Super Area']?.includes(opt)}
                                          onChange={(e) => {
                                            setSelectedFilters(prev => ({
                                              ...prev,
                                              'Super Area': e.target.checked
                                                ? [...(prev['Super Area'] || []), opt]
                                                : prev['Super Area'].filter(s => s !== opt)
                                            }))
                                          }}
                                          className="w-4 h-4 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5] focus:ring-offset-0"
                                        />
                                        <span className="text-sm text-slate-700">{opt}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>,
                                document.body
                              )}
                          </div>

                          {/* Built Up Area */}
                          <div className="relative" ref={builtUpAreaTriggerRef}>
                            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Built Up Area</label>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsBuiltUpAreaDropdownOpen((open) => !open)
                              }}
                              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                            >
                              <span>{selectedFilters['Built Up Area']?.length ? `${selectedFilters['Built Up Area'].length} selected` : 'Select'}</span>
                              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isBuiltUpAreaDropdownOpen ? 'rotate(180deg)' : ''}`} />
                            </button>

                            {isBuiltUpAreaDropdownOpen &&
                              createPortal(
                                <div
                                  ref={builtUpAreaDropdownRef}
                                  className="fixed w-[250px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                                  style={{ top: `${builtUpAreaDropdownPosition.top}px`, left: `${builtUpAreaDropdownPosition.left}px` }}
                                >
                                  <div className="p-3 space-y-1 max-h-[300px] overflow-y-auto">
                                    {BUILT_UP_AREA_OPTIONS.map((opt) => (
                                      <div key={opt} className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-slate-50 rounded-lg" onMouseDown={(e) => e.stopPropagation()}>
                                        <input
                                          type="checkbox"
                                          checked={selectedFilters['Built Up Area']?.includes(opt)}
                                          onChange={(e) => {
                                            setSelectedFilters(prev => ({
                                              ...prev,
                                              'Built Up Area': e.target.checked
                                                ? [...(prev['Built Up Area'] || []), opt]
                                                : prev['Built Up Area'].filter(s => s !== opt)
                                            }))
                                          }}
                                          className="w-4 h-4 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5] focus:ring-offset-0"
                                        />
                                        <span className="text-sm text-slate-700">{opt}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>,
                                document.body
                              )}
                          </div>

                          {/* Construction Status */}
                          <div className="relative" ref={constructionStatusTriggerRef}>
                            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Construction Status</label>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsConstructionStatusDropdownOpen((open) => !open)
                              }}
                              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                            >
                              <span>{selectedFilters['Construction Status']?.length ? `${selectedFilters['Construction Status'].length} selected` : 'Select'}</span>
                              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isConstructionStatusDropdownOpen ? 'rotate(180deg)' : ''}`} />
                            </button>

                            {isConstructionStatusDropdownOpen &&
                              createPortal(
                                <div
                                  ref={constructionStatusDropdownRef}
                                  className="fixed w-[280px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                                  style={{ top: `${constructionStatusDropdownPosition.top}px`, left: `${constructionStatusDropdownPosition.left}px` }}
                                >
                                  <div className="p-3 space-y-1 max-h-[340px] overflow-y-auto">
                                    {getConstructionStatusOptions(activeTab).map((opt) => {
                                      const info = CONSTRUCTION_STATUS_INFO[opt]
                                      return (
                                        <div
                                          key={opt}
                                          className="group rounded-lg"
                                          onMouseDown={(e) => e.stopPropagation()}
                                        >
                                          <div className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-slate-50 rounded-lg">
                                            <input
                                              type="checkbox"
                                              checked={selectedFilters['Construction Status']?.includes(opt)}
                                              onChange={(e) => {
                                                setSelectedFilters(prev => ({
                                                  ...prev,
                                                  'Construction Status': e.target.checked
                                                    ? [...(prev['Construction Status'] || []), opt]
                                                    : prev['Construction Status'].filter(s => s !== opt)
                                                }))
                                              }}
                                              className="w-4 h-4 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5] focus:ring-offset-0"
                                            />
                                            <span className="text-sm text-slate-700 flex-1">{opt}</span>
                                            {info && (
                                              <Info
                                                size={13}
                                                className="text-slate-300 group-hover:text-[#1E88E5] transition-colors duration-150 flex-shrink-0"
                                              />
                                            )}
                                          </div>

                                          {info && (
                                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-200 ease-out">
                                              <div className="overflow-hidden">
                                                <p className="text-[11px] leading-relaxed text-slate-500 px-2 pb-2.5 pt-0.5">
                                                  {info}
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>,
                                document.body
                              )}
                          </div>

                          {/* Age of Property */}
                          <div className="relative" ref={ageOfPropertyTriggerRef}>
                            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Age of Property</label>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsAgeOfPropertyDropdownOpen((open) => !open)
                              }}
                              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                            >
                              <span>{selectedFilters['Age of Property']?.length ? `${selectedFilters['Age of Property'].length} selected` : 'Select'}</span>
                              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isAgeOfPropertyDropdownOpen ? 'rotate(180deg)' : ''}`} />
                            </button>

                            {isAgeOfPropertyDropdownOpen &&
                              createPortal(
                                <div
                                  ref={ageOfPropertyDropdownRef}
                                  className="fixed w-[250px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                                  style={{ top: `${ageOfPropertyDropdownPosition.top}px`, left: `${ageOfPropertyDropdownPosition.left}px` }}
                                >
                                  <div className="p-3 space-y-1 max-h-[300px] overflow-y-auto">
                                    {CHECKBOX_FILTER_OPTIONS['Age of Property'].map((opt) => (
                                      <div key={opt} className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-slate-50 rounded-lg" onMouseDown={(e) => e.stopPropagation()}>
                                        <input
                                          type="checkbox"
                                          checked={selectedFilters['Age of Property']?.includes(opt)}
                                          onChange={(e) => {
                                            setSelectedFilters(prev => ({
                                              ...prev,
                                              'Age of Property': e.target.checked
                                                ? [...(prev['Age of Property'] || []), opt]
                                                : (prev['Age of Property'] || []).filter(item => item !== opt)
                                            }))
                                          }}
                                          onMouseDown={(e) => e.stopPropagation()}
                                          className="w-4 h-4 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5]"
                                        />
                                        <span className="text-sm text-slate-700">{opt}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>,
                                document.body
                              )}
                          </div>

                          {/* Maintenance Charges */}
                          <div className="relative" ref={maintenanceChargesTriggerRef}>
                            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Maintenance Charges</label>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsMaintenanceChargesDropdownOpen((open) => !open)
                              }}
                              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                            >
                              <span>{selectedFilters['Maintenance Charges']?.length ? `${selectedFilters['Maintenance Charges'].length} selected` : 'Select'}</span>
                              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isMaintenanceChargesDropdownOpen ? 'rotate(180deg)' : ''}`} />
                            </button>

                            {isMaintenanceChargesDropdownOpen &&
                              createPortal(
                                <div
                                  ref={maintenanceChargesDropdownRef}
                                  className="fixed w-[250px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                                  style={{ top: `${maintenanceChargesDropdownPosition.top}px`, left: `${maintenanceChargesDropdownPosition.left}px` }}
                                >
                                  <div className="p-3 space-y-1 max-h-[300px] overflow-y-auto">
                                    {CHECKBOX_FILTER_OPTIONS['Maintenance Charges'].map((opt) => (
                                      <div key={opt} className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-slate-50 rounded-lg" onMouseDown={(e) => e.stopPropagation()}>
                                        <input
                                          type="checkbox"
                                          checked={selectedFilters['Maintenance Charges']?.includes(opt)}
                                          onChange={(e) => {
                                            setSelectedFilters(prev => ({
                                              ...prev,
                                              'Maintenance Charges': e.target.checked
                                                ? [...(prev['Maintenance Charges'] || []), opt]
                                                : (prev['Maintenance Charges'] || []).filter(item => item !== opt)
                                            }))
                                          }}
                                          onMouseDown={(e) => e.stopPropagation()}
                                          className="w-4 h-4 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5]"
                                        />
                                        <span className="text-sm text-slate-700">{opt}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>,
                                document.body
                              )}
                          </div>

                          {/* Posted By */}
                          <div>
                            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Posted By</label>
                            <select
                              value={selectedFilters['Posted By'][0] || ''}
                              onChange={(e) => {
                                setSelectedFilters(prev => ({
                                  ...prev,
                                  'Posted By': e.target.value ? [e.target.value] : []
                                }))
                              }}
                              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5]"
                            >
                              <option value="">Select</option>
                              {CHECKBOX_FILTER_OPTIONS['Posted By'].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          </div>

                          {/* Posted Since */}
                          <div className="relative" ref={postedSinceTriggerRef}>
                            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Posted Since</label>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsPostedSinceDropdownOpen((open) => !open)
                              }}
                              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                            >
                              <span>{selectedFilters['Posted Since']?.length ? `${selectedFilters['Posted Since'].length} selected` : 'Select'}</span>
                              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isPostedSinceDropdownOpen ? 'rotate(180deg)' : ''}`} />
                            </button>

                            {isPostedSinceDropdownOpen &&
                              createPortal(
                                <div
                                  ref={postedSinceDropdownRef}
                                  className="fixed w-[250px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                                  style={{ top: `${postedSinceDropdownPosition.top}px`, left: `${postedSinceDropdownPosition.left}px` }}
                                >
                                  <div className="p-3 space-y-1 max-h-[300px] overflow-y-auto">
                                    {CHECKBOX_FILTER_OPTIONS['Posted Since'].map((opt) => (
                                      <div key={opt} className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-slate-50 rounded-lg" onMouseDown={(e) => e.stopPropagation()}>
                                        <input
                                          type="checkbox"
                                          checked={selectedFilters['Posted Since']?.includes(opt)}
                                          onChange={(e) => {
                                            setSelectedFilters(prev => ({
                                              ...prev,
                                              'Posted Since': e.target.checked
                                                ? [...(prev['Posted Since'] || []), opt]
                                                : (prev['Posted Since'] || []).filter(item => item !== opt)
                                            }))
                                          }}
                                          onMouseDown={(e) => e.stopPropagation()}
                                          className="w-4 h-4 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5]"
                                        />
                                        <span className="text-sm text-slate-700">{opt}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>,
                                document.body
                              )}
                          </div>

                          {/* Neighbourhood */}
                          <div className="relative" ref={advancedNeighbourhoodTriggerRef}>
                            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5 block">Neighbourhood</label>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsAdvancedNeighbourhoodDropdownOpen((open) => !open)
                              }}
                              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1E88E5] text-left flex items-center justify-between hover:border-[#1E88E5] transition-colors"
                            >
                              <span>{selectedFilters.Neighbourhood?.length ? `${selectedFilters.Neighbourhood.length} selected` : 'Select'}</span>
                              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isAdvancedNeighbourhoodDropdownOpen ? 'rotate(180deg)' : ''}`} />
                            </button>

                            {isAdvancedNeighbourhoodDropdownOpen &&
                              createPortal(
                                <div
                                  ref={advancedNeighbourhoodDropdownRef}
                                  className="fixed w-[250px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-loc-in z-40 border border-slate-100"
                                  style={{ top: `${advancedNeighbourhoodDropdownPosition.top}px`, left: `${advancedNeighbourhoodDropdownPosition.left}px` }}
                                >
                                  <div className="p-3 space-y-1 max-h-[300px] overflow-y-auto">
                                    {NEIGHBOURHOODS.map((opt) => (
                                      <div key={opt} className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-slate-50 rounded-lg" onMouseDown={(e) => e.stopPropagation()}>
                                        <input
                                          type="checkbox"
                                          checked={selectedFilters.Neighbourhood?.includes(opt)}
                                          onChange={(e) => {
                                            setSelectedFilters(prev => ({
                                              ...prev,
                                              Neighbourhood: e.target.checked
                                                ? [...(prev.Neighbourhood || []), opt]
                                                : (prev.Neighbourhood || []).filter(item => item !== opt)
                                            }))
                                          }}
                                          onMouseDown={(e) => e.stopPropagation()}
                                          className="w-4 h-4 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5]"
                                        />
                                        <span className="text-sm text-slate-700">{opt}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>,
                                document.body
                              )}
                          </div>
                        </div>
                      </div>
                    </div>,
                    document.body
                  )}
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
                <button
                  onClick={handleSearch}
                  className="px-8 py-2.5 rounded-lg text-white text-sm sm:text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: BLUE }}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Smart Search Input Row */}
            {isSmartSearchEnabled && (
              <div className="px-4 sm:px-6 py-4 border-t border-slate-100 bg-slate-50 animate-fade-in">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles size={18} className="text-[#1E88E5] flex-shrink-0" />
                  <input
                    type="text"
                    value={smartSearchQuery}
                    onChange={(e) => setSmartSearchQuery(e.target.value)}
                    placeholder="Describe your ideal property (e.g., '3 BHK near metro with parking')"
                    className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-[rgba(30,136,229,0.1)] transition-all"
                  />
                </div>
                <p className="text-xs text-slate-500 pl-7">
                  Smart Search will automatically add suitable properties to your filters based on your description.
                </p>
              </div>
            )}

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
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-12 gap-y-3.5">
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
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-10 gap-y-3.5">
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

        /* Professional dual-thumb range slider for the Budget filter.
           The track is drawn separately via the filled div; these inputs
           are transparent and only their native thumb is interactive. */
        .budget-range-thumb {
          pointer-events: none;
        }
        .budget-range-thumb::-webkit-slider-thumb {
          pointer-events: auto;
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid #1E88E5;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.18);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .budget-range-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.12);
          box-shadow: 0 3px 10px rgba(30, 136, 229, 0.35);
        }
        .budget-range-thumb::-webkit-slider-thumb:active {
          transform: scale(1.18);
        }
        .budget-range-thumb::-moz-range-thumb {
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid #1E88E5;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.18);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .budget-range-thumb::-moz-range-thumb:hover {
          transform: scale(1.12);
        }
        .budget-range-thumb::-webkit-slider-runnable-track {
          -webkit-appearance: none;
          background: transparent;
          height: 100%;
        }
        .budget-range-thumb::-moz-range-track {
          background: transparent;
          height: 100%;
        }
        .budget-range-thumb:focus {
          outline: none;
        }
        .budget-range-thumb:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 4px rgba(30, 136, 229, 0.18), 0 2px 6px rgba(15, 23, 42, 0.18);
        }
      `}</style>
    </div>
  )
}

export default Header