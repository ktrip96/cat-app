import React from 'react'

function Filters({ filters, activeFilter, setActiveFilter }) {
  return (
    <div className='flex gap-5 flex-wrap py-5'>
      {filters.map((item, i) => (
        <button
          key={i}
          onClick={(e) => setActiveFilter(e.target.value)}
          value={item}
          className={`border rounded-md border-[#f7ab0a] min-w-[100px] text-center text-[#f7ab0a] py-2 px-2 transition duration-300 ease-in-out hover:cursor-pointer hover:scale-110 
          ${activeFilter === item && 'bg-[#f7ab0a]/20'}`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default Filters
