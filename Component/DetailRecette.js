import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Icon,
} from "react-native";
import CustomHeader from "./CustomHeader";
import { getrecetteDetailFromApi } from "../API/TBApi";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

export default class DetailRecette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recette: undefined,
      isLoading: false,
    };
  }
  componentDidMount() {
    getrecetteDetailFromApi(this.props.navigation.state.params.id).then(
      (data) => {
        this.setState({
          recette: data,
          isLoading: false,
        });
      }
    );
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.recette };
    this.props.dispatch(action);
  }

  _displayrecette() {
    const { recette } = this.state;
    if (recette != undefined) {
      return (
        <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
          <CustomHeader title="" navigation={this.props.navigation} />
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.root1}>
              <Image style={styles.image} source={{ uri: recette.photo }} />
            </View>
            <View style={styles.root2}>
              <Text style={styles.name}>{recette.nom}</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                style={styles.favorite_image}
                source={require("../Images/ic_favorite_border.png")}
              />
            </View>
            <View style={styles.root3}>
              <Text style={styles.description}>{recette.description}</Text>
            </View>
            <Text style={styles.titre}>Les ingérdients :</Text>

            <View style={styles.root4}>
              <Text style={styles.name1}>{recette.ingredient}</Text>
            </View>
            <Text style={styles.titre}>Les etapes :</Text>
            <View style={styles.root5}>
              <Text style={styles.name1} numberOfLines={6}>
                {recette.préparation}
              </Text>
            </View>
          </ScrollView>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
        </SafeAreaView>
      );
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.root}>
        {this._displayLoading()}
        {this._displayrecette()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column",
    // marginLeft: 10,
    // marginRight: 10,
  },

  image: {
    height: DEVICE_HEIGHT / 2.5,
    width: DEVICE_WIDTH,
  },
  name: {
    textAlign: "center",
    color: "black",
    fontStyle: "italic",
  },
  root1: {
    marginBottom: 20,
  },
  root2: {
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#5CB256",
    borderRadius: 6,
    backgroundColor: "#C3FFBF",
  },
  root3: {
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#5CB256",
    backgroundColor: "#C3FFBF",
    borderRadius: 6,
  },
  description: {
    color: "black",
    fontStyle: "italic",
    paddingLeft: 10,
    paddingRight: 10,
  },
  root4: {
    marginBottom: 20,

    borderWidth: 3,
    borderColor: "#5CB256",
    borderRadius: 6,
  },
  root5: {
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#5CB256",
    borderRadius: 6,
  },
  favorite_image: {
    width: 50,
    height: 50,
  },
  titre: {
    marginBottom: 10,
    color: "#5CB256",
    fontSize: 20,
    fontStyle: "italic",
  },
  name1: {
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 1,
  },
});
