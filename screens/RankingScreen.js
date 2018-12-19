import React from 'react';
import {
    Text,
    View,
    FlatList
} from 'react-native';
import firebase from 'firebase';

export default class RankingScreen extends React.Component {

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
                data={this.state.respostas}
                keyExtractor={item => item.email}
                renderItem={({ item }) =>
                    <View>
                        <Text>Usuário: {item.email}</Text>
                        <Text>1º Pergunta: {item.resultado[0]}</Text>
                        <Text>2º Pergunta: {item.resultado[1]}</Text>
                        <Text>3º Pergunta: {item.resultado[2]}</Text>
                        <Text>4º Pergunta: {item.resultado[3]}</Text>
                        <Text>5º Pergunta: {item.resultado[4]}</Text>
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
            console.log(this.state.respostas);
        });
    }
}