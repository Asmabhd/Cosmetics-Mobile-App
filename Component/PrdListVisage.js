import React from "react";
import { StyleSheet, FlatList } from "react-native";
import PrdItemVisage from "./PrdItemVisage";
import { connect } from "react-redux";

class PrdListVisage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produit: [],
    };
  }

  _displayDetailForProduit = (id) => {
    this.props.navigation.navigate("DetailProduit", { id: id });
  };

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.produit}
        extraData={(this.props.historyProduit, this.props.favoritesProduit)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PrdItemVisage
            produit={item}
            isProduitFavorite={
              this.props.favoritesProduit.findIndex(
                (produit) => produit.id === item.id
              ) !== -1
                ? true
                : false
            }
            displayDetailForProduit={this._displayDetailForProduit}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesProduit: state.toggleFavorite.favoritesProduit,
  };
};

export default connect(mapStateToProps)(PrdListVisage);
