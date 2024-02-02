import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import moment from 'moment';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DateRangePicker from 'react-native-daterange-picker';
import { Dropdown } from 'react-native-element-dropdown';
import {
  Divider,
  Text,
} from 'react-native-elements';
import { Popup } from 'react-native-popup-confirm-toast';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Spacer from '../../components/spacer';
import {
  Context as TransactionContext,
} from '../../context/TransactionContext';

const TransactionScreen = ({ navigation }) => {
    const [fCategoryId, setFCategoryId] = useState(null);

    const { state: categories, getTransactions } = useContext(TransactionContext);

    const [state, setState] = useState({
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        displayedDate: moment(),
    })

    setDates = (dates) => {
        setState({ ...state, ...dates, });
    };

    useEffect(() => {
        const listener = navigation.addListener("focus", () => {
            getTransactions();
        });
        return listener;
    }, []);

    return (
        <ScrollView style={{ marginTop: 50 }}>
            <Spacer>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text h2>Transactions</Text>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('CreateTransaction', {
                            })
                        }}
                    >
                        <Ionicons name='add' size={30} color='red' />
                    </TouchableOpacity>
                </View>
            </Spacer>

            <DateRangePicker
                onChange={this.setDates}
                endDate={state.endDate}
                startDate={state.startDate}
                displayedDate={state.displayedDate}
                range
            >
                <View style={{ borderColor: 'grey', borderWidth: 1, height: 50, marginHorizontal: 15, marginVertical: 10, borderRadius: 10, backgroundColor: 'white', }}>
                    <Text h4 style={{ color: 'black', textAlign: 'center', marginTop: 10 }}>{state.startDate.format('YYYY-MM-DD')} - {state.endDate.format('YYYY-MM-DD')}</Text>
                </View>
            </DateRangePicker>

            <View style={{ borderColor: 'grey', borderWidth: 1, height: 50, marginHorizontal: 15, marginVertical: 10, borderRadius: 10, backgroundColor: 'white', }}>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={categories.data}
                    search
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder="Select category"
                    searchPlaceholder="Search..."
                    value={fCategoryId}
                    onChange={item => {
                        setFCategoryId(item.id);
                    }}
                />
            </View>

            <Divider />

            <>
                {
                    categories.data.filter(category => category.Transaction.length > 0).map((category) => {
                        return <View style={{ marginVertical: 10 }} key={category.id}>
                            <Text h3 style={{ color: 'green', marginHorizontal: 15 }}>{category.name}</Text>

                            <FlatList
                                data={category.Transaction}
                                scrollEnabled={false}
                                keyExtractor={(item, index) => Math.random().toString()}
                                renderItem={({ item }) => <>
                                    <View style={{ flexDirection: 'row', borderColor: 'grey', borderWidth: 1, height: 70, justifyContent: 'space-between', marginHorizontal: 15, marginVertical: 10, borderRadius: 10, backgroundColor: 'white', }}>
                                        <Text h4 style={{ marginLeft: 10, color: 'black', paddingTop: 15 }}>{item.id} - {item.transaction_name} - {item.transaction_amount}đ</Text>

                                        <View style={{ flexDirection: 'row', paddingTop: 15, justifyContent: 'space-between', width: 90, paddingRight: 15 }} >
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate('EditTransaction', {
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
                                                        textBody: `Are you sure you want to delete "${item.transaction_name}" ?`,
                                                        buttonText: 'Delete',
                                                        okButtonStyle: { backgroundColor: 'red' },
                                                        confirmText: 'Cancel',
                                                        callback: async () => {
                                                            await getTransactions();
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

                            <Divider />
                        </View>

                    })
                }
            </>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 18,
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontSize: 18,
        textAlign: 'center'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default TransactionScreen
