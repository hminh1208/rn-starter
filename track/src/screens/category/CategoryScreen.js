import React, {
  useContext,
  useEffect,
} from 'react';

import {
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';
import { Popup } from 'react-native-popup-confirm-toast';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Spacer from '../../components/spacer';
import { Context as CategoryContext } from '../../context/CategoryContext';

const CategoryScreen = ({ navigation }) => {
    const { state, getCategories, deleteCategory } = useContext(CategoryContext);

    useEffect(() => {
        const listener = navigation.addListener("focus", () => {
            getCategories();
        });
        return listener;
    }, []);

    return (
        <View style={{ marginTop: 50 }}>
            <Spacer>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text h2>Categories</Text>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('CreateCategory', {
                            })
                        }}
                    >
                        <Ionicons name='add' size={30} color='red' />
                    </TouchableOpacity>

                </View>

            </Spacer>

            <FlatList
                data={state.data}
                keyExtractor={data => data.id}
                renderItem={({ item }) => <>
                    <View style={{ flexDirection: 'row', borderColor: 'grey', borderWidth: 1, height: 70, justifyContent: 'space-between', marginHorizontal: 15, marginVertical: 10, borderRadius: 10, backgroundColor: 'white', }}>

                        <Text h4 style={{ marginLeft: 10, color: 'black', paddingTop: 15, color: item.is_income ? 'green' : 'red' }}>{item.name}</Text>

                        <View style={{ flexDirection: 'row', paddingTop: 15, justifyContent: 'space-between', width: 90, paddingRight: 15 }} >
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('EditCategory', {
                                        id: item.id
                                    })
                                }}
                            >
                                <Feather name='edit-2' size={30} color='orange' />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() =>
                                    Popup.show({
                                        type: 'confirm',
                                        title: 'Delete',
                                        textBody: `Are you sure you want to delete "${item.name}" ?`,
                                        buttonText: 'Delete',
                                        okButtonStyle: { backgroundColor: 'red' },
                                        confirmText: 'Cancel',
                                        callback: async () => {
                                            await deleteCategory(item.id);
                                            await getCategories();
                                            Popup.hide();
                                        },
                                        cancelCallback: () => {
                                            Popup.hide();
                                        },
                                    })
                                }>
                                <Feather name='trash' size={30} color='red' />
                            </TouchableOpacity>
                        </View>

                    </View>
                </>}
            />
        </View>
    )
}

export default CategoryScreen
