import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const ResultsList = ({ title, results }) => {
    return (
        <View>
            <Text style={styles.title}>
                {title} ({results.length})
            </Text>

            <FlatList
                horizontal
                data={results}
                keyExtractor={(reults) => results.id}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default ResultsList;
