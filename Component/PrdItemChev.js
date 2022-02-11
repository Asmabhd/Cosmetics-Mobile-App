import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class PrdItemChev extends React.Component {
  _displayFavoriteImage() {
    if (this.props.isProduitFavorite) {
      return (
        <Image
          style={styles.favorite_image}
          source={require("../Images/ic_favorite.png")}
        />
      );
    }
  }

  componentDidUpdate() {
    console.log("componentDidUpdate : ");
    console.log(this.props.historyProduit);
  }
  _toggleHistory() {
    const action = { type: "TOGGLE_HISTORY", value: this.props.produit };
    this.props.dispatch(action);
  }

  render() {
    const { produit, displayDetailForProduit } = this.props;
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => {
          displayDetailForProduit(produit.id);
          this._toggleHistory();
        }}
      >
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: produit.photo }} />
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              {this._displayFavoriteImage()}
              <Text style={styles.name}>{produit.nom}</Text>
            </View>
            <Text style={styles.name}>{produit.marque}</Text>
            <Text style={styles.price}>{produit.prix}</Text>
            <Text style={styles.lieu}>{produit.lieu}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: "gray",
  },
  name: {
    width: 235,
    fontSize: 16,
    fontWeight: "bold",
    color: "#9cb0c3",
  },
  lieu: {
    padding: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
});
const mapStateToProps = (state) => {
  return {
    historyProduit: state.toggleHistory.historyProduit,
  };
};

export default connect(mapStateToProps)(PrdItemChev);
