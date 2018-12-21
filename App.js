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
import ResultadoScreen from './screens/ResultadoScreen'
import RankingScreen from './screens/RankingScreen'
// Firebase
import ApiKeys from './utils/ApiKeys'
import firebase from 'firebase';

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Cadastro: CadastroScreen,
    Quiz: QuizScreen,
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
