import React from 'react'
import Residents from '../components/Residents'
import BuyProperty from '../components/BuyProperty'
import Agents from '../components/Agents'
import Tools from '../components/Tools'
import Land from '../components/Land'

const Home = () => {
  return (
    <div>
      {/* Home page content - Header is rendered in App.jsx */}


<Residents />
<BuyProperty />
<Agents />
<Tools/>
<Land />
      
    </div>
  )
}

export default Home
