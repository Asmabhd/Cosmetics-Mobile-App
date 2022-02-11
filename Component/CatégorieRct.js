import React from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

export default class CategoriesScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View
          style={{
            flex: 1,
            margin: 10,
            justifyContent: "center",
            height: 215,
            borderColor: "#cccccc",
            borderWidth: 0.5,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SearchRCTVisage")}
          >
            <Image
              style={styles.categoriesPhoto}
              source={{
                uri:
                  "https://i.f1g.fr/media/madame/1024x726_crop/sites/default/files/img/2016/01/1481jpg.jpg",
              }}
            />
            <Text style={styles.categoriesName}>Soin Visage</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            margin: 10,
            justifyContent: "center",

            height: 215,
            borderColor: "#cccccc",
            borderWidth: 0.5,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SearchRCTChev")}
          >
            <Image
              style={styles.categoriesPhoto}
              source={{
                uri:
                  "https://macouleurdecheveux.fr/wp-content/uploads/2017/08/Masque-cheveux-color%C3%A9s-300x181.jpg",
              }}
            />
            <Text style={styles.categoriesName}>Soin Cheveux</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            margin: 10,
            justifyContent: "center",
            height: 215,
            borderColor: "#cccccc",
            borderWidth: 0.5,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SearchRctCorps")}
          >
            <Image
              style={styles.categoriesPhoto}
              source={{
                uri:
                  "https://www.natureo-bio.fr/wp-content/uploads/2017/07/SOIN-BEAUTE-BIO-SoinCorps-min.jpg",
              }}
            />
            <Text style={styles.categoriesName}>Soin Corps</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  categoriesPhoto: {
    width: "100%",
    height: 223,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3,
  },
  categoriesName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    //  marginTop: 8,
  },
});
