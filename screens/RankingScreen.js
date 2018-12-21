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
                        <Text style={stylesRanking.rankingJogador}>Jogador: {item.apelido}</Text>
                        <Text style={stylesRanking.rankingData}>Jogou em: {item.data}</Text>
                        <Text style={stylesRanking.rankingRespostas}>Qtd de acertos: {item.qtdAcertos}</Text>
                        <Text style={stylesRanking.rankingRespostas}>Qtd de erros: {item.qtdErros}</Text>
                        <Text style={stylesRanking.rankingRespostas}>Respostas: </Text>
                        <Text style={stylesRanking.rankingRespostas}>       ⋅ 1º R: {item.resultado[0]}</Text>
                        <Text style={stylesRanking.rankingRespostas}>       ⋅ 2º R: {item.resultado[1]}</Text>
                        <Text style={stylesRanking.rankingRespostas}>       ⋅ 3º R: {item.resultado[2]}</Text>
                        <Text style={stylesRanking.rankingRespostas}>       ⋅ 4º R: {item.resultado[3]}</Text>
                        <Text style={stylesRanking.rankingRespostas}>       ⋅ 5º R: {item.resultado[4]}</Text>
                        <View style={{ height: 1, backgroundColor: "#CED0CE", marginTop: 10 }}
                        />
                    </View>
                }
            />
        );
    }

    getRanking = async () => {
        try {
            var respostasDoQuiz = [];

            await firebase.database().ref().child('Respostas').on('value', snapshot => {
                snapshot.forEach(function (childSnapshot) {
                    let resposta = childSnapshot.val();
                    respostasDoQuiz.push(resposta);
                });
                
                var ordenarPorAcertos = respostasDoQuiz.sort(function (a, b) {
                    return a.qtdAcertos < b.qtdAcertos;
                });

                this.setState({
                    respostas: ordenarPorAcertos
                });
            });

        } catch (error) {
            Alert.alert("Aviso", error.message);
        }
    }
}