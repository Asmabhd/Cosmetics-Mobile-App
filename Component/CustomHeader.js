import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Container,
  Title,
  Text,
  List,
  ListItem,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

export default class CustomHeader extends React.Component {
  render() {
    let { title, isHome } = this.props;
    return (
      <Header style={{ backgroundColor: "white" }}>
        <Left>
          {isHome ? (
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="navicon" size={30} color="#000000" />
            </Button>
          ) : (
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="angle-left" size={30} />
            </Button>
          )}
        </Left>
        <Body>
          <Title style={{ fontWeight: "bold", fontSize: 17, color: "#000000" }}>
            {title}
          </Title>
        </Body>
        <Right>
          {/* <Button transparent>
                <Icon name="menu" />
              </Button>*/}
        </Right>
      </Header>
    );
  }
}
