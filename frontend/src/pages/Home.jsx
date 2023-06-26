import React from 'react'
import Navbar from '../components/Navbar'
import OfferBanner from '../components/OfferBanner'
import Slider from '../components/Slider'

export const Home = () => {
  return (
    <div>
        <OfferBanner/>
        <Navbar/>
        
        <Slider/>
        
    </div>
  )
}
