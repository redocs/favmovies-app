import { TMovie } from "@/types"

export async function fetchMovie(id: number) {
    // console.log('fetchMovie', id)

    const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a74169393e0da3cfbc2c58c5feec63d7`).then(res => res.json())

    const result = movie

    // console.log({ result })

    if (result.length == 0) {
        throw new Error('Movie not found')
    }
    return result as Promise<TMovie>
}
