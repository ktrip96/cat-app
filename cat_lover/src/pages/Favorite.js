import React, { useContext, useState, useEffect } from 'react'
import Filters from '../components/Filters'
import Grid from '../components/Grid'
import CatContext from '../context/CatContext'

function Favorite() {
  const { favoriteCats } = useContext(CatContext)
  const [filters, setFilters] = useState(['All'])
  const [activeFilter, setActiveFilter] = useState('All')
  const [filteredData, setFilteredData] = useState(favoriteCats)

  console.log('filteredData', filteredData)

  useEffect(() => {
    setFilters(returnBreeds(favoriteCats))
  }, [favoriteCats])

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredData(favoriteCats)
      return
    }
    if (activeFilter === 'No Breed') {
      const filtered = favoriteCats.filter(
        (item) => item.breeds === undefined || item.breeds.length === 0
      )
      setFilteredData(filtered)
      return
    }
    const filtered = favoriteCats.filter(
      (item) =>
        item.breeds !== undefined &&
        item.breeds.length > 0 &&
        item.breeds[0].name === activeFilter
    )
    setFilteredData(filtered)
  }, [activeFilter, favoriteCats])

  if (JSON.stringify(favoriteCats) === '[]')
    return (
      <div className='min-h-[90vh] flex flex-col items-center  pt-10  bg-[#363636] text-[#F7AB0A]'>
        <h1 className='text-md md:text-xl lg:text-2xl font-semibold'>
          You have no favorite cats yet.
        </h1>
        <h1 className='text-md md:text-xl lg:text-2xl font-semibold'>
          Go to Cats page and pick some
        </h1>
      </div>
    )
  return (
    <div className='min-h-[90vh] h-full bg-[#363636] px-20'>
      <Filters
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <Grid catData={filteredData} />
    </div>
  )
}

function returnBreeds(array) {
  let breedArray = ['All']
  for (let i = 0; i < array.length; i++) {
    if (array[i].breeds === undefined || array[i].breeds.length === 0) {
      if (!breedArray.includes('No Breed')) breedArray.push('No Breed')
    } else {
      const breedName = array[i].breeds[0].name
      if (!breedArray.includes(breedName)) breedArray.push(breedName)
    }
  }

  return breedArray
}

export default Favorite
