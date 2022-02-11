import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { Searchbar } from "react-native-paper";

export default class RecetteRech extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true,
    };
    this.arrayholder = [];
  }
  /*
  _displayDetail = (id) => {
    // console.log("Display film " + id)
    this.props.navigation.navigate('detailrecette', {id: id})
  }
*/

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity
        onPress={() =>
          navigate("DetailRecette", {
            id: item.id,
          })
        }
      >
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: item.photo }} />

          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <Text style={styles.name}>{item.nom}</Text>
            </View>
            <Text style={styles.name}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
  }
  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.nom.toUpperCase()} ${item.description.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Searchbar
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
            <FlatList
              data={this.state.dataSource}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              keyExtractor={(item) => {
                return item.id;
              }}
              renderItem={this.renderItem}
            />
          </View>
        </ScrollView>
      </View>
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
    color: "#000000",
  },
  comment: {
    width: 235,
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
