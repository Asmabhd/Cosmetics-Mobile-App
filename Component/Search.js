import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ProduitList from "./ProduitList";
import { Searchbar } from "react-native-paper";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "./CustomHeader";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produit: [],
      isLoading: true,
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    const url = "https://asmabh.herokuapp.com/api/produit";

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          produit: responseJson.data,
          isLoading: false,
        });
        this.arrayholder = responseJson.data;
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }
  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.nom.toUpperCase()} ${item.marque.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      produit: newData,
    });
  };
  _displayDetailForProduit = (id) => {
    console.log("Display produit with id " + id);
    this.props.navigation.navigate("DetailProduit", { id: id });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader title="Produits" navigation={this.props.navigation} />
        <View>
          <Searchbar
            rounded
            placeholder="Marque ou nom"
            lightTheme
            round
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />

          <ScrollView>
            <View>
              <ProduitList
                produit={this.state.produit}
                navigation={this.props.navigation}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    // marginTop:10,
    marginBottom: 10,
  },
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
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 100,
    height: 108,
    borderRadius: 20,
    marginLeft: 20,
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
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 10,
    paddingLeft: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    elevation: 10,
  },

  formContent: {
    marginVertical: 20,
    flexDirection: "row",
    marginTop: 50,
  },
  iconInput: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  text: {
    color: "#C25D5D",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 50,
  },
});
const mapStateToProps = (state) => {
  return {
    favoritesProduit: state.toggleFavorite.favoritesProduit,
  };
};

export default connect(mapStateToProps)(Search);
