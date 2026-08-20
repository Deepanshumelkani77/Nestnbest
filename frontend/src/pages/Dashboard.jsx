import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Home,
  Building2,
  Briefcase,
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Users,
  Phone,
  Mail,
  LogOut,
  Menu,
  X,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  MapPin,
  IndianRupee,
  Star,
  Building,
  Factory,
} from 'lucide-react'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const PROPERTY_TYPES = [
  { id: 'residential', label: 'Residential', icon: Home },
  { id: 'commercial', label: 'Commercial', icon: Building2 },
  { id: 'land', label: 'Land', icon: MapPin },
  { id: 'industrial', label: 'Industrial', icon: Factory },
]

const STATUS_COLORS = {
  active: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  sold: 'bg-slate-100 text-slate-700',
  inactive: 'bg-red-100 text-red-700',
}

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [properties, setProperties] = useState([])

  // Mock data - in production, this would come from an API
  useEffect(() => {
    const mockProperties = [
      {
        id: 1,
        title: 'DLF The Camellias',
        type: 'residential',
        location: 'Sector 42, Gurgaon',
        price: '₹8.5 Cr',
        status: 'active',
        views: 1250,
        inquiries: 45,
        postedDate: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      },
      {
        id: 2,
        title: 'Cyber Hub Office Space',
        type: 'commercial',
        location: 'Sector 25, Gurgaon',
        price: '₹12 Cr',
        status: 'active',
        views: 890,
        inquiries: 32,
        postedDate: '2024-02-20',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      },
      {
        id: 3,
        title: 'Agricultural Land',
        type: 'land',
        location: 'Manesar, Gurgaon',
        price: '₹4.2 Cr',
        status: 'pending',
        views: 320,
        inquiries: 8,
        postedDate: '2024-03-10',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
      },
      {
        id: 4,
        title: 'Industrial Shed',
        type: 'industrial',
        location: 'Bhiwadi, Rajasthan',
        price: '₹6.5 Cr',
        status: 'active',
        views: 560,
        inquiries: 18,
        postedDate: '2024-04-05',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
      },
      {
        id: 5,
        title: 'M3M Golf Estate',
        type: 'residential',
        location: 'Sector 65, Gurgaon',
        price: '₹5.8 Cr',
        status: 'sold',
        views: 2100,
        inquiries: 89,
        postedDate: '2024-01-20',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
      },
    ]
    setProperties(mockProperties)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleDeleteProperty = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter((p) => p.id !== id))
    }
  }

  const filteredProperties = properties.filter((property) => {
    const matchesTab = selectedTab === 'all' || property.type === selectedTab
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const stats = {
    total: properties.length,
    active: properties.filter((p) => p.status === 'active').length,
    pending: properties.filter((p) => p.status === 'pending').length,
    sold: properties.filter((p) => p.status === 'sold').length,
    views: properties.reduce((sum, p) => sum + p.views, 0),
    inquiries: properties.reduce((sum, p) => sum + p.inquiries, 0),
  }

  const getTypeIcon = (type) => {
    const typeObj = PROPERTY_TYPES.find((t) => t.id === type)
    return typeObj ? typeObj.icon : Building
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-slate-100">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold" style={{ color: NAVY }}>Dashboard</h1>
        </div>
        <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: NAVY }}>Dashboard</h2>
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
                  <X size={24} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <img src={user?.avatar} alt={user?.name} className="w-12 h-12 rounded-full" />
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{user?.name}</p>
                  <p className="text-sm text-slate-500 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              <button
                onClick={() => setSelectedTab('all')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  selectedTab === 'all' ? 'bg-[#193C06]/10 text-[#193C06]' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <Building size={20} />
                <span className="font-medium">All Properties</span>
              </button>

              <div className="pt-4 pb-2">
                <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Property Type</p>
              </div>

              {PROPERTY_TYPES.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedTab(type.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      selectedTab === type.id ? 'bg-[#193C06]/10 text-[#193C06]' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{type.label}</span>
                  </button>
                )
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-screen">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(25,60,6,0.1)' }}>
                  <Building size={18} style={{ color: NAVY }} />
                </span>
                <span className="text-slate-500 text-sm">Total</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>{stats.total}</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-100">
                  <TrendingUp size={18} className="text-emerald-600" />
                </span>
                <span className="text-slate-500 text-sm">Active</span>
              </div>
              <p className="text-2xl font-bold text-emerald-600">{stats.active}</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-100">
                  <Calendar size={18} className="text-amber-600" />
                </span>
                <span className="text-slate-500 text-sm">Pending</span>
              </div>
              <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100">
                  <Star size={18} className="text-slate-600" />
                </span>
                <span className="text-slate-500 text-sm">Sold</span>
              </div>
              <p className="text-2xl font-bold text-slate-600">{stats.sold}</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(30,136,229,0.1)' }}>
                  <Eye size={18} style={{ color: BLUE }} />
                </span>
                <span className="text-slate-500 text-sm">Views</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: BLUE }}>{stats.views.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100">
                  <Users size={18} className="text-purple-600" />
                </span>
                <span className="text-slate-500 text-sm">Inquiries</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">{stats.inquiries}</p>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>
                {selectedTab === 'all' ? 'All Properties' : PROPERTY_TYPES.find((t) => t.id === selectedTab)?.label}
              </h1>
              <p className="text-slate-500 mt-1">Manage your property listings</p>
            </div>
            <button
              onClick={() => navigate('/post-property')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: NAVY }}
            >
              <Plus size={20} />
              Add Property
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search properties by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20 outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProperties.map((property) => {
              const TypeIcon = getTypeIcon(property.type)
              return (
                <div key={property.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[property.status]}`}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </span>
                    <button className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 hover:bg-white transition-colors">
                      <MoreVertical size={18} className="text-slate-600" />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <TypeIcon size={16} className="text-slate-400" />
                      <span className="text-xs text-slate-500 capitalize">{property.type}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>{property.title}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
                      <MapPin size={14} />
                      {property.location}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xl font-bold" style={{ color: NAVY }}>{property.price}</p>
                      <p className="text-xs text-slate-400">{property.postedDate}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4 pt-4 border-t border-slate-100">
                      <div className="text-center">
                        <p className="text-lg font-bold" style={{ color: BLUE }}>{property.views}</p>
                        <p className="text-xs text-slate-400">Views</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-purple-600">{property.inquiries}</p>
                        <p className="text-xs text-slate-400">Inquiries</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-emerald-600">
                          {property.status === 'active' ? 'Live' : property.status === 'sold' ? 'Sold' : 'Review'}
                        </p>
                        <p className="text-xs text-slate-400">Status</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                        <Eye size={16} />
                        View
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProperty(property.id)}
                        className="flex items-center justify-center px-4 py-2.5 rounded-lg border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <Building size={64} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No properties found</h3>
              <p className="text-slate-400 mb-6">Get started by adding your first property</p>
              <button
                onClick={() => navigate('/post-property')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: NAVY }}
              >
                <Plus size={20} />
                Add Your First Property
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
