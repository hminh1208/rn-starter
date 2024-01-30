import React, { useEffect } from 'react';

import {
  Text,
  View,
} from 'react-native';

import Spacer from '../components/spacer';

const TransactionScreen = () => {
    useEffect(() => {
        console.log(2222);
    }, []);

    return (
        <View>
            <Spacer>
                <Text>0</Text>
            </Spacer>
        </View>
    )
}

export default TransactionScreen
