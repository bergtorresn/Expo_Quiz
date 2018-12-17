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

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Login',
  };

  constructor() {
    super();
    this.state = {
      email: "",
      senha: ""
    }
  }

  entrarNaConta = async () => {
    const { email, senha } = this.state;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, senha);
      this.props.navigation.navigate('Cadastro');
    } catch (error) {
      Alert.alert("Aviso", error);
    }
  }

  render() {
    return (
      <View style={styles.autenticacaoView}>
        <TextInput placeholder="Digite o seu e-mail"
          autoCapitalize='none'
          keyboardType='email-address'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          style={styles.autenticacaoInput} />
        <TextInput placeholder="Digite a sua senha"
          value={this.state.senha}
          secureTextEntry
          onChangeText={senha => this.setState({ senha })}
          style={styles.autenticacaoInput} />
        <TouchableOpacity
          onPress={this.entrarNaConta}
          style={styles.autenticacaoButton}>
          <Text style={styles.autenticacaoTextButton}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Cadastro')}
          style={styles.autenticacaoButton}>
          <Text style={styles.autenticacaoTextButton}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
    );
  }
}