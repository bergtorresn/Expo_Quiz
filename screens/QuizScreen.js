import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
  Alert
} from 'react-native';
import firebase from 'firebase';
import { stylesQuiz } from '../styles/ListaStyles';
import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Resultado' })],
});

var idDaPergunta;
var qtdAcertos;
var qtdErros;
var respostasDoJogador;

export default class QuizScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Mestre Pokémon"
    };
  };

  componentDidMount() {
    console.log(idDaPergunta);
    this.getPerguntaDoQuizPorId(idDaPergunta);
  }

  constructor(props) {
    super(props);
    this.state = {
      quiz: []
    };
     idDaPergunta = 1;
     qtdAcertos = 0;
     qtdErros = 0;
     respostasDoJogador = [];
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

  getPerguntaDoQuizPorId = async (id) => {
    try {
      var perguntasDoQuiz = [];

      await firebase.database().ref().child('Perguntas').child(id.toString()).on('value', snapshot => {
        let novaPergunta = snapshot.val();
        perguntasDoQuiz.push(novaPergunta);
        this.setState({
          quiz: perguntasDoQuiz
        });
      });

    } catch (error) {
      Alert.alert("Aviso", error.message);
    }
  }


  respostaSelecionada(opcaoSelecionada, item) {
    if (idDaPergunta < 5) {
      if (opcaoSelecionada === item.resposta) {
        respostasDoJogador.push("Acertou - " + opcaoSelecionada);
        qtdAcertos++;
      } else {
        respostasDoJogador.push("Errou - " + opcaoSelecionada);
        qtdErros++;
      }
      idDaPergunta++;
      this.getPerguntaDoQuizPorId(idDaPergunta);
    } else {
      if (opcaoSelecionada === item.resposta) {
        respostasDoJogador.push("Acertou - " + opcaoSelecionada);
        qtdAcertos++;
      } else {
        respostasDoJogador.push("Errou - " + opcaoSelecionada);
        qtdErros++;
      }
      this.enviarResultadoDoUsuario();
    }
  }

  enviarResultadoDoUsuario = async () => {
    try {
      const usuario = firebase.auth().currentUser;
      let data = new Date();
      let dataDaJogada = data.toLocaleDateString("pt-BR");

      await firebase.database().ref().child('Respostas').child(usuario.uid).set({
        email: usuario.email,
        apelido: usuario.displayName,
        resultado: respostasDoJogador,
        data: dataDaJogada,
        qtdAcertos: qtdAcertos,
        qtdErros: qtdErros
      });

      this.props.navigation.dispatch(resetAction);

    } catch (error) {
      Alert.alert("Aviso", error.message);
    }
  }
}