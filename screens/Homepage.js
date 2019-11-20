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
    const { navigation } = this.props;

    var firstlogin = new Date("11/16/19");
    var today = new Date();
    var daydiff = Math.floor((today.getTime() - firstlogin.getTime()) /
                              (1000 * 3600 * 24));
    const bucketcolors = ["info", "success", "warning", "error"];
    const bucketinterval = [1, 2, 4, 8];

    console.log(daydiff);

    const Bucket = bucket => {
      var bucketn = Number(bucket.bucket);
      console.log(bucket)
      if (daydiff%bucketinterval[bucketn-1] === 0) {
        return (
        <Button color={bucketcolors[bucketn-1]} >
        <Text style = {{ color: "#ffffff", fontSize: 20 }}>
        {bucketn}
        </Text>
        </Button>
      )}
      else {
        return (null);
      }
    };

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
        >
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block center style={styles.title}>
                <Text center color="white" size={50}>
                  Welcome Back
                </Text>
                <Text center color="white" size={20}
                style={{
                  paddingTop: 50,
                  paddingBottom: 30
                }}>
                  Today's Buckets:
                </Text>

                <Bucket bucket = "1"/>
                <Bucket bucket = "2"/>
                <Bucket bucket = "3"/>
                <Bucket bucket = "4"/>

                <Button
                  style={styles.button}
                  paddingTop={80}
                  color="#ffffff"
                  onPress={() => navigation.navigate("Home")}
                  textStyle={{ color: "#745c97", fontSize: 20 }}
                >
                  Start Review
                </Button>
                <Button
                  style={styles.button}
                  color="#ffffff"
                  onPress={() => navigation.navigate("NewCard")}
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
