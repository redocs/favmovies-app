import { useState, useEffect } from "react";
import { Image, StyleSheet, Pressable } from "react-native";
import { TFav } from "@/types";

const FavIcon: React.FC<TFav> = ({ onPress, active = false, id }) => {

    const [activeIcon, setActiveIcon] = useState(active);

    useEffect(() => {
        setActiveIcon(active);
    }, [active])

    const _onPress = () => {
        onPress(id)
        setActiveIcon(!activeIcon);
    }

    return (
        <Pressable style={styles.fav} onPress={_onPress}>
            {!activeIcon && <Image
                style={styles.icon}
                resizeMode="contain"
                source={require('@/assets/images/fav-empty.png')}
            />}
            {activeIcon && <Image
                style={styles.icon}
                resizeMode="contain"
                source={require('@/assets/images/fav.png')}
            />}
        </Pressable>);
};

const styles = StyleSheet.create({
    icon: {
        flex: 1,
        height: "100%",
        width: "100%"
    },
    fav: {
        height: 19,
        width: 19
    }
});

export default FavIcon;
