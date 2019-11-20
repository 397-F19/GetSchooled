import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, TextInput } from 'react-native';
import { Block, Text, Button, theme } from 'galio-framework';

import { Card, Input } from '../components';
import articles from '../constants/articles';
const { width, height } = Dimensions.get("screen");
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class NewCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {front: "", back: ""};
  }

  renderArticles = () => {

    return (
      <ImageBackground
          source={Images.Onboarding}
          style={{ height, width, zIndex: 1 }}
      >
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Block center flex paddingTop={height*.1}>
            <Text bold size={24} style={styles.title}>
              Front
            </Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <TextInput right placeholder="Term"
              style={styles.input}
              textAlign={'center'}
              iconContent={<Block />}
              ref="frontinput"
              onChangeText={(front) => this.setState({front})}
              value={this.state.front}
              />
            </Block>
            <Text bold size={24} style={styles.title}>
              Back
            </Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <TextInput
                right
                placeholder="Explanation"
                style={styles.input}
                textAlign={'center'}
                iconContent={<Block />}
                ref="backinput"
                onChangeText={(back) => this.setState({back})}
                value={this.state.back}
              />
            </Block>
            <Block center paddingBottom>
              <Button
                style={styles.button}
                color="#ffffff"
                onPress={() => {
                                var f = this.refs.frontinput;
                                var b = this.refs.backinput;
                                console.log(this.state.front);
                                console.log(this.state.back);
                                f.clear();
                                b.clear();
                                // TODO: add storing the front and back into card storage
                                this.setState({front: ""});
                                this.setState({back: ""});
                                console.log(this.state.front);
                                console.log(this.state.back);}}
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
  },
  input: {
    borderColor: argonTheme.COLORS.INFO,
    borderRadius: 4,
    backgroundColor: "#fff",
    height: height*.2,
    width: width*.8,
    fontSize: 15
  }
});

export default NewCard;
