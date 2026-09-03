import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const [showSignup, setShowSignup] = useState(false)
  const [signupMode, setSignupMode] = useState('login')

  // Search filter state - shared between Header searchbar and Filter page
  const [searchFilters, setSearchFilters] = useState({
    propertyType: 'buy', // buy, rent, commercial, land
    category: null, // Residential, Commercial, Industrial, etc. - no default
    subCategory: null, // Flats, Villas, etc.
    city: '',
    neighbourhood: '',
    budget: null,
    bedrooms: [],
    bathrooms: [],
    builtUpArea: [],
    superArea: [],
    constructionStatus: [],
    parking: [],
    furnishing: [],
    facing: [],
    postedBy: [],
    postedSince: null,
  })

  const closeSignup = () => setShowSignup(false)
  const openSignup = (mode = 'login') => {
    setSignupMode(mode)
    setShowSignup(true)
  }

  const updateSearchFilters = (filters) => {
    setSearchFilters(prev => ({ ...prev, ...filters }))
  }

  const resetSearchFilters = () => {
    setSearchFilters({
      propertyType: 'buy',
      category: null, // No default category
      subCategory: null,
      city: '',
      neighbourhood: '',
      budget: null,
      bedrooms: [],
      bathrooms: [],
      builtUpArea: [],
      superArea: [],
      constructionStatus: [],
      parking: [],
      furnishing: [],
      facing: [],
      postedBy: [],
      postedSince: null,
    })
  }

  const value = {
    showSignup,
    signupMode,
    closeSignup,
    setSignupMode,
    openSignup,
    searchFilters,
    updateSearchFilters,
    resetSearchFilters,
  }

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}

export default AppContextProvider
