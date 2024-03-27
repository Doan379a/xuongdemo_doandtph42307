import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

const TIP_tim_kiem = ({
  placeholder,
  style,
  onPressCamera,
  onPressMic,
  onChangeText,
  value,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={[styles.input, style]}
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity style={{ position: "absolute", top: 12, start: 4 }}>
        <Image
          style={{
            height: 30,
            width: 30,
          }}
          source={{
            uri: "https://img.icons8.com/?size=30&id=59878&format=png",
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: 12,
          end: 0,
          justifyContent: "space-between",
          width: "20%",
        }}
      >
        <TouchableOpacity onPress={onPressCamera}>
          <Image
            style={{
              height: 30,
              width: 30,
            }}
            source={{
              uri: "https://img.icons8.com/?size=50&id=11741&format=png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressMic}>
          <Image
            style={{
              height: 28,
              width: 28,
              resizeMode: "cover",
            }}
            source={{
              uri: "https://cdn-icons-png.freepik.com/256/738/738826.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TIP_tim_kiem;

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    height: 50,
    backgroundColor: "#F7F7F7",
    paddingStart: 40,
    paddingTop: 5,
  },
});
