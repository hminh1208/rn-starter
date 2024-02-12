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
import Ionicons from 'react-native-vector-icons/Ionicons';

import Spacer from '../../components/spacer';
import {
    Context as TransactionContext,
} from '../../context/TransactionContext';
import TransactionGroupByCategory from '../../components/transactions/TransactionGroupByCategory';
import TransactionGroupByDate from '../../components/transactions/TransactionFlatList';

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
                <View style={{ borderColor: 'grey', borderWidth: 1, height: 50, marginHorizontal: 15, marginVertical: 5, borderRadius: 10, backgroundColor: 'white' }}>
                    <Text style={[{ color: 'black', textAlign: 'center', marginTop: 13 }, styles.placeholderStyle]}>{state.startDate?.format('YYYY-MM-DD')} - {state.endDate?.format('YYYY-MM-DD')}</Text>
                </View>
            </DateRangePicker>

            <View style={{ borderColor: 'grey', borderWidth: 1, height: 50, marginHorizontal: 15, marginVertical: 5, borderRadius: 10, backgroundColor: 'white', }}>
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

            {/* <TransactionGroupByCategory categories={categories} navigation={navigation} /> */}

            <TransactionGroupByDate categories={categories} navigation={navigation} />

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
