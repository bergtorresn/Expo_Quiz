import React from 'react';
import { styles } from '../styles/AutenticacaoStyles';
import { 
  View, 
  Text ,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class Cadastrocreen extends React.Component {

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

  render() {
    return (
      <View style={styles.loginView}>
        <TextInput placeholder="Digite o seu e-mail"
          autoCapitalize='none'
          keyboardType='email-address'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          style={styles.loginInput} />
        <TextInput placeholder="Digite a sua senha"
          value={this.state.senha}
          secureTextEntry
          onChangeText={senha => this.setState({ senha })}
          style={styles.loginInput} />
        <TouchableOpacity
          style={styles.loginButton}>
          <Text style={styles.loginTextButton}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}>
          <Text style={styles.loginTextButton}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
    );
  }
}