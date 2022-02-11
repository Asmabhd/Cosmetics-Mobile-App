import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Container, Header, Content, Icon, Picker, Form } from "native-base";
//import { StatusBar } from "expo-status-bar";
import CustomHeader from "./CustomHeader";


export default class AjouterProduit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newcomposants: "",
      newname: "",
      image: null,
      values: "",
      adress: "",
      postId: "",
      newprix: "",
      newlongitude: "",
      newlatitude: "",
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
        id_adress: "1",
        id_catégorie: this.state.values,
        id_alternatif: "1",
        nom: this.state.newname,
        marque: this.state.newname,
        description: "resultat efficace, facile à appliqué ",
        photo:
          "https://fr.nuxe.com/nuxe-body/gel-douche-fondant-nuxe-body-gel-douche-fondant-tube-200-ml",
        lieu: this.state.adress,
        prix: this.state.newprix,
        composant: this.state.newcomposants,
        longitude: this.props.navigation.state.params.longitude, 
        latitude: this.props.navigation.state.params.latitude,
      }),
    };
    fetch("https://asmabh.herokuapp.com/api/produit", requestOptions)
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
          title="Ajouter un produit"
          navigation={this.props.navigation}
        />
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={{ flex: 1, marginTop: 50 }}>
              <View>
                {this.state.image ? (
                  <Image
                    source={this.state.image}
                    style={{ width: "100%", height: 150 }}
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
                      <Text style={styles.text}> Photo du produit</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.view}>
                <Text style={styles.text1}> Nom du produit :</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Entrer le nom complet du produit"
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({ newname: text })}
                  value={this.state.newname}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.view}>
                <Text style={styles.text1}> Catégorie du produit :</Text>
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
                    <Picker.Item label="Cheveux" value="1" />
                    <Picker.Item label="Visage" value="2" />
                  </Picker>
                </Form>
              </View>
              <View style={styles.view}>
                <Text style={styles.text1}>Les composants du produit :</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Entrer les  composants  du produit"
                  underlineColorAndroid="transparent"
                  onChangeText={(text) =>
                    this.setState({ newcomposants: text })
                  }
                  value={this.state.newcomposants}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.view}>
                <Text style={styles.text1}>l’adresse de produit :</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Image
                  style={styles.logo}
                  source={{
                    uri: "https://img.icons8.com/wired/2x/address.png",
                  }}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder=" Entrer l’adresse où le produit est disponible"
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({ adress: text })}
                  value={this.state.adress}
                  autoCapitalize="none"
                />
              </View>


              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity 
                  style={[styles.buttons, { marginRight: 30 }]}
                  onPress={() => this.props.navigation.navigate("Map")}
                >
               <Text style={styles.text}>Localisation par Gps</Text>
                   <Image
                  style={styles.logos}
                  source={{
                    uri: "https://img.icons8.com/wired/2x/address.png",
                  }}
                /> 
                </TouchableOpacity>
                </View>

            
              <View style={styles.view}>
                <Text style={styles.text1}>Prix :</Text>
              </View>
              <View style={styles.buttonContainer}>
                
                <TextInput
                  style={styles.inputs}
                  placeholder=" Entrer le prix du  produit "
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({ newprix: text })}
                  value={this.state.newprix}
                  autoCapitalize="none"
                />
              </View>


              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  style={[styles.button, { marginRight: 30 }]}
                  onPress={() => {
                    if (
                      this.state.newname.length == 0 ||
                      this.state.newcomposants.length == 0 ||
                      this.state.adress.length == 0
                    ) {
                      alert("remplir tous les champs");
                      return;
                    }
                    this.renderItem();
                  }}
                >
                  <Text style={styles.text}>Ajouter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text
                    style={styles.text}
                    onPress={() => this.props.navigation.navigate("AjoutChoix")}
                  >
                    Annuler
                  </Text>
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
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 25,
    width: 25,
  },
  logos: {
    height: 22,
    width: 25,
  },
  buttonContainer: {
    //height:45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    //width:350,
    // borderRadius:30,
    // backgroundColor:'white',
    borderBottomWidth: 2,
  },
  socialButtonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  view: {
    marginBottom: 9,
  },
  text1: {
    fontWeight: "bold",
    color: "black",
  },
  button: {
    height: 40,
    width: 90,
    backgroundColor: "#A9F5A9",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
    buttons: {
    height: 50,
    width: 170,
    backgroundColor: "#A9F5A9",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
