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
import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Quiz' })],
});

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Login',
  };

  componentDidMount() {
    var user = firebase.auth().currentUser;
    console.log(user);
  }

  constructor() {
    super();
    this.state = {
      email: "",
      senha: ""
    }
  }

  entrarNaConta = async () => {
    try {
      const { email, senha } = this.state;

      await firebase.auth().signInWithEmailAndPassword(email, senha);

      this.props.navigation.dispatch(resetAction);

    } catch (error) {
      Alert.alert("Aviso", error.message);
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
          autoCapitalize='none'
          secureTextEntry
          onChangeText={senha => this.setState({ senha })}
          style={styles.autenticacaoInput} />
        <TouchableOpacity
          onPress={this.entrarNaConta}
          style={styles.autenticacaoButton}>
          <Text style={styles.autenticacaoTextButton}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.push('Cadastro')}
          style={styles.autenticacaoButton}>
          <Text style={styles.autenticacaoTextButton}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
    );
  }
}