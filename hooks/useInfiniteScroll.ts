import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';

type Params<F> = {
    key: string;
    url: string;
    limit?: number;
};

export const useInfiniteScroll = <T = unknown, F = object>({
    key,
    url,
    limit = 10,
}: Params<F>) => {
    const queryKey = [key].filter(
        c => Boolean(c) && !_.isEmpty(c),
    );
    const [isRefreshing, setIsRefreshing] = useState(false);
    const queryFn = async ({ pageParam = 1 }) => {
        const { data } = await axios.get<T[]>(url, {
            params: {
                page: pageParam,
                limit,
            },
        });
        return {
            data: data,
            nextPage: pageParam + 1,
        };
    };
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
        queryKey,
        queryFn,
        initialPageParam: 1,
        getNextPageParam: (lastPage, __, lastPageParam) => {
            if (lastPage.data.length < limit) {
                return undefined;
            }
            return lastPageParam + 1;
        },
        getPreviousPageParam: (_, __, firstPageParam) => {
            if (firstPageParam === 1) {
                return undefined;
            }
            return firstPageParam - 1;
        },
    });

    const loadNext = useCallback(() => {
        hasNextPage && fetchNextPage();
    }, [fetchNextPage, hasNextPage]);

    const onRefresh = useCallback(() => {
        if (!isRefreshing) {
            setIsRefreshing(true);
            refetch()
                .then(() => setIsRefreshing(false))
                .catch(() => setIsRefreshing(false));
        }
    }, [isRefreshing, refetch]);

    const flattenData = useMemo(() => {
        // console.log({ data })
        const flatData = data?.pages.flatMap((page) => page?.data?.results) || [];
        // console.log({ flatData });
        return flatData
    }, [data?.pages]);

    return {
        data: flattenData,
        onEndReached: loadNext,
        isRefreshing,
        onRefresh,
        isFetchingNextPage
    };
};