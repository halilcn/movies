import { Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../../store'
import { movieReducerActions } from '../../../../store/reducers/movie'

const TitleFilter = () => {
  const dispatch = useDispatch()

  const { title } = useSelector((store: RootState) => store.movie.filters)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      movieReducerActions.updateFilters({
        title: e.target.value,
      }),
    )
  }

  return <Input placeholder='Title' value={title} onChange={handleChange} />
}

export default TitleFilter
