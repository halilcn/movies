export interface MovieFilters {
    title: string
    year: string
    type: string
    page: number
}

export interface MovieState {
    filters: MovieFilters
}