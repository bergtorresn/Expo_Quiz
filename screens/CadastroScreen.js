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
    title: 'Cadastro',
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
          style={styles.autenticacaoButton}>
          <Text style={styles.autenticacaoTextButton}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}