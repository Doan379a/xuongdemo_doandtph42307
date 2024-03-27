import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { icon } from "../../Image";
import { useNavigation } from "@react-navigation/native";

const Item_dv_Duoc_Chon_nhieu = (props) => {
  const navigation = useNavigation();
  const [clicktimitem, setclicktimitem] = useState(false);
  const { ten, trangthai, anh } = props.data;
  return (
    <TouchableOpacity
      style={[styles.container, { margin: 10 }]}
      onPress={() => {
        navigation.navigate("Chi_tiet_dich_vu", { chuyenItem: props.data });
      }}
    >
      <Image source={{ uri: anh }} style={{ height: 200, width: 150 }} />
      <TouchableOpacity
        onPress={() => setclicktimitem(!clicktimitem)}
        style={{
          position: "absolute",
          height: 20,
          end: 3,
          top: 5,
        }}
      >
        <Image
          source={clicktimitem ? icon.tim2 : icon.tim}
          style={{ height: 20, width: 20, tintColor: "red" }}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.theText,
          { fontSize: 16, fontWeight: "400", width: "auto" },
        ]}
      >
        {ten}
      </Text>
      <Text
        style={[
          styles.theText,
          {
            fontSize: 12,
            fontWeight: "300",
            width: "auto",
            color: trangthai ? "blue" : "red",
          },
        ]}
      >
        {trangthai ? "Đang hoạt động" : "Ngừng hoạt động"}
      </Text>
      {trangthai == false && (
        <View
          style={{
            height: 0.5,
            backgroundColor: "red",
            width: "63%",
            top: -7.5,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default Item_dv_Duoc_Chon_nhieu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: { height: 27, width: 27 },
  theText: { fontSize: 24 },
});
