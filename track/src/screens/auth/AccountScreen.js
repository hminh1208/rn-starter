import React, { useContext } from 'react';

import { View } from 'react-native';
import { Button } from 'react-native-elements';

import Spacer from '../../components/spacer';
import { Context as AuthContext } from '../../context/AuthContext';

const AccountScreen = () => {
    const { state, signout } = useContext(AuthContext);

    return (
        <View>
            <Spacer >
                <Button
                    title='Sign Out'
                    onPress={signout} />
            </Spacer>
        </View>
    )
}


export default AccountScreen
