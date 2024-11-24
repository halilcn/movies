import { Button } from 'antd'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router'

import Poster from '../../../components/Poster'
import { ROUTES } from '../../../constant'
import './index.scss'
import type { IMovieDetail, IProps } from './types'

const listItems = [
  {
    title: 'IMDB Rating',
    key: 'imdbRating',
  },
  {
    title: 'Runtime',
    key: 'Runtime',
  },
  {
    title: 'Released',
    key: 'Released',
  },
  {
    title: 'Country',
    key: 'Country',
  },
  {
    title: 'Language',
    key: 'Language',
  },
  {
    title: 'Director',
    key: 'Director',
  },
  {
    title: 'Actors',
    key: 'Actors',
  },
]

const MovieDetailContent = ({ movieDetail }: IProps) => {
  const navigate = useNavigate()

  const handleOnClickBack = () => {
    navigate(ROUTES.MOVIES)
  }

  return (
    <div className='movie-detail-content'>
      <Button icon={<IoIosArrowBack />} onClick={handleOnClickBack}>
        Back
      </Button>
      <div className='movie-detail-content__info'>
        <Poster src={movieDetail?.Poster} width={400} />
        <div className='movie-detail-content__details'>
          <div className='movie-detail-content__title'>{movieDetail?.Title}</div>
          <div className='movie-detail-content__detail-list'>
            {listItems.map(item => (
              <div className='movie-detail-content__detail-item'>
                <div className='movie-detail-content__detail-item-title'>{item.title}</div>
                <div className='movie-detail-content__detail-item-content'>{movieDetail?.[item.key as keyof IMovieDetail]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailContent
