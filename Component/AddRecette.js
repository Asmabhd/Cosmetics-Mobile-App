import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Container, Header, Content, Icon, Picker, Form } from "native-base";
import CustomHeader from "./CustomHeader";

export default class AjouterP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newingredient: "",
      newname: "",
      newprepration: "",
      image: null,
      values: "",
      postId: "",
    };
  }
  onValueChange(value) {
    this.setState({
      values: value,
    });
  }
  componentDidMount() {
    this.getPhotoPermission();
  }

  getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        alert(
          "We need permission to use your camera roll if you'd like to incude a photo."
        );
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      const source = { uri: result.uri };
      console.log(source);
      this.setState({
        image: source,
      });
    }
  };

  renderItem = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: this.state.newname,
        id_catégorie: this.state.values,
        ingredient: this.state.newingredient,
        description: "resultat efficace, facile à appliqué ",
        photo: "image",
        préparation: this.state.newprepration,
      }),
    };
    fetch("https://asmabh.herokuapp.com/api/recette", requestOptions)
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        this.setState({ postId: data.id });
        alert("valider!");
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
        alert("There was an error!!");
      });
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 40 }}>
        <CustomHeader
          title="Ajouter une recette"
          navigation={this.props.navigation}
        />
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={{ flex: 1, marginTop: 50 }}>
              <View style={{ flex: 1 }}>
                {this.state.image ? (
                  <Image
                    source={this.state.image}
                    style={{ width: "100%", height: 250 }}
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.pickImage}
                  >
                    <View style={styles.socialButtonContent}>
                      <Image
                        style={styles.logo}
                        source={{
                          uri:
                            "https://img.icons8.com/material-outlined/2x/slr-camera.png",
                        }}
                      />
                      <Text style={styles.text}> Photo de la recette</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.buttonContainer}>
                <Image
                  style={styles.logo}
                  source={{
                    uri: "https://img.icons8.com/ios-filled/2x/plus-math.png",
                  }}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Entrer le nom de la  recette"
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({ newname: text })}
                  value={this.state.newname}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.view}>
                <Text style={styles.text1}> Catégorie recette :</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Form>
                  <Picker
                    mode="dropdown"
                    placeholder="Select One"
                    placeholderStyle={{ color: "#2874F0" }}
                    note={false}
                    selectedValue={this.state.values}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label="Corps" value="3" />
                    <Picker.Item label="Cheveux" value="2" />
                    <Picker.Item label="Visage" value="1" />
                  </Picker>
                </Form>
              </View>
              <View style={styles.buttonContainer}>
                <Image
                  style={styles.logo}
                  source={{
                    uri: "https://img.icons8.com/ios-filled/2x/plus-math.png",
                  }}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Entrer les  ingrédients de la recette"
                  underlineColorAndroid="transparent"
                  onChangeText={(text) =>
                    this.setState({ newingredient: text })
                  }
                  value={this.state.newingredient}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.buttonContainer}>
                <Image
                  style={styles.logo}
                  source={{
                    uri: "https://img.icons8.com/ios-filled/2x/plus-math.png",
                  }}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Entrer les étapes de préparation "
                  underlineColorAndroid="transparent"
                  onChangeText={(text) =>
                    this.setState({ newprepration: text })
                  }
                  value={this.state.newprepration}
                  autoCapitalize="none"
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={[styles.button, { marginRight: 30 }]}
                  onPress={() => {
                    if (
                      this.state.newname.length == 0 ||
                      this.state.newingredient.length == 0 ||
                      this.state.newprepration.length == 0
                    ) {
                      alert("Veuillez remplir tous les champs");
                      return;
                    }
                    this.renderItem();
                  }}
                >
                  <Text style={styles.text}>Ajouter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate("AjoutChoix")}
                >
                  <Text style={styles.text}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 25,
    width: 25,
  },

  view: {
    flex: 1,
    marginBottom: 9,
    alignItems: "center",
  },
  text1: {
    fontWeight: "bold",
    color: "black",
  },
  buttonContainer: {
    // height:45,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    // width:350,
    //  borderRadius:30,
    //  backgroundColor:'white',
    //borderBottomWidth: 2,
  },
  socialButtonContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    height: 40,
    width: 90,
    backgroundColor: "#72E874",
    //#5CB256  #81F781  #72E874
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  inputs: {
    width: 250,
    height: 50,
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 5,
    color: "black",
    borderBottomColor: "#333333",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderWidth: 1,
  },
});
