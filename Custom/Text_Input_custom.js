import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { icon } from "../Image";

const TextInputCustom = ({
  placeholder,
  title,
  value,
  onChangeText,
  error,
  keyboardType,
  style,
  styleerror,
  numberOfLines,
}) => {
  const [isclick, setisclick] = useState(false);
  const [hienmk, sethienmk] = useState(true);
  const handleFocus = () => {
    setisclick(true);
  };
  const handleBlur = () => {
    setisclick(false);
  };
  const handhienmk = () => {
    if (placeholder === "Nhập mật khẩu") {
      return hienmk;
    } else {
      return false; // Trả về false cho các trường khác ngoài "Mật khẩu"
    }
  };
  return (
    <View>
      <TextInput
        style={[
          isclick ? styles.inputnhaptext : styles.inputchuanhaptext,
          error ? styles.inputerr : null,
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={isclick ? "black" : "gray"}
        onChangeText={onChangeText}
        value={value}
        onBlur={handleBlur}
        onFocus={handleFocus}
        keyboardType={keyboardType}
        secureTextEntry={handhienmk()} // Gọi handhienmk() để thiết lập secureTextEntry
        numberOfLines={numberOfLines}
      />
      {error ? (
        <Image
          source={{
            uri: "https://img.icons8.com/?size=80&id=42452&format=png",
          }}
          style={[
            {
              height: 12,
              width: 12,
              position: "absolute",
              start: 3,
              tintColor: "red",
              top: 18,
            },
            styleerror,
          ]}
        />
      ) : null}
      {placeholder === "Nhập mật khẩu" && (
        <TouchableOpacity
          onPress={() => {
            sethienmk(!hienmk);
          }}
          style={{
            height: "100%",
            aspectRatio: 1,
            position: "absolute",
            end: -45,
            top: 14,
          }}
        >
          {hienmk ? (
            <Image
              source={icon.matdong}
              style={{
                height: "30%",
                width: "30%",
                tintColor: "#603939",
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={icon.mat}
              style={{
                height: "30%",
                width: "30%",
                tintColor: "#603939",
              }}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      )}
      {error ? (
        <Text
          style={{
            color: "red",
            marginStart: 20,
            fontSize: 13,
            position: "absolute",
            bottom: 5,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default TextInputCustom;
const styles = StyleSheet.create({
  inputerr: {
    // borderRadius: 10,
    borderWidth: 0.5,
    marginBottom: 30,
    borderColor: "red",
    backgroundColor: "white",
    borderColor: "#ff6666",
    fontSize: 13,
    borderRadius: 10,
    opacity: 0.6,
    backgroundColor: "#ffcccc",
    paddingHorizontal: 17,
  },
  inputnhaptext: {
    // borderRadius: 10,
    marginBottom: 30,
    borderColor: "rgba(102, 0, 0,0.3)",
    fontSize: 13,
    backgroundColor: "rgba(102, 0, 0,0.3)",
    borderRadius: 10,
    paddingHorizontal: 17,
  },
  inputchuanhaptext: {
    // borderRadius: 10,
    marginBottom: 30,
    borderColor: "#DAD1C5",
    fontSize: 13,
    backgroundColor: "rgba(99, 54, 54,0.3)",
    borderRadius: 10,
    paddingHorizontal: 17,
  },
});
