import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "react-native";

const ImageDetail = (props) => {
  return (
    <View>
      <Image style={styles.image} source={props.imgSource}></Image>

      <Text style={styles.text}>{props.title}</Text>

      <Text style={styles.text}>Image score - {props.score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  image:{
    width: "100%",
  }
});

export default ImageDetail;
