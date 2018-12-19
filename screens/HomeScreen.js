import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import firebase from 'firebase';

const larguraDaTela = Dimensions.get('screen').width;
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
      <FlatList style={styles.listaFlatList}
        numColumns='2'
        data={this.state.quiz}
        keyExtractor={item => item.pergunta}
        renderItem={({ item }) =>
          <View style={styles.perguntaItemView}>
            <Image style={styles.perguntaImagem} source={{ uri: item.imagem }} />
            <Text style={styles.perguntaTitulo}>{item.pergunta}</Text>
            <TouchableOpacity style={styles.perguntaButton} onPress={() => this.respostaSelecionada(item.opcao1, item)}>
              <Text style={styles.perguntaOpcao}>A) {item.opcao1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.perguntaButton} onPress={() => this.respostaSelecionada(item.opcao2, item)}>
              <Text style={styles.perguntaOpcao}>B) {item.opcao2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.perguntaButton} onPress={() => this.respostaSelecionada(item.opcao3, item)}>
              <Text style={styles.perguntaOpcao}>C) {item.opcao3}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.perguntaButton} onPress={() => this.respostaSelecionada(item.opcao4, item)}>
              <Text style={styles.perguntaOpcao}>D) {item.opcao4}</Text>
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

const styles = StyleSheet.create({
  listaFlatList: {
    flex: 1,
  },
  perguntaItemView: {
    flex: 1,
    margin: 10
  },
  perguntaButton: {
    flex: 1,
    height: 50,
    borderColor: 'red',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 5,
  },
  perguntaOpcao: {
    marginTop: 15,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  perguntaTitulo: {
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  perguntaImagem: {
    width: larguraDaTela - 20,
    height: larguraDaTela / 2
  }
});
