import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";

const HomeScreen = (props) => {
  return (
    <View>
      <Text style={styles.text}>Hello World</Text>

      <Button
        style={styles.button}
        onPress={() => props.navigation.navigate("Components")}
        title="Go to the Components Demo"
      />

      <Button
        style={styles.button}
        onPress={() => props.navigation.navigate("List")}
        title="Go to the List Demo"
      />

      <Button
        style={styles.button}
        onPress={() => props.navigation.navigate("Image")}
        title="Go to the Image Screen"
      />

      <TouchableOpacity onPress={() => console.log("Button pressed")}>
        <Text style={styles.text}>Go to list demo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  button: {
    marginBottom: 10,
  },
});

export default HomeScreen;
