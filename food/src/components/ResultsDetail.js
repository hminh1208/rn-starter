import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const ResultsDetail = ({ result }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: result.image_url }} style={styles.image} />

            <Text style={styles.title}>{result.name}</Text>

            <Text style={styles.rating}>
                {result.rating} Star(s), {result.review_count} Review(s)
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
    },
    image: {
        height: 150,
        width: 250,
        borderRadius: 5,
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
    },
    rating: {
        color: "gray",
        marginTop: 5,
        fontSize: 12,
    },
});

export default ResultsDetail;
