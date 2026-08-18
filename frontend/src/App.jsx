import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'
import Signup from './components/Signup'
import AppContextProvider, { AppContext } from './context/AppContext'
import About from './pages/About'
import Contact from './pages/Contact'
import Career from './pages/Career'
import Blog from './pages/Blog'
import Filter from './pages/Filter'
import PropertyDetail from './pages/PropertyDetail'

const App = () => {
  const location = useLocation()
  const [showNavbar, setShowNavbar] = useState(false)
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    if (!isHomePage) {
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
  }, [isHomePage])

  return (
    <AppContextProvider>
      <div>
        {isHomePage && <Header />}
        <Navbar showNavbar={showNavbar || !isHomePage} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<Career />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
          </Routes>
        </main>
        <Footer />
        <Signup />
      </div>
    </AppContextProvider>
  )
}

export default App
