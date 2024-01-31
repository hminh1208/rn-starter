import React, {
  useContext,
  useEffect,
} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';

import Spacer from '../components/spacer';
import { Context as CategoryContext } from '../context/CategoryContext';

const HomeScreen = ({ navigation }) => {
    const { state, getCategories } = useContext(CategoryContext);

    useEffect(() => {
        const listener = navigation.addListener("focus", () => {
            getCategories();
        });
        return listener;
    }, []);

    return (
        <View style={{ marginTop: 50 }}>
            <Spacer>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.bgYellow, styles.summaryContainer]} onPress={() => { navigation.push('Category') }}>
                        <Text h4 style={{ marginTop: 10, marginLeft: 10, color: 'black' }}>Category</Text>
                        <Text h4 style={{ marginRight: 10, color: 'black', textAlign: 'right', position: 'absolute', bottom: 10, right: 0 }}>{state.data.length}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.bgRed, styles.summaryContainer]}>
                        <Text h4 style={{ marginTop: 10, marginLeft: 10, color: 'black' }}>Transaction</Text>
                        <Text h4 style={{ marginRight: 10, color: 'black', textAlign: 'right', position: 'absolute', bottom: 10, right: 0 }}>{state.data.length}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.bgGreen, styles.summaryContainer]}>
                        <Text h4 style={{ marginTop: 10, marginLeft: 10, color: 'white' }}>Income</Text>
                        <Text h4 style={{ marginRight: 10, color: 'black', textAlign: 'right', position: 'absolute', bottom: 10, right: 0, color: 'white' }}>1,000,000đ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bgBlue, styles.summaryContainer]}>
                        <Text h4 style={{ marginTop: 10, marginLeft: 10, color: 'white' }}>Expense</Text>
                        <Text h4 style={{ marginRight: 10, color: 'black', textAlign: 'right', position: 'absolute', bottom: 10, right: 0, color: 'white' }}>200,000,000đ</Text>
                    </TouchableOpacity>
                </View>
            </Spacer>
        </View>
    )
}

const styles = StyleSheet.create({
    bgYellow: { backgroundColor: 'yellow' },
    bgRed: { backgroundColor: 'red' },
    bgBlue: { backgroundColor: 'blue' },
    bgGreen: { backgroundColor: 'green' },
    summaryContainer: { height: 150, flex: 1, borderRadius: 20, margin: 5 }

});

export default HomeScreen;
