import React, { useContext, useState } from "react";
import { StyleSheet } from 'react-native'
import { Context as BlogContext } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const CreateScreen = ({ navigation }) => {
    const { addBlogPost } = useContext(BlogContext);

    return <BlogPostForm
        onSubmit={(id, title, content) => {
            addBlogPost(id, title, content, () => {
                navigation.navigate('Index');
            })
        }}
    />
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
        padding: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    buttons: {
        height: 500,
        marginVertical: 5
    }
})

export default CreateScreen;