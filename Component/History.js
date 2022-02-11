import React from "react";
import ProduitList from "./ProduitList";
import { connect } from "react-redux";
import { View, StatusBar } from "react-native";
import CustomHeader from "../Component/CustomHeader";

class History extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: 40 }}>
        <CustomHeader title="Historique" navigation={this.props.navigation} />
        <ProduitList
          produit={this.props.historyProduit}
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
    historyProduit: state.toggleHistory.historyProduit,
  };
};

export default connect(mapStateToProps)(History);
