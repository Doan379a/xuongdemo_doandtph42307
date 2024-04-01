import axios from "axios";
import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
  Modal,
  FlatList,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import {
  API_URL,
  DELETE_ITEM_ID_DICH_VU,
  UPDATE_ITEM_ID_DICH_VU,
} from "../../linkapi/diaChi_api";
import * as ImagePicker from "expo-image-picker";
import TextInputCustom from "../../Custom/Text_Input_custom";
import Button_custom from "../../Custom/Button_custom";

const Item_Dich_vu = ({ data, capNhat_DS }) => {
  const { _id, ten, gia, mota, anh, trangthai } = data;
  const [xemThem, setXemThem] = useState(false);
  const [showModalSua, setshowModalSua] = useState(false);
  const [upTen, setupTen] = useState("");
  const [upGia, setupGia] = useState(0);
  const [upTrangThai, setupTrangThai] = useState(true);
  const [upmoTa, setupmoTa] = useState("");
  /////
  const [errorTen, seterrorTen] = useState("");
  const [errorGia, seterrorGia] = useState("");
  const [errorTrangThai, seterrorTrangThai] = useState(true);
  const [errormoTa, seterrormoTa] = useState("");
  const arrImages = anh[0].split(",");
  const [upanh, setupanh] = useState([]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true, // Cho phép chọn nhiều ảnh
    });

    if (!result.cancelled) {
      setupanh([...upanh, ...result.assets.map((asset) => asset.uri)]);
    }
  };
  const handcheckupTen = (text) => {
    if (text.trim() === "") {
      seterrorTen("Không được để trống");
    } else {
      seterrorTen("");
    }
    setupTen(text);
  };
  const handcheckupGia = (text) => {
    if (text.trim() === "") {
      seterrorGia("Không được để trống");
    } else {
      seterrorGia("");
    }
    setupGia(text);
  };
  const handcheckupmoTa = (text) => {
    if (text.trim() === "") {
      seterrormoTa("Không được để trống");
    } else {
      seterrormoTa("");
    }
    setupmoTa(text);
  };
  const XoaItem = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}${DELETE_ITEM_ID_DICH_VU}${_id}`
      );
      console.log(response.data);
      capNhat_DS();
      ToastAndroid.show("Xóa thành công", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error deleting item:", error);
      Alert.alert("Error", "Failed to delete item. Please try again later.");
    }
  };
  const CapNhatItem = async () => {
    try {
      // Kiểm tra nếu giá không phải là một số hoặc nhỏ hơn hoặc bằng 0
      if (isNaN(upGia) || upGia <= 0) {
        seterrorGia("Giá phải là số và giá lớn hơn 0");
        return; // Dừng thực thi nếu giá không hợp lệ
      }

      const response = await axios.put(
        `${API_URL}${UPDATE_ITEM_ID_DICH_VU}${_id}`,
        {
          ten: upTen,
          gia: parseFloat(upGia),
          trangthai: upTrangThai,
          mota: upmoTa,
          anh: upanh, // Bạn có thể cập nhật ảnh tùy theo logic của bạn
        }
      );
      console.log(response.data);
      setshowModalSua(false); // Đóng modal sau khi sửa thành công
      capNhat_DS(); // Cập nhật danh sách sau khi sửa
      setupTen("");
      setupGia(0);
      setupTrangThai("");
      setupmoTa("");
      setupanh([]);
      ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Lỗi khi cập nhật mục:", error);
      Alert.alert("Lỗi", "Không thể cập nhật mục. Vui lòng thử lại sau.");
    }
  };
  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "blue",
            justifyContent: "center",
            paddingVertical: 20,
            marginEnd: 10,
            flex: 1,
          }}
          onPress={() => {
            setshowModalSua(!showModalSua);
            setupTen(ten);
            setupGia(gia.toString());
            setupTrangThai(trangthai);
            setupmoTa(mota);
            setupanh(anh);
          }}
        >
          <Text style={styles.actionText}>Sửa</Text>
        </TouchableOpacity>
        <View style={{ height: 3 }}></View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "red",
            justifyContent: "center",
            paddingVertical: 20,
            marginEnd: 10,
            flex: 1,
          }}
          onPress={() => {
            console.log(_id);
            Alert.alert("Bạn có chắc muốn xóa không", "", [
              { text: "Hủy" },
              {
                text: "Đồng ý",
                onPress: () => {
                  XoaItem();
                  ToastAndroid.show("Xóa Thành công", ToastAndroid.SHORT);
                },
              },
            ]);
          }}
        >
          <Text style={[styles.actionText]}>Xóa</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={[styles.container]}>
        {arrImages.length > 0 && (
          <Image
            source={{ uri: arrImages[0] }}
            style={[xemThem ? styles.image2 : styles.image]}
          />
        )}
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={xemThem ? undefined : 1}>
            Tên dịch vụ: {ten}
          </Text>
          <Text>Giá: {gia}</Text>
          <Text style={{ color: trangthai ? "blue" : "red" }}>
            Trang thái: {trangthai ? "Đang hoạt động" : "Ngừng hoạt động"}
          </Text>
          <Text numberOfLines={xemThem ? undefined : 3} style={{}}>
            Mô tả: {mota}
          </Text>
          <TouchableOpacity
            onPress={() => setXemThem(!xemThem)}
            style={{
              alignSelf: "",
              // alignItems: "flex-end",
              // justifyContent: "flex-end",
              bottom: xemThem ? "auto" : 0,
            }}
          >
            <Text style={styles.expandText}>{xemThem ? "Ẩn" : "Xem thêm"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* modal sua */}
      <Modal
        transparent={true}
        visible={showModalSua}
        animationType="slide"
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          onPress={() => {
            setshowModalSua(!showModalSua);
            setupTen("");
            setupGia(0);
            setupTrangThai(trangthai);
            setupmoTa("");
            seterrorTen("");
            seterrorGia("");
            seterrormoTa("");
            setupanh([]);
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
            <Text style={[styles.theText]}>Sửa dịch vụ</Text>
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
                value={upTen}
                onChangeText={handcheckupTen}
                error={errorTen}
                style={styles.bottncustom}
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
                value={upGia}
                onChangeText={handcheckupGia}
                error={errorGia}
                style={styles.bottncustom}
              />
            </View>
            {/* 3 */}
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
                value={upmoTa}
                onChangeText={handcheckupmoTa}
                error={errormoTa}
                numberOfLines={3}
                style={[styles.bottncustom, { height: "auto" }]}
              />
            </View>
            {/* 4 */}
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                padding: 20,
              }}
            >
              <Text
                style={[
                  styles.theText,
                  {
                    fontSize: 18,
                    textAlign: "auto",
                    width: "30%",
                    // flex: 1,
                  },
                ]}
              >
                Trạng thái:
              </Text>
              <TouchableOpacity
                style={[
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1.5,
                    borderRadius: 50,
                    borderColor: "gray",
                    width: 20,
                    height: 20,
                    marginEnd: 10,
                  },
                ]}
                onPress={() => setupTrangThai(!upTrangThai)}
              >
                <Text
                  style={{ textAlign: "center", fontSize: 10, color: "gray" }}
                >
                  {upTrangThai ? "V" : " "}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 15,
                  color: upTrangThai ? "blue" : "red",
                }}
              >
                {upTrangThai ? "Đang hoạt động" : "Ngừng hoạt động"}
              </Text>
            </View>
            {/* chon anh 5*/}
            <View style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "gray",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 10,
                  width: "40%",
                  marginBottom: 10,
                }}
                onPress={pickImage}
                disabled
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
              <FlatList
                horizontal
                data={arrImages}
                overScrollMode="never"
                overScrollColor="transparent"
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={{ marginRight: 0 }}>
                    <Image
                      style={{
                        width: 100,
                        height: 100,
                        resizeMode: "stretch",
                        margin: 5,
                        zIndex: anh.length - index, // Đảm bảo thứ tự hiển thị
                      }}
                      source={{ uri: item }}
                    />
                  </View>
                )}
              />
            </View>

            <Button_custom
              noidung="Sửa"
              style={styles.buttoncustom}
              onPress={() => {
                CapNhatItem();
                console.log(upGia, upTen);
              }}
            />
          </View>
        </View>
      </Modal>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    backgroundColor: "white",
  },
  image: {
    height: 200,
    width: 150,
    resizeMode: "stretch",
  },
  image2: {
    height: "100%",
    width: 150,
    resizeMode: "stretch",
  },
  info: {
    flex: 1,
    marginHorizontal: 10,
    height: "100%",
  },
  title: {
    fontSize: 17,
  },
  expandText: {
    color: "blue",
    fontSize: 12,
  },
  rightActions: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  actionText: {
    fontSize: 12,
    paddingHorizontal: 10,
    color: "white",
    fontWeight: "600",
  },
  theText: { fontSize: 32, width: "100%", textAlign: "center" },
  cuc1: { paddingHorizontal: 20 },
  bottncustom: { height: 45 },
  flex_ngang: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  buttoncustom: { borderRadius: 10 },
});

export default Item_Dich_vu;
