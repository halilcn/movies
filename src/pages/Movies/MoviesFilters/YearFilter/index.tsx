import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../../store'
import { movieReducerActions } from '../../../../store/reducers/movie'

const YearFilter = () => {
  const dispatch = useDispatch()

  const { year } = useSelector((store: RootState) => store.movie.filters)

  const handleChange = (e: dayjs.Dayjs | null) => {
    dispatch(
      movieReducerActions.updateFilters({
        year: !e ? '' : e.year().toString(),
      }),
    )
  }

  return <DatePicker placeholder='Year' picker='year' onChange={handleChange} {...(year && { value: dayjs(`01-01-${year}`) })} />
}

export default YearFilter
