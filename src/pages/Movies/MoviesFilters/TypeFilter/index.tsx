import { Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { DEFAULT_PAGE, MOVIE_TYPES } from '../../../../constant'
import { RootState } from '../../../../store'
import { movieReducerActions } from '../../../../store/reducers/movie'

const options = [
  {
    label: 'Movie',
    value: MOVIE_TYPES.MOVIE,
  },
  {
    label: 'Series',
    value: MOVIE_TYPES.SERIES,
  },
  {
    label: 'Episode',
    value: MOVIE_TYPES.EPISODE,
  },
]

const TypeFilter = () => {
  const { type } = useSelector((store: RootState) => store.movie.filters)

  const dispatch = useDispatch()

  const handleOnChange = (value: string) => {
    dispatch(movieReducerActions.updateFilters({ type: value, page: DEFAULT_PAGE }))
  }

  return (
    <Select
      value={type || undefined}
      onChange={handleOnChange}
      allowClear
      options={options}
      placeholder='Type'
      style={{
        width: 120,
      }}
    />
  )
}

export default TypeFilter
