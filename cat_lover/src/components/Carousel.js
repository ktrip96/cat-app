import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Carousel = ({ images, name }) => {
  const navigate = useNavigate()
  const maxScrollWidth = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carousel = useRef(null)

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
    }
  }

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      )
    }

    return false
  }

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex
    }
  }, [currentIndex])

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0
  }, [])

  return (
    <div className='carousel  mx-auto  w-[100%]'>
      <div className='relative overflow-hidden '>
        <div className='flex justify-between absolute top left w-full h-full'>
          <button
            onClick={movePrev}
            className=' text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300'
            disabled={isDisabled('prev')}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-12 w-20 -ml-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19l-7-7 7-7'
              />
            </svg>
            <span className='sr-only'>Prev</span>
          </button>
          <button
            onClick={moveNext}
            className=' text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300'
            disabled={isDisabled('next')}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-12 w-20 -ml-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
            <span className='sr-only'>Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className=' relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0'
        >
          {images.map((resource, index) => {
            return (
              <div
                key={index}
                className='text-center relative w-[300px] h-[300px] snap-start hover:cursor-pointer'
                onClick={() => navigate('/cats/?id=' + resource.id)}
              >
                <div
                  className='h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0'
                  style={{ backgroundImage: `url(${resource.url || ''})` }}
                >
                  <img
                    src={resource.url || ''}
                    alt={resource.id}
                    className='w-full aspect-square hidden '
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Carousel
