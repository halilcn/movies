import MoviesFilters from './MoviesFilters'
import MoviesTable from './MoviesTable'
import './index.scss'

const Movies = () => {
  return (
    <div className='movies'>
      <div className='movies__filters'>
        <MoviesFilters />
      </div>
      <div className='movies__table'>
        <MoviesTable />
      </div>
    </div>
  )
}

export default Movies
