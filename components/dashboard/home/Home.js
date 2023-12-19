"use client"

import React from 'react'
import HomeStatsContainer from './HomeStatsContainer'
import StatsGraphContainer from './StatsGraphContainer'
import HomeUserTable from './HomeUserTable'
import HomeCleanerTable from './HomeCleanerTable'

const Home = () => {
  return (
    <div className='w-full  h-auto flex flex-col gap-4 justify-start items-start overflow-y-auto p-2 md:p-4'>
        <HomeStatsContainer />
        <StatsGraphContainer />
        <div className='w-full h-auto flex flex-col lg:flex-row gap-2'>
            <HomeUserTable />
            <HomeCleanerTable />
        </div>
    </div>
  )
}

export default Home