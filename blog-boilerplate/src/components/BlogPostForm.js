import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const BlogPostForm = ({ blogPost, onSubmit },) => {

    const [id, _] = useState(blogPost?.id)
    const [title, setTitle] = useState(blogPost?.title)
    const [content, setContent] = useState(blogPost?.content)

    return (<View style={{ marginTop: 10 }}>
        <Text
            style={styles.label}>Enter title:</Text>

        <TextInput
            value={title}
            onChangeText={(newTitle) => { setTitle(newTitle) }}
            style={styles.input} />

        <Text
            style={styles.label}>Enter content:</Text>

        <TextInput
            value={content}
            onChangeText={(newContent) => { setContent(newContent) }}
            style={styles.input} />

        <View style={{ marginHorizontal: 5 }}>
            <Button
                title="Save Blog Post"
                onPress={() => onSubmit(id, title, content, () => {
                    navigation.pop();
                })} />
        </View>

    </View>)
};

BlogPostForm.defaultProps = {
    blogPost: {
        title: '',
        content: ''
    }
};

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
})

export default BlogPostForm;