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
                data={this.state.respostasDoQuiz}
                renderItem={({ item }) =>
                    <View>
                        <Text>{item.email}</Text>
                        <Text>{item.resultado}</Text>
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
                    resultado: ''
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