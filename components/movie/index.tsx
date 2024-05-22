import * as React from "react";
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ImageBackground } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { TMovie } from "@/types";
import { fetchMovie } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
import { Stack } from "expo-router";
import FavIcon from '@/components/fav';
import { retrieveFavItem, handleFavoriteClick } from '@/lib/utils';

type Props = {
    id: number
}

const MovieInfo: React.FC<Props> = ({ id }) => {

    const queryKey = ["id", id];
    const queryOptions = {
        queryKey,
        queryFn: () => fetchMovie(id),
    };

    const [isFav, setIsFav] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const isInFav = await retrieveFavItem(id);
            // console.log({ isInFav });
            setIsFav(isInFav);
        };

        fetchData();
    }, []);

    const handleFav = ({ poster_path, title, vote_average, release_date, overview, id }: TMovie) => {
        // console.log({ id })
        handleFavoriteClick({ poster_path, title, vote_average, release_date, overview, id });
    }

    const { isLoading, error, data, refetch } = useQuery<TMovie, Error>(queryOptions);

    if (isLoading) return <Loading />
    if (error) return <Error message={error.message}></Error>
    if (!data) return null

    return (
        <View style={styles.movieinfoscreen}>
            <Stack.Screen
                options={{
                    title: "Movie Info",
                    headerStyle: {
                        backgroundColor: '#f4f4f4',
                    },
                    headerRight: () => <FavIcon id={id} active={isFav} onPress={() => { handleFav({ ...data }) }} />,
                }}
            />
            <ImageBackground
                style={styles.objectIcon}
                source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}` }}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={[
                        'rgba(0,0,0,0)',
                        'rgba(0,0,0,0.3)',
                        'rgba(0,0,0,0.75)',
                    ]}
                    style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                    <Text style={[styles.title]}>{data.title}</Text>
                </LinearGradient>

            </ImageBackground>

            <Text style={[styles.overview]}>{data.overview}</Text>
        </View>);
};

const styles = StyleSheet.create({
    objectIcon: {
        width: 506,
        height: 285,
    },
    title: {
        textAlign: "left",
        fontFamily: "Roboto-Regular",
        fontSize: 28,
        color: "#fff",
        width: '80%',
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: {
            width: 0,
            height: 2
        },
        textShadowRadius: 6,
        padding: 25
    },
    overview: {
        textAlign: "left",
        fontFamily: "Roboto-Regular",
        fontSize: 20,
        lineHeight: 28,
        color: "#333",
        width: '100%',
        height: 367,
        padding: 20
    },
    movieinfoscreen: {
        backgroundColor: "#fff",
        flex: 1,
        overflow: "hidden",
        width: "100%"
    }
});

export default MovieInfo;
