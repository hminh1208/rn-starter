import React from 'react'
import { useContext } from 'react';
import { Text } from 'react-native-elements'
import { TouchableOpacity, View, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Popup } from 'react-native-popup-confirm-toast';
import {
    Context as TransactionContext,
} from '../../context/TransactionContext';

const TransactionGroupByCategory = ({ categories, navigation }) => {
    const { getTransactions, deleteTransaction } = useContext(TransactionContext);

    return (
        categories.data.filter(category => category.Transaction.length > 0).map((category) => {
            return (
                <View style={{ marginVertical: 5 }} key={category.id}>
                    <Text h3 style={{ color: category.is_income ? 'green' : 'red', marginHorizontal: 15 }}>{category.name}</Text>

                    <FlatList
                        data={category.Transaction}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <>
                            <View style={{ flexDirection: 'row', borderColor: 'grey', borderWidth: 1, height: 70, justifyContent: 'space-between', marginHorizontal: 15, marginVertical: 5, borderRadius: 10, backgroundColor: 'white', }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text h4 style={{ marginLeft: 10, color: 'black', paddingTop: 5 }}>{item.transaction_name}</Text>
                                    <Text h5 style={{ marginLeft: 10, color: 'black', paddingTop: 10 }}>{item.transaction_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</Text>
                                </View>

                                <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between', width: 70, paddingRight: 15 }} >
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditTransaction', {
                                                id: item.id
                                            })
                                        }}
                                    >
                                        <Feather name='edit-2' size={25} color='orange' />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() =>
                                            Popup.show({
                                                type: 'confirm',
                                                title: 'Delete',
                                                textBody: `Are you sure you want to delete "${item.transaction_name}" ?`,
                                                buttonText: 'Delete',
                                                okButtonStyle: { backgroundColor: 'red' },
                                                confirmText: 'Cancel',
                                                callback: async () => {
                                                    await deleteTransaction(item.id);
                                                    await getTransactions();
                                                    Popup.hide();
                                                },
                                                cancelCallback: () => {
                                                    Popup.hide();
                                                },
                                            })
                                        }>
                                        <Feather name='trash' size={25} color='red' />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </>}
                    />
                </View>
            )
        })
    )
}

export default TransactionGroupByCategory
