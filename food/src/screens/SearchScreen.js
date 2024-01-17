import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import yelp from "../api/yelp";

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const searchApi = async () => {
        try {
            const response = await yelp.get("/search", {
                params: {
                    limit: 50,
                    term,
                    location: "san jose",
                },
            });

            setResults(response.data.businesses);
        } catch (error) {
            //console.log(error.toJSON())

            setErrorMsg('Something went wrong')
        }
    };

    return (
        <View style={styles.background}>
            <SearchBar
                term={term}
                onSearchTermChange={(newTerm) => setTerm(newTerm)}
                onTermSubmit={searchApi}
            />

            {errorMsg ? <Text>{errorMsg}</Text> : <Text>We found {results.length} results</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#FFF",
        height: "100%",
        padding: 10,
    },
});

export default SearchScreen;
