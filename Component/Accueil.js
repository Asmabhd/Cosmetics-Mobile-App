import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles.js";
import CustomHeader from "./CustomHeader";
import { connect } from "react-redux";
import { StatusBar } from "expo-status-bar";
class Accueil extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      dataProduit: [],
      isLoading: true,
    };
    this.arrayholder = [];
    this.arrayholders = [];
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <TouchableHighlight
          underlayColor="rgba(73,182,77,0.9)"
          onPress={() =>
            this.props.navigation.navigate("DetailRecette", { id: item.id })
          }
        >
          <View style={styles.container}>
            <Image style={styles.photo} source={{ uri: item.photo }} />
            <Text style={styles.title}>{item.nom}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };
  renderProduit = ({ item }) => {
    return (
      <TouchableHighlight
        underlayColor="rgba(73,182,77,0.9)"
        onPress={() =>
          this.props.navigation.navigate("DetailProduit", { id: item.id })
        }
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo }} />
          <Text style={styles.title}>{item.nom}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  componentDidMount() {
    const url = "https://asmabh.herokuapp.com/api/recette";

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.data,
          isLoading: false,
        });
        this.arrayholder = responseJson.data;
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });

    const urlp = "https://asmabh.herokuapp.com/api/produit";

    fetch(urlp)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataProduit: responseJson.data,
          isLoading: false,
        });
        this.arrayholders = responseJson.data;
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
        <CustomHeader
          title="Cosma Bio"
          isHome={true}
          navigation={this.props.navigation}
        />
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                category="h4"
                style={{
                  fontSize: 40,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "green",
                  marginRight: 5,
                  marginLeft: 5,
                }}
              >
                {" "}
                Recettes
              </Text>
              <View style={{ flex: 1, marginRight: 20 }}>
                <FlatList
                  data={this.state.dataSource}
                  vertical
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  data={this.state.dataSource}
                  renderItem={this.renderItem}
                  keyExtractor={(item) => `${item.recipeId}`}
                />
              </View>
            </View>
            <View style={{ marginTop: 30, alignItems: "center" }}>
              <Text
                category="h4"
                style={{
                  fontSize: 40,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "green",
                  marginRight: 5,
                  marginLeft: 5,
                }}
              >
                {" "}
                Produits
              </Text>
              <View style={{ flex: 1, marginRight: 20 }}>
                <FlatList
                  data={this.state.dataSource}
                  vertical
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  data={this.state.dataProduit}
                  renderItem={this.renderProduit}
                  keyExtractor={(item) => {
                    return item.id;
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    historyProduit: state.toggleHistory.historyProduit,
  };
};
export default connect(mapStateToProps)(Accueil);
