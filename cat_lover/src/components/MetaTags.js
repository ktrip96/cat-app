import React from 'react'
import { Helmet } from 'react-helmet'

function MetaTags({ singleCatInfo }) {
  return (
    <div>
      <Helmet>
        <title>{singleCatInfo.id}</title>
        <meta name='title' content={`This cat is ${singleCatInfo.id}`} />
        {/* <!-- Primary Meta Tags --> */}
        <title>
          {singleCatInfo.breeds
            ? singleCatInfo.breeds[0].name
            : 'Cat Application'}
        </title>
        <meta name='description' content='This cat is for you my friend' />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://platform2-0-react-challenge-cat-lover-olol.vercel.app/'
        />
        <meta property='og:title' content='Cat Application' />
        <meta
          property='og:description'
          content='This cat is for you my friend'
        />
        <meta property='og:image' content={`${singleCatInfo.url}`} />

        {/* <!-- Twitter --> */}
        <meta property='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:url'
          content='https://platform2-0-react-challenge-cat-lover-olol.vercel.app/'
        />
        <meta property='twitter:title' content='Cat Application' />
        <meta
          property='twitter:description'
          content='This cat is for you my friend'
        />
        <meta property='twitter:image' content={`${singleCatInfo.url}`} />
      </Helmet>
    </div>
  )
}

export default MetaTags
