import React from 'react'
import { useContext } from 'react';
import { Text } from 'react-native-elements'
import { TouchableOpacity, View, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Popup } from 'react-native-popup-confirm-toast';
import moment from 'moment';
import {
    Context as TransactionContext,
} from '../../context/TransactionContext';

const TransactionGroupByDate = ({ categories, navigation }) => {
    const { getTransactions, deleteTransaction } = useContext(TransactionContext);

    var sortedTransactions = categories.data.filter(category => category.Transaction.length > 0).map(category => category.Transaction).flat().sort((a, b) => a.created_at <= b.created_at ? 1 : -1)

    return (
        <View style={{ marginVertical: 5 }}>
            <FlatList
                data={sortedTransactions}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <>
                    <View style={{ flexDirection: 'row', borderColor: 'grey', borderWidth: 1, height: 60, justifyContent: 'space-between', marginHorizontal: 15, marginVertical: 5, borderRadius: 10, backgroundColor: 'white', }}>
                        <TouchableOpacity style={{ flexDirection: 'column' }} onPress={() => {
                            navigation.navigate('EditTransaction', {
                                id: item.id
                            })
                        }}>
                            <Text h5 style={{ marginLeft: 10, color: 'black', paddingTop: 5, fontWeight: 'bold' }}>{`> ${item.transaction_name}`}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text h5 style={{ color: categories.data.filter(x => x.id == item.category_id)[0].is_income ? 'green' : 'red', paddingTop: 10, marginLeft: 10 }}>{categories.data.filter(x => x.id == item.category_id)[0].name}</Text>
                                <Text h5 style={{ marginLeft: 10, color: 'black', paddingTop: 10 }}>{moment(item.transaction_date).format('DD/MM/yyyy')}</Text>
                                <Text h5 style={{ marginLeft: 10, color: 'black', paddingTop: 10 }}>{item.transaction_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', right: 10, alignSelf: 'center' }} >
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
}

export default TransactionGroupByDate
