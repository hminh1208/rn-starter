import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import { Feather } from '@expo/vector-icons'

const IndexScreen = ({ navigation }) => {
    const { state, getBlogPosts, deleteBlogPost } = useContext(BlogContext);

    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        return () => {
            listener.remove();
        };
    }, []);

    if (state.length > 0) {
        return (<View>
            <FlatList
                data={state}
                keyExtractor={(post) => post.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {

                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title}</Text>

                                <Text style={styles.content}>{item.content}</Text>

                                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    <Feather name="trash" style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity >
                    )

                }} />
        </View >)
    }
    else {
        return (<Text style={styles.title}>Nothing here</Text>)
    }
}

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>
        ),
    };
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderColor: 'grey',
        borderBottomWidth: 1,
    },
    icon: {
        fontSize: 24,
        color: 'red',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        fontSize: 18,
        textAlign: 'center',
    }
});

export default IndexScreen;