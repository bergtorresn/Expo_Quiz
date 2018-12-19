import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import firebase from 'firebase';
import { stylesQuiz } from '../styles/ListaStyles';

var idDaPergunta = 1;
var respostasDoJogador = [];

export default class HomeScreen extends React.Component {

  componentDidMount() {
    this.getQuiz(idDaPergunta);
  }

  constructor(props) {
    super(props);
    this.state = {
      quiz: []
    };
  }

  render() {
    return (
      <FlatList style={stylesQuiz.quizLista}
        numColumns='2'
        data={this.state.quiz}
        keyExtractor={item => item.pergunta}
        renderItem={({ item }) =>
          <View style={stylesQuiz.quizPerguntaView}>
            <Image style={stylesQuiz.quizPerguntaImg} source={{ uri: item.imagem }} />
            <Text style={stylesQuiz.quizPerguntaTitulo}>{item.pergunta}</Text>
            <TouchableOpacity style={stylesQuiz.quizPerguntaBotao} onPress={() => this.respostaSelecionada(item.opcao1, item)}>
              <Text style={stylesQuiz.quizPerguntaOpcao}>A) {item.opcao1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesQuiz.quizPerguntaBotao} onPress={() => this.respostaSelecionada(item.opcao2, item)}>
              <Text style={stylesQuiz.quizPerguntaOpcao}>B) {item.opcao2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesQuiz.quizPerguntaBotao} onPress={() => this.respostaSelecionada(item.opcao3, item)}>
              <Text style={stylesQuiz.quizPerguntaOpcao}>C) {item.opcao3}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesQuiz.quizPerguntaBotao} onPress={() => this.respostaSelecionada(item.opcao4, item)}>
              <Text style={stylesQuiz.quizPerguntaOpcao}>D) {item.opcao4}</Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
  }

  getQuiz(id) {
    var perguntasDoQuiz = [];

    const bdPerguntas = firebase.database().ref().child('Perguntas').child(id.toString());
    bdPerguntas.on('value', snapshot => {
      let novaPergunta = {
        pergunta: '',
        imagem: '',
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

  respostaSelecionada(opcaoSelecionada, item) {
    if (idDaPergunta < 5) {
      if (opcaoSelecionada === item.resposta) {
        respostasDoJogador.push("Acertou - " + opcaoSelecionada);
      } else { 
        respostasDoJogador.push("Errou - " + opcaoSelecionada);
      }

      idDaPergunta++;
      this.getQuiz(idDaPergunta);
    } else {
      if (opcaoSelecionada === item.resposta) {
        respostasDoJogador.push("Acertou - " + opcaoSelecionada);
      } else {
        respostasDoJogador.push("Errou - " + opcaoSelecionada);
      }

      const usuario = firebase.auth().currentUser;
      var data = new Date();
      firebase.database().ref().child('Respostas').child(usuario.uid).set({
        email: usuario.email,
        resultado: respostasDoJogador,
        data: data
      });
      this.props.navigation.navigate('Resultado');
    }
  }
}