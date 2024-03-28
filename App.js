import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import NhanVien from "./ManHinh/qlNhanVien/NhanVien";
import HoaDon from "./ManHinh/qlHoaDon/HoaDon";
import KhachHang from "./ManHinh/qlKhachHang/KhachHang";
import DichVu from "./ManHinh/qlDichVu/DichVu";
import CongViec from "./ManHinh/qlCongViec/CongViec";
import MH_dang_nhap from "./ManHinh/dangNhap_manCho/MH_dang_nhap";
import ThongKe from "./ManHinh/thongke/ThongKe";
import Man_cho from "./ManHinh/dangNhap_manCho/Man_cho";
import MH_dang_ky from "./ManHinh/dangKy/MH_dang_ky";
import TrangChu from "./ManHinh/mh_TrangChu/TrangChu";
import Chi_tiet_dich_vu from "./ManHinh/mh_TrangChu/Chi_tiet_dich_vu";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const MenuDrawer = (props) => {
    return (
      <Drawer.Navigator
        initialRouteName="TrangChu"
        drawerContent={(props) => {
          const [showdialog, setshowdialog] = useState(false);
          return (
            <SafeAreaView style={{ flex: 1 }}>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderBottomWidth: 0.5,
                  height: 220,
                  marginBottom: 10,
                  paddingTop: 20,
                  paddingStart: 20,
                  borderColor: "gray",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{
                      uri: "https://th.bing.com/th/id/OIP.cttlm1zICNEvRj_evxyP3wHaLH?w=202&h=303&c=7&r=0&o=5&pid=1.7",
                    }}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                      alignSelf: "center",
                      resizeMode: "cover",
                    }}
                  />
                  <View style={{ marginStart: 10 }}>
                    <Text style={{ fontSize: 17 }}> Ten khach hang</Text>
                    <Text style={{ fontSize: 15 }}> loai tai khoan</Text>
                  </View>
                </View>
                <Text style={{ bottom: -50, fontSize: 25, fontWeight: "700" }}>
                  Chào mừng bạn
                </Text>
              </View>
              <DrawerItemList {...props} />
              <TouchableOpacity
                style={{
                  backgroundColor: "#fffff",
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  flexDirection: "row",
                  borderTopWidth: 0.5,
                  borderColor: "gray",
                  paddingTop: 20,
                  alignItems: "center",
                }}
                onPress={() => {
                  setshowdialog(true);
                }}
              >
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=48&id=j8vtslxN0LJo&format=png",
                  }}
                  style={{ height: 30, width: 30, marginEnd: 25 }}
                />
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "black" }}
                >
                  Đăng xuất
                </Text>
              </TouchableOpacity>
              <Modal
                transparent={true} // Đặt thuộc tính này thành true để làm cho modal trong suốt
                visible={showdialog}
                animationType="slide"
                style={{ flex: 1 }}
              >
                <View style={st.centeredView}>
                  <View style={st.modalView}>
                    <Text style={{ color: "black", fontSize: 15 }}>
                      Bạn có chắc muốn đăng xuất không?
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        // backgroundColor: 'red',
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginHorizontal: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate("MH_dang_nhap");
                          setshowdialog(false);
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: "black",
                          }}
                        >
                          Đăng xuất
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setshowdialog(false); // Đóng dialog khi bấm "Hủy"
                        }}
                      >
                        <Text style={{ fontSize: 16, color: "black" }}>
                          Hủy
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </SafeAreaView>
          );
        }}
      >
        <Drawer.Screen
          component={TrangChu}
          name="Trang chủ"
          options={({ focused, color }) => ({
            headerShown: false,
            drawerIcon: ({ focused, size }) => (
              <Image
                source={{
                  uri: focused
                    ? "https://img.icons8.com/?size=50&id=2797&format=png"
                    : "https://img.icons8.com/?size=50&id=73&format=png",
                }}
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? "#006666" : "black",
                }}
              />
            ),
            drawerLabelStyle: {
              color: "black",
            },
          })}
        />
        <Drawer.Screen
          component={KhachHang}
          name="Quản lý khách hàng"
          options={({ focus, color }) => ({
            drawerIcon: ({ focused, size }) => (
              <Image
                source={{
                  uri: focused
                    ? "https://img.icons8.com/?size=50&id=drGL9b6gGmCU&format=png"
                    : "https://img.icons8.com/?size=50&id=hy4wS58Dw1Q4&format=png",
                }}
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? "#006666" : "black",
                }}
              />
            ),
            drawerLabelStyle: {
              color: "black",
            },
          })}
        />
        <Drawer.Screen
          component={CongViec}
          name="Quản lý công việc"
          options={({ focused, color }) => ({
            drawerIcon: ({ focused, size }) => (
              <Image
                source={{
                  uri: focused
                    ? "https://img.icons8.com/?size=50&id=8092&format=png"
                    : "https://img.icons8.com/?size=50&id=3979&format=png",
                }}
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? "#006666" : "black",
                }}
              />
            ),
            drawerLabelStyle: {
              color: "black",
            },
          })}
        />
        <Drawer.Screen
          component={HoaDon}
          name="Quản lý hóa đơn"
          options={({ focused, color }) => ({
            drawerIcon: ({ focused, size }) => (
              <Image
                source={{
                  uri: focused
                    ? "https://img.icons8.com/?size=50&id=7995&format=png"
                    : "https://img.icons8.com/?size=50&id=4256&format=png",
                }}
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? "#006666" : "black",
                }}
              />
            ),
            drawerLabelStyle: {
              color: "black",
            },
          })}
        />
        <Drawer.Screen
          component={DichVu}
          name="Quản lý dịch vụ"
          options={({ focused, color }) => ({
            headerShown: false,
            drawerIcon: ({ focused, size }) => (
              <Image
                source={{
                  uri: focused
                    ? "https://img.icons8.com/?size=50&id=44471&format=png"
                    : "https://img.icons8.com/?size=50&id=30379&format=png",
                }}
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? "#006666" : "black",
                }}
              />
            ),
            drawerLabelStyle: {
              color: "black",
            },
          })}
        />
        <Drawer.Screen
          component={NhanVien}
          name="Quản lý nhân Viên"
          options={({ focused, color }) => ({
            drawerIcon: ({ focused, size }) => (
              <Image
                source={{
                  uri: focused
                    ? "https://img.icons8.com/?size=50&id=3ChicLmOv5G9&format=png"
                    : "https://img.icons8.com/?size=50&id=qEK2pqenBa22&format=png",
                }}
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? "#006666" : "black",
                }}
              />
            ),
            drawerLabelStyle: {
              color: "black",
            },
          })}
        />
        <Drawer.Screen
          component={ThongKe}
          name=" Thống kê"
          options={({ focused, color }) => ({
            drawerIcon: ({ focused, size }) => (
              <Image
                source={{
                  uri: focused
                    ? "https://img.icons8.com/?size=80&id=08s0lljR627H&format=png"
                    : "https://img.icons8.com/?size=80&id=R9JRk80Gstb8&format=png",
                }}
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? "#006666" : "black",
                }}
              />
            ),
            drawerLabelStyle: {
              color: "black",
            },
          })}
        />
      </Drawer.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MenuDrawer"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MenuDrawer" component={MenuDrawer} />
        <Stack.Screen name="MH_dang_nhap" component={MH_dang_nhap} />
        <Stack.Screen name="MH_dang_ky" component={MH_dang_ky} />
        <Stack.Screen name="Man_cho" component={Man_cho} />
        <Stack.Screen name="Chi_tiet_dich_vu" component={Chi_tiet_dich_vu} />
        {/* <Stack.Screen name="Test" component={Test} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 270,
    height: 150,
    justifyContent: "space-between",
    backgroundColor: "#f0f0f5",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
