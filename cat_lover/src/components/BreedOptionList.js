import React from 'react'
import { useNavigate } from 'react-router-dom'

function BreedOptionList({ breedData, openModal }) {
  const navigate = useNavigate()
  return (
    <div className='relative w-[300px] md:w-[600px]'>
      <select
        onChange={(e) => {
          if (e.target.value !== '') {
            openModal()
            navigate(`?id=${e.target.value}`)
          } else navigate('')
        }}
        className='w-full  p-2.5 md:text-lg font-semibold text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600 hover:cursor-pointer'
      >
        <option value=''>Select a cat breed 🐱</option>

        {breedData.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default BreedOptionList
