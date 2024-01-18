import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const SearchBar = ({ term, onSearchTermChange, onTermSubmit }) => {
    return (
        <View style={styles.backgroundStyle}>
            <Feather name="search" style={styles.icon} />
            <TextInput
                placeholder="Search"
                style={styles.textInput}
                value={term}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={onSearchTermChange}
                onEndEditing={onTermSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: "#F0EEEE",
        height: 50,
        borderRadius: 5,
        flexDirection: "row",
        verticalAlign: "center",
        marginHorizontal: 15
    },
    icon: {
        alignSelf: "center",
        fontSize: 30,
        marginHorizontal: 15,
    },
    textInput: {
        flex: 1,
    },
});

export default SearchBar;
