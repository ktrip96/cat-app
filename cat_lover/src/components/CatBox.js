import React, { useContext } from 'react'
import { BsHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import CatContext from '../context/CatContext'

function CatBox({ url, id, openModal, breeds }) {
  const { favoriteCats, setFavoriteCats } = useContext(CatContext)

  const handleClick = () => {
    if (containsId(favoriteCats, id))
      setFavoriteCats((prev) => prev.filter((item) => item.id !== id))
    else setFavoriteCats((prev) => [...prev, { id, url, breeds }])
  }

  return (
    <div className='relative transition ease-in-out hover:scale-105'>
      <Link to={`/cats/?id=${id}`}>
        <img
          src={url}
          alt='cat'
          className={`h-48 w-full rounded object-cover shadow-lg hover:shadow-xl hover:cursor-pointer  `}
          onClick={openModal}
        />
      </Link>
      <BsHeartFill
        size={20}
        className={`text-red-100 transition ease-in-out  absolute top-2 right-2  hover:cursor-pointer hover:scale-125 ${
          containsId(favoriteCats, id) && 'text-red-500 z-10'
        }`}
        onClick={() => handleClick()}
      />
    </div>
  )
}

function containsId(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) return true
  }
  return false
}

export default CatBox
