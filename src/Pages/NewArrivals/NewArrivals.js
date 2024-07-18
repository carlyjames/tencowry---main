import React from 'react'

// components
import { Navbar, Footer } from '../../components'
import NewArrivalsComponent from './NewArrivalsComponent'

const NewArrivals = () => {
  return (
    <div>
        <Navbar />
        <h1 className='text-center text-xl lg:text-2xl bg-[#f2f2f2] w-full pt-4'>New Arrivals</h1>
        <NewArrivalsComponent />
        <Footer />
    </div>
  )
}

export default NewArrivals