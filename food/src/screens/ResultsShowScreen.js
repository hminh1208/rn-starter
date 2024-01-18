import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);

    const getResult = async (id) => {
        try {
            const response = await yelp.get(`/${id}`);
        setResult(response.data);
        } catch (error) {
            console.log(error.toJSON())
        }
        
    };

    useEffect(()=>{
        getResult(navigation.getParam('id'));
    }, [])

    if(!result){
        return null;
    }

    return (
        <>
            <FlatList
                data={result.photos}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(result) => result}
                renderItem={({ item }) => {
                    return (
                        <Image source={{ uri: item} } style={styles.image}/>
                    );
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    image:{
        height: 200,
        marginBottom: 5,
        borderRadius: 5,
        margin: 10
    }
});

export default ResultsShowScreen;
