import React from 'react';

import {
  Text,
  View,
} from 'react-native';

import Spacer from '../components/spacer';
import { Context as CategoryContext } from '../context/CategoryContext';

const HomeScreen = () => {
    const { state, getCategories } = useContext(CategoryContext);

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <View>
            <Spacer>
                <Text>{state.data.length}</Text>
            </Spacer>
        </View>
    )
}

export default HomeScreen
