import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFilmDetailFromApi } from "../API/TBApi";
class Composant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produit: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.id).then((data) => {
      this.setState({
        produit: data,
        isLoading: false,
      });
    });
  }
  _displayProduitComposant() {
    const { produit } = this.state;
    if (produit != undefined) {
      return (
        <View>
          <View style={styles.root2}>
            <Text style={styles.name}>{produit.composant}</Text>
          </View>
        </View>
      );
    }
  }
  render() {
    return <View>{this._displayProduitComposant()}</View>;
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
    flexDirection: "row",
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
});

export default Composant;
