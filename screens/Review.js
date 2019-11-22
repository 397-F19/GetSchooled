import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, TextInput } from 'react-native';
import { Block, Text, Button, theme } from 'galio-framework';

import { Card, Input } from '../components';
import articles from '../constants/articles';
const { width, height } = Dimensions.get("screen");
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import firebase from 'firebase/app';
import 'firebase/database';

var cardIndex = 0;

class NewCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {front: "[Loading cards, please wait]", back: "[Loading cards, please wait]", side: "front", curtext: "[Loading cards, please wait]", cards: [{front: "[Loading cards, please wait]", back: "[Loading cards, please wait]"}], cardIndex: 0};
  }


  getData()
  {
    let db = firebase.database();
    db.ref("/user-a").on('value', snap =>
    {
      if (snap.val())
      {
        console.log("test");;
        let cards = snap.val();
        console.log(cards)
        console.log(cards["card1"]);
        console.log(cards.children);

        let cardList = []
        for(var card in cards)
        {
          cardList.push(cards[card]);
        }
        console.log(cardList);
        this.setState({
          back: cardList[0].back,
          front: cardList[0].front,
          curtext: cardList[0].front,
          cards: cardList
        });
      }
    });
  }

  componentDidMount()
  {
    this.getData();
    // TODO: filter out the cards that aren't in today's Buckets
  }




  renderArticles = () => {
    const { navigation } = this.props;

    return (
      <ImageBackground
          source={Images.Onboarding}
          style={{ height, width, zIndex: 1 }}
      >
        <Button
                style={{ marginTop: 10,
                  marginLeft: 10,
                width: width * .2}}
                color="#33ffff"
                onPress={() => navigation.navigate("Homepage")}
                textStyle={{ color: "#745c97", fontSize: 20 }}
              >
                Home
              </Button>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Block center flex paddingTop={height*.1}>
            <Text bold size={40} style={styles.title}>
              Review
            </Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }} paddingTop={height*.05}>
              <Button
              style={styles.card}
              textAlign={'center'}
              iconContent={<Block />}
              ref="qcard"
              textStyle={{ color: "#745c97", fontSize: 20 }}
              onPress={() => {if (this.state.side === "front") {
                                this.setState({curtext: this.state.back});
                                this.setState({side: "back"})
                              }
                              else {
                                this.setState({curtext: this.state.front});
                                this.setState({side: "front"})
                              }}}>
              {this.state.curtext}
              </Button>
            </Block>
            <Block center paddingBottom paddingTop={height*.05}>
              <Button
                style={styles.button}
                color="success"
                onPress={() => {
                         {cardIndex = (cardIndex + 1) % this.state.cards.length;
                          this.setState({ front: this.state.cards[cardIndex].front,
                                          back: this.state.cards[cardIndex].back,
                                          curtext: this.state.cards[cardIndex].front,
                                          side: "front"});
                         }
                        }}
                textStyle={{ color: "#ffffff", fontSize: 20 }}
              >
                I got it!
              </Button>
              <Button
                style={styles.button}
                color="error"
                onPress={() => {
                  {cardIndex = (cardIndex + 1) % this.state.cards.length;
                   this.setState({ front: this.state.cards[cardIndex].front,
                                   back: this.state.cards[cardIndex].back,
                                   curtext: this.state.cards[cardIndex].front,
                                   side: "front"});
                  }
                 }}
                textStyle={{ color: "#ffffff", fontSize: 20 }}
              >
                I got schooled... :(
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
  card: {
    borderColor: argonTheme.COLORS.INFO,
    borderRadius: 4,
    backgroundColor: "#fff",
    height: height*.3,
    width: width*.8,
    fontSize: 15
  }
});

export default NewCard;
