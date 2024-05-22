import { QueryProvider } from '@/providers/queryprovider';
import { InfiniteScrollScreen } from '@/components/movielist';
import { Stack, Link } from 'expo-router';
import { StyleSheet } from "react-native";

export default function HomeScreen() {
    return (
        <QueryProvider>
            <Stack.Screen
                options={{
                    title: 'movies',
                    headerTitle: 'Movies',
                    headerRight: () => <Link style={styles.fav} href="/favorites">Favorites</Link>,
                }}
            />
            <InfiniteScrollScreen />
        </QueryProvider>
    );
}

const styles = StyleSheet.create({
    fav: {
        fontSize: 17,
        letterSpacing: 0,
        fontFamily: "Roboto-Regular",
        color: "#007aff",
        textAlign: "right"
    }
});