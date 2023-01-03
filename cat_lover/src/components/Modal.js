import React, { useEffect, useState, useContext } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CatInfo from './CatInfo'
import { RiCloseCircleFill } from 'react-icons/ri'
import axios from 'axios'
import Loading from './Loading'
import MetaTags from './MetaTags'
import { BsHeartFill } from 'react-icons/bs'
import CatContext from '../context/CatContext'

function Modal({ isOpen, setIsOpen, idParam }) {
  const navigate = useNavigate()
  const { favoriteCats, setFavoriteCats } = useContext(CatContext)

  const [isLoading, setIsLoading] = useState(true)
  const [singleCatInfo, setSingleCatInfo] = useState([])

  // animation Settings
  const modalAnimation = {
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.2,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  }

  useEffect(() => {
    setIsLoading(true)
    fetchData(idParam)
      .then((catInfo) => {
        setSingleCatInfo(catInfo)
        setIsLoading(false)
      })
      .catch((error) => console.error(error))
  }, [idParam])

  const handleClick = (id, url, breeds) => {
    if (containsId(favoriteCats, id))
      setFavoriteCats((prev) => prev.filter((item) => item.id !== id))
    else setFavoriteCats((prev) => [...prev, { id, url, breeds }])
  }

  if (!isOpen) return null

  if (isLoading) return <Loading />

  return createPortal(
    <>
      {/* backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          setIsOpen(false)
          navigate('/cats')
        }}
        className=' fixed top-0 left-0 bottom-0 right-0  flex justify-center items-center  bg-black/50 z-10'
      >
        {/* modal container */}
        <motion.div
          variants={modalAnimation}
          initial='hidden'
          animate='visible'
          exit='exit'
          onClick={(e) => {
            e.stopPropagation()
          }}
          className='p-0  scrollbar scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 overflow-y-scroll rounded-lg z-10 w-[90%] h-fit max-h-[70vh]  md:w-[700px] lg:w-[50%] bg-white '
        >
          {/* inside modal */}
          <MetaTags singleCatInfo={singleCatInfo} />
          <div className='relative flex flex-col'>
            <div className='w-full bg-black'>
              <img
                src={singleCatInfo.url}
                alt={singleCatInfo.id}
                className='max-w-[400px] w-full object-cover m-auto'
              />
              <BsHeartFill
                size={25}
                className={`text-red-100 transition ease-in-out  absolute top-5 left-5  hover:cursor-pointer hover:scale-125 ${
                  containsId(favoriteCats, singleCatInfo.id) &&
                  'text-red-600 z-10'
                }`}
                onClick={() =>
                  handleClick(
                    singleCatInfo.id,
                    singleCatInfo.url,
                    singleCatInfo.breeds
                  )
                }
              />
            </div>

            <CatInfo breeds={singleCatInfo.breeds} />

            <div
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
                navigate('/cats')
              }}
              className='absolute top-3 right-3 text-white  transition ease-in-out duration-100 hover:cursor-pointer hover:scale-125'
            >
              <RiCloseCircleFill size={30} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.getElementById('portal')
  )
}

function fetchData(id) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/${id}`, {
      'x-api-key':
        'live_8YyLRW15hH59CsNQzXX43v3tIvVE2cMJYLYNGGOvBRJedFvsY8J3oCiliQnuMSoO',
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => console.error(err))
}

function containsId(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) return true
  }
  return false
}

export default Modal
