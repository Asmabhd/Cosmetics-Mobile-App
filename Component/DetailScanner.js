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
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import { getscannerDetailFromApi } from "../API/TBApi";

class DetailScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produit: undefined,
      isLoading: false,
    };
  }
  static navigationOptions = {
    title: "Details du produit",
  };

  componentDidMount() {
    getscannerDetailFromApi(this.props.navigation.state.params.id).then(
      (data) => {
        this.setState({
          produit: data,
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

  _displayProduit() {
    const { produit } = this.state;
    if (produit != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{ uri: produit.photocodebarre }}
          />
          <Text style={styles.title_text}>{produit.nom}</Text>

          <Text style={styles.default_text}>
            codeBarre : {produit.codeBarre}{" "}
          </Text>
        </ScrollView>
      );
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayProduit()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 90,
  },

  favorite_container: {
    alignItems: "center", // Alignement des components enfants sur l'axe secondaire, X ici
  },

  favorite_image: {
    width: 40,
    height: 40,
  },
  image: {
    width: 120,
    height: 110,
  },
  container1: {
    paddingLeft: 5,
    paddingRight: 50,
    paddingVertical: 0,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  name: {
    width: 235,
    fontSize: 16,
    fontWeight: "bold",
    color: "#9cb0c3",
  },
  comment: {
    width: 235,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    flexDirection: "center",
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  content: {
    marginLeft: 13,
    flex: 1,
  },
  separator: {
    height: 4,
    width: 700,
    backgroundColor: "#bdc3c7",
    marginTop: 1,
    marginHorizontal: 1,
  },
  icon: {
    height: 15,
    width: 15,
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    marginLeft: 8,
  },
  composant: {
    width: 130,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,

    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 4,
  },
  text: {
    fontSize: 16,
    paddingLeft: 2,
    fontWeight: "bold",
  },
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 169,
    margin: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 25,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: "#000000",
    textAlign: "center",
  },
  favorite_container: {
    alignItems: "center",
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
    margin: 5,
    marginBottom: 15,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_image: {
    width: 40,
    height: 40,
  },
});

export default DetailScanner;
