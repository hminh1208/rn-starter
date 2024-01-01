import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageDetail from "../components/ImageDetail";

const ImageScreen = () => {
  return (
    <View>
      <ImageDetail
        title="Beach"
        score="5"
        imgSource={require("../../assets/images/beach.jpg")}
      />

      <ImageDetail
        title="Forest"
        score="6"
        imgSource={require("../../assets/images/forest.jpg")}
      />

      <ImageDetail
        title="Mountain"
        score="7"
        imgSource={require("../../assets/images/mountain.jpg")}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImageScreen;
