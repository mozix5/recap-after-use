import React from 'react'
import Card from '../components/Card'

const Projects = () => {
  return (
    <div className='mx-[269px]'>
      <div className=' text-6xl font-mono tracking-wider text-white uppercase pb-32'>Projects</div>
      <div className='flex flex-col items-center gap-64 last:pb-64'>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  )
}

export default Projects