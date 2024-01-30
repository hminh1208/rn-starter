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

import Spacer from '../components/spacer';
import { Context as CategoryContext } from '../context/CategoryContext';

const CategoryScreen = () => {
    const { state, getCategories } = useContext(CategoryContext);

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <View style={{ marginTop: 50 }}>
            <Spacer>
                <Text h2>Categories</Text>
            </Spacer>

            <FlatList
                data={state.data}
                keyExtractor={data => data.id}
                renderItem={({ item }) => <>
                    <View style={{ flexDirection: 'row', borderColor: 'grey', borderWidth: 1, height: 70, justifyContent: 'space-between', marginHorizontal: 15, marginVertical: 10, borderRadius: 10, backgroundColor: 'white', }}>
                        <Text h4 style={{ marginLeft: 10, color: 'black', paddingTop: 15 }}>{item.name}</Text>

                        <View style={{ flexDirection: 'row', paddingTop: 15, justifyContent: 'space-between', width: 90, paddingRight: 15 }} >
                            <TouchableOpacity
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
                                        callback: () => {
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
