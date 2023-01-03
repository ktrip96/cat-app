import { Navigate, Route, Routes } from 'react-router-dom'
import Cats from './pages/Cats'
import Favorite from './pages/Favorite'
import Breeds from './pages/Breeds'
import Home from './pages/Home'
import { CatContextProvider } from './context/CatContext'
import Header from './components/Header'
// import FavoriteV2 from './pages/FavoriteV2'

function App() {
  return (
    <CatContextProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cats' element={<Cats />} />
        <Route path='/breeds' element={<Breeds />} />
        <Route path='/favorites' element={<Favorite />} />
        {/* <Route path='/favoritesv2' element={<FavoriteV2 />} /> */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </CatContextProvider>
  )
}

export default App
