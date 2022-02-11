//Home.js
import React, { Component } from "react";
import { Text, View, Button, Alert } from "react-native";

export default class Accueil extends Component {
  render() {
    const longitude = this.props.navigation.getParam("longitude", "hello");
    const latitude = this.props.navigation.getParam("latitude", "world");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> Accueil Screen </Text>
        <Button
          title="GPS"
          onPress={() => this.props.navigation.navigate("Map")}
        />
        <Text>longitude: {JSON.stringify(longitude)}</Text>
        <Text>latitude: {JSON.stringify(latitude)}</Text>
      </View>
    );
  }
}