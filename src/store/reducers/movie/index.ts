import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { MovieFilters, MovieState } from './types'
import { DEFAULT_PAGE } from '../../../constant'


const initialState: MovieState = {
    filters: {
        title: 'Pokemon',
        year: '',
        type: '',
        page: DEFAULT_PAGE,
    },
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        updateFilters: (state, action: PayloadAction<Partial<MovieFilters>>) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearFilters: state => {
            state.filters = {
                ...Object.keys(state.filters).reduce(
                    (acc, key) => ({
                        ...acc,
                        [key]: '',
                    }),
                    {} as MovieFilters,
                ),
                page: DEFAULT_PAGE
            }
        },
    },
})

export const movieReducerActions = movieSlice.actions

export default movieSlice.reducer
