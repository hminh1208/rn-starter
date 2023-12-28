import React from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'

const ListScreen = () => {

    const friends = [
        { key: '1', name: 'Friends #1', age: 20 },
        { key: '2', name: 'Friends #2', age: 20 },
        { key: '3', name: 'Friends #3', age: 20 },
        { key: '4', name: 'Friends #4', age: 20 },
        { key: '5', name: 'Friends #5', age: 20 },
    ]

    const view = <View>
        <FlatList
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(friend) => friend.key}
            data={friends}
            renderItem={(element) => {
                return <Text style={styles.textStyle}>{element.item.name} - Age {element.item.age}</Text>
            }}
        />
    </View>

    return view;
}

const styles = StyleSheet.create({
    textStyle :{
        marginVertical: 50
    }
});

export default ListScreen;
