import React from 'react'
import UserStatsCard from './UserStatsCard'
import CleanerStatsCard from './CleanerStatsCard'

const HomeStatsContainer = () => {
    const dummyArr = [
        {
            'stats': 500,
            'type': 'Cleaners',
        },
        {
            'stats': 3000,
            'type': 'Users',
        },
        
    ]
  return (
    <div className='w-full h-auto py-4 px-0 md:px-4 flex justify-start items-center gap-2 md:gap-4'>
        {
            dummyArr.map((obj, key)=> {
                return(
                    obj.type == 'Users' ?
                    <UserStatsCard key={key} stats={obj.stats} type={obj.type} />
                    :
                    <CleanerStatsCard key={key} stats={obj.stats} type={obj.type}/>
                )
            })
        }
    </div>
  )
}

export default HomeStatsContainer