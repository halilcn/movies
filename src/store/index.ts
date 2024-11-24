import { configureStore } from '@reduxjs/toolkit'

import movie from './reducers/movie'

const store = configureStore({
  reducer: {
    movie,
  },
})
export type RootState = ReturnType<typeof store.getState>

export default store
