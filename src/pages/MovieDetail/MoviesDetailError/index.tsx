import { Result } from 'antd'

import './style.scss'

const MoviesDetailError = () => {
  return (
    <div className='movie-detail-error'>
      <Result className='' status='warning' title='An error occurred.' />
    </div>
  )
}

export default MoviesDetailError
