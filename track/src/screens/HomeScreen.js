import React, {
    useContext,
    useEffect,
} from 'react';

import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { Text } from 'react-native-elements';

import Spacer from '../components/spacer';
import { Context as CategoryContext } from '../context/CategoryContext';
import { Context as TransactionContext } from '../context/TransactionContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

const HomeScreen = ({ navigation }) => {
    const { state: categories, getCategories } = useContext(CategoryContext);
    const { state: transactions, getTransactions } = useContext(TransactionContext);

    useEffect(() => {
        const listener = navigation.addListener("focus", () => {
            //getCategories();

            getTransactions(moment().startOf('month'), moment().endOf('month'), null);
        });
        return listener;
    }, []);

    return (
        <SafeAreaView>
            <StatusBar backgroundColor="blue" barStyle='light-content' />
            <Spacer>
                {/* <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.bgYellow, styles.summaryContainer]} onPress={() => { navigation.push('Category') }}>
                        <Text h4 style={{ marginTop: 10, marginLeft: 10, color: 'black' }}>Category</Text>
                        <Text h4 style={{ marginRight: 10, color: 'black', textAlign: 'right', position: 'absolute', bottom: 10, right: 0 }}>{categories?.data.length}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.bgRed, styles.summaryContainer]} onPress={() => { navigation.navigate('Transaction')}}>
                        <Text h4 style={{ marginTop: 10, marginLeft: 10, color: 'black' }}>Transaction</Text>
                        <Text h4 style={{ marginRight: 10, color: 'black', textAlign: 'right', position: 'absolute', bottom: 10, right: 0 }}>{transactions?.data.length}</Text>
                    </TouchableOpacity>
                </View> */}
                <Text h5 style={{ marginBottom: 10, fontWeight: 'bold' }}>Current month</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.bgWhite, styles.summaryContainer, { marginRight: 5 }]}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <AntDesign name='pluscircleo' size={25} style={{ marginHorizontal: 5, color: 'green' }} />
                            <Text h4 style={{ color: 'green' }}>
                                Income
                            </Text>
                        </View>
                        <Text h4 style={{ marginRight: 10, color: 'green', textAlign: 'right', position: 'absolute', bottom: 10, right: 0 }}>
                            1,000,000đ
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bgWhite, styles.summaryContainer, { marginLeft: 5 }]}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <AntDesign name='minuscircleo' size={25} style={{ marginHorizontal: 5, color: 'red' }} />
                            <Text h4 style={{ color: 'red' }}>
                                Expense
                            </Text>
                        </View>

                        <Text h4 style={{ marginRight: 10, color: 'red', textAlign: 'right', position: 'absolute', bottom: 10, right: 0 }}>
                            200,000,000đ
                            </Text>
                    </TouchableOpacity>
                </View>
            </Spacer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bgYellow: { backgroundColor: 'yellow' },
    bgRed: { backgroundColor: 'red' },
    bgBlue: { backgroundColor: 'blue' },
    bgGreen: { backgroundColor: 'green' },
    bgBrown: { backgroundColor: '#52433e' },
    bgWhite: { backgroundColor: 'white' },
    colorGreen: { color: 'green' },
    summaryContainer: { height: 150, flex: 1, borderRadius: 20 }

});

export default HomeScreen;
