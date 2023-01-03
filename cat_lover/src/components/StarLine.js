import React from 'react'
import { BsFillStarFill } from 'react-icons/bs'

function StarLine({ name, score }) {
  const emptyArray = Array(5).fill('')
  return (
    <div className='flex gap-2 justify-center'>
      <p className='w-[150px]'>{name.replace('_', ' ')} </p>
      {emptyArray.map((item, i) => (
        <BsFillStarFill
          size={20}
          key={i}
          className={i < score ? 'text-yellow-500' : 'text-gray-300 '}
        />
      ))}
    </div>
  )
}

export default StarLine
