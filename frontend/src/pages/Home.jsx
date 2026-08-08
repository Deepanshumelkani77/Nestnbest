import React from 'react'
import NewPeoject from '../components/NewProject'
import BuyProperty from '../components/BuyProperty'
import Agents from '../components/Agents'
import Tools from '../components/Tools'
import Land from '../components/Land'

const Home = () => {
  return (
    <div>
      {/* Home page content - Header is rendered in App.jsx */}


<NewPeoject />
<BuyProperty />
<Agents />
<Tools/>
<Land />
      
    </div>
  )
}

export default Home
