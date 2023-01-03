import React, { useState } from 'react'
import StarLine from './StarLine'
import { FaCat, FaShareAlt } from 'react-icons/fa'
import { FcCheckmark } from 'react-icons/fc'
import { HiOutlineIdentification } from 'react-icons/hi'
import TagList from './TagList'
import { Link } from 'react-router-dom'

function CatInfo({ breeds }) {
  const [isSharedClick, setIsSharedClick] = useState(false)
  if (breeds === undefined || breeds.length === 0) {
    return
  }
  return (
    <div className='p-5'>
      <div className='flex gap-5 items-center justify-center mb-2'>
        <FaCat size={25} style={{ color: '#444444' }} />
        <Link to={`/breeds?id=${breeds[0].id}`}>
          <h1 className='text-3xl font-semibold  text-black/80 hover:cursor-pointer hover:underline'>
            {breeds[0].name}
          </h1>
        </Link>
      </div>
      <p className='max-w-[90%] text-center m-auto'>
        "{breeds[0].description}"
      </p>
      <TagList tags={breeds[0].temperament.split(',')} />
      <div className='flex gap-5 items-center justify-center mt-4 mb-2'>
        <HiOutlineIdentification size={30} style={{ color: '#444444' }} />
        <h1 className='text-3xl font-semibold  text-black/80'>
          Characteristics
        </h1>
      </div>
      {characteristics.map((item, i) => (
        <StarLine name={item} key={i} score={breeds[0][item]} />
      ))}
      <div className='flex gap-2 justify-center mt-4 mb-4'>
        <p>Click to share </p>
        {isSharedClick ? (
          <>
            <div className='tooltip' tooltip='Copied' />
            <FcCheckmark size={20} />
          </>
        ) : (
          <FaShareAlt
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              setIsSharedClick(true)
            }}
            size={20}
            className='text-[#444444] cursor-pointer transition ease-in-out hover:scale-110'
          />
        )}
      </div>
      <div className='flex justify-center mt-6 mb-4'>
        <button className='w-[200px] bg-[#F7AB0A] text-[#444444] rounded p-2 font-semibold tracking-widest shadow-md transition ease-in-out hover:scale-105 hover:shadow-lg'>
          <a
            href={breeds[0].wikipedia_url}
            target='_blank'
            rel='noopener noreferrer'
          >
            Wikipedia
          </a>
        </button>
      </div>
    </div>
  )
}

const characteristics = [
  'adaptability',
  'child_friendly',
  'dog_friendly',
  'energy_level',
  'intelligence',
  'stranger_friendly',
  'vocalisation',
  'grooming',
  'health_issues',
]

export default CatInfo
