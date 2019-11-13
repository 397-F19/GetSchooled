import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Checkbox, Text, Button, theme } from "galio-framework";

import { Icon, Input } from "../components";
import Images from "../constants/Images";
import argonTheme from "../constants/Theme";

const { width, height } = Dimensions.get("screen");

class Homepage extends React.Component {
  render() {
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
        >
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
              </Block>
              <Block center>
                <Button
                  style={styles.button}
                  color="#ffffff"
                  onPress={() => navigation.navigate("Home")}
                  textStyle={{ color: "#745c97", fontSize: 20 }}
                >
                  Start Review
                </Button>
                <Button
                  style={styles.button}
                  color="#ffffff"
                  onPress={() => navigation.navigate("Home")}
                  textStyle={{ color: "#745c97", fontSize: 20 }}
                >
                  New Notecard
                </Button>
              </Block>
          </Block>
        </Block>

        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  title: {
    marginTop:'-5%'
  },
  button: {
    marginTop: 40,
    width: width - theme.SIZES.BASE * 10,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  }
});

export default Homepage;
