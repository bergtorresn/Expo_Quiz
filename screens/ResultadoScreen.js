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
      <View style={styles.resultadoContainer}>
        <View style={styles.resultadoViewDados}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.resultadoTextInfo}>Jogador: </Text>
            <Text style={styles.resultadoTextDados}>{this.state.respostas.apelido}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.resultadoTextInfo}>Jogou em: </Text>
            <Text style={styles.resultadoTextDados}>{this.state.respostas.data}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.resultadoTextInfo}>Qtd de acertos: </Text>
            <Text style={styles.resultadoTextDados}>{this.state.respostas.qtdAcertos}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.resultadoTextInfo}>Qtd de erros: </Text>
            <Text style={styles.resultadoTextDados}>{this.state.respostas.qtdErros}</Text>
          </View>
        </View>
        <TouchableHighlight style={styles.resultadoBotaoRanking} onPress={() => this.props.navigation.push('Ranking')}>
          <Text style={styles.resultadoTituloBotao}>Ver Ranking</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  resultadoContainer: {
    flex: 1
  },
  resultadoViewDados: {
    margin: 10,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  resultadoTextInfo: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  resultadoTextDados: {
    fontSize: 18,
  },
  resultadoBotaoRanking: {
    height: 50,
    borderColor: 'red',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  resultadoTituloBotao: {
    marginTop: 15,
    marginLeft: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});