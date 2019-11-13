import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { Block, Text, Button, theme } from 'galio-framework';

import { Card, Input } from '../components';
import articles from '../constants/articles';
const { width, height } = Dimensions.get("screen");
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

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
              <Input right placeholder="Regular" iconContent={<Block />} />
            </Block>
            <Text bold size={16} style={styles.title}>
              Back
            </Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="Regular Custom"
                style={{
                  borderColor: argonTheme.COLORS.INFO,
                  borderRadius: 4,
                  backgroundColor: "#fff"
                }}
                iconContent={<Block />}
              />
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
});

export default NewCard;
