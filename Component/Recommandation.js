import React, { Component } from "react";
import { Image, View, StatusBar } from "react-native";
import { Text, Button, Input } from "react-native-ui-kitten";
import firebase from "firebase";
import CustomHeader from "./CustomHeader";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

import * as Permissions from "expo-permissions";

import { withFirebaseHOC } from "../utilsbdd";
import { ScrollView } from "react-native-gesture-handler";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class AddPost extends Component {
  state = { image: null, title: "", description: "" };

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

  onSubmit = async () => {
    try {
      const post = {
        photo: this.state.image,
        title: this.state.title,
        description: this.state.description,
      };
      this.props.firebase.uploadPost(post);

      this.setState({
        image: null,
        title: "",
        description: "",
      });
    } catch (e) {
      console.error(e);
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
  selectImage = async () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        this.setState({
          image: source,
        });
      }
    });
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 40 }}>
        <CustomHeader
          title="Ajouter un post"
          navigation={this.props.navigation}
        />
        <ScrollView>
          <View>
            {this.state.image ? (
              <Image
                source={this.state.image}
                style={{ width: "100%", height: 200 }}
              />
            ) : (
              <Button
                onPress={this.pickImage}
                style={{
                  alignItems: "center",
                  padding: 10,
                  margin: 30,
                }}
              >
                Ajouter une photo
              </Button>
            )}
          </View>
          <View style={{ marginTop: 70, alignItems: "center" }}>
            <Text category="h4">Details du post</Text>

            <Input
              placeholder="Description"
              style={{ margin: 20 }}
              onChangeText={(title) => this.setState({ title })}
              value={this.state.title}
            />
            <Input
              placeholder="Titre du post"
              style={{ margin: 20 }}
              onChangeText={(description) => this.setState({ description })}
              value={this.state.description}
            />
            <Button status="success" onPress={this.onSubmit}>
              Ajouter post
            </Button>
          </View>
        </ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      </View>
    );
  }
}

export default withFirebaseHOC(AddPost);
