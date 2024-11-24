import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './app.scss'
import { ROUTES } from './constant'
import MovieDetail from './pages/MovieDetail'
import Movies from './pages/Movies'

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path={ROUTES.MOVIES} element={<Movies />} />
        <Route path={ROUTES.MOVIE_DETAIL} element={<MovieDetail />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
