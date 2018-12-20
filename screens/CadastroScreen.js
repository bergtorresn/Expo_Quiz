import React from 'react';
import { styles } from '../styles/AutenticacaoStyles';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import firebase from 'firebase';

export default class Cadastrocreen extends React.Component {

  static navigationOptions = {
    title: 'Cadastro',
  };

  constructor() {
    super();
    this.state = {
      apelido: "",
      email: "",
      senha: ""
    }
  }

  novoUsuario = async () => {
    try {
      const { apelido, email, senha } = this.state;

      await firebase.auth().createUserWithEmailAndPassword(email, senha);

      let usuario = firebase.auth().currentUser;

      await usuario.updateProfile({
        displayName: apelido
      });

      this.props.navigation.navigate('Quiz');

    } catch (error) {
      Alert.alert("Aviso", error.message);
    }
  }

  render() {
    return (
      <View style={styles.autenticacaoView}>
        <TextInput placeholder="Digite o seu apelido"
          value={this.state.apelido}
          onChangeText={apelido => this.setState({ apelido })}
          style={styles.autenticacaoInput} />
        <TextInput placeholder="Digite o seu e-mail"
          autoCapitalize='none'
          keyboardType='email-address'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          style={styles.autenticacaoInput} />
        <TextInput placeholder="Digite a sua senha"
          value={this.state.senha}
          secureTextEntry
          autoCapitalize='none'
          onChangeText={senha => this.setState({ senha })}
          style={styles.autenticacaoInput} />
        <TouchableOpacity
          onPress={this.novoUsuario}
          style={styles.autenticacaoButton}>
          <Text style={styles.autenticacaoTextButton}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}