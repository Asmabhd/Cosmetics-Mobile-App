import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import firebase from "./config/Firebase/firebaseConfig";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Entrez les détails pour vous s'inscrire ! ");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: this.state.displayName,
          });

          console.log("User registered successfully!");
          this.setState({
            isLoading: false,
            displayName: "",
            email: "",
            password: "",
          });
          this.props.navigation.navigate("Accueil");
        })
        .catch((error) => this.setState({ errorMessage: error.message }));
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <ImageBackground
            source={require("./header.png")}
            style={styles.imageBackground}
          >
            <Text
              style={{
                color: "#5CB256",
                fontWeight: "bold",
                fontSize: 40,
                textAlign: "center",
              }}
            >
              Bienvenue sur CosmaBio
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.textIP}
            placeholder="Nom d'utilisateur"
            value={this.state.displayName}
            onChangeText={(val) => this.updateInputVal(val, "displayName")}
            underlineColorAndroid="transparent"
          />
          <Image
            style={styles.iconInput}
            source={{
              uri: "https://img.icons8.com/bubbles/2x/user-female.png",
            }}
          />
        </View>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.textIP}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, "email")}
            underlineColorAndroid="transparent"
          />
          <Image
            style={styles.iconInput}
            source={{
              uri: "https://img.icons8.com/dusk/2x/secured-letter.png",
            }}
          />
        </View>

        <View style={styles.containerInput}>
          <TextInput
            style={styles.textIP}
            placeholder="Mot de passe"
            value={this.state.password}
            onChangeText={(val) => this.updateInputVal(val, "password")}
            maxLength={15}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
          />
          <Image
            style={styles.iconInput}
            source={{
              uri: "https://img.icons8.com/color/2x/show-password.png",
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.registerUser()}
        >
          <Text style={styles.textLogin}>S'inscrire</Text>
        </TouchableOpacity>
        <View style={styles.cree}>
          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            Déjà enregistré? Cliquez ici pour vous identifier
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C3FFBF",
  },
  footer: {
    flex: 2,
    padding: 20,
  },

  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    //textAlign: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  textIP: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  containerInput: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 30,

    alignItems: "center",
    flexDirection: "row",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconInput: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center",
  },
  BtnMps: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 130,
    width: 300,
    backgroundColor: "transparent",
    marginTop: 0.01,
  },
  TextMdp: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  TextMdp2: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",

    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  textLogin: {
    color: "white",
    fontSize: 23,
  },
  textLoginS: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  header: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "75%",
  },
  buttonContainer: {
    height: 43,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 90,
    marginTop: 60,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
  },

  buttonContainers: {
    height: 43,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    marginTop: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  loginButton: {
    backgroundColor: "#5CB256",
    shadowColor: "#808080",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  icon: {
    width: 30,
    height: 30,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  viewLogin: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  fabookButton: {
    backgroundColor: "#3b5998",
    marginBottom: 40,
    marginTop: 20,
  },

  Btncompte: {
    flexDirection: "row",
    justifyContent: "center",
    width: 300,
    backgroundColor: "transparent",
    marginTop: 0.01,
  },
  textOu: {
    marginTop: 8,
  },
});
