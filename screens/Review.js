import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, TextInput, Alert } from 'react-native';
import { Block, Text, Button, theme } from 'galio-framework';

import { Card, Input } from '../components';
import articles from '../constants/articles';
const { width, height } = Dimensions.get("screen");
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import firebase from 'firebase/app';
import 'firebase/database';

var cardHistory = [];
var successfulCards = [];
var traversingHistory = false;
//let traverseHistoryIndex; //var traverseHistoryIndex = cardHistory.length - 1

var cardIndex = 0;

class NewCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {front: "Question", back: "Answer", side: "front", curtext: "Question"};
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
        console.log("Cards length:", Object.values(cards).length);

        let cardList = []
        for(var card in cards)
        {
          cardList.push(cards[card]);
        }
        this.setState({
          back: cardList[0].back,
          front: cardList[0].front,
          curtext: cardList[0].front,
          cards: cardList,
          cardsAreLoaded: true
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

    const RemoveCard = (cards, idx)=> {
      for( var i = 0; i < cards.length; i++){
       if ( cards[i] === 1) {
         cards.splice(i, 1);
       }
      }
      return cards
    }
    console.log("Cards are:", this.state.cards);
    if(this.state.cardsAreLoaded == true){
      if(Object.values(this.state.cards).length <= 0){
        return (
              <React.Fragment>
              <ImageBackground
          source={Images.Onboarding}
          style={{ height, width, zIndex: 1 }}
      >
          <Text style={{fontWeight: 'bold', marginTop: 50, color: "#ffffff", fontSize: 20}}>
          You Have No More Cards To Review In This Bucket
          </Text>
          <Button
                style={{ marginTop: 100,
                  marginLeft: 10}}
                color="#33ffff"
                onPress={() => navigation.navigate("Homepage")}
                textStyle={{ color: "#745c97", fontSize: 20 }}
              >
                Return Home
              </Button>
                    </ImageBackground>
                  </React.Fragment>

              /*
          Alert.alert(
  'You Have No More Cards To Review \n In This Bucket',
  '',
  [
    {text: 'Return Home', onPress: () => navigation.navigate("Homepage")}
  ],
  {cancelable: false}
  ) */
);
      }
    else{
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
            <Text bold size={20} style={styles.bucketInfo}>
              Bucket: 1
            </Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
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
            <Block center paddingBottom>
              <Button
                style={styles.button}
                color="success"
                onPress={() => {
                         {
                        if(!successfulCards.includes(cardIndex)){
                          successfulCards.push(cardIndex);
                          console.log("successfulCards:", successfulCards);
                        }
                        if(traversingHistory == true){
                          if(traverseHistoryIndex == (cardHistory.length - 1)){
                               traversingHistory = false
                               cardIndex = cardIndex + 1;
                          }
                         else if(traverseHistoryIndex < (cardHistory.length - 1)){
                               traverseHistoryIndex = traverseHistoryIndex + 1; 
                               cardIndex = cardHistory[traverseHistoryIndex];
                             }
                        }
                        else if(traversingHistory == false && cardIndex < this.state.cards.length){
                               cardHistory.push(cardIndex);
                               cardIndex = cardIndex + 1;
                        }
                        if(cardIndex >= this.state.cards.length){
                          Alert.alert(
  'You Reached the End',
  '',
  [
    {
      text: 'Review previous cards',
      onPress: () => console.log('Review previous cards'),
      style: 'cancel',
    },
    {text: 'Return Home', onPress: () => {
      successfulCards.sort();
      for (var i = successfulCards.length - 1; i >= 0; i--){
          this.state.cards.splice(successfulCards[i], 1);
      }
      /*
      for (var i = 0; i < successfulCards.length ; i++){
        this.state.cards.splice(successfulCards[i], 1);
        //console.log("Spliced out cards:", this.state.cards.splice(successfulCards[i], 1));
      } 
      */
      this.setState({cards: this.state.cards});
      successfulCards = [];
      cardIndex = 0;
      cardHistory = [];
      navigation.navigate("Homepage");
      console.log("Current cards line 174:", this.state.cards);
    }},
  ],
  {cancelable: false}
);

                        }
                        else{

                             this.setState({ front: this.state.cards[cardIndex].front,
                                                  back: this.state.cards[cardIndex].back,
                                                  curtext: this.state.cards[cardIndex].front,
                                                  //cards: this.state.cards.slice(0, cardIndex).concat(this.state.cards.slice(cardIndex + 1, this.state.cards.length)),
                                                  side: "front"});
                        }
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
                  {
                  if(successfulCards.includes(cardIndex)){
                          _cardIndex = successfulCards.indexOf(cardIndex);
                          successfulCards.splice(_cardIndex, 1);
                          console.log("successfulCards:", successfulCards);
                        }
                   if(traversingHistory == true){
                          if(traverseHistoryIndex == (cardHistory.length - 1)){
                               traversingHistory = false
                               cardIndex = cardIndex + 1;
                          }
                         else if(traverseHistoryIndex < (cardHistory.length - 1)){
                               traverseHistoryIndex = traverseHistoryIndex + 1; 
                               cardIndex = cardHistory[traverseHistoryIndex];
                             }
                        }
                   else if(traversingHistory == false && cardIndex < this.state.cards.length){
                               cardHistory.push(cardIndex);
                               cardIndex = cardIndex + 1;
                        }
                        
                        if(cardIndex >= this.state.cards.length){
                          Alert.alert(
  'You Reached the End',
  '',
  [
    {
      text: 'Review previous cards',
      onPress: () => console.log('Review previous cards'),
      style: 'cancel',
    },
    {text: 'Return Home', onPress: () => {
      successfulCards.sort();
      for (var i = successfulCards.length - 1; i >= 0; i--){
          this.state.cards.splice(successfulCards[i], 1);
      }
      /*
      for (var i = 0; i < successfulCards.length ; i++){
        this.state.cards.splice(successfulCards[i], 1);
         //console.log("Spliced out cards:", this.state.cards.splice(successfulCards[i], 1));
      }
      */
      this.setState({cards: this.state.cards});
      successfulCards = [];
      cardIndex = 0;
      cardHistory = [];
      navigation.navigate("Homepage");
      console.log("Current cards line 239:", this.state.cards);
    }},
  ],
  {cancelable: false}
);

                        }
                        else{
                        
                   this.setState({ front: this.state.cards[cardIndex].front,
                                   back: this.state.cards[cardIndex].back,
                                   curtext: this.state.cards[cardIndex].front,
                                   side: "front"});
                        }
                  }
                 }}
                textStyle={{ color: "#ffffff", fontSize: 20 }}
              >
                I got schooled... :(
              </Button>
              <Button
                style={styles.button}
                color="primary"
                onPress={() => {
                  {
                    if(cardIndex > 0){
                      if(traversingHistory == false){
                        traverseHistoryIndex = cardHistory.length - 1;
                      }
                      else if(traversingHistory == true){
                        traverseHistoryIndex = traverseHistoryIndex - 1; 
                      }
                      traversingHistory = true;
                      cardIndex = cardHistory[traverseHistoryIndex];
                    }

                      this.setState({ front: this.state.cards[cardIndex].front,
                                      back: this.state.cards[cardIndex].back,
                                      curtext: this.state.cards[cardIndex].front,
                                      side: "front"});
                      console.log("Current cards line 281:", this.state.cards);
                  }
                 }}
                textStyle={{ color: "#ffffff", fontSize: 20 }}
              >
                Go back
              </Button>
            </Block>
        </Block>
      </ScrollView>
      </ImageBackground>
      )
    }
  }
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
  },
  title: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    color: "#ffffff"
  },
  bucketInfo: {
    paddingBottom: 20,
    color: "#ffffff"
  },
  button: {
    marginTop: 20,
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
