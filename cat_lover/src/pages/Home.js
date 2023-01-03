import React from 'react'

function Home() {
  return (
    <div className='min-h-screen flex justify-center pt-10  bg-[#363636] text-[#F7AB0A]  '>
      <div className='flex flex-col  items-center'>
        <img
          src='Welcome.svg'
          alt='cat'
          className='w-[300px] h-[300px] md:w-[500px] md:h-[500px]'
        />
        <a
          href='/cats'
          className='text-[#F7AB0A] text-2xl border-4 md:text-4xl lg:text-4xl font-semibold cursor-pointer no-underline md:border-8 border-[#F7AB0A] p-6 pl-10 pr-10 rounded-lg 
        bshadow relative'
        >
          Show Cats
        </a>
      </div>
    </div>
  )
}

export default Home
