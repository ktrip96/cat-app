import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../components/Loading'
import BreedOptionList from '../components/BreedOptionList'
import BreedModal from '../components/BreedModal'
import { useLocation } from 'react-router-dom'

function Breeds() {
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(true)
  const [breedData, setBreedData] = useState([])
  const [idParam, setIdParam] = useState()

  const { search } = useLocation()

  useEffect(() => {
    setIdParam(new URLSearchParams(search).get('id'))
  }, [search])

  useEffect(() => {
    fetchData()
      .then((breeds) => {
        setBreedData(breeds)
        setIsLoading(false)
      })
      .catch((error) => console.error(error))
  }, [])

  if (isLoading)
    return (
      <div className='min-h-[90vh] h-full bg-[#363636]  flex justify-center items-center'>
        <Loading />
      </div>
    )

  return (
    <div className='min-h-[90vh] h-full bg-[#363636]  flex justify-center pt-20'>
      <BreedOptionList
        breedData={breedData}
        openModal={() => setIsOpen(true)}
      />
      {idParam && (
        <BreedModal isOpen={isOpen} setIsOpen={setIsOpen} idParam={idParam} />
      )}
    </div>
  )
}

function fetchData() {
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`, {
      'x-api-key':
        'live_8YyLRW15hH59CsNQzXX43v3tIvVE2cMJYLYNGGOvBRJedFvsY8J3oCiliQnuMSoO',
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => console.error(err))
}

export default Breeds
