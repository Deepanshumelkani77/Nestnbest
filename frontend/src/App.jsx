import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'
import Signup from './components/Signup'
import AppContextProvider, { AppContext } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import About from './pages/About'
import Contact from './pages/Contact'
import Career from './pages/Career'
import Blog from './pages/Blog'
import Filter from './pages/Filter'
import PropertyDetail from './pages/PropertyDetail'
import LandDetail from './pages/LandDetail'
import CommercialDetail from './pages/CommercialDetail'
import IndustrialDetail from './pages/IndustrialDetail'
import Auth from './pages/Auth'
import Insight from './pages/Insight'
import Dashboard from './pages/Dashboard'
import PostProperty from './pages/PostProperty'

const App = () => {
  const location = useLocation()
  const [showNavbar, setShowNavbar] = useState(false)
  const isHomePage = location.pathname === '/'

  // Routes that should not show Navbar and Footer
  const noNavFooterRoutes = ['/auth', '/dashboard', '/post-property']
  const noFooterRoutes = ['/auth', '/dashboard', '/post-property', '/insight']
  const shouldShowNavFooter = !noNavFooterRoutes.includes(location.pathname)
  const shouldShowFooter = !noFooterRoutes.includes(location.pathname)

  useEffect(() => {
    if (!isHomePage || !shouldShowNavFooter) {
      setShowNavbar(true)
      return
    }

    const handleScroll = () => {
      const headerHeight = 400 // Height of Header component (hero + search bar)
      setShowNavbar(window.scrollY > headerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage, shouldShowNavFooter])

  return (
    <AuthProvider>
      <AppContextProvider>
        <div>
          {isHomePage && <Header />}
          {shouldShowNavFooter && <Navbar showNavbar={showNavbar || !isHomePage} />}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/career" element={<Career />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/filter" element={<Filter />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/land/:id" element={<LandDetail />} />
              <Route path="/commercial/:id" element={<CommercialDetail />} />
              <Route path="/industrial/:id" element={<IndustrialDetail />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/insight" element={<Insight />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/post-property" element={<PostProperty />} />
            </Routes>
          </main>
          {shouldShowFooter && <Footer />}
          {shouldShowFooter && <Signup />}
        </div>
      </AppContextProvider>
    </AuthProvider>
  )
}

export default App
