import React from 'react'
import Tag from './Tag'

function TagList({ tags }) {
  return (
    <div className='flex gap-2 flex-wrap justify-center mt-4 mb-4'>
      {tags.map((item, i) => (
        <Tag key={i} order={i} name={item} />
      ))}
    </div>
  )
}

export default TagList
