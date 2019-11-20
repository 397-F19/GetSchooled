import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { Block, Text, Button, theme } from 'galio-framework';

import { Card, Input } from '../components';
import articles from '../constants/articles';
const { width, height } = Dimensions.get("screen");
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

var front = "";
var back = "";

class NewCard extends React.Component {
  renderArticles = () => {
    return (
      <ImageBackground
          source={Images.Onboarding}
          style={{ height, width, zIndex: 1 }}
      >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
            <Text bold size={16} style={styles.title}>
              Front
            </Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input right placeholder="Term"
              iconContent={<Block />}
              ref="frontinput"
              onBlur = {text => {front = text;}}/>
            </Block>
            <Text bold size={16} style={styles.title}>
              Back
            </Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="Explanation"
                style={{
                  borderColor: argonTheme.COLORS.INFO,
                  borderRadius: 4,
                  backgroundColor: "#fff"

                }}
                iconContent={<Block />}
                ref="backinput"
                onBlur = {text => {back = text;}}
              />
            </Block>
            <Block center paddingBottom>
              <Button
                style={styles.button}
                color="#ffffff"
                onPress={() => {var f = this.refs.frontinput;
                                f.text = ""}}
                textStyle={{ color: "#745c97", fontSize: 20 }}
              >
                Add Card
              </Button>
            </Block>
        </Block>
      </ScrollView>
      </ImageBackground>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>

    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 30,
    color: "#ffffff"
  },
  button: {
    marginTop: 40,
    width: width - theme.SIZES.BASE * 10,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  }
});

export default NewCard;
