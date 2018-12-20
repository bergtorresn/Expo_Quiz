import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import firebase from 'firebase';

export default class ResultadoScreen extends React.Component {

  static navigationOptions = {
    title: 'Resultado',
  };

  componentDidMount() {
    this.getRanking();
  }

  constructor() {
    super();
    this.state = {
      respostas: Object
    }
  }

  getRanking() {
    let usuario = firebase.auth().currentUser;

    const bdRanking = firebase.database().ref().child('Respostas').child(usuario.uid);
    bdRanking.on('value', snapshot => {
      let respostas = snapshot.val();
      this.setState({
        respostas: respostas
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Jogador: {this.state.respostas.apelido}</Text>
        <Text>Jogou em: {this.state.respostas.data}</Text>
        <Text>Qtd de acertos: {this.state.respostas.qtdAcertos}</Text>
        <Text>Qtd de erros: {this.state.respostas.qtdErros}</Text>
        <Text>Respostas: </Text>
        <TouchableHighlight onPress={() => this.props.navigation.push('Ranking')}>
          <Text>{this.state.respostas.apelido}</Text>
        </TouchableHighlight>
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