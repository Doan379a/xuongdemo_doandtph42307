import React, { useEffect, useState, useRef } from "react";
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
import { icon } from "../../Image";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { API_URL, GET_LIST_DICH_VU } from "../../linkapi/diaChi_api";
import Swiper from "react-native-swiper";

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
          source={{
            uri: "https://img.icons8.com/?size=50&id=364&format=png",
          }}
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
  const scrollViewRef = useRef(null);
  const swiperRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(false); // Khởi tạo là false

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

  const arrImages = chuyenItem.anh[0].split(",");

  const handleImagePress = (index) => {
    setCurrentImageIndex(index);
    swiperRef.current.scrollBy(index - swiperRef.current.state.index);
    setScrollEnabled(true); // Khi bấm vào ảnh ở dưới, cho phép cuộn ở trên
  };

  const handleScrollViewScroll = (event) => {
    if (scrollEnabled) {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const index = Math.floor(contentOffsetX / 158); // 158 là width của ảnh + 8 là margin giữa ảnh
      setCurrentImageIndex(index);
      swiperRef.current.scrollBy(index - swiperRef.current.state.index);
    }
  };

  const handleListScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // Nếu vị trí cuộn là 0 (đầu danh sách), không cho phép cuộn ở trên
    setScrollEnabled(offsetY !== 0);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Top />
      <FlatList
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        overScrollColor="transparent"
        ListHeaderComponent={
          <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={{ height: 370 }}>
              <Swiper
                style={{ height: 370 }}
                ref={swiperRef}
                loop={false}
                showsPagination={false}
                overScrollMode="never"
                overScrollColor="transparent"
                onScroll={handleListScroll}
                index={currentImageIndex}
              >
                {arrImages.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    style={styles.image}
                  />
                ))}
              </Swiper>
            </View>
            <View style={{ height: 110, marginTop: 20, marginHorizontal: 15 }}>
              <ScrollView
                horizontal
                ref={scrollViewRef}
                overScrollMode="never"
                overScrollColor="transparent"
                showsHorizontalScrollIndicator={false}
                onScroll={handleScrollViewScroll}
              >
                {arrImages.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleImagePress(index)}
                  >
                    <Image
                      source={{ uri: image }}
                      style={{
                        height: "100%",
                        width: 130,
                        margin: 6,
                        resizeMode: "stretch",
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.content}>
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
              <View style={{ height: "auto", marginBottom: 20 }}>
                <Text
                  style={[
                    styles.theText,
                    {
                      color: "black",
                      fontSize: 16,
                      fontWeight: "300",
                      width: moTa ? "97%" : "100%",
                    },
                  ]}
                  numberOfLines={moTa ? 3 : undefined}
                >
                  {chuyenItem?.mota}
                </Text>
              </View>
            </View>
            <View style={[styles.conten_list_goi_y]}>
              <Text style={[styles.theText]}>Bạn có thể thích</Text>
              <FlatList
                data={danhSachGoiY}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, margin: 10, alignSelf: "center" }}>
                    <TouchableOpacity>
                      <Image
                        source={{ uri: item?.anh[0] }}
                        style={{ height: 100, width: 150 }}
                      />
                      <Text>{item.gia}</Text>
                    </TouchableOpacity>
                  </View>
                )}
                // onScroll={handleListScroll}
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
  image: { height: 350, width: "100%", resizeMode: "stretch", opacity: 0.8 },
  theText: { fontSize: 24, fontWeight: "400" },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
    height: "auto",
  },
  flex_ngang: { flexDirection: "row", alignContent: "center" },
  content_mota: { paddingHorizontal: 20 },
  imgaIcon: { height: 25, width: 25 },
  conten_list_goi_y: {
    height: "auto",
    backgroundColor: "yellow",
    paddingHorizontal: 20,
    marginBottom: 50,
  },
});
