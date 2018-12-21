import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';
import firebase from 'firebase';
import { stylesResultado } from '../styles/ResultadoStyles';

export default class ResultadoScreen extends React.Component {

  static navigationOptions = {
    title: 'Resultado',
  };

  componentDidMount() {
    this.getResultado();
  }

  constructor() {
    super();
    this.state = {
      respostas: Object
    }
  }

  getResultado = async () => {
    try {
      const usuario = firebase.auth().currentUser;

      await firebase.database().ref().child('Respostas').child(usuario.uid).on('value', snapshot => {
        let respostas = snapshot.val();
        this.setState({
          respostas: respostas
        });
      });

    } catch (error) {
      Alert.alert("Aviso", error.message);
    }
  }

  render() {
    return (
      <View style={stylesResultado.resultadoContainer}>
        <View style={stylesResultado.resultadoViewDados}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={stylesResultado.resultadoTextInfo}>Jogador: </Text>
            <Text style={stylesResultado.resultadoTextDados}>{this.state.respostas.apelido}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={stylesResultado.resultadoTextInfo}>Jogou em: </Text>
            <Text style={stylesResultado.resultadoTextDados}>{this.state.respostas.data}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={stylesResultado.resultadoTextInfo}>Qtd de acertos: </Text>
            <Text style={stylesResultado.resultadoTextDados}>{this.state.respostas.qtdAcertos}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={stylesResultado.resultadoTextInfo}>Qtd de erros: </Text>
            <Text style={stylesResultado.resultadoTextDados}>{this.state.respostas.qtdErros}</Text>
          </View>
        </View>
        <TouchableHighlight style={stylesResultado.resultadoBotaoRanking} onPress={() => this.props.navigation.push('Ranking')}>
          <Text style={stylesResultado.resultadoTituloBotao}>Ver Ranking</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
