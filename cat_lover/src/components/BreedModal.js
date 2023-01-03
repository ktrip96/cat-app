import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CatInfo from './CatInfo'
import axios from 'axios'
import Loading from './Loading'
import Carousel from './Carousel'
// import MetaTags from './MetaTags'

function BreedModal({ isOpen, setIsOpen, idParam }) {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [breedImages, setBreedImages] = useState([])
  const [breedInfo, setBreedInfo] = useState([])

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

  // each time modal renders, it gets breed data from the api
  useEffect(() => {
    setIsLoading(true)
    const api_key = {
      'x-api-key':
        'live_8YyLRW15hH59CsNQzXX43v3tIvVE2cMJYLYNGGOvBRJedFvsY8J3oCiliQnuMSoO',
    }
    // gets me all the images of a specific breed
    const imagesUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${idParam}&limit=25`
    // gets me the info of the specific breed
    const infoUrl = `https://api.thecatapi.com/v1/breeds/${idParam}`
    const getImages = axios.get(imagesUrl, api_key)
    const getInfo = axios.get(infoUrl, api_key)
    axios.all([getImages, getInfo]).then(
      axios.spread((...allData) => {
        const imageData = allData[0].data
        const infoData = allData[1].data

        setBreedImages(imageData)
        setBreedInfo(infoData)
        setIsLoading(false)
      })
    )
  }, [idParam])

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
          navigate('/breeds')
        }}
        className=' fixed top-0 left-0 bottom-0 right-0  flex justify-center items-center  bg-black/50 z-10'
      >
        {/* BreedModal container */}
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
          {/* inside BreedModal */}
          <div className='relative flex flex-col'>
            <Carousel images={breedImages} name={breedInfo.name} />

            <CatInfo breeds={[breedInfo]} />
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.getElementById('portal')
  )
}

export default BreedModal
