import React from 'react';
import { FlatList, Text, View, RefreshControl, StyleSheet, ActivityIndicator } from 'react-native';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import MovieItem from '@/components/listitem';
import { TMovie } from '@/types';

export const InfiniteScrollScreen = () => {

    const { data, isRefreshing, onRefresh, onEndReached, isFetchingNextPage } = useInfiniteScroll<
        TMovie
    >({
        url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7',
        limit: 25,
        key: 'id',
    });


    return (
        <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            keyExtractor={item => item.id}
            initialNumToRender={10}
            data={data}
            onEndReached={onEndReached}
            removeClippedSubviews={true}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            renderItem={({ item }) => {
                return <MovieItem {...{ poster_path: item.poster_path, backdrop_path: item.backdrop_path, title: item.title, id: item.id, vote_average: item.vote_average, release_date: item.release_date }} key={item.id} />
            }}
            ListEmptyComponent={
                <View style={styles.listEmptyComponent}>
                    <Text>noResult</Text>
                </View>
            }
            ListFooterComponent={
                <View style={styles.listFooterComponent}>
                    {isFetchingNextPage && <ActivityIndicator />}
                </View>
            }
        />
    );
};

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