import React from 'react';
import { 
  createStackNavigator, 
  createAppContainer 
} from "react-navigation";

import LoginScreen from './screens/LoginScreen'
import CadastroScreen from './screens/CadastroScreen'
import HomeScreen from './screens/HomeScreen'
import LaunchScreen from './screens/LaunchScreen'
import ResultadoScreen from './screens/ResultadoScreen'

const RootStack = createStackNavigator(
  {
    Launch: LaunchScreen,
    Login: LoginScreen,
    Cadastro: CadastroScreen,
    Home: HomeScreen,
    Resultado: ResultadoScreen
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
