import { Search } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between px-6 bg-gray-200 h-20 w-full z-11">
      <h1 className='font-bold text-5xl' >News</h1>
      <div className='flex justify-between px-2.5 '>
        <input type="text" placeholder='Search '  className='outline-none ' />
        <Search />
      </div>
    </nav>
  )
}

export default Navbar