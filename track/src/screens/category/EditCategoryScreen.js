import React, {
  useContext,
  useState,
} from 'react';

import { View } from 'react-native';
import {
  Button,
  Input,
  Text,
} from 'react-native-elements';

import { Context as CategoryContext } from '../../context/CategoryContext';

function EditCategoryScreen({ route, navigation }) {
    const { id } = route.params;
    const { state, saveCategory } = useContext(CategoryContext);

    const category = state.data.find(x => x.id === id);

    const [name, setName] = useState(category?.name);

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

                {state.errorMessage ? <Text h5 style={{ color: 'red', marginHorizontal: 10, fontSize: 16 }}>{state.errorMessage}</Text> : null}

                <View style={{ marginHorizontal: 10 }}>
                    <Button
                        title='Update'
                        onPress={() => saveCategory({ ...category, name: name }, navigation)} />
                </View>

            </View>
        </>
    )
}

export default EditCategoryScreen
