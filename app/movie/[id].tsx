import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { QueryProvider } from '@/providers/queryprovider';
import MovieInfo from '@/components/movie';
import { Stack } from "expo-router";
import FavIcon from '@/components/fav';
import { retrieveFavItem, handleFavoriteClick } from '@/lib/utils';

export default function MovieScreen() {
    const { id } = useLocalSearchParams();
    const retrieveId = parseInt(Array.isArray(id) ? id[0] : id || '');

    return (
        <QueryProvider>
            {id && <MovieInfo id={retrieveId} />}
        </QueryProvider>
    );
}