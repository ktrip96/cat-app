import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '../components/Grid'
import Loading from '../components/Loading'

export default function Cats() {
  const [catData, setCatData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_8YyLRW15hH59CsNQzXX43v3tIvVE2cMJYLYNGGOvBRJedFvsY8J3oCiliQnuMSoO`

  useEffect(() => {
    fetchData(apiUrl)
      .then((catArray) => {
        setCatData((prev) => [...prev, ...catArray])
        setIsLoading(false)
      })
      .catch((error) => console.error(error))
  }, [apiUrl, setCatData])

  const handleLoadMore = (url) => {
    setIsLoading(true)
    fetchData(url)
      .then((catArray) => {
        setCatData((prev) => [...prev, ...catArray])
        setIsLoading(false)
      })
      .catch((error) => console.error(error))
  }

  return (
    <div className='min-h-[90vh] h-full bg-[#363636] p-10'>
      {catData.length !== 0 && <Grid catData={catData} isLoading={isLoading} />}
      <div className='flex justify-center'>
        <button
          onClick={() => handleLoadMore(apiUrl)}
          className='animate-pulse text-[#F7AB0A] text-3xl font-semibold cursor-pointer no-underline border-4 border-[#F7AB0A] p-6 pl-10 pr-10 rounded-lg 
        bshadow relative mt-24 mb-24'
        >
          {isLoading ? <Loading /> : 'Load More'}
        </button>
      </div>
    </div>
  )
}

function fetchData(url) {
  return axios
    .get(url)
    .then((res) => {
      return res.data
    })
    .catch((err) => console.error(err))
}
