import React, { useReducer, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

const reducer = (state, action) => {};

const TextScreen = () => {
    const [state, dispatch] = useReducer(reducer, { counter: 0 });

    const [password, setPassword] = useState('')

    return (
        <View>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                value={password}
                onChangeText={(newValue) => setPassword(newValue)}
            />

            {password.length < 4 ? <Text>Psasword must be 4 characters</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        margin: 15,
        borderColor: "black",
        borderWidth: 1,
    },
});

export default TextScreen;
