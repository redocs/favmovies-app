import * as React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { TMovie } from '@/types';
import { retrieveYear } from "@/lib/utils";
import { Link } from "expo-router";

const MovieItem: React.FC<TMovie> = ({ poster_path, backdrop_path, title, id, vote_average, release_date }) => {

    return (
        <Link href={{ pathname: `/movie/${id}` }} asChild>
            <Pressable style={styles.movieitem}>
                <View style={styles.movieiteminner}>
                    <View style={[styles.titleParent, styles.photoIconPosition]}>
                        <Text style={styles.title} numberOfLines={1}>{title}</Text>
                        <View style={styles.rowInfo}>
                            {release_date && <View style={styles.rowInfo}>
                                <Image style={styles.calendar} resizeMode="cover"
                                    source={require('@/assets/images/calendar.png')}
                                />
                                <Text style={styles.releaseYear}>{retrieveYear(release_date)}</Text>
                            </View>}
                            {vote_average && <View style={styles.rowInfo}>
                                <Image
                                    style={styles.star}
                                    resizeMode="cover"
                                    source={require('@/assets/images/star.png')}
                                />
                                <Text style={styles.releaseYear}>{vote_average.toFixed(1)}</Text>
                            </View>}
                        </View>
                    </View>
                    <Image
                        style={[styles.photoIcon, styles.photoIconPosition]}
                        resizeMode="cover"
                        source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
                    />
                    <Image
                        style={styles.next}
                        resizeMode="cover"
                        source={require('@/assets/images/next.png')}
                    />
                </View>
            </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    photoIconPosition: {
        top: "50%",
        position: "absolute"
    },

    title: {
        fontSize: 21,
        lineHeight: 22,
        fontWeight: "500",
        fontFamily: "Roboto-Medium",
        color: "#222",
        width: 202,
        textAlign: "left"
    },
    calendar: {
        width: 12,
        height: 12
    },
    releaseYear: {
        fontSize: 14,
        fontWeight: "700",
        fontFamily: "Roboto-Bold",
        color: "#919191",
        marginLeft: 5,
        textAlign: "left"
    },
    star: {
        width: 13,
        marginLeft: 5,
        height: 12
    },
    rowInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6
    },
    titleParent: {
        marginTop: -31,
        left: 107
    },
    photoIcon: {
        marginTop: -36,
        left: 20,
        borderRadius: 10,
        width: 72,
        height: 72
    },
    next: {
        height: "11.16%",
        top: "44.87%",
        right: 20,
        bottom: "43.97%",
        maxHeight: "100%",
        width: 8,
        position: "absolute"
    },
    movieitem: {
        display: "flex",
        position: "relative",
        flex: 1,
        height: 112,
        width: "100%",
        backgroundColor: "#fff",
        borderStyle: "solid",
        borderColor: "#d7d7d7",
        borderBottomWidth: 1
    },
    movieiteminner: {
        flex: 1,
        height: 112,
    }
});

export default MovieItem;
