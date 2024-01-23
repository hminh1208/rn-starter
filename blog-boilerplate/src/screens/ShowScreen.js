import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Context as BlogContext } from "../context/BlogContext";
import { EvilIcons } from '@expo/vector-icons'

const ShowScreen = ({ navigation }) => {
    const { state } = useContext(BlogContext);

    const blogPost = state.find((post) => post.id === navigation.getParam('id'))

    return (<>
        <Text style={styles.title}>{blogPost.title}</Text>

        <Text style={styles.content}>{blogPost.content}</Text>
    </>)
}

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id')})}>
                <EvilIcons name="pencil" size={30} />
            </TouchableOpacity>
        ),
    };
}

const styles = StyleSheet.create({
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        fontStyle: 'italic'
    }
})

export default ShowScreen;