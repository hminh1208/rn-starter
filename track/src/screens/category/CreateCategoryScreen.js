import React, {
  useContext,
  useState,
} from 'react';

import { View } from 'react-native';
import {
  Button,
  CheckBox,
  Input,
  Text,
} from 'react-native-elements';

import { Context as CategoryContext } from '../../context/CategoryContext';

function CreateCategoryScreen({ navigation }) {
    const { state, createCategory } = useContext(CategoryContext);
    const [ isIncome, setIsIncome] = React.useState(false);

    const [name, setName] = useState('');

    return (
        <>
            <View
                style={{ flex: 1, flexDirection: 'column', marginTop: 50 }}>

                <Input
                    label='Category Name'
                    value={name}
                    onChangeText={setName}
                    autoCapitalize='none'
                    autoCorrect={false} />

                <CheckBox
                    title='Is Income'
                    checked={isIncome}
                    onPress={() => setIsIncome(!isIncome)}
                    iconType="material-community"
                    checkedIcon="checkbox-outline"
                    uncheckedIcon={'checkbox-blank-outline'}
                />

                {state.errorMessage ? <Text h5 style={{ color: 'red', marginHorizontal: 10, fontSize: 16 }}>{state.errorMessage}</Text> : null}

                <View style={{ marginHorizontal: 10 }}>
                    <Button
                        title='Create New'
                        onPress={() => createCategory(name, isIncome, navigation)} />
                </View>

            </View>
        </>
    )
}

export default CreateCategoryScreen
