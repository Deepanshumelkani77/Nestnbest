import React from 'react'
import Residents from '../components/Residents'
import Commercial from '../components/Commercial'
import Agents from '../components/Agents'
import Tools from '../components/Tools'
import Land from '../components/Land'
import Industrial from '../components/Industrial'
const Home = () => {
  return (
    <div>
      {/* Home page content - Header is rendered in App.jsx */}


<Residents />
<Land />
<Commercial/>

<Agents />
<Tools/>
<Industrial />
      
    </div>
  )
}

export default Home
