//Map.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
const Map = ({ navigation }) => {
  const [curentPosition, setCurentPosition] = useState(initialState);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //alert(JSON.stringify(position));
        //alert(JSON.stringify(position.coords.latitude));
        const { longitude, latitude } = position.coords;
        setCurentPosition({
          ...curentPosition,
          latitude,
          longitude,
        });
      },
      (error) => alert(error.message),
      { timeout: 20000, maximumAge: 1000 }
    );
  }, []);
  return curentPosition.latitude ? (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={curentPosition}
      />
      <Button
        title="OK"
        onPress={() => {
          navigation.navigate("AddProduit", {
            latitude: curentPosition.latitude,
            longitude: curentPosition.longitude,
          }),

          
            navigation.goBack();
        }}
      />
    </View>
  ) : (
    <ActivityIndicator style={{ flex: 1 }} animating size="large" />
  );
};

export default Map;