import React from 'react'
import Title from '../Title'

function HomeBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-12 px-6 md:px-16 rounded-lg shadow-lg md:max-w-6xl max-w-3xl mx-auto">
    <Title className="text-3xl md:text-4xl font-extrabold text-center uppercase tracking-wide mb-6">
      Merch That Speaks Your Institute Story!
    </Title>
    <p className="text-base md:text-lg text-center leading-relaxed">
      Discover a curated collection of t-shirts, hoodies, and accessories that celebrate your Institute clubs, committees, and unforgettable moments. Wear your story with pride!
    </p>
  </div>
  
  
  )
}

export default HomeBanner
