import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

class Maps extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: "",
        longitude: "",
        latitudeDelta: "",
        longitudeDelta: "",
        accuracy: "",
      },
    };
  }
  calDelta(lat, long, accuracy) {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
    const longDelta =
      accuracy /
      (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));
    this.setState({
      region: {
        latitude: lat,
        longitude: long,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
        accuracy: accuracy,
      },
    });
  }
  componentDidMount() {
    this.calDelta(36.73627896, 3.03070843, 194);
  }

  marker() {
    return {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
    };
  }
  render() {
    return (
      <MapView
        style={styles.map}
        region={{
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
          latitudeDelta: this.state.region.latitudeDelta,
          longitudeDelta: this.state.region.longitudeDelta,
          //latitude:36.7154602,
          // longitude: 3.0490708,
          //distance:96m
        }}
      >
        <Marker
          coordinate={{
            latitude: 36.73627896,
            longitude: 3.03070843,
          }}
          Image={require("../icons8-marker-48.png")}
          title="Test title"
          description="This is the test description"
        >
          <Callout tooltip>
            <View>
              <View style={styles.bubble}>
                <Text style={styles.name}>Pharmacie el hadi</Text>
                <Text>
                  Cite Saïd hamdine 574/195 logts BT 17، Bir Mourad Raïs
                </Text>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </View>
          </Callout>
        </Marker>
      </MapView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-start",
  },
  map: {
    height: "50%",
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    alignSelf: "center",
    borderWidth: 16,
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    alignSelf: "center",
    borderWidth: 16,
    marginTop: -0.5,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 120,
    height: 80,
  },
});
export default Maps;
