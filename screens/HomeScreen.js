import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,

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
            <TouchableWithoutFeedback underlayColor='black' onPress={() => this.actionOnRow(item.opcao1, item)}>
              <Text>A) {item.opcao1}</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback underlayColor='black' onPress={() => this.actionOnRow(item.opcao2, item)}>
              <Text>B) {item.opcao2}</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback underlayColor='black' onPress={() => this.actionOnRow(item.opcao3, item)}>
              <Text>C) {item.opcao3}</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback underlayColor='black' onPress={() => this.actionOnRow(item.opcao4, item)}>
              <Text>D) {item.opcao4}</Text>
            </TouchableWithoutFeedback>
          </View>
        }
      />
    );
  }

  actionOnRow(opcaoSelecionada, item) {
    if (opcaoSelecionada === item.resposta) {
      console.log('acertou');
    } else {
      console.log('errou');
    }
  }
}