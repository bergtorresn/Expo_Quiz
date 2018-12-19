import React from 'react';
import {
    Text,
    View,
    FlatList
} from 'react-native';
import firebase from 'firebase';
import { stylesRanking } from '../styles/ListaStyles';

export default class RankingScreen extends React.Component {

    static navigationOptions = {
        title: 'Ranking',
      };

    componentDidMount() {
        this.getRanking();
    }

    constructor(props) {
        super(props);
        this.state = {
            respostas: []
        };
    }

    render() {
        return (
            <FlatList
                style={stylesRanking.rankingLista}
                data={this.state.respostas}
                keyExtractor={item => item.email}
                renderItem={({ item }) =>
                    <View>
                        <Text style={stylesRanking.rankingEmail}>{item.email}</Text>
                        <Text style={stylesRanking.rankingRespostas}>1º R: {item.resultado[0]}</Text>
                        <Text style={stylesRanking.rankingRespostas}>2º R: {item.resultado[1]}</Text>
                        <Text style={stylesRanking.rankingRespostas}>3º R: {item.resultado[2]}</Text>
                        <Text style={stylesRanking.rankingRespostas}>4º R: {item.resultado[3]}</Text>
                        <Text style={stylesRanking.rankingRespostas}>5º R: {item.resultado[4]}</Text>
                    </View>
                }
            />
        );
    }

    getRanking() {
        var respostasDoQuiz = [];

        const bdRanking = firebase.database().ref().child('Respostas');
        bdRanking.on('value', snapshot => {

            snapshot.forEach(function (childSnapshot) {
                let resposta = {
                    email: '',
                    resultado: []
                }
                resposta = childSnapshot.val();
                respostasDoQuiz.push(resposta);
            });
            this.setState({
                respostas: respostasDoQuiz
            });
        });
    }
}