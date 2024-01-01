import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";

const HomeScreen = props => {

  return (
    <View>
      <Text style={styles.text}>Hello World</Text>

      <Button
        onPress={() => props.navigation.navigate('Components')}
        title="Go to the Components Demo" />

      <TouchableOpacity
        onPress={() => console.log('Button pressed')}>
        <Text style={styles.text}>Go to list demo</Text>
      </TouchableOpacity>

    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
