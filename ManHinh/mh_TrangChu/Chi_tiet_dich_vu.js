import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icon } from "../../Image";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { API_URL, GET_LIST_DICH_VU } from "../../linkapi/diaChi_api";
const Top = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 20,
        height: 50,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        style={{ height: 30 }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={icon.back} style={{ height: 30, width: 30 }} />
      </TouchableOpacity>
      <Text
        style={{
          width: "80%",
          fontSize: 25,
          textAlign: "center",
        }}
      >
        Chi tiết dịch vụ
      </Text>
      <TouchableOpacity style={{ height: 25 }}>
        <Image
          source={{ uri: "https://img.icons8.com/?size=50&id=364&format=png" }}
          style={{ height: 25, width: 25 }}
        />
      </TouchableOpacity>
    </View>
  );
};
const Chi_tiet_dich_vu = () => {
  const router = useRoute();
  const chuyenItem = router.params?.chuyenItem;
  const [moTa, setmoTa] = useState(true);
  const [danhSachGoiY, setdanhSachGoiY] = useState([]);
  console.log(chuyenItem.mota);
  useEffect(() => {
    axios
      .get(`${API_URL}${GET_LIST_DICH_VU}`)
      .then((response) => {
        setdanhSachGoiY(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Top />
      <FlatList
        showsVerticalScrollIndicator={false}
        overScrollMode="never" // Ngăn chặn hiệu ứng "bóng" khi vuốt tới cuối danh sách
        overScrollColor="transparent" // Đặt màu sắc của hiệu ứng bóng là transparent
        ListHeaderComponent={
          <View style={{ flex: 1 }}>
            <StatusBar
              // translucent
              barStyle="dark-content"
              backgroundColor="white"
            />
            <Image source={{ uri: chuyenItem?.anh }} style={styles.image} />
            <View style={styles.content}>
              {/* Cục 1 */}
              <View
                style={[
                  styles.flex_ngang,
                  { justifyContent: "space-between", marginBottom: 10 },
                ]}
              >
                <Text style={styles.theText}>{chuyenItem.ten}</Text>
                <TouchableOpacity style={{ height: 25, top: 5 }}>
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=50&id=3447&format=png",
                    }}
                    style={{ height: 25, width: 25, resizeMode: "cover" }}
                  />
                </TouchableOpacity>
              </View>
              {/* Cục 2 */}
              <Text
                style={[
                  styles.theText,
                  {
                    fontSize: 13,
                    color: chuyenItem?.trangthai ? "blue" : "red",
                  },
                ]}
              >
                {chuyenItem?.trangthai ? "Đang hoạt động" : "Ngừng hoạt động"}
              </Text>
              {chuyenItem?.trangthai == false && (
                <View
                  style={{
                    height: 0.5,
                    backgroundColor: "red",
                    top: -7.8,
                    width: "28%",
                  }}
                />
              )}
              <Text
                style={[
                  styles.theText,
                  { fontWeight: "300", fontSize: 24, color: "red" },
                ]}
              >
                $ {chuyenItem?.gia}
              </Text>
            </View>
            <View style={[styles.content_mota]}>
              <TouchableOpacity
                onPress={() => setmoTa(!moTa)}
                style={[styles.flex_ngang, { justifyContent: "space-between" }]}
              >
                <Text style={[styles.theText]}>Mô tả</Text>
                <Image
                  style={[styles.imgaIcon, { top: 6 }]}
                  source={{
                    uri: moTa
                      ? "https://img.icons8.com/?size=80&id=Eac574CmaOen&format=png"
                      : "https://img.icons8.com/?size=50&id=40021&format=png",
                  }}
                />
              </TouchableOpacity>
              {moTa ? (
                <View style={{ height: 400, backgroundColor: "green" }}>
                  <Text style={[styles.theText, { color: "black" }]}>
                    {chuyenItem?.mota}
                  </Text>
                  <Text>true</Text>
                </View>
              ) : (
                <View style={{ height: 400, backgroundColor: "red" }}>
                  <Text style={[styles.theText]}>{chuyenItem?.mota}</Text>
                  <Text>false</Text>
                </View>
              )}
            </View>
            {/* List 2 */}
            <View style={[styles.conten_list_goi_y]}>
              <Text style={[styles.theText]}>Bạn có thể thích</Text>
              <FlatList
                data={danhSachGoiY}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                renderItem={({ item }) => {
                  return (
                    <View style={{ flex: 1, margin: 10, alignSelf: "center" }}>
                      <TouchableOpacity>
                        <Image
                          source={{ uri: item?.anh }}
                          style={{ height: 100, width: 150 }}
                        />
                        <Text>{item.gia}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

export default Chi_tiet_dich_vu;

const styles = StyleSheet.create({
  image: { height: 350, width: "100%", resizeMode: "stretch", opacity: 0.6 },
  theText: { fontSize: 24, fontWeight: "400" },
  content: { paddingHorizontal: 20, marginTop: 20, height: "auto" },
  flex_ngang: { flexDirection: "row", alignContent: "center" },
  content_mota: { paddingHorizontal: 20 },
  imgaIcon: { height: 25, width: 25 },
  conten_list_goi_y: {
    height: "auto",
    backgroundColor: "yellow",
    // paddingHorizontal: 20,
    marginBottom: 50,
  },
});
