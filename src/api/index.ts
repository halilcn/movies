import queryString from 'query-string'

import { createApiInstance } from './utils'

const api = createApiInstance()

const generateQueryParameters = (queryParams: object) => {
  const allQueryParams = {
    ...queryParams,
    apikey: import.meta.env.VITE_API_KEY,
  }

  return queryString.stringify(allQueryParams)
}

export const getMovies = async (queryParams: object = {}) => {
  const allQueryParams = generateQueryParameters(queryParams)

  const { data } = await api.get(`/?${allQueryParams}`)
  return data
}

export const getMovieDetail = async (id: string) => {
  const allQueryParams = generateQueryParameters({ i: id })

  const { data } = await api.get(`/?${allQueryParams}`)
  return data
}
