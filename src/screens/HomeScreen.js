import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";

const HomeScreen = (props) => {
    return (
        <View>
            <Button
                style={styles.button}
                onPress={() => props.navigation.navigate("Components")}
                title="Go to the Components Demo"
            />

            <Button
                style={styles.button}
                onPress={() => props.navigation.navigate("List")}
                title="Go to the List Demo"
            />

            <Button
                style={styles.button}
                onPress={() => props.navigation.navigate("Image")}
                title="Go to the Image Screen"
            />

            <Button
                style={styles.button}
                onPress={() => props.navigation.navigate("Count")}
                title="Go to the Counter Screen"
            />

            <Button
                style={styles.button}
                onPress={() => props.navigation.navigate("Color")}
                title="Go to the Color Screen"
            />

            <Button
                style={styles.button}
                onPress={() => props.navigation.navigate("Square")}
                title="Go to the Square Screen"
            />

            <Button
                style={styles.button}
                onPress={() => props.navigation.navigate("Text")}
                title="Go to the Text Screen"
            />

            <Button
                style={styles.button}
                onPress={() => props.navigation.navigate("Box")}
                title="Go to the Box Screen"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
    },
    button: {
        marginBottom: 10,
    },
});

export default HomeScreen;
