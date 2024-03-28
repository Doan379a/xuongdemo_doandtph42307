import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ADD_ITEM_ID_DICH_VU,
  API_URL,
  GET_LIST_DICH_VU,
} from "../../linkapi/diaChi_api";
import Item_Dich_vu from "./Item_Dich_vu";
import TextInputCustom from "../../Custom/Text_Input_custom";
import Button_custom from "../../Custom/Button_custom";
import * as ImagePicker from "expo-image-picker";
const DichVu = () => {
  const [listDichVu, setlistDichVu] = useState([]);
  const [showModalThem, setshowModalThem] = useState(false);
  const [Ten, setTen] = useState("");
  const [Gia, setGia] = useState(0);
  const [TrangThai, setTrangThai] = useState(true);
  const [moTa, setmoTa] = useState("");
  const [anh, setanh] = useState(null);
  /////
  const [errorTen, seterrorTen] = useState("");
  const [errorGia, seterrorGia] = useState("");
  const [errormoTa, seterrormoTa] = useState("");
  const pickImage = async () => {
    let kq = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(kq);
    if (!kq.canceled) {
      setanh(kq.assets[0].uri);
    }
  };
  const handcheckTen = (text) => {
    if (text.trim() === "") {
      seterrorTen("Không được để trống");
    } else {
      seterrorTen("");
    }
    setTen(text);
  };
  const handcheckGia = (text) => {
    if (text.trim() === "") {
      seterrorGia("Không được để trống");
    } else {
      seterrorGia("");
    }
    setGia(parseFloat(text));
  };
  const handcheckmoTa = (text) => {
    if (text.trim() === "") {
      seterrormoTa("Không được để trống");
    } else {
      seterrormoTa("");
    }
    setmoTa(text);
  };
  const capNhat_DS = () => {
    axios
      .get(`${API_URL}${GET_LIST_DICH_VU}`)
      .then((response) => {
        setlistDichVu(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    const reload = setTimeout(() => {
      capNhat_DS();
    }, 1000);

    return () => {
      clearTimeout(reload);
    };
  }, []);
  const ThemItem = async () => {
    try {
      if (isNaN(Gia) || Gia <= 0) {
        seterrorGia("Giá phải là số và giá lớn hơn 0");
        return;
      }
      if (anh === null) {
        ToastAndroid.show("Bạn chưa chọn ảnh", ToastAndroid.SHORT);
        return;
      }
      const response = await axios.post(`${API_URL}${ADD_ITEM_ID_DICH_VU}`, {
        ten: Ten,
        gia: parseFloat(Gia),
        trangthai: TrangThai,
        mota: moTa,
        anh: anh, // Bạn có thể cập nhật ảnh tùy theo logic của bạn
      });
      console.log(response.data);
      setshowModalThem(false); // Đóng modal sau khi sửa thành công
      capNhat_DS(); // Cập nhật danh sách sau khi sửa
      setTen("");
      setGia(0);
      setTrangThai(true);
      setmoTa("");
      setanh(null);
      ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Lỗi khi cập nhật mục:", error);
      Alert.alert("Lỗi", "Không thể cập nhật mục. Vui lòng thử lại sau.");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={[styles.fle_ngang, { top: 10, marginBottom: 20 }]}>
        <Text style={[styles.theText, { width: "80%" }]}>Quản lý dịch vụ</Text>
        <TouchableOpacity
          onPress={() => setshowModalThem(!showModalThem)}
          style={[
            styles.fle_ngang,
            { borderWidth: 1, paddingVertical: 3, paddingHorizontal: 9 },
          ]}
        >
          <Image
            style={[styles.imageIcon]}
            source={{
              uri: "https://img.icons8.com/?size=50&id=24717&format=png",
            }}
          />
          <Text>Thêm</Text>
        </TouchableOpacity>
      </View>
      {/* /// */}
      <FlatList
        showsVerticalScrollIndicator={false}
        overScrollMode="never" // Ngăn chặn hiệu ứng "bóng" khi vuốt tới cuối danh sách
        overScrollColor="transparent" // Đặt màu sắc của hiệu ứng bóng là transparent
        data={listDichVu}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <Item_Dich_vu data={item} capNhat_DS={() => capNhat_DS()} />;
        }}
      />
      {/* modal them */}
      <Modal
        transparent={true}
        visible={showModalThem}
        animationType="slide"
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          onPress={() => {
            setshowModalThem(!showModalThem);
            setTen("");
            setGia(0);
            setTrangThai(true);
            setmoTa("");
            seterrorTen("");
            seterrorGia("");
            seterrormoTa("");
          }}
          style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        />
        <View
          style={{
            height: "auto",
            justifyContent: "flex-end",
            backgroundColor: "white",
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}
        >
          <View>
            <Text style={[styles.theText]}>Thêm dịch vụ</Text>
            {/* 1 */}
            <View
              style={[
                styles.cuc1,
                { height: 110, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Tên dịch vụ
              </Text>
              <TextInputCustom
                placeholder="Nhập tên dịch vụ"
                onChangeText={handcheckTen}
                error={errorTen}
                style={styles.inputcustom}
              />
            </View>
            {/* 2 */}
            <View
              style={[
                styles.cuc1,
                { height: 110, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Giá tiền
              </Text>
              <TextInputCustom
                placeholder="Nhập giá dịch vụ"
                onChangeText={handcheckGia}
                error={errorGia}
                style={styles.inputcustom}
              />
            </View>
            <View
              style={[
                styles.cuc1,
                { height: 110, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Mô tả
              </Text>
              <TextInputCustom
                placeholder="Nhập mô mô tả dịch vụ"
                onChangeText={handcheckmoTa}
                error={errormoTa}
                numberOfLines={2}
                style={[styles.inputcustom, {}]}
              />
            </View>
            {/* 4 */}
            <View
              style={[
                styles.fle_ngang,
                { paddingHorizontal: 20, justifyContent: "space-between" },
              ]}
            >
              <View style={{ height: "100%" }}>
                {/* trang thai */}
                <Text
                  style={[
                    styles.theText,
                    {
                      fontSize: 18,
                      textAlign: "auto",
                      alignItems: "center",
                    },
                  ]}
                >
                  Trạng thái:
                  <TouchableOpacity
                    style={[styles.cuc1, { height: 20, top: 50 }]}
                    onPress={() => setTrangThai(!TrangThai)}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: TrangThai ? "blue" : "red",
                      }}
                    >
                      {TrangThai ? "Đang hoạt động" : "Ngừng hoạt động"}
                    </Text>
                  </TouchableOpacity>
                </Text>
                {/* chon anh */}
                <TouchableOpacity
                  style={{
                    backgroundColor: "green",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    borderRadius: 10,
                    top: 30,
                    width: "40%",
                  }}
                  onPress={pickImage}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                    }}
                  >
                    Chọn ảnh
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                source={{ uri: anh }}
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: "red",
                  resizeMode: "stretch",
                }}
              />
            </View>
            <Button_custom
              noidung="Thêm"
              onPress={() => {
                ThemItem();
                console.log(Gia, Ten, TrangThai, moTa);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DichVu;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingTop: 20 },
  theText: { fontSize: 24, fontWeight: "500", textAlign: "center" },
  fle_ngang: { flexDirection: "row", alignItems: "center" },
  imageIcon: { height: 20, width: 20 },
  inputcustom: { height: 45 },
  cuc1: { paddingHorizontal: 20 },
});
