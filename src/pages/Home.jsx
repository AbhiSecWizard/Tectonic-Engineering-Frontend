// import React from 'react'

import CompanyStats from "../components/CompanyStats"
import HeroSection from "../components/HeroSection"
import OverviewSection from "../components/OverviewSection"
import ProjectsSection from "../components/ProjectsSection"
import WhyPeopleLikeUs from "../components/WhyPeopleLikeUs"

const Home = () => {
  return (
    <div>
   <HeroSection/>   
   <OverviewSection/>
   <WhyPeopleLikeUs/>
   <CompanyStats/>
   <ProjectsSection/>
    </div>
  )
}

export default Home
