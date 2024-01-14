import React, { useReducer } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const reducer = (state, action) => {
    switch (action.type) {
        case "increase":
            return { counter: state.counter + 1 };
        case "decrease":
            return { counter: state.counter - 1 };
        default:
            break;
    }
};

const CounterScreen = () => {
    const [state, dispatch] = useReducer(reducer, { counter: 0 });

    return (
        <View>
            <Button
                style={styles.button}
                onPress={() => dispatch({ type: "increase" })}
                title="Increase counter"
            />

            <Button
                style={styles.button}
                onPress={() => dispatch({ type: "decrease" })}
                title="Decrease counter"
            />

            <Text>Current count: {state.counter}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 45,
    },
    subHeaderStyle: {
        fontSize: 20,
    },
    button: {
        marginBottom: 10,
    },
});

export default CounterScreen;
