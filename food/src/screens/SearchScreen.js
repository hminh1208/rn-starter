import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
    const [term, setTerm] = useState("");
    const [searchApi, results, errorMsg] = useResults();

    const filterResultsByPrice = (price) => {
        return results.filter((results) => {
            return results.price === price;
        });
    };

    return (
        <View style={styles.background}>
            <SearchBar
                term={term}
                onSearchTermChange={(newTerm) => setTerm(newTerm)}
                onTermSubmit={searchApi}
            />

            {errorMsg ? (
                <Text>{errorMsg}</Text>
            ) : (
                <ScrollView style={{ marginTop: 10 }}>
                    <ResultsList
                        title="Cost Effective"
                        results={filterResultsByPrice("$")}
                    />
                    <ResultsList
                        title="Bit Pricier"
                        results={filterResultsByPrice("$$")}
                    />
                    <ResultsList
                        title="Big Spender"
                        results={filterResultsByPrice("$$$")}
                    />
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#FFF",
        flex: 1,
    },
});

export default SearchScreen;
