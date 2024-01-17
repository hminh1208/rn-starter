import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ReultsList";

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
                <View>
                    <ResultsList title="Cost Effective" results={filterResultsByPrice("$")} />
                    <ResultsList title="Bit Pricier" results={filterResultsByPrice("$$")} />
                    <ResultsList title="Big Spender" results={filterResultsByPrice("$$$")} />
                </View>
            )}
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
