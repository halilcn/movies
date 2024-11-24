import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../store'
import { movieReducerActions } from '../../../store/reducers/movie'
import TitleFilter from './TitleFilter'
import TypeFilter from './TypeFilter'
import YearFilter from './YearFilter'
import './index.scss'

const CLEARABLE_FILTERS = ['title', 'year', 'type'] as const

const MoviesFilters = () => {
  const dispatch = useDispatch()

  const { filters } = useSelector((store: RootState) => store.movie)

  const hasAnyClearableFilters = CLEARABLE_FILTERS.some(filterKey => filters[filterKey])

  const handleOnClickClearFilters = () => {
    dispatch(movieReducerActions.clearFilters())
  }

  return (
    <div className='movies-filters'>
      <div className='movies-filters__filter-item'>
        <TitleFilter />
      </div>
      <div className='movies-filters__filter-item'>
        <YearFilter />
      </div>
      <div className='movies-filters__filter-item'>
        <TypeFilter />
      </div>
      {hasAnyClearableFilters && (
        <Button className='movies-filters__clear-button' color='danger' variant='outlined' onClick={handleOnClickClearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  )
}

export default MoviesFilters
