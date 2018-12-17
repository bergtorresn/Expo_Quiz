import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import firebase from 'firebase';


export default class HomeScreen extends React.Component {


  // componentDidMount() {
  //   const bd = firebase.database().ref();
  //   var perguntasDoQuiz = [];
  //   for (i = 1; i < 6; i++) {
  //     const bdPerguntas = bd.child('Perguntas/' + i);
  //     bdPerguntas.on("value", function (snapshot) {
  //       snapshot.forEach((obj) => {
  //         let pergunta = obj.key
  //         console.log("The read failed: " + pergunta);
  //         perguntasDoQuiz.push(pergunta);
  //       });
  //     }, function (errorObject) {
  //       console.log("The read failed: " + errorObject.code);
  //     });
  //   }
  //   console.log("The read failed: " + perguntasDoQuiz.length);
  //   this.setState({
  //     quiz: perguntasDoQuiz
  //   });
  // }

  constructor(props) {
    super(props);
    this.state = {
      quiz: []
    };
  }

  render() {
    return (
      <FlatList data={["ONDE?", "QUANDO?", "PQ?", "QUEM?", "SÉRIO?"]}
        renderItem={({ item }) =>
          <View>
            <Text>{item}</Text>
            <TouchableOpacity underlayColor='black'>
              <Text>A</Text>
            </TouchableOpacity>
            <TouchableOpacity underlayColor='black'>
              <Text>B</Text>
            </TouchableOpacity>
            <TouchableOpacity underlayColor='black'>
              <Text>C</Text>
            </TouchableOpacity>
            <TouchableOpacity underlayColor='black'>
              <Text>D</Text>
            </TouchableOpacity>
            <TouchableOpacity underlayColor='black'>
              <Text>Enviar respostas</Text>
            </TouchableOpacity>
          </View>
        }
      />
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