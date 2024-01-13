import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ColorCounter = ({ color, onIncrease, onDecrease }) => {
    return (
        <View>
            <Text style={styles.text}>{color}</Text>

            <Button
                style={styles.button}
                onPress={() => onIncrease()}
                title={`Increase ${color}`}
            />

            <Button
                style={styles.button}
                onPress={() => onDecrease()}
                title={`Decrease ${color}`}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        fontWeight: 700
    }
});

export default ColorCounter;
