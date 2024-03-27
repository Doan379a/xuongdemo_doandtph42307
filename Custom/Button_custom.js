import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const Button_custom = ({ noidung, onPress, style, styleText }) => {
  return (
    <TouchableOpacity style={[styles.buton, style]} onPress={onPress}>
      <Text style={[styles.text, styleText]}>{noidung}</Text>
    </TouchableOpacity>
  );
};

export default Button_custom;

const styles = StyleSheet.create({
  buton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: "#3d8f7a",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
});
