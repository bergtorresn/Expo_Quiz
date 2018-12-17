import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import firebase from 'firebase';


export default class HomeScreen extends React.Component {


  componentDidMount() {
    const bd = firebase.database().ref();

    for (i = 1; i < 6; i++) { 
      const bdPerguntas = bd.child('Perguntas/' + i);
      bdPerguntas.on("value", function (snapshot) {
        snapshot.forEach((pergunta) => {
          let NumeroDaPergunta = pergunta.key
          console.log("New high score: " + NumeroDaPergunta);
        });
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }        
  }

  constructor(props) {
    super(props);
    this.setState({
      quiz: []
    });
  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});