export interface IMovieDetail {
    Poster: string
    Actors: string
    Country: string
    Director: string
    Language: string
    Released: string
    Title: string
    imdbRating: string
    Year: string
    Runtime: string
}

export interface IProps {
    movieDetail: IMovieDetail | null
}