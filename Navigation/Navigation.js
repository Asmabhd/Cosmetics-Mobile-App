
//Navigation.js
import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./Home";
import Map from "./Map";

const MyStack = createStackNavigator(
  {
    Home: { screen: Home },
    Map: { screen: Map },
  },
  {
    initialRouteName: "Home",
  }
);

export default createAppContainer(MyStack);

/*
import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Container, Header, Content, List, ListItem, Text } from "native-base";
import { IMAGE } from "../src/constants/Image";
import Icon from "react-native-vector-icons/FontAwesome";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Signup from "../Signup";
import Login from "../Login";
import ForgotPassword from "../ForgotPassword";
import Loginfb from "../Loginfb";
import Déconnexion from "../Déconnexion";
import Accueil from "../Component/Accueil";
import Search from "../Component/Search";
import DetailProduit from "../Component/DetailProduit";
import Consulter from "../Component/Consulter";
import DetailRecette from "../Component/DetailRecette";
import RecetteRech from "../Component/RecetteRech";
import AddRecette from "../Component/AddRecette";
import Scanner from "../Component/Scanner";
import Recommandation from "../Component/Recommandation";
import Favorites from "../Component/Favorites";
import History from "../Component/History";
import Feed from "../Component/Feed";
import CustomHeader from "../Component/CustomHeader";
import RechScanner from "../Component/RechScanner";
import DetailScanner from "../Component/DetailScanner";
import AddProduit from "../Component/AddProduit";
import AjoutChoix from "../Component/AjoutChoix";
import Profile from "../Component/Profile";
import CatégoriePrd from "../Component/CatégoriePrd";
import CatégorieRct from "../Component/CatégorieRct";
import SearchRCTVisage from "../Component/SeachRCTVisage";
import SearchRCTChev from "../Component/SearchRCTChev";
import SearchRctCorps from "../Component/SearchRctCorps";
import SearchPrdVisage from "../Component/SearchPrdVisage";
import SearchPrdCorps from "../Component/SearchPrdCorps";
import SearchPrdChev from "../Component/SearchPrdChev";
import Map from "../Component/Map";
class Setting extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title="Setting" navigation={this.props.navigation} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Setting Screen!</Text>
        </View>
      </View>
    );
  }
}

class SideMenu extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
        <View
          style={{
            height: 150,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={IMAGE.ICON_USER_DEFAULT}
            style={{
              height: 120,
              width: 120,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              overflow: "hidden",
            }}
          />
          <Text>Yasmine</Text>
        </View>
        <ScrollView>
          <List>
            <ListItem
              onPress={() => this.props.navigation.navigate("Favorites")}
            >
              <Text>Favoris</Text>
            </ListItem>
            <ListItem onPress={() => this.props.navigation.navigate("Profile")}>
              <Text>Profile</Text>
            </ListItem>

            <ListItem onPress={() => this.props.navigation.navigate("History")}>
              <Text>Historique</Text>
            </ListItem>
            <ListItem onPress={() => this.props.navigation.navigate("Setting")}>
              <Text>Paramètres</Text>
            </ListItem>
          </List>
        </ScrollView>

        <List>
          <ListItem
            noBorder
            onPress={() => this.props.navigation.navigate("Déconnexion")}
          >
            <Text>Déconnexion</Text>
          </ListItem>
        </List>
      </SafeAreaView>
    );
  }
}
const navOptionHandler = (navigation) => ({
  headerShown: false,
});
const SignupStack = createStackNavigator({
  Signup: {
    screen: Signup,
    navigationOptions: navOptionHandler,
  },
  Login: {
    screen: Login,
    navigationOptions: navOptionHandler,
  },
  Accueil: {
    screen: Accueil,
    navigationOptions: navOptionHandler,
  },
});
const LoginStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: navOptionHandler,
  },
  Signup: {
    screen: Signup,
    navigationOptions: navOptionHandler,
  },
  Accueil: {
    screen: Accueil,
    navigationOptions: navOptionHandler,
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: navOptionHandler,
  },
  Loginfb: {
    screen: Loginfb,
    navigationOptions: navOptionHandler,
  },
});
const AccueilStack = createStackNavigator({
  Accueil: {
    screen: Accueil,
    navigationOptions: navOptionHandler,
  },
  DetailRecette: {
    screen: DetailRecette,
    navigationOptions: navOptionHandler,
  },
  DetailProduit: {
    screen: DetailProduit,
    navigationOptions: navOptionHandler,
  },
});
const AjouterStack = createStackNavigator({
  AjoutChoix: {
    screen: AjoutChoix,
    navigationOptions: navOptionHandler,
  },
  AddProduit: {
    screen: AddProduit,
    navigationOptions: navOptionHandler,
  },
  AddRecette: {
    screen: AddRecette,
    navigationOptions: navOptionHandler,
  },
  Recommandation: {
    screen: Recommandation,
    navigationOptions: navOptionHandler,
  },
  Map: {
    screen: Map,
    navigationOptions: navOptionHandler,
  },
});
const ScannerStack = createStackNavigator({
  Scanner: {
    screen: Scanner,
    navigationOptions: navOptionHandler,
  },
  RechScanner: {
    screen: RechScanner,
    navigationOptions: navOptionHandler,
  },
  DetailScanner: {
    screen: DetailScanner,
    navigationOptions: navOptionHandler,
  },
});
const RecommandationStack = createStackNavigator({
  Recommandation: {
    screen: Recommandation,
    navigationOptions: navOptionHandler,
  },
});
const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: navOptionHandler,
  },
});
const SearchStack = createStackNavigator({
  Consulter: {
    screen: Consulter,
    navigationOptions: navOptionHandler,
  },
  CatégoriePrd: {
    screen: CatégoriePrd,
    navigationOptions: navOptionHandler,
  },
  CatégorieRct: {
    screen: CatégorieRct,
    navigationOptions: navOptionHandler,
  },
  SearchPrdVisage: {
    screen: SearchPrdVisage,
    navigationOptions: navOptionHandler,
  },
  SearchPrdCorps: {
    screen: SearchPrdCorps,
    navigationOptions: navOptionHandler,
  },
  SearchPrdChev: {
    screen: SearchPrdChev,
    navigationOptions: navOptionHandler,
  },

  SearchRCTVisage: {
    screen: SearchRCTVisage,
    navigationOptions: navOptionHandler,
  },
  SearchRCTChev: {
    screen: SearchRCTChev,
    navigationOptions: navOptionHandler,
  },
  SearchRctCorps: {
    screen: SearchRctCorps,
    navigationOptions: navOptionHandler,
  },
  Search: {
    screen: Search,
    navigationOptions: navOptionHandler,
  },
  DetailProduit: {
    screen: DetailProduit,
    navigationOptions: navOptionHandler,
  },
  RecetteRech: {
    screen: RecetteRech,
    navigationOptions: navOptionHandler,
  },
  DetailRecette: {
    screen: DetailRecette,
    navigationOptions: navOptionHandler,
  },
});
const MainTabs = createBottomTabNavigator(
  {
    Accueil: {
      screen: AccueilStack,
      navigationOptions: {
        tabBarIcon: () => <Icon name="home" size={35} color="#000000" />,
      },
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarIcon: () => <Icon name="search" size={30} color="#000000" />,
      },
    },
    AjouterStack: {
      screen: AjouterStack,
      navigationOptions: {
        tabBarIcon: () => <Icon name="plus" size={30} color="#000000" />,
      },
    },
    Scanner: {
      screen: ScannerStack,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("../Images/ic_scanner.png")}
              style={styles.icon}
            />
          );
        },
      },
    },
    Feed: {
      screen: FeedStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="question" size={30} color="#000000" />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      //  activeBackgroundColor:"#d2f5e3",
      inactiveBackgroundColor: "#FFFFFF",
    },
  }
);
const MainStack = createStackNavigator(
  {
    Accueil: {
      screen: MainTabs,
      navigationOptions: navOptionHandler,
    },
    Signup: {
      screen: Signup,
      navigationOptions: navOptionHandler,
    },
    Login: {
      screen: Login,
      navigationOptions: navOptionHandler,
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: navOptionHandler,
    },
    Loginfb: {
      screen: Loginfb,
      navigationOptions: navOptionHandler,
    },
    Setting: {
      screen: Setting,
      navigationOptions: navOptionHandler,
    },
    Profile: {
      screen: Profile,
      navigationOptions: navOptionHandler,
    },
    Favorites: {
      screen: Favorites,
      navigationOptions: navOptionHandler,
    },

    History: {
      screen: History,
      navigationOptions: navOptionHandler,
    },
    Déconnexion: {
      screen: Déconnexion,
      navigationOptions: navOptionHandler,
    },
  },
  { initialRouteName: "Signup" }
);

const appDrawer = createDrawerNavigator(
  {
    drawer: MainStack,
  },
  {
    contentComponent: SideMenu,
    drawerWidth: (Dimensions.get("window").width * 3) / 4,
  }
);
const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});
export default createAppContainer(appDrawer);
*/