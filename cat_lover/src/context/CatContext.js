import React, { createContext, useState } from 'react'

const CatContext = createContext()

// We use Context because all of React components, will need some global data
// Doing so, we avoid the prop spreading

function CatContextProvider(props) {
  const [favoriteCats, setFavoriteCats] = useState([])

  return (
    <CatContext.Provider
      value={{
        favoriteCats,
        setFavoriteCats,
      }}
    >
      {props.children}
    </CatContext.Provider>
  )
}

export default CatContext
export { CatContextProvider }
