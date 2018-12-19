import React from 'react';

// Navigation
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";
// Screens
import LoginScreen from './screens/LoginScreen'
import CadastroScreen from './screens/CadastroScreen'
import QuizScreen from './screens/QuizScreen'
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
    Home: QuizScreen,
    Resultado: ResultadoScreen,
    Ranking: RankingScreen
  },
  {
    initialRouteName: "Ranking"
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
