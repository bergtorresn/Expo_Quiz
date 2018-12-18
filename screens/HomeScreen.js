import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import firebase from 'firebase';

export default class HomeScreen extends React.Component {

  componentDidMount() {
    const bd = firebase.database().ref();
    var perguntasDoQuiz = [];
    
    for (i = 1; i < 6; i++) {
      const bdPerguntas = bd.child('Perguntas').child(i.toString());
      bdPerguntas.on('value', snapshot => {
        let novaPergunta = {
          pergunta: '',
          resposta: '',
          opcao1: '',
          opcao2: '',
          opcao3: '',
          opcao4: ''
        }
        novaPergunta = snapshot.val();
        perguntasDoQuiz.push(novaPergunta);
        this.setState({
          quiz: perguntasDoQuiz
        });
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      quiz: []
    };
  }

  render() {
    return (
      <FlatList data={this.state.quiz}
        renderItem={({ item }) =>
          <View>
            <Image source={item.img} style={{ width: 100, height: 100 }} />
            <Text>{item.pergunta}</Text>
            <TouchableOpacity underlayColor='black'>
              <Text>A) {item.opcao1}</Text>
            </TouchableOpacity>
            <TouchableOpacity underlayColor='black'>
              <Text>B) {item.opcao2}</Text>
            </TouchableOpacity>
            <TouchableOpacity underlayColor='black'>
              <Text>C) {item.opcao3}</Text>
            </TouchableOpacity>
            <TouchableOpacity underlayColor='black'>
              <Text>D) {item.opcao4}</Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
}