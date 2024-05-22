import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'

type Props = {
    message: string
}

export function Error({ message }: Props) {
    return (
        <View style={styles.fill}>
            <Text>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})