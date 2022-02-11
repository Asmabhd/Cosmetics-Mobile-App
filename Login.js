import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import firebase from "./config/Firebase/firebaseConfig";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
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

  userLogin = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Entrez les détails pour vous connecter!");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res);
          console.log("User logged-in successfully!");
          this.setState({
            isLoading: false,
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
          style={styles.BtnMps}
          onPress={() => this.props.navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.TextMdp2}>Mot de passe oublier?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.userLogin()}
        >
          <Text style={styles.textLogin}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.fabookButton]}
          onPress={() => this.props.navigation.navigate("Loginfb")}
        >
          <View style={styles.viewLogin}>
            <Image
              style={styles.icon}
              source={{ uri: "https://img.icons8.com/nolan/2x/facebook.png" }}
            />
            <Text style={styles.loginText}>Continuer avec facebook</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.cree}>
          <TouchableOpacity
            style={styles.buttonContainers}
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            <Text style={styles.TextMdp}>Créer un compte</Text>
          </TouchableOpacity>
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
    marginBottom: 20,
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

    fontSize: 20,
  },
  header: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
  },
  buttonContainer: {
    height: 43,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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
    marginBottom: 50,
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
    fontSize: 19,
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
  googleButton: {
    backgroundColor: "#ff0000",
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
