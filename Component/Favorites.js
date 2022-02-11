import React from "react";
import { View, StatusBar } from "react-native";
import ProduitList from "./ProduitList";
import { connect } from "react-redux";
import CustomHeader from "./CustomHeader";

class Favorites extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: 40 }}>
        <CustomHeader title="Favoris" navigation={this.props.navigation} />
        <ProduitList
          produit={this.props.favoritesProduit}
          navigation={this.props.navigation}
          favoriteList={true}
        />
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favoritesProduit: state.toggleFavorite.favoritesProduit,
  };
};

export default connect(mapStateToProps)(Favorites);
