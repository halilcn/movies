import { Alert, Spin, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { getMovies } from '../../../api'
import Poster from '../../../components/Poster'
import { DEFAULT_PAGE_SIZE, ROUTES } from '../../../constant'
import { RootState } from '../../../store'
import { movieReducerActions } from '../../../store/reducers/movie'
import './index.scss'
import type { GetMoviesProps, Movie } from './types'

enum MovieTypes {
  movie = 'movie',
  series = 'series',
  episode = 'episode',
}
const mapTypeColors = {
  [MovieTypes.movie]: 'volcano',
  [MovieTypes.series]: 'green',
  [MovieTypes.episode]: 'cyan',
}
const TypeColumn = ({ type }: { type: MovieTypes }) => <Tag color={mapTypeColors[type] || 'purple'}>{type}</Tag>

const columns: TableProps<Movie>['columns'] = [
  {
    title: 'Poster',
    dataIndex: 'Poster',
    render: (poster, record) => <Poster src={poster} key={record.imdbID} />,
  },
  {
    title: 'Title',
    dataIndex: 'Title',
  },
  {
    title: 'Year',
    dataIndex: 'Year',
  },
  {
    title: 'Type',
    dataIndex: 'Type',
    render: (type: MovieTypes) => <TypeColumn type={type} />,
  },
  {
    title: 'IMDb ID',
    dataIndex: 'imdbID',
  },
]

const getFilteredMoviesApiQueryParameters = (queryParameters: object = {}) =>
  Object.entries(queryParameters)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => !!value)
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {},
    )

const getQueryParamKey = (key: string): string => {
  switch (key) {
    case 'title':
      return 's'
    case 'year':
      return 'y'
    default:
      return key
  }
}
const getNormalizedFilters = (filters: object = {}) =>
  Object.entries(filters).reduce((acc, [key, value]) => ({ ...acc, [getQueryParamKey(key)]: value }), {})

const MoviesTable = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false)
  const [totalMoviesCount, setTotalMoviesCount] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { filters } = useSelector((store: RootState) => store.movie)

  const handleOnRowClick = (record: Movie) => {
    navigate(ROUTES.MOVIE_DETAIL.replace(':id', record.imdbID))
  }

  const handleOnChangePagination = async (page: number) => {
    dispatch(movieReducerActions.updateFilters({ page }))
  }

  const handleGetMovies = async ({ queryParameters = {} }: GetMoviesProps = {}) => {
    try {
      setIsLoadingTable(true)

      const response = await getMovies(
        getFilteredMoviesApiQueryParameters({
          ...getNormalizedFilters(filters),
          ...queryParameters,
        }),
      )
      if (response.Response === 'False') {
        setErrorMessage(response.Error)
        setMovies([])
        return
      }

      const { Search: moviesResult, totalResults: totalMoviesCount } = response
      setMovies(moviesResult)
      setTotalMoviesCount(Number(totalMoviesCount))

      setErrorMessage(null)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('An error occurred while fetching movies')
    } finally {
      setIsLoadingTable(false)
    }
  }
  const debouncedHandleGetMovies = useCallback(_.debounce(handleGetMovies, 500), [])

  const handleGetInitialMovies = async () => {
    await handleGetMovies({
      queryParameters: {
        page: filters.page,
      },
    })
  }

  useEffect(() => {
    handleGetInitialMovies()
  }, [])

  useEffect(() => {
    debouncedHandleGetMovies({
      queryParameters: {
        ...getNormalizedFilters(filters),
      },
    })
  }, [JSON.stringify(filters)])

  const tableProps = {
    loading: isLoadingTable,
    columns: columns,
    dataSource: movies,
    onRow: (record: Movie) => ({
      onClick: () => handleOnRowClick(record),
    }),
    rowClassName: 'movies-table__row',
    pagination: {
      pageSize: DEFAULT_PAGE_SIZE,
      total: totalMoviesCount,
      onChange: handleOnChangePagination,
      showSizeChanger: false,
      current: filters.page,
    },
  }

  const renderError = () => {
    const preparedErrorMessage: string = (() => {
      switch (true) {
        case !filters.title:
          return 'You should enter a title'
        default:
          return errorMessage || 'Unknown error'
      }
    })()

    const content = <Alert message='An error occurred' description={preparedErrorMessage} type='error' />

    return isLoadingTable ? <Spin tip='Loading...'>{content}</Spin> : content
  }

  const renderContent = () => {
    switch (true) {
      case !!errorMessage:
        return renderError()
      default:
        return <Table<Movie> {...tableProps} />
    }
  }

  return renderContent()
}

export default MoviesTable
