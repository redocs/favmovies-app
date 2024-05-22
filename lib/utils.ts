import { TMovie } from "@/types"
import AsyncStorage from '@react-native-async-storage/async-storage';


export const readData = async () => {
    try {
        const value = await AsyncStorage.getItem('coso');

        if (value !== null) {
            return value
        }
    } catch (e) {
        alert('Failed to fetch the input from storage');
    }
};

export async function retrieveFavItem(id: number) {
    const returnFav = await AsyncStorage.getItem('favoriteMovies').then((savedMoviesString: string | null) => {
        if (!savedMoviesString) return false;

        const savedMovies: TMovie[] = JSON.parse(savedMoviesString || '[]');
        const isMovieInFavorites = savedMovies.some((savedMovie) => savedMovie.id === id);

        return isMovieInFavorites;
    })

    return returnFav
}

export function handleFavoriteClick(movie: TMovie) {
    AsyncStorage.getItem('favoriteMovies').then((savedMoviesString: string | null) => {
        const savedMovies: TMovie[] = JSON.parse(savedMoviesString || '[]');
        const isMovieInFavorites = savedMovies.some((savedMovie) => savedMovie.id === movie.id);

        if (isMovieInFavorites) {
            const updatedMovies = savedMovies.filter((savedMovie) => savedMovie.id !== movie.id);
            AsyncStorage.setItem('favoriteMovies', JSON.stringify(updatedMovies));
        } else {
            const newMovies = [...savedMovies, movie];
            AsyncStorage.setItem('favoriteMovies', JSON.stringify(newMovies));
        }
    });
}

export async function fetchFavItems() {
    const returnFav = await AsyncStorage.getItem('favoriteMovies').then((savedMoviesString: string | null) => {
        if (!savedMoviesString) return [];

        const savedMovies: TMovie[] = JSON.parse(savedMoviesString || '[]');

        return savedMovies;
    })

    return returnFav
}

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
        alert('Storage successfully cleared!');
    } catch (e) {
        alert('Failed to clear the async storage.');
    }
};

export function retrieveYear(date: string) {
    const year = new Date(date).getFullYear();
    return year
}

export function convertDate(date: string) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [yeat, month, day] = date.split('-');
    const dateOutput = `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${yeat}`;

    return dateOutput
}