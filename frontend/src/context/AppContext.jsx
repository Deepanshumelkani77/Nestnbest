import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const [showSignup, setShowSignup] = useState(false)
  const [signupMode, setSignupMode] = useState('login')

  const closeSignup = () => setShowSignup(false)
  const openSignup = (mode = 'login') => {
    setSignupMode(mode)
    setShowSignup(true)
  }

  const value = {
    showSignup,
    signupMode,
    closeSignup,
    setSignupMode,
    openSignup,
  }

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}

export default AppContextProvider
