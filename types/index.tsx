export type TMovie = {
    poster_path: string
    backdrop_path?: string
    title: string
    id: number
    release_date?: string
    vote_average: number
    overview?: string
}

export type TIcon = {
    color: string
    width?: number
    height?: number
}

export type TFav = {
    onPress: (id: number) => void
    active?: boolean
    id: number
}