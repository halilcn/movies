import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { getMovieDetail } from '../../api'
import MovieDetailContent from './MovieDetailContent'
import type { IMovieDetail } from './MovieDetailContent/types'
import MoviesDetailError from './MoviesDetailError'
import MoviesDetailSkeleton from './MoviesDetailSkeleton'
import './index.scss'

const MovieDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [movieDetail, setMovieDetail] = useState<IMovieDetail | null>(null)

  const { id } = useParams()

  const handleGetMovieDetail = async () => {
    try {
      if (!id) return

      setIsLoading(true)

      const response = await getMovieDetail(id)

      if (response.Response === 'False') {
        setHasError(true)
        return
      }

      setMovieDetail(response)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleGetMovieDetail()
  }, [])

  const renderContent = () => {
    switch (true) {
      case isLoading:
        return <MoviesDetailSkeleton />
      case hasError:
        return <MoviesDetailError />
      default:
        return <MovieDetailContent movieDetail={movieDetail as IMovieDetail} />
    }
  }

  return <div className='movie-detail'>{renderContent()}</div>
}

export default MovieDetail
