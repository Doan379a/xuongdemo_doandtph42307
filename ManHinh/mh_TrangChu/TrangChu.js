import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icon } from "../../Image";
import TIP_tim_kiem from "../../Custom/TIP_tim_kiem";
import { API_URL, GET_LIST_DICH_VU } from "../../linkapi/diaChi_api";
import axios from "axios";
import Item_dv_Duoc_Chon_nhieu from "./Item_dv_Duoc_Chon_nhieu";
import Swiper from "react-native-swiper";
const Header = () => {
  const [clicktim, setclicktim] = useState(false);
  return (
    <View style={[styles.flex_ngang, { justifyContent: "space-between" }]}>
      <Text style={styles.theText}>
        Dịch vụ tốt nhất{" "}
        <TouchableOpacity
          style={{
            height: 20,
            width: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: "https://img.icons8.com/?size=50&id=40021&format=png",
            }}
          />
        </TouchableOpacity>
      </Text>
      <View
        style={[
          styles.flex_ngang,
          { width: "25%", justifyContent: "space-between" },
        ]}
      >
        <TouchableOpacity
          style={styles.toupcustom}
          onPress={() => setclicktim(!clicktim)}
        >
          <Image
            style={[styles.image, { tintColor: "black" }]}
            source={clicktim ? icon.tim2 : icon.tim}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toupcustom}>
          <Image
            style={[styles.image, { tintColor: "black" }]}
            source={{
              uri: "https://img.icons8.com/?size=50&id=11642&format=png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
///////////////
const TrangChu = () => {
  const [dichVuList, setDichVuList] = useState([]);
  const [sildeshow, setsildeshow] = useState([
    {
      id: 1,
      url: "https://nicolebridal.vn/wp-content/uploads/2020/05/Zelda1-1.jpg",
    },
    {
      id: 2,
      url: "https://nicolebridal.vn/wp-content/uploads/2020/06/vay-cuoi-duoi-ca-3.jpeg",
    },
    {
      id: 3,
      url: "https://nicolebridal.vn/wp-content/uploads/2019/05/anna-684x1024.jpg",
    },
    {
      id: 4,
      url: "https://nicolebridal.vn/wp-content/uploads/2018/11/Bianca2-684x1024.jpg",
    },
    {
      id: 5,
      url: "https://nicolebridal.vn/wp-content/uploads/2018/10/nhung-mau-ao-cuoi-duoi-ca-dep-nhat-21.jpg",
    },
  ]);
  useEffect(() => {
    axios
      .get(`${API_URL}${GET_LIST_DICH_VU}`)
      .then((response) => {
        setDichVuList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={{ height: 400, position: "absolute", zIndex: -1 }}>
        <Swiper
          style={{ height: 400 }}
          loop={true}
          autoplay={true}
          autoplayTimeout={5}
          autoplayDirection={true}
          overScrollMode="never" // Ngăn chặn hiệu ứng "bóng" khi vuốt tới cuối danh sách
          overScrollColor="transparent" // Đặt màu sắc của hiệu ứng bóng là transparent
          transitionEffect={"slide"}
          customAnimationConfig={{
            duration: 500,
            scale: 0.8,
            fade: true,
            animationInterpolation: {
              type: "linear",
              delay: 100,
            },
          }}
        >
          {sildeshow.map((item) => (
            <Image
              source={{ uri: item.url }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "stretch",
                zIndex: -1,
              }}
            />
          ))}
        </Swiper>
      </View>

      <View style={{ height: 350 }} />
      <View style={styles.congHinhVongCung}></View>
      <FlatList
        style={{ zIndex: 1 }}
        showsVerticalScrollIndicator={false}
        overScrollMode="never" // Ngăn chặn hiệu ứng "bóng" khi vuốt tới cuối danh sách
        overScrollColor="transparent" // Đặt màu sắc của hiệu ứng bóng là transparent
        ListHeaderComponent={
          <View style={[styles.container, { paddingHorizontal: 20 }]}>
            <Header />
            <View style={{ height: 20 }} />
            <TIP_tim_kiem
              placeholder="Nhập dịch vụ bạn đang cần tìm"
              onPressCamera={() => console.log("camera")}
              onPressMic={() => console.log("mic")}
            />
            <Text
              style={[
                styles.theText,
                { fontSize: 20, marginTop: 10, fontWeight: "400" },
              ]}
            ></Text>
            <FlatList
              data={dichVuList}
              horizontal
              showsHorizontalScrollIndicator={false}
              overScrollMode="never" // Ngăn chặn hiệu ứng "bóng" khi vuốt tới cuối danh sách
              overScrollColor="transparent" // Đặt màu sắc của hiệu ứng bóng là transparent
              keyExtractor={(item) => item?._id}
              renderItem={({ item }) => {
                return <Item_dv_Duoc_Chon_nhieu data={item} />;
              }}
            />
            <Text style={styles.theText}>Đang giảm giá</Text>
            <Text>Thời gian còn 12:00:00</Text>
            <FlatList
              data={dichVuList}
              horizontal
              showsHorizontalScrollIndicator={false}
              overScrollMode="never" // Ngăn chặn hiệu ứng "bóng" khi vuốt tới cuối danh sách
              overScrollColor="transparent" // Đặt màu sắc của hiệu ứng bóng là transparent
              keyExtractor={(item) => item?._id} // Sử dụng item.id hoặc một thuộc tính duy nhất khác nếu có
              renderItem={({ item }) => {
                return <Item_dv_Duoc_Chon_nhieu data={item} />;
              }}
            />
          </View>
        }
      />
    </View>
  );
};

export default TrangChu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nen_image: {
    position: "absolute",
    height: 400,
    width: "100%",
    resizeMode: "stretch",
    zIndex: -1,
  },
  congHinhVongCung: {
    position: "absolute",
    // bottom: , // Điều chỉnh để chồng lên khoảng 50 điểm từ dưới lên
    top: 300,
    height: 1000,
    width: 1000, // Điều chỉnh chiều rộng tùy ý
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 500, // Giá trị lớn để tạo hình dạng vòng cung
    overflow: "hidden", // Cắt bỏ phần nằm ngoài vòng cung
    // elevation: 5, // Độ nổi bật của view
    aspectRatio: 1, // Giữ cho tỉ lệ chiều rộng/cao không thay đổi
    zIndex: -1,
  },
  theText: { fontSize: 24 },
  image: { height: 27, width: 27 },
  flex_ngang: { flexDirection: "row", alignItems: "center" },
  toupcustom: { height: 26 },
});
