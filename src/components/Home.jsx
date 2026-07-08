import React from 'react'



import LatestProduct from './common/LatestProduct';
import FeatureProducts from './common/FeatureProducts';
import Header from './common/Header';
import Hero from './common/Hero';
import Footer from './common/Footer';
const Home = () => {
  return (
   <>
  
  <Hero/>
   <LatestProduct/>
   <FeatureProducts/>
   </>
  )
}

export default Home