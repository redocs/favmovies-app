import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import MovieItem from '@/components/listitem';
import { TMovie } from '@/types';
import { Stack } from "expo-router";
import data from '@/mock/data.json'
import { fetchFavItems, clearStorage } from '@/lib/utils';

export default function FavoriteScreen() {

    const [favList, setFavList] = useState<TMovie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // clearStorage();
            const retrieveFavList = await fetchFavItems();
            // console.log({ retrieveFavList });
            setFavList(retrieveFavList);
        };

        fetchData();
    }, []);

    return (
        <View>
            <Stack.Screen
                options={{
                    title: 'favorites',
                    headerTitle: 'Favorites',
                }}
            />
            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                // keyExtractor={item => item.id}
                data={favList}
                removeClippedSubviews={true}
                renderItem={({ item }) => {
                    return <MovieItem {...{ poster_path: item.poster_path, title: item.title, id: item.id, vote_average: item.vote_average, release_date: item.release_date }} key={item.id} />
                }}
                ListEmptyComponent={
                    <View style={styles.listEmptyComponent}>
                        <Text>noResult</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listEmptyComponent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    listFooterComponent: {
        flexDirection: 'row',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        height: 60,
        width: '100%',
    },
    contentContainerStyle: {
        marginTop: 0,
        padding: 0,
    },
});