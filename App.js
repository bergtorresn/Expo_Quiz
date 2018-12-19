import React from 'react';

// Navigation
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";
// Screens
import LoginScreen from './screens/LoginScreen'
import CadastroScreen from './screens/CadastroScreen'
import HomeScreen from './screens/HomeScreen'
import LaunchScreen from './screens/LaunchScreen'
import ResultadoScreen from './screens/ResultadoScreen'
import RankingScreen from './screens/RankingScreen'
// Firebase
import ApiKeys from './utils/ApiKeys'
import firebase from 'firebase';

const RootStack = createStackNavigator(
  {
    Launch: LaunchScreen,
    Login: LoginScreen,
    Cadastro: CadastroScreen,
    Home: HomeScreen,
    Resultado: ResultadoScreen,
    Ranking: RankingScreen
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

  constructor(props) {
    super(props);

    // Inicializando Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  render() {
    return (
      <AppContainer />
    );
  }
}
