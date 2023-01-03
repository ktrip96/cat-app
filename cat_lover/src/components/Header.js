import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='flex flex-wrap gap-5 justify-center items-center font-extrabold    bg-[#363636] p-5'>
      <Link to='/'>
        <button className='header_button'>Home</button>
      </Link>
      <Link to='/cats'>
        <button className='header_button'>Cats</button>
      </Link>
      <Link to='/breeds'>
        <button className='header_button'>Breeds</button>
      </Link>
      <Link to='/favorites'>
        <button className='header_button'>Favorites</button>
      </Link>
      {/* <Link to='/favoritesV2'>
        <button className='header_button'>Favorites V2</button>
      </Link> */}
    </div>
  )
}

export default Header
