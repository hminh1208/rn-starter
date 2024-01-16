import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

const SearchScreen = () => {
    const [term, setTerm] = useState('');

    return (
        <View style={styles.background}>
            <SearchBar
                term={term}
                onSearchTermChange={(newTerm) => setTerm(newTerm)}
                onTermSubmit={() => console.log('Term was submitted')}
            />

            <Text>{term}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#FFF",
        height: "100%",
        padding: 10
    },
});

export default SearchScreen;
