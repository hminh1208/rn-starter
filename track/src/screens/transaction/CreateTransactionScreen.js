import React, {
    useContext,
    useEffect,
    useState,
} from 'react';

import moment from 'moment';
import {
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import DateRangePicker from 'react-native-daterange-picker';
import { Dropdown } from 'react-native-element-dropdown';
import {
    Button,
    Input,
    Text,
} from 'react-native-elements';

import { Context as CategoryContext } from '../../context/CategoryContext';
import {
    Context as TransactionContext,
} from '../../context/TransactionContext';
import Spacer from '../../components/spacer';

function CreateTransactionScreen({ navigation }) {
    const { state: transactions, createTransaction } = useContext(TransactionContext)
    const { state: categories, getCategories } = useContext(CategoryContext)

    const [tName, setTName] = useState('')
    const [tAmount, setTAmount] = useState('')
    const [tCategoryId, setTCategoryId] = useState(null);
    const [tDate, setTDate] = useState({
        date: moment(),
        displayedDate: moment(),
    })

    const setDates = (dates) => {
        setTDate({ ...tDate, ...dates, });
    };

    useEffect(() => {
        const listener = navigation.addListener("focus", () => {
            getCategories();
        });
        return listener;
    }, []);

    return (
        <>
            <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
                <Spacer>
                    <Input
                        label='Transaction Name'
                        value={tName}
                        onChangeText={setTName}
                        autoCapitalize='none'
                        autoCorrect={false} />

                    <Input
                        label='Transaction Amount'
                        value={tAmount}
                        onChangeText={setTAmount}
                        autoCapitalize='none'
                        autoCorrect={false} />

                    <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Transaction Category</Text>
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
                            value={tCategoryId}
                            onChange={item => {
                                setTCategoryId(item.id);
                            }}
                        />
                    </View>

                    <>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', marginVertical: 10, marginHorizontal: 10 }}>Transaction Date</Text>
                        <DateRangePicker
                            onChange={setDates}
                            date={tDate.date}
                            displayedDate={tDate.displayedDate}
                        >
                            <Text style={{ marginBottom: 15, marginHorizontal: 10, fontSize: 18, borderBottomColor: 'grey', borderBottomWidth: 1 }}>{tDate.date.format('DD-MM-YYYY')}</Text>
                        </DateRangePicker>
                    </>

                    {transactions.errorMessage ? <Text h5 style={{ color: 'red', marginHorizontal: 10, fontSize: 16 }}>{state.errorMessage}</Text> : null}

                    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        <Button
                            title='Create New'
                            onPress={() => createTransaction({
                                transaction_name: tName,
                                transaction_amount: tAmount,
                                transaction_date: tDate.date,
                                category_id: tCategoryId
                            }, navigation)} />

                    </View>

                    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        <Button
                            buttonStyle={{ backgroundColor: 'grey' }}
                            title='Cancle'
                            onPress={() => navigation.goBack()} />
                    </View>
                </Spacer>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 18,
    },
    selectedTextStyle: {
        fontSize: 18,
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

export default CreateTransactionScreen
