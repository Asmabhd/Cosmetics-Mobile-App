import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import CustomHeader from "./CustomHeader";

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

export default class Scanner extends Component {
  state = {
    CameraPermissionGranted: null,
  };
  async componentDidMount() {
    // Ask for camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      CameraPermissionGranted: status === "granted" ? true : false,
    });
  }

  barCodeScanned = ({ data }) => {
    alert(data);
    console.log("Display produit with code " + data);
    this.props.navigation.navigate("RechScanner", { codeBarre: data });
  };

  render() {
    const { CameraPermissionGranted } = this.state;
    if (CameraPermissionGranted === null) {
      // Request Permission
      return (
        <View style={styles.container}>
          <Text>Please grant Camera permission</Text>
        </View>
      );
    }
    if (CameraPermissionGranted === false) {
      // Permission denied
      return (
        <View style={styles.container}>
          <Text>Camera Permission Denied.</Text>
        </View>
      );
    }
    if (CameraPermissionGranted === true) {
      // Got the permission, time to scan
      return (
        <View style={{ flex: 1, marginTop: 30 }}>
          <CustomHeader
            title="Scanner code-barre"
            navigation={this.props.navigation}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BarCodeScanner
              onBarCodeScanned={this.barCodeScanned}
              style={{
                height: DEVICE_HEIGHT / 1.1,
                width: DEVICE_WIDTH,
                marginTop: 100,
              }}
            ></BarCodeScanner>
          </View>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
