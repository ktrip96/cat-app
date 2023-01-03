import React, { useState, useEffect } from 'react'
import CatBox from './CatBox'
import { AnimatePresence, motion } from 'framer-motion'
import Modal from './Modal'
import { useLocation } from 'react-router-dom'

function Grid({ catData, isLoading = false }) {
  const [isOpen, setIsOpen] = useState(true)
  const [idParam, setIdParam] = useState()
  const { search } = useLocation()

  useEffect(() => {
    setIdParam(new URLSearchParams(search).get('id'))
  }, [search])

  useEffect(() => {
    // The following code fixes a bug in which the screen scrolls when the popup is active
    if (isOpen && idParam) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [isOpen, idParam])

  return (
    <>
      <div className={`myGrid ${isLoading && 'opacity-40'}`}>
        <AnimatePresence>
          {catData.map((cat) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.5, type: 'spring' },
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              key={cat.id}
              layout
            >
              <CatBox
                url={cat.url}
                breeds={cat.breeds}
                id={cat.id}
                height={cat.height}
                width={cat.width}
                openModal={() => setIsOpen(true)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {idParam && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} idParam={idParam} />
        )}
      </div>
    </>
  )
}

export default Grid
