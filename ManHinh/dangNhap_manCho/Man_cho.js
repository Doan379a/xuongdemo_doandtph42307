import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import { imgbackgr } from "../../Image";
import Button_custom from "../../Custom/Button_custom";
import { useNavigation } from "@react-navigation/native";

const Man_cho = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <ImageBackground
        source={imgbackgr.backgrMC}
        style={{
          flex: 1,
          backgroundColor: "rgba(75, 53, 25, 0.2)",
          justifyContent: "space-between",
        }}
      >
        <Image source={imgbackgr.logo} style={styles.image} />
        <View style={{ height: 300, justifyContent: "center" }}>
          <Text style={styles.theText}>HI,WELLCOME</Text>
          <View style={{ opacity: 0.5 }}>
            <Button_custom
              noidung="Đăng nhập"
              style={styles.buttom}
              onPress={() => {
                navigation.navigate("MH_dang_nhap");
              }}
            />
            <Button_custom noidung="Đăng Ký" style={styles.buttom} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Man_cho;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between" },
  buttom: {
    backgroundColor: "rgba(102, 0, 0, 0.6)",
    bottom: 0,
    borderRadius: 20,
  },
  theText: {
    textAlign: "center",
    fontSize: 28,
    color: "black",
  },
  image: {
    borderRadius: 50,
  },
});
