import React, { useReducer, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

const BoxScreen = () => {
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>Box Screen 1</Text>
            <Text style={styles.textTwoStyle}>Box Screen 2</Text>
            <Text style={styles.textThreeStyle}>Box Screen 3</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        borderWidth: 3,
        borderColor: "black",
        flexDirection: "column",
        height: 200,
        alignItems: "center",
        top:10
    },
    textStyle: {
        borderWidth: 3,
        borderColor: "red",
    },
    textTwoStyle: {
        borderWidth: 3,
        borderColor: "red",
        alignSelf: "flex-end",
        position: "absolute",
    },
    textThreeStyle: {
        borderWidth: 3,
        borderColor: "red",
    },
});

export default BoxScreen;
