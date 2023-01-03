import React from 'react'

function Tag({ name, order }) {
  if (order % 4 === 0)
    return (
      <span className='bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded'>
        {name}
      </span>
    )
  if (order % 4 === 1)
    return (
      <span className='bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900'>
        {name}
      </span>
    )

  if (order % 4 === 2)
    return (
      <span className='bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900'>
        {name}
      </span>
    )
  if (order % 4 === 3)
    return (
      <span className='bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900'>
        {name}
      </span>
    )
}

export default Tag
